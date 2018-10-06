package io.github.stormhouse.interpretor;

public class Instance {
    Class name;
    public Instance (Class name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "<instance of class " + name.name + ">";
    }
}
