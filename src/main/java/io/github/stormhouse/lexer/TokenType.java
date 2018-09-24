package io.github.stormhouse.lexer;

public enum TokenType {
    SEMICOLON, EQUAL,
    LEFT_BRACE, RIGHT_BRACE,
    LEFT_PAREN, RIGHT_PAREN,
    COMMENT,
    PRINT, VAR, ASSIGN, IF, ELSE, WHILE,
    LESS, LESS_EQUAL, GREATER, GREATER_EQUAL,
    AND, OR,
    PLUS, MINUS, STAR, SLASH,
    IDENTIFIER,
    TRUE, FALSE,
    STRING,
    NUMBER,

    EOF,
}
