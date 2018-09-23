package io.github.stormhouse.lexer;

public enum TokenType {
    SEMICOLON, EQUAL,
    LEFT_BRACE, RIGHT_BRACE,
    LEFT_PAREN, RIGHT_PAREN,
    COMMENT,

    PRINT, VAR,


    PLUS, MINUS, STAR, SLASH,

    IDENTIFIER,
    TRUE, FALSE,
    STRING,
    NUMBER,

    EOF,
}
