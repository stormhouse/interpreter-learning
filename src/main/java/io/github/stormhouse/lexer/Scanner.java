package io.github.stormhouse.lexer;


import com.sun.xml.internal.bind.v2.model.core.ID;

import static io.github.stormhouse.Util.*;

import java.util.ArrayList;
import java.util.List;

import static io.github.stormhouse.lexer.TokenType.*;


public class Scanner {
    private final String rawCode;
    private List<Token> tokens = new ArrayList<Token>();

    private int start = 0;
    private int current = 0;
    private int line = 1;

    public Scanner (String rawCode) {
        this.rawCode = rawCode;
    }
    public List<Token> scanTokens () {
        while (!isAtEnd()) {
            char c = this.advance();
            switch (c) {
                case '+': addToken(PLUS); break;
                case '-': addToken(MINUS); break;
                case '*': addToken(STAR); break;
                case '/':
                    if (match('/')) {
                        while (peek() != '\n') { advance();}
                        addToken(COMMENT);
                    } else {
                        addToken(SLASH);
                    }
                case '\'':
                    string();
                case '\n': this.line++; break;
                case ' ':
                case '\t':
                case '\r':
                    break;
                default:
                    if (isDigit(c)) {
                        number(c);
                    }
                    if (isAlphabet(c)) {
                        identifier();
                    }
            }
            this.start = this.current;
        }
        addToken(EOF);
        return this.tokens;
    }
    private void addToken(TokenType type) {
        String lexeme = this.rawCode.substring(this.start, this.current);
        if (type == IDENTIFIER) {
            switch (lexeme) {
                case "true":
                    this.tokens.add(new Token(TRUE, lexeme, null, this.line));
                    break;
                default:
                    break;
            }
        } else {
            this.tokens.add(new Token(type, lexeme, null, this.line));
        }
    }
    private void number (char c) {
        while (isDigit(peek())) advance();

        if (peek() == '.' && isDigit(peekNext())) {
            advance();
            while (isDigit(peek())) advance();
        }

        addToken(NUMBER);
    }
    private void string () {
        while (peek() != '\'') advance();

        advance();
        addToken(STRING);
    }
    private void identifier () {
        while (isAlphabet(peek())) advance();

        addToken(IDENTIFIER);
    }
    private char advance () {
        char c = this.rawCode.charAt(this.current);
        this.current++;
        return c;
    }
    private boolean match (char expectChar) {
        if (isAtEnd()) return false;
        char c = this.rawCode.charAt(this.current);
        if (c == expectChar) {
            this.current++;
            return true;
        } else {
            return false;
        }
    }
    private char peek () {
        if (isAtEnd()) return '\0';
        return this.rawCode.charAt(this.current);
    }
    private char peekNext () {
        if (isAtEnd() || this.current + 1 >= this.rawCode.length()) return '\0';

        char c = this.rawCode.charAt(this.current + 1);
        return c;
    }
    private boolean isAtEnd () {
        return this.current >= this.rawCode.length();
    }
}
