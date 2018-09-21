package io.github.stormhouse;

import io.github.stormhouse.lexer.Token;

abstract class Expr1 {
    static class Binary extends Expr1 {
        Binary (Expr1 left, Token operator, Expr1 right) {
            this.left = left;
            this.right = right;
            this.operator = operator;
        }
        final Expr1 left;
        final Expr1 right;
        final Token operator;
    }
}
