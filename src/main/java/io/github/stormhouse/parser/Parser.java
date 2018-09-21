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
    private Expr addition () {
        Expr expr = multiplication();
        return expr;
    }
    private Expr multiplication () {
        Expr expr = unary();
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
    private Token previous () {
        return this.tokens.get(this.current - 1);
    }
    private boolean match (TokenType type) {
        Token t = this.tokens.get(this.current);
        if (type == t.type) {
            return true;
        }
        return false;
    }
}
