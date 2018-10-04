grammar Graphics;

file    : command+;
command : 'line' 'from' point 'to' point;
point   : INT ',' INT;
INT     : '0'..'9'+;

WS      :(' ' | '\t' | '\r' | '\n'){skip();};