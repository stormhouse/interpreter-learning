package io.github.stormhouse;

public class Util {
    public static boolean isDigit (char digit) {
        return digit <= '9' && digit >= '0';
    }
    public static boolean isAlphabet (char a) {
        return (a <= 'z' && a >= 'a') || (a <= 'Z' && a >= 'A');
    }

}
