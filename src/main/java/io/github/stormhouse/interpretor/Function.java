package io.github.stormhouse.interpretor;

import io.github.stormhouse.ast.Stmt;
import io.github.stormhouse.lexer.Token;
import io.github.stormhouse.parser.Context;

import java.util.List;

public class Function implements Callable{
    final Stmt.Function declaration;
    final Context closure;
    public Function (Stmt.Function declaration, Context closure) {
        this.declaration = declaration;
        this.closure = closure;
    }
    @Override
    public Object call(Executor executor, List<Object> arguments) {
//        Context context = new Context(executor.globalContext);
        Context context = new Context(this.closure);
        List<Token> pp = declaration.parameters;
        for (int i=0; i<pp.size(); i++) {
            context.define(pp.get(i).lexeme, arguments.get(i));
        }
        Object value = null;
        try {
            executor.executeBlock(declaration.body, context);
        } catch (Return ret) {
            value = ret.value;
        }
        return value;
    }

    @Override
    public String toString() {
        return "<function " + this.declaration.name.lexeme + ">";
    }
}
