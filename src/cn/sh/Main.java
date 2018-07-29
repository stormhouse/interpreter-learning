package cn.sh;

import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;


public class Main {
    public final static String sourcePath = "./resources/ab.js";

    public static void main(String[] args) throws IOException {
        if (args.length == 0) {
            runFromFile(sourcePath);
        } else if (args.length == 1) {
            runFromFile(args[0]);
        } else {
            System.out.println("plz input pl like this: \"123 + 456\"");
        }
    }
    private static void runFromFile (String path) throws IOException {
        byte[] bytes = Files.readAllBytes(Paths.get(path));
        run(new String(bytes, Charset.defaultCharset()));
    }
    private static void run (String sourceCode) throws IOException {
        System.out.println(sourceCode);
        Scanner scanner = new Scanner();
        List<Token> tokens = scanner.scanTokens(sourceCode);

        for (Token t : tokens) {
            System.out.println(t);
        }

    }

}
