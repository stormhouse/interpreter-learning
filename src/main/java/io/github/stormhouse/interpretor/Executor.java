package io.github.stormhouse.interpretor;

import io.github.stormhouse.ast.Expr;

public class Executor implements Expr.Visitor{
    public Object execute (Expr expr) {
        return expr.accept(this);
    }
    @Override
    public Object visitBinaryExpr(Expr.Binary expr) {
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
}
