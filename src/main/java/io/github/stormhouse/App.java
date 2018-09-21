package io.github.stormhouse;

import io.github.stormhouse.ast.Expr;
import io.github.stormhouse.lexer.Scanner;
import io.github.stormhouse.lexer.Token;
import io.github.stormhouse.parser.Parser;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

public class App {
    public static void main(String[] args) throws IOException {
        if (args.length == 1) {
            runFile(args[0]);
        }
    }
    public static void runFile(String filePath) throws IOException {
        byte[] bytes =  Files.readAllBytes(Paths.get(filePath));
        run(new String(bytes));
    }
    public static void run(String rawCode) {
        Scanner scanner = new Scanner(rawCode);
        List<Token> tokens = scanner.scanTokens();
        for (Token t : tokens) {
            System.out.println(t);
        }
        Parser parser = new Parser(tokens);
        Expr expr = parser.expression();

    }
}
