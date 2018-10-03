package io.github.stormhouse.interpretor;

import java.util.Map;
import java.util.HashMap;

public class Context {
    final boolean isClosure;
    final private Context parent;
    final private Map<String, Object> values = new HashMap<>();
    public Context (Context parent, boolean isClosure) {
        this.parent = parent;
        this.isClosure = isClosure;
    }
    public void define (String name, Object value) {
        this.values.put(name, value);
    }
    public Object get (String name) {
        return this.values.get(name);
    }
    public Object getAt (int distance, String name) {
        return ancestor(distance).values.get(name);
    }
    public Context ancestor (int distance) {
        Context ctx = this;
        for (int i=0; i<distance; i++) {
            ctx = ctx.parent;
        }
        return ctx;
    }

    public Context getParent() {
        return parent;
    }
}
