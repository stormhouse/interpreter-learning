package io.github.stormhouse.interpretor;

import io.github.stormhouse.ast.Expr;
import io.github.stormhouse.ast.Stmt;
import io.github.stormhouse.lexer.Token;

import java.util.List;

public class Executor implements Expr.Visitor, Stmt.Visitor {
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
        return null;
    }

    @Override
    public Object visitPrintStmt(Stmt.Print stmt) {
        Object value = execute(stmt.expr);
        System.out.println(value);
        return null;
    }
}
