package io.github.stormhouse.parser;

import io.github.stormhouse.lexer.Token;

import java.util.List;

import static io.github.stormhouse.lexer.Token.*;

public class Parser {
    private List<Token> tokens;
    Parser (List<Token> tokens) {
        this.tokens = tokens;
    }
}
