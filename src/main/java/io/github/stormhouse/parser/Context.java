package io.github.stormhouse.parser;

import java.util.Map;
import java.util.HashMap;

public class Context {
    private Map<String, Object> values = new HashMap<>();
    public void define (String name, Object value) {
        this.values.put(name, value);
    }
    public Object get (String name) {
        return this.values.get(name);
    }
}
