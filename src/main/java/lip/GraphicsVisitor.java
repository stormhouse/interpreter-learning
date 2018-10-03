// Generated from /Users/stormhouse/workspace/interpreter-learning/src/main/java/lip/Graphics.g4 by ANTLR 4.7
package lip;
import org.antlr.v4.runtime.tree.ParseTreeVisitor;

/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by {@link GraphicsParser}.
 *
 * @param <T> The return type of the visit operation. Use {@link Void} for
 * operations with no return type.
 */
public interface GraphicsVisitor<T> extends ParseTreeVisitor<T> {
	/**
	 * Visit a parse tree produced by {@link GraphicsParser#file}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitFile(GraphicsParser.FileContext ctx);
	/**
	 * Visit a parse tree produced by {@link GraphicsParser#command}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitCommand(GraphicsParser.CommandContext ctx);
	/**
	 * Visit a parse tree produced by {@link GraphicsParser#point}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitPoint(GraphicsParser.PointContext ctx);
}