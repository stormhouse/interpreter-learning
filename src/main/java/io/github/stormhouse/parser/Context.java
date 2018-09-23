package io.github.stormhouse.parser;

import java.util.Map;
import java.util.HashMap;

public class Context {
    final private Context parent;
    final private Map<String, Object> values = new HashMap<>();
    public Context (Context parent) {
        this.parent = parent;
    }
    public void define (String name, Object value) {
        this.values.put(name, value);
    }
    public Object get (String name) {
        return this.values.get(name);
    }

    public Context getParent() {
        return parent;
    }
}
