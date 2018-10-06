package io.github.stormhouse.ast;

import java.util.List;

import io.github.stormhouse.lexer.Token;

public abstract class Stmt {
    public interface Visitor<R> {
        R visitExpressionStmt (Expression stmt);
        R visitPrintStmt (Print stmt);
        R visitReturnStmt (Return stmt);
        R visitVarStmt (Var stmt);
        R visitClassStmt (Class stmt);
        R visitBlockStmt (Block stmt);
        R visitCommentStmt (Comment stmt);
        R visitIfStmt (If stmt);
        R visitFunctionStmt (Function stmt);
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
    public static class Return extends Stmt {
        public Return(Token name, Expr expr) {
            this.name = name;
            this.expr = expr;
        }
        public <R> R accept (Visitor<R> visitor) {
            return visitor.visitReturnStmt(this);
        }
        public final Token name;
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
    public static class Class extends Stmt {
        public Class(Token name, List<Stmt> methods) {
            this.name = name;
            this.methods = methods;
        }
        public <R> R accept (Visitor<R> visitor) {
            return visitor.visitClassStmt(this);
        }
        public final Token name;
        public final List<Stmt> methods;
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
    public static class Comment extends Stmt {
        public Comment(Token name) {
            this.name = name;
        }
        public <R> R accept (Visitor<R> visitor) {
            return visitor.visitCommentStmt(this);
        }
        public final Token name;
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
    public static class Function extends Stmt {
        public Function(Token name, List<Token> parameters, List<Stmt> body) {
            this.name = name;
            this.parameters = parameters;
            this.body = body;
        }
        public <R> R accept (Visitor<R> visitor) {
            return visitor.visitFunctionStmt(this);
        }
        public final Token name;
        public final List<Token> parameters;
        public final List<Stmt> body;
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
