package io.github.stormhouse.ast;

import io.github.stormhouse.lexer.Token;
import static io.github.stormhouse.lexer.TokenType.*;

public class ASTPrinter implements Expr.Visitor<String>{
    public static void main (String[] args) {
        Expr expression = new Expr.Binary(
                new Expr.Unary(
                        new Token(MINUS, "-", null, 1),
                        new Expr.Literal(1)
                ),
                new Token(PLUS, "-", null, 1),
                new Expr.Binary(
                        new Expr.Literal(2),
                        new Token(STAR, "*", null, 1),
                        new Expr.Literal(3)
                )
        );
        System.out.println(new ASTPrinter().print(expression));
    }
    String print (Expr expr) {
        return expr.accept(this);
    }
    String parenthesize (String name, Expr... exprs) {
        StringBuilder builder = new StringBuilder();
        builder.append("(").append(name);
        for (Expr expr: exprs) {
            builder.append(" ");
            builder.append(expr.accept(this));
        }
        builder.append(")");
        return builder.toString();
    }

    @Override
    public String visitBinaryExpr(Expr.Binary expr) {
        return parenthesize(expr.operator.lexeme, expr.left, expr.right);
    }

    @Override
    public String visitGroupingExpr(Expr.Grouping expr) {
        return parenthesize("group", expr.expression);
    }

    @Override
    public String visitLiteralExpr(Expr.Literal expr) {
        if (expr.value == null) return "nil";
        return expr.value.toString();
    }

    @Override
    public String visitUnaryExpr(Expr.Unary expr) {
        return parenthesize(expr.operator.lexeme, expr.right);
    }

    @Override
    public String visitVariableExpr(Expr.Variable expr) {
        return null;
    }
}
