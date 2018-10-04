package io.github.stormhouse.interpretor;

import io.github.stormhouse.ast.Expr;
import io.github.stormhouse.ast.Stmt;
import io.github.stormhouse.lexer.Token;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static io.github.stormhouse.lexer.TokenType.*;

public class Executor implements Expr.Visitor, Stmt.Visitor {
    public final Context globalContext = new Context(null, false);
    final Map<Expr, Integer> locals = new HashMap<>();

    private Context context = globalContext;
    public Context getCurrentContext () {
        return this.context;
    }

    public void interpret (List<Stmt> stmts) {
        Resolver resolver = new Resolver(this);
        resolver.resolve(stmts);
        for (Stmt stmt : stmts) {
            execute(stmt);
        }
    }
    void resolver (Expr expr, int depth) {
        locals.put(expr, depth);
    }
    public void execute (Stmt stmt) {
        stmt.accept(this);
    }
    public Object execute (Expr expr) {
        return expr.accept(this);
    }
    public Object executeBlock (List<Stmt> stmts, Context context) {
        Context p = this.context;
        try {
            this.context = context;
            for (Stmt s: stmts) {
                this.execute(s);
            }
        } finally {
            this.context = p;
        }
        return null;
    }
    @Override
    public Object visitBinaryExpr(Expr.Binary expr) {
        Token operator = expr.operator;
        Object left = execute(expr.left);
        Object right = execute(expr.right);
        switch (operator.type) {
            case PLUS:
                if (left instanceof Double && right instanceof Double) {
                    return (double)left + (double)right;
                }
                return null;
            case MINUS:
                if (left instanceof Double && right instanceof Double) {
                    return (double)left - (double)right;
                }
                return null;
            case GREATER:
                if (left instanceof Double && right instanceof Double) {
                    return (double)left > (double)right;
                }
                return null;
            case LESS:
                if (left instanceof Double && right instanceof Double) {
                    return (double)left < (double)right;
                }
                return null;
            case LESS_EQUAL:
                if (left instanceof Double && right instanceof Double) {
                    return (double)left <= (double)right;
                }
                return null;
            case EQUAL_EQUAL:
                if (left instanceof Double && right instanceof Double) {
                    return (double)left == (double)right;
                }
                return null;
            default:
                ;
        }
        return expr.accept(this);
    }

    @Override
    public Object visitCallExpr(Expr.Call expr) {
        Object callee = execute(expr.callee);

        List<Object> arguments = new ArrayList<>();
        for (Expr e: expr.arguments) {
            arguments.add(execute(e));
        }
        Callable fun = (Callable)callee;
        return fun.call(this, arguments);
    }

    @Override
    public Object visitLogicalExpr(Expr.Logical expr) {
        Token logic = expr.operator;
        Expr left = expr.left;
        Expr right = expr.right;
        Object leftValue = execute(left);
        if (logic.type == OR) {
            if ((boolean) leftValue) {
                return leftValue;
            } else {
                return execute(right);
            }
        } else if (logic.type == AND) {
            if (!(boolean) leftValue) {
                return leftValue;
            } else {
                return execute(right);
            }
        }
        return null;
    }

    @Override
    public Object visitGroupingExpr(Expr.Grouping expr) {
        return null;
    }

    @Override
    public Object visitLiteralExpr(Expr.Literal expr) {
        return expr.value;
    }

    @Override
    public Object visitUnaryExpr(Expr.Unary expr) {
        return null;
    }

    @Override
    public Object visitAssignExpr(Expr.Assign expr) {
        Token name = expr.name;
        Object value = execute(expr.right);
//        this.context.define(name.lexeme, value);
        Context ctx = this.context;
        Object oldValue = null;
        while (ctx != null) {
            oldValue = ctx.get(name.lexeme);
            if (oldValue == null) {
                ctx = ctx.getParent();
            } else {
                break;
            }
        }
        if (oldValue != null) {
            ctx.define(name.lexeme, value);
        }
        return value;
    }

    @Override
    public Object visitVariableExpr(Expr.Variable expr) {
        return lookupVariable(expr.name, expr);
//        Token name = expr.name;
//        Context ctx = this.context;
//        Object value = null;
//        while (ctx != null) {
//            value = ctx.get(name.lexeme);
//            if (value == null) {
//                ctx = ctx.getParent();
//            } else {
//                break;
//            }
//        }
//        return value;
    }
    private Object lookupVariable (Token name, Expr expr) {
        Integer distance = locals.get(expr);
        if (distance != null) {
            return this.context.getAt(distance, name.lexeme);
        } else {
            return globalContext.get(name.lexeme);
        }
    }

    @Override
    public Object visitBlockStmt(Stmt.Block stmt) {
        List<Stmt> stmts = stmt.stmts;
        Context previous = this.context;

        // enter new block context --------------
        this.context = new Context(previous, false);
        for (Stmt s : stmts) {
            execute(s);
        }
        // exit block context -------------------
        this.context = previous;
        return null;
    }

    @Override
    public Object visitCommentStmt(Stmt.Comment stmt) {
        return null;
    }

    @Override
    public Object visitIfStmt(Stmt.If stmt) {
        Expr condition = stmt.condition;
        Stmt ifBranch = stmt.thenBranch;
        Stmt elseBranch = stmt.elseBranch;
        if ((boolean)execute(condition)) {
            execute(ifBranch);
        } else if (elseBranch != null) {
            execute(elseBranch);
        }
        return null;
    }

    @Override
    public Object visitFunctionStmt(Stmt.Function stmt) {
//        Context c = new Context(this.context, true);
//        Function function = new Function(stmt, c);
        Function function = new Function(stmt, this.context);
        context.define(stmt.name.lexeme, function);
        return null;
    }

    @Override
    public Object visitWhileStmt(Stmt.While stmt) {
        Expr condition = stmt.condition;
        Stmt body = stmt.stmt;
        while ((boolean)execute(condition)) {
            execute(body);
        }
        return null;
    }

    @Override
    public Object visitExpressionStmt(Stmt.Expression stmt) {
        Expr expr = stmt.expr;
//        System.out.println(expr);
        return execute(expr);
//        return expr;
    }

    @Override
    public Object visitVarStmt(Stmt.Var stmt) {
        Token token = stmt.token;
        Expr expr = stmt.expr;
        Object value =  execute(expr);
        this.context.define(token.lexeme, value);
        return null;
    }

    @Override
    public Object visitPrintStmt(Stmt.Print stmt) {
        Object value = execute(stmt.expr);
        System.out.println(value);
        return null;
    }

    @Override
    public Object visitReturnStmt(Stmt.Return stmt) {

        Object value = execute(stmt.expr);
        throw new Return(value);
//        return null;
    }
}
