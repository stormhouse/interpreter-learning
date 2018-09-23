package io.github.stormhouse.parser;

import io.github.stormhouse.ast.Expr;
import io.github.stormhouse.ast.Stmt;
import io.github.stormhouse.lexer.Token;
import io.github.stormhouse.lexer.TokenType;

import java.util.ArrayList;
import java.util.List;

import static io.github.stormhouse.lexer.Token.*;
import static io.github.stormhouse.lexer.TokenType.*;

public class Parser {
    private int current = 0;
    private List<Token> tokens;
    public Parser (List<Token> tokens) {
        this.tokens = tokens;
    }
    public List<Stmt> parse () {
        this.current = 0;
        List<Stmt> stmts = new ArrayList<Stmt>();
        while (!isAtEnd()) {
//            stmts.add(statement());
            stmts.add(declaration());
        }
        return stmts;
    }
    private Stmt declaration () {
        if (match(VAR)) {
            return varDeclaration();
        }
        return statement();
    }
    private Stmt varDeclaration () {
        consume(IDENTIFIER, "declaration require identifier");
        Token name = previous();
        Stmt var;
        if (match(EQUAL)) {
            var = new Stmt.Var(name, expression());
        } else {
            var = new Stmt.Var(name, null);
        }
        consume(SEMICOLON, "declaration require end with ;");
        return var;
    }
    private Stmt statement () {
        if (match(PRINT)) {
            return printStatement();
        }
        return expressionStatement();
    }
    private Stmt printStatement () {
        Stmt stmt = new Stmt.Print(expression());
        consume(SEMICOLON, "expect ;");
        return stmt;
    }
    private Stmt expressionStatement () {
        Stmt stmt = new Stmt.Expression(expression());
        return stmt;
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
        if (match(NUMBER, STRING)) {
            return new Expr.Literal(previous().literal);
        }
        if (match(LEFT_PAREN)) {
            Expr expr = expression();
            consume(RIGHT_PAREN, "");
            return expr;
//            return new Expr.Grouping(expr);
        }
        return null;
    }
    private void advance () {
        this.current++;
    }
    private void consume (TokenType type, String errorMessage) {
        if (!match(type)) {
            throw new Error("expect: " + type.toString());
        }
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
    private boolean isAtEnd () {
        // EOF
        return this.current >= this.tokens.size() - 1;
    }
}
