package io.github.stormhouse.interpretor;

import java.util.List;

interface Callable {
    Object call (Executor executor, List<Object> arguments);
}
