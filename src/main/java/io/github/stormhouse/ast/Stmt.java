package io.github.stormhouse.ast;

import io.github.stormhouse.lexer.Token;

public abstract class Stmt {
    public interface Visitor<R> {
        R visitExpressionStmt (Expression stmt);
        R visitVarStmt (Var stmt);
        R visitPrintStmt (Print stmt);
    }
    public static class Expression extends Stmt {
        public Expression(Expr expr) {
            this.expr = expr;
        }
        public <R> R accept (Visitor<R> visitor) {
            return visitor.visitExpressionStmt(this);
        }
        public final Expr expr;
    }
    public static class Var extends Stmt {
        public Var(Token token, Expr expr) {
            this.token = token;
            this.expr = expr;
        }
        public <R> R accept (Visitor<R> visitor) {
            return visitor.visitVarStmt(this);
        }
        public final Token token;
        public final Expr expr;
    }
    public static class Print extends Stmt {
        public Print(Expr expr) {
            this.expr = expr;
        }
        public <R> R accept (Visitor<R> visitor) {
            return visitor.visitPrintStmt(this);
        }
        public final Expr expr;
    }

    public abstract <R> R accept (Visitor<R> visitor);
}
