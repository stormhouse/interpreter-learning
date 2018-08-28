package cn.sh;

import java.util.ArrayList;
import java.util.List;

public class Scanner {
    private final List<Token> tokens = new ArrayList<>();
    private final String source;

    private int start = 0;
    private int current = 0;
    private int line = 1;

    public Scanner (String source) {
        this.source = source;
    }
    public List<Token> scanTokens (String source) {
        while (!isEnd()) {
            start = current;
            scanToken();
        }

        return this.tokens;
    }
    private void scanToken () {
        char c = advance();
        switch (c) {
            case '+':
                this.addToken(TokenType.LEFT_PAREN);
                break;
            default:
                if (isDigit(c)) {
                    number();
                } else {
                    Main.error(line, "Unexpected character: " + c);
                }
                break;
        }
    }
    private void addToken (TokenType type) {
        addToken(type, null);
    }
    private void addToken (TokenType type, Object literal) {
        String text = this.source.substring(start, current);
        this.tokens.add(new Token(type, text, literal, this.line));
    }
    private char advance () {
        this.current ++;
        char c = this.source.charAt(this.current - 1);
        return c;
    }
    private void number () {
        while (isDigit(peek())) {
            advance();
        }
        if (peek() == '.' && isDigit(peekNext())) {
            advance();
            while (isDigit(peek())) {
                advance();
            }
        }

        addToken(TokenType.NUMBER, "");
    }
    private char peek () {
        if (isEnd()) return '\0';
        return this.source.charAt(this.current);
    }
    private char peekNext () {
        if (this.current + 1 > this.source.length()) return '\0';
        return this.source.charAt(this.current + 1);
    }
    private boolean isEnd () {
        return this.current >= this.source.length();
    }
    private boolean isDigit (char c) {
        return c >= '0' && c <= '9';
    }
}
