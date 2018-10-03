// Generated from /Users/stormhouse/workspace/interpreter-learning/src/main/java/lip/Graphics.g4 by ANTLR 4.7
package lip;
import org.antlr.v4.runtime.tree.ParseTreeListener;

/**
 * This interface defines a complete listener for a parse tree produced by
 * {@link GraphicsParser}.
 */
public interface GraphicsListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by {@link GraphicsParser#file}.
	 * @param ctx the parse tree
	 */
	void enterFile(GraphicsParser.FileContext ctx);
	/**
	 * Exit a parse tree produced by {@link GraphicsParser#file}.
	 * @param ctx the parse tree
	 */
	void exitFile(GraphicsParser.FileContext ctx);
	/**
	 * Enter a parse tree produced by {@link GraphicsParser#command}.
	 * @param ctx the parse tree
	 */
	void enterCommand(GraphicsParser.CommandContext ctx);
	/**
	 * Exit a parse tree produced by {@link GraphicsParser#command}.
	 * @param ctx the parse tree
	 */
	void exitCommand(GraphicsParser.CommandContext ctx);
	/**
	 * Enter a parse tree produced by {@link GraphicsParser#point}.
	 * @param ctx the parse tree
	 */
	void enterPoint(GraphicsParser.PointContext ctx);
	/**
	 * Exit a parse tree produced by {@link GraphicsParser#point}.
	 * @param ctx the parse tree
	 */
	void exitPoint(GraphicsParser.PointContext ctx);
}