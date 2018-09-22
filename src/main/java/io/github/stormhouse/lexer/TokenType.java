package io.github.stormhouse.lexer;

public enum TokenType {
    COMMENT,

    LEFT_PAREN, RIGHT_PAREN,

    PLUS, MINUS, STAR, SLASH,

    IDENTIFIER,
    TRUE,
    STRING,
    NUMBER,

    EOF,
}
