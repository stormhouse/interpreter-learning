package parser;

public abstract class Token {
	public static final String EOF = "\n";
	
	private int lineNumber;
	
	protected Token (int line) {
		this.lineNumber = line;
	}
	public int getLineNumber () {
		return lineNumber;
	}
	
	// 变量名、函数名、类名
	public boolean isIndentifier () {
		return false;
	}
	// 变量名、函数名、类名
	public boolean isNumber () {
		return false;
	}
	public boolean isString () {
		return false;
	}
	
	public int getNumber () throws Exception {
		throw new Exception("not number token");
	}
	public String getText () {
		return "";
	}
}
