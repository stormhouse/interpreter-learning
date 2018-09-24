package io.github.stormhouse.ast;

import java.util.List;

import io.github.stormhouse.lexer.Token;

public abstract class Stmt {
    public interface Visitor<R> {
        R visitExpressionStmt (Expression stmt);
        R visitPrintStmt (Print stmt);
        R visitVarStmt (Var stmt);
        R visitBlockStmt (Block stmt);
        R visitIfStmt (If stmt);
        R visitWhileStmt (While stmt);
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
    public static class Print extends Stmt {
        public Print(Expr expr) {
            this.expr = expr;
        }
        public <R> R accept (Visitor<R> visitor) {
            return visitor.visitPrintStmt(this);
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
    public static class Block extends Stmt {
        public Block(List<Stmt> stmts) {
            this.stmts = stmts;
        }
        public <R> R accept (Visitor<R> visitor) {
            return visitor.visitBlockStmt(this);
        }
        public final List<Stmt> stmts;
    }
    public static class If extends Stmt {
        public If(Expr condition, Stmt thenBranch, Stmt elseBranch) {
            this.condition = condition;
            this.thenBranch = thenBranch;
            this.elseBranch = elseBranch;
        }
        public <R> R accept (Visitor<R> visitor) {
            return visitor.visitIfStmt(this);
        }
        public final Expr condition;
        public final Stmt thenBranch;
        public final Stmt elseBranch;
    }
    public static class While extends Stmt {
        public While(Expr condition, Stmt stmt) {
            this.condition = condition;
            this.stmt = stmt;
        }
        public <R> R accept (Visitor<R> visitor) {
            return visitor.visitWhileStmt(this);
        }
        public final Expr condition;
        public final Stmt stmt;
    }

    public abstract <R> R accept (Visitor<R> visitor);
}
