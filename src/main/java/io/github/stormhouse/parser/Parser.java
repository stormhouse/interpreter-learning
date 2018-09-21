package io.github.stormhouse.parser;

import io.github.stormhouse.ast.Expr;
import io.github.stormhouse.lexer.Token;
import io.github.stormhouse.lexer.TokenType;

import java.util.List;

import static io.github.stormhouse.lexer.Token.*;
import static io.github.stormhouse.lexer.TokenType.*;

public class Parser {
    private int current = 0;
    private List<Token> tokens;
    public Parser (List<Token> tokens) {
        this.tokens = tokens;
    }
    public Expr expression () {
        return equality();
    }
    private Expr equality () {
        Expr expr = comparison();
        return expr;
    }
    private Expr comparison () {
        Expr expr = addition();
        return expr;
    }
    // + -
    private Expr addition () {
        Expr expr = multiplication();
        while (match(PLUS, MINUS)) {
            Token op = previous();
            Expr b = new Expr.Binary(
                    expr,
                    op,
                    multiplication()
                    );
            expr = b;
        }
        return expr;
    }
    // * /
    private Expr multiplication () {
        Expr expr = unary();
        while (match(STAR, SLASH)) {
            Token operator = previous();
            Expr right = unary();
            Expr b = new Expr.Binary(
                    expr,
                    operator,
                    right
            );
            expr = b;

        }
        return expr;
    }
    private Expr unary () {
        Expr expr = primary();
        return expr;
    }
    private Expr primary () {
        if (match(TRUE)) return new Expr.Literal("true");
        if (match(NUMBER)) {
            return new Expr.Literal(previous());
        }
        return null;
    }
    private void advance () {
        this.current++;
    }
    private Token previous () {
        return this.tokens.get(this.current - 1);
    }
    private boolean match (TokenType... types) {
        Token token = this.tokens.get(this.current);
        boolean flag = false;
        for (TokenType t : types) {
            if (t == token.type) {
                advance();
                flag = true;
                break;
            }
        }
        return flag;
    }
}
