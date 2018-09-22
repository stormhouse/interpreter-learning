package io.github.stormhouse.lexer;

public enum TokenType {
    SEMICOLON,
    COMMENT,

    PRINT,

    LEFT_PAREN, RIGHT_PAREN,

    PLUS, MINUS, STAR, SLASH,

    IDENTIFIER,
    TRUE,
    STRING,
    NUMBER,

    EOF,
}
