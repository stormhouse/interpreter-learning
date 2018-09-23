package io.github.stormhouse.lexer;

public enum TokenType {
    SEMICOLON, EQUAL,
    COMMENT,

    PRINT, VAR,

    LEFT_PAREN, RIGHT_PAREN,

    PLUS, MINUS, STAR, SLASH,

    IDENTIFIER,
    TRUE, FALSE,
    STRING,
    NUMBER,

    EOF,
}
