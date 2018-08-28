package cn.sh;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;


public class Main {
    public final static String sourcePath = "./resources/ab.js";
    static boolean hadError = false;

    public static void main(String[] args) throws IOException {
        if (args.length == 0) {
            runFromFile(sourcePath);
            if (hadError) System.exit(65);
        } else if (args.length == 1) {
            runFromFile(args[0]);
        } else {
            System.out.println("plz input pl like this: \"123 + 456\"");
            runPrompt();
        }
    }
    private static void runFromFile (String path) throws IOException {
        byte[] bytes = Files.readAllBytes(Paths.get(path));
        run(new String(bytes, Charset.defaultCharset()));
    }
    private static void runPrompt() throws IOException {
        InputStreamReader input = new InputStreamReader(System.in);
        BufferedReader reader = new BufferedReader(input);

        for (;;) {
            System.out.print("> ");
            run(reader.readLine());
            hadError = false;
        }
    }

    private static void run (String sourceCode) throws IOException {
        System.out.println(sourceCode);
        Scanner scanner = new Scanner(sourceCode);
        List<Token> tokens = scanner.scanTokens(sourceCode);

        for (Token t : tokens) {
            System.out.println(t);
        }
    }
    static void error(int line, String message) {
        report(line, "", message);
    }
    private static void report(int line, String where, String message) {
        System.err.println(
                "[line " + line + "] Error" + where + ": " + message);
        hadError = true;
    }

}
