package io.github.stormhouse.interpretor;

import io.github.stormhouse.ast.Expr;
import io.github.stormhouse.ast.Stmt;
import io.github.stormhouse.lexer.Token;
import io.github.stormhouse.parser.Context;

import java.util.List;

public class Executor implements Expr.Visitor, Stmt.Visitor {
    private Context context = new Context();

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
    public Object visitVariableExpr(Expr.Variable expr) {
        Token name = expr.name;
        return this.context.get(name.lexeme);
    }

    @Override
    public Object visitBlockStmt(Stmt.Block stmt) {
        List<Stmt> stmts = stmt.stmts;
        Context previous = this.context;
        // enter new block context --------------
        this.context = new Context();
        for (Stmt s : stmts) {
            execute(s);
        }
        // exit block context -------------------
        this.context = previous;
        return null;
    }

    @Override
    public Object visitExpressionStmt(Stmt.Expression stmt) {
        Expr expr = stmt.expr;
        System.out.println(expr);
        return expr;
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
