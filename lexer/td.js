var symbol_table = {};
var original_symbol = {
  nud: function() {
      this.error('Undefined.');
  },
  led: function(left) {
      this.error('Missing operator.');
  }
};

var symbol = function(id, bp) {
  var s = symbol_table[id];
  bp = bp || 0;
  if (s) {
      if (bp >= s.lbp) {
          s.lbp = bp;
      }
  } else {
      s = Object.create(original_symbol);
      s.id = s.value = id;
      s.lbp = bp;
      symbol_table[id] = s;
  }
  console.log(s)
  return s;
};
symbol(':');
symbol(';');
symbol(',');
symbol(')');
symbol(']');
symbol('}');
symbol('else');

symbol('(end)');
symbol('(name)');