package lip;

import org.antlr.v4.runtime.ANTLRFileStream;
import org.antlr.v4.runtime.CommonTokenStream;


public class Gen {
    public static void main (String[] args) throws Exception{
        GraphicsLexer lexer = new GraphicsLexer(new ANTLRFileStream("./a"));
        GraphicsParser parser = new GraphicsParser(new CommonTokenStream(lexer));
        Object o = parser.file();
        System.out.println(o);
    }
}
