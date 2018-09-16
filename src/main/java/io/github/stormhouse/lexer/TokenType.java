package io.github.stormhouse.lexer;

enum TokenType {
    COMMENT,

    PLUS, MINUS, STAR, SLASH,

    IDENTIFIER,
    STRING,
    NUMBER,

    EOF,
}
