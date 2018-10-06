package io.github.stormhouse.parser;

import io.github.stormhouse.ast.Expr;
import io.github.stormhouse.ast.Stmt;
import io.github.stormhouse.lexer.Token;
import io.github.stormhouse.lexer.TokenType;

import java.util.ArrayList;
import java.util.List;

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
        if (match(FUNCTION)) {
            return functionStatement();
        }
        if (match(CLASS)) {
            return classStatement();
        }
        return statement();
    }
    private Stmt classStatement () {

        Token name = consume(IDENTIFIER, "");
        consume(LEFT_BRACE, "");
        List<Stmt> methods = this.block();
        return new Stmt.Class(name, methods);
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
        if (match(COMMENT)) {
            return commentStatement();
        }
        if (match(IF)) {
            return ifStatement();
        }
        if (match(WHILE)) {
            return whileStatement();
        }
        if (match(PRINT)) {
            return printStatement();
        }
        if (match(RETURN)) {
            return returnStatement();
        }
        if (match(LEFT_BRACE)) {
            return new Stmt.Block(block());
        }
        return expressionStatement();
    }
    private Stmt functionStatement () {
        Token name = consume(IDENTIFIER, "");
        consume(LEFT_PAREN, "");
        List<Token> parameters = new ArrayList<>();
        while (!check(RIGHT_PAREN)) {
            Token p = consume(IDENTIFIER, "");
            parameters.add(p);
            while (match(COMMA)) {
                Token pp = consume(IDENTIFIER, "");
                parameters.add(pp);
            }
        }
        consume(RIGHT_PAREN, "");
        consume(LEFT_BRACE, "");
        return new Stmt.Function(name, parameters, this.block());
    }
    private Stmt whileStatement () {
        consume(LEFT_PAREN, "require ( after if");
        Expr condition = expression();
        consume(RIGHT_PAREN, "require ) after if");
        Stmt s = statement();
        return new Stmt.While(condition, s);
//        return null;
    }
    private Stmt commentStatement () {
        Token token = previous();
        return new Stmt.Comment(token);
    }
    private Stmt ifStatement () {
        consume(LEFT_PAREN, "require ( after if");
        Expr condition = expression();
        consume(RIGHT_PAREN, "require ) after if");
        Stmt thenStmt = statement();

        Stmt elseStmt = null;
        if (check(ELSE)) {
            consume(ELSE, "");
            elseStmt = statement();
        }

        Stmt ifStmt = new Stmt.If(condition, thenStmt, elseStmt);
        return ifStmt;
    }
    private List<Stmt> block () {
        List<Stmt> stmts = new ArrayList<>();
        while (!check(RIGHT_BRACE) && !isAtEnd()) {
            Stmt stmt = declaration();
            stmts.add(stmt);
        }
        consume(RIGHT_BRACE, "require } at the end of block");

        return stmts;
    }
    private Stmt printStatement () {
        Stmt stmt = new Stmt.Print(expression());
        consume(SEMICOLON, "expect ;");
        return stmt;
    }
    private Stmt returnStatement () {
        Token name = previous();
        Expr expr = this.expression();
        consume(SEMICOLON, "");
        return new Stmt.Return(name, expr);
    }
    private Stmt expressionStatement () {
        Stmt stmt = new Stmt.Expression(expression());
        consume(SEMICOLON, "expect ;");
        return stmt;
    }
    public Expr expression () {
        Expr expr = assignment();
        return expr;
    }
    public Expr assignment () {
//        Expr expr = equality();
        Expr expr = or();
        if (match(EQUAL)) {
            Expr value = assignment();
            if (expr instanceof Expr.Variable) {
                expr = new Expr.Assign(((Expr.Variable) expr).name, value);
            }
        }
        if (match(NEW)) {
            expr = call();
        }
        return expr;
    }
    private Expr or () {
        Expr expr = and();
        if (match(OR)) {
            Token operator = previous();
            Expr right = assignment();
            expr = new Expr.Logical(expr, operator, right);
        }
        return expr;
    }
    private Expr and () {
        Expr expr = equality();
        if (match(AND)) {
            Token operator = previous();
            Expr right = assignment();
            expr = new Expr.Logical(expr, operator, right);
        }
        return expr;
    }
    private Expr equality () {
        Expr expr = comparison();
        return expr;
    }
    private Expr comparison () {
        Expr expr = addition();
        if (match(LESS, LESS_EQUAL, GREATER, GREATER_EQUAL, EQUAL_EQUAL)) {
            Token operator = previous();
            Expr right = comparison();
            expr = new Expr.Binary(expr, operator, right);
        }
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
//        Expr expr = primary();
        Expr expr = call();
        return expr;
    }
    private Expr call () {
        Expr expr = primary();
        while (true) {
            if (match(TokenType.LEFT_PAREN)) {
                expr = finishCall(expr);
            } else if (match(TokenType.DOT)) {
                Token name = consume(IDENTIFIER, "");
                expr = new Expr.Get(expr, name);
            } else {
                break;
            }
        }
        return expr;
    }
    private Expr finishCall (Expr callee) {
        List<Expr> arguments = new ArrayList<>();
        while (!check(RIGHT_PAREN)) {
            Expr expr = this.expression();
            arguments.add(expr);
            while (match(COMMA)) {
                Expr ep = this.expression();
                arguments.add(ep);
            }
        }
        Token paren = consume(TokenType.RIGHT_PAREN, "expect ')");
        Expr expr = new Expr.Call(callee, paren, arguments);
        return expr;
    }
    private Expr primary () {
        if (match(TRUE)) return new Expr.Literal(true);
        if (match(FALSE)) return new Expr.Literal(false);
        if (match(NUMBER, STRING)) {
            return new Expr.Literal(previous().literal);
        }
        if (match(IDENTIFIER)) {
            return new Expr.Variable(previous());
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
    private Token consume (TokenType type, String errorMessage) {
        if (!match(type)) {
            throw new Error("expect: " + type.toString());
        }
        return previous();
    }
    private Token previous () {
        return this.tokens.get(this.current - 1);
    }
    private boolean check (TokenType... types) {
        Token token = this.tokens.get(this.current);
        boolean flag = false;
        for (TokenType t : types) {
            if (t == token.type) {
                flag = true;
                break;
            }
        }
        return flag;
    }
    private boolean match (TokenType... types) {
        boolean b = check(types);
        if (b) {
            advance();
        }
        return b;
    }
    private boolean isAtEnd () {
        // EOF
        return this.current >= this.tokens.size() - 1;
    }
}
