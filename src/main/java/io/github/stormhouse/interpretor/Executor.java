package io.github.stormhouse.interpretor;

import io.github.stormhouse.ast.Expr;
import io.github.stormhouse.ast.Stmt;
import io.github.stormhouse.lexer.Token;
import io.github.stormhouse.parser.Context;

import java.util.List;

import static io.github.stormhouse.lexer.TokenType.*;

public class Executor implements Expr.Visitor, Stmt.Visitor {
    private Context context = new Context(null);

    public void interpret (List<Stmt> stmts) {
        for (Stmt stmt : stmts) {
            execute(stmt);
        }
    }
    public void execute (Stmt stmt) {
        stmt.accept(this);
    }
    public Object execute (Expr expr) {
        return expr.accept(this);
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
            default:
                ;
        }
        return expr.accept(this);
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
        Token name = expr.name;
        Context ctx = this.context;
        Object value = null;
        while (ctx != null) {
            value = ctx.get(name.lexeme);
            if (value == null) {
                ctx = ctx.getParent();
            } else {
                break;
            }
        }
        return value;
    }

    @Override
    public Object visitBlockStmt(Stmt.Block stmt) {
        List<Stmt> stmts = stmt.stmts;
        Context previous = this.context;
        // enter new block context --------------
        this.context = new Context(previous);
        for (Stmt s : stmts) {
            execute(s);
        }
        // exit block context -------------------
        this.context = previous;
        return null;
    }

    @Override
    public Object visitIfStmt(Stmt.If stmt) {
        Expr condition = stmt.condition;
        Stmt ifBranch = stmt.thenBranch;
        Stmt elseBranch = stmt.elseBranch;
        if ((boolean)execute(condition)) {
            execute(ifBranch);
        } else {
            execute(elseBranch);
        }
        return null;
    }

    @Override
    public Object visitExpressionStmt(Stmt.Expression stmt) {
        Expr expr = stmt.expr;
        System.out.println(expr);
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
}
