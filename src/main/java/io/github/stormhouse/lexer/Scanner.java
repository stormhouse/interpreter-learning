package io.github.stormhouse.lexer;


import com.sun.xml.internal.bind.v2.model.core.ID;

import static io.github.stormhouse.Util.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static io.github.stormhouse.lexer.TokenType.*;


public class Scanner {
    private final String rawCode;
    private List<Token> tokens = new ArrayList<Token>();
    private Map<String, TokenType> keywords = new HashMap<>();

    private int start = 0;
    private int current = 0;
    private int line = 1;

    public Scanner (String rawCode) {
        this.rawCode = rawCode;
        keywords.put("true" , TRUE);
        keywords.put("false" , FALSE);
        keywords.put("var"  , VAR);
        keywords.put("print", PRINT);
    }
    public List<Token> scanTokens () {
        while (!isAtEnd()) {
            char c = this.advance();
            switch (c) {
                case ';': addToken(SEMICOLON); break;
                case '=': addToken(EQUAL); break;
                case '(': addToken(LEFT_PAREN); break;
                case ')': addToken(RIGHT_PAREN); break;
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
                    break;
                case '\'':
                    string();
                case '\n': this.line++; break;
                case ' ':
                case '\t':
                case '\r':
                    break;
                default:
                    if (isDigit(c)) {
                        number(c); break;
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
        Token t = null;
        if (type == IDENTIFIER) {
            // identifier contains: keyword and variable
            if (this.keywords.containsKey(lexeme)) {
                t = new Token(this.keywords.get(lexeme), lexeme, null, this.line);
            } else {
                t = new Token(IDENTIFIER, lexeme, null, this.line);
            }
        } else {
            t = new Token(type, lexeme, lexeme, this.line);
        }
        this.tokens.add(t);
    }
    private void addToken(TokenType type, Object literal) {
        String lexeme = this.rawCode.substring(this.start, this.current);
        this.tokens.add(new Token(type, lexeme, literal, this.line));
    }
    private void number (char c) {
        while (isDigit(peek())) advance();

        if (peek() == '.' && isDigit(peekNext())) {
            advance();
            while (isDigit(peek())) advance();
        }

        addToken(NUMBER, Double.parseDouble(lexeme()));
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
    private String lexeme () {
        return this.rawCode.substring(this.start, this.current);
    }
    private boolean isAtEnd () {
        return this.current >= this.rawCode.length();
    }
}
