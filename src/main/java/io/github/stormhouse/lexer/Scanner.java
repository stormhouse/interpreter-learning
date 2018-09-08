package io.github.stormhouse.lexer;


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
            this.current++;
            this.tokens.add(new Token(NUMBER, "d", new Object(), 2));
        }
        this.tokens.add(new Token(EOF, "d", new Object(), 2));
        return this.tokens;
    }
    private boolean isAtEnd () {
        return this.current >= this.rawCode.length();
    }
}
