(function() {
  'use strict';
  
  if (!window.QC) {
    window.QC = {};
  }
  
  window.QC.tokens = {
    total: 0,
    history: [],
    
    count: function(text) {
      if (!window.QC.tokenizer) {
return 0;
      }
      return window.QC.tokenizer.count(text);
    },
    
    update: function(text) {
      this.total = this.count(text);
      return this.total;
    },
    
    reset: function() {
      this.total = 0;
      this.history = [];
    }
  };
})();