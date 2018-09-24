package io.github.stormhouse.ast;

import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.Arrays;
import java.util.List;

public class GenerateAST {
    public static void main (String[] args) throws FileNotFoundException, UnsupportedEncodingException {
        String outputDir = "./src/main/java/io/github/stormhouse/ast/";
        defineAST(outputDir, "Expr", Arrays.asList(
                "Binary   : Expr left, Token operator, Expr right",
                "Logical  : Expr left, Token operator, Expr right",
                "Grouping : Expr expression",
                "Literal  : Object value",
                "Unary    : Token operator, Expr right",
                "Assign   : Token name, Expr right",
                "Variable : Token name"
        ));
        defineAST(outputDir, "Stmt", Arrays.asList(
                "Expression : Expr expr",
                "Print      : Expr expr",
                "Var        : Token token, Expr expr",
                "Block      : List<Stmt> stmts",
                "If         : Expr condition, Stmt thenBranch, Stmt elseBranch"
        ));
    }
    static void defineAST (String outputDir, String baseName, List<String> types)
            throws FileNotFoundException, UnsupportedEncodingException {
        String path = outputDir + baseName + ".java";
        PrintWriter writer = new PrintWriter(path, "UTF-8");
        writer.println("package io.github.stormhouse.ast;");
        writer.println("");
        writer.println("import java.util.List;");
        writer.println("");
        writer.println("import io.github.stormhouse.lexer.Token;");
        writer.println("");
        writer.println("public abstract class " + baseName + " {");
        defineVisitor(writer, baseName, types);
        for (String type : types) {
            String[] ty = type.split(":");
            String className = ty[0].trim();
            String args = ty[1].trim();
            defineType(writer, baseName, className, args);
        }
        writer.println("");
        writer.println("    public abstract <R> R accept (Visitor<R> visitor);");

        writer.println("}");
        writer.close();
    }
    static void defineVisitor (PrintWriter writer, String baseName, List<String> args) {
        writer.println("    public interface Visitor<R> {");
        for (String arg : args) {
            String type = arg.split(":")[0].trim();
            writer.println("        R visit" + type + baseName + " ("
                + type + " " + baseName.toLowerCase() + ");");
        }
        writer.println("    }");
    }
    static void defineType (PrintWriter writer, String baseName, String className, String args) {
        writer.println("    public static class " + className + " extends " + baseName + " {");
        writer.println("        public " + className + "(" + args + ") {");
        String[] fields = args.split(",");
        for (String f : fields) {
            String ff = f.trim().split(" ")[1];
            writer.println("            this." + ff + " = " + ff + ";");
        }
        writer.println("        }");

        writer.println("        public <R> R accept (Visitor<R> visitor) {");
        writer.println("            return visitor.visit" + className + baseName + "(this);");
        writer.println("        }");

        for (String f : fields) {
            writer.println("        public final " + f.trim() + ";");
        }
        writer.println("    }");
    }
}
