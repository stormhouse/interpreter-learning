package io.github.stormhouse;

import java.util.ArrayList;
import java.util.List;

public class Scanner {
    String rawCode;

    public Scanner (String rawCode) {
        this.rawCode = rawCode;
    }
    public List<Token> scanTokens () {
        String[] ss = this.rawCode.split("");
        List<Token> tokens = new ArrayList<Token>();
        for (String s: ss) {
            tokens.add(new Token());
        }
        return tokens;
    }
}
