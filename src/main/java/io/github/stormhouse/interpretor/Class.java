package io.github.stormhouse.interpretor;


import java.util.List;

public class Class implements Callable {
    String name;
    public Class (String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "<class " + this.name + ">";
    }

    @Override
    public Object call(Executor executor, List<Object> arguments) {
        Instance instance = new Instance(this);
        return instance;
    }
}
