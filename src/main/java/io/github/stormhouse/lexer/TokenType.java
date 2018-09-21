package io.github.stormhouse.lexer;

public enum TokenType {
    COMMENT,

    PLUS, MINUS, STAR, SLASH,

    IDENTIFIER,
    STRING,
    NUMBER,

    EOF,
}