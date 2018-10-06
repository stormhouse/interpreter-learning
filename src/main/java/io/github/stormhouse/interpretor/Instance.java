package io.github.stormhouse.interpretor;

import java.util.HashMap;
import java.util.Map;

public class Instance {
    Map<String, Object> properties = new HashMap<>();
    Class name;
    public Instance (Class name) {
        this.name = name;
    }
    public Object get (String key) {
        return properties.get(key);
    }
    @Override
    public String toString() {
        return "<instance of class " + name.name + ">";
    }
}
