package io.github.stormhouse.interpretor;

public class Return extends RuntimeException {
    Object value;
    Return (Object value) {
        this.value = value;
    }
}
