package io.github.stormhouse.interpretor;

import io.github.stormhouse.ast.Expr;
import io.github.stormhouse.ast.Stmt;
import io.github.stormhouse.lexer.Token;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Stack;

public class Resolver implements Stmt.Visitor, Expr.Visitor{
    final Executor executor;
    final Stack<Map<String, Boolean>> scopes = new Stack();

    Resolver (Executor executor) {
        this.executor = executor;
    }
    void resolve (Stmt stmt) {
        stmt.accept(this);
    }
    void resolve (Expr expr) {
        expr.accept(this);
    }
    void resolve (List<Stmt> stmts){
        for (Stmt stmt : stmts) {
            resolve(stmt);
        }
    }
    @Override
    public Object visitBinaryExpr(Expr.Binary expr) {
        resolve(expr.left);
        resolve(expr.right);
        return null;
    }

    @Override
    public Object visitCallExpr(Expr.Call expr) {
        resolve(expr.callee);
        for (Expr argument : expr.arguments) {
            resolve(argument);
        }

        return null;
    }

    @Override
    public Object visitLogicalExpr(Expr.Logical expr) {
        return null;
    }

    @Override
    public Object visitGroupingExpr(Expr.Grouping expr) {
        return null;
    }

    @Override
    public Object visitLiteralExpr(Expr.Literal expr) {
        return null;
    }

    @Override
    public Object visitUnaryExpr(Expr.Unary expr) {
        return null;
    }

    @Override
    public Object visitGetExpr(Expr.Get expr) {
        resolve(expr.object);
        return null;
    }

    @Override
    public Object visitSetExpr(Expr.Set expr) {
        resolve(expr.value);
        resolve(expr.object);
        return null;
    }

    @Override
    public Object visitAssignExpr(Expr.Assign expr) {
        resolve(expr.right);
        resolveLocal(expr, expr.name);
        return null;
    }

    @Override
    public Object visitVariableExpr(Expr.Variable expr) {

        resolveLocal(expr, expr.name);
        return null;
    }

    @Override
    public Object visitExpressionStmt(Stmt.Expression stmt) {
        resolve(stmt.expr);
        return null;
    }

    @Override
    public Object visitPrintStmt(Stmt.Print stmt) {
        resolve(stmt.expr);
        return null;
    }

    @Override
    public Object visitReturnStmt(Stmt.Return stmt) {
        resolve(stmt.expr);
//        resolveLocal(stmt.expr, ()stmt.expr);
        return null;
    }

    @Override
    public Object visitVarStmt(Stmt.Var stmt) {
        declare(stmt.token);
        if (stmt.expr != null) {
            resolve(stmt.expr);
        }
        define(stmt.token);
        return null;
    }

    @Override
    public Object visitClassStmt(Stmt.Class stmt) {
        declare(stmt.name);
        define(stmt.name);
        return null;
    }

    public Object visitVarStmt(Stmt.Var stmt, boolean isInital) {
        declare(stmt.token);
        define(stmt.token);
        return null;
    }
    void define (Token name) {
        if (scopes.isEmpty()) return;
        scopes.peek().put(name.lexeme, true);
    }
    void declare (Token name) {
        if (scopes.isEmpty()) return;
        Map<String, Boolean> scope = scopes.peek();
        scope.put(name.lexeme, false);
    }

    @Override
    public Object visitBlockStmt(Stmt.Block stmt) {
        beginScope();
        this.resolveHosit(stmt.stmts);
        resolve(stmt.stmts);
        endScope();
        return null;
    }

    @Override
    public Object visitCommentStmt(Stmt.Comment stmt) {
        return null;
    }

    void resolveHosit (List<Stmt> stmts) {
        for (Stmt s : stmts) {
            if (s instanceof Stmt.Var) {
                visitVarStmt((Stmt.Var)s, false);
            }
        }
    }
    void beginScope () {
        scopes.push(new HashMap<String, Boolean>());
    }
    void endScope () {
        scopes.pop();
    }

    @Override
    public Object visitIfStmt(Stmt.If stmt) {
        return null;
    }

    @Override
    public Object visitFunctionStmt(Stmt.Function stmt) {
        declare(stmt.name);
        define(stmt.name);
        resolveFunction(stmt);
        return null;
    }
    void resolveFunction(Stmt.Function stmt) {
        beginScope();
        for (Token param : stmt.parameters) {
            declare(param);
            define(param);
        }
        resolve(stmt.body);
        endScope();
    }

    @Override
    public Object visitWhileStmt(Stmt.While stmt) {
        return null;
    }
    private void resolveLocal(Expr expr, Token name) {
        int ii = scopes.size();
        for (int i=ii-1; i>=0; i--) {
            Map scope = scopes.get(i);
            if (scope.containsKey(name.lexeme)) {
                this.executor.resolver(expr, ii - 1 -i);
            }
        }
    }
}
