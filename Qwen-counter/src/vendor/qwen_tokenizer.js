(function() {
  'use strict';
  
  if (!window.QC) {
    window.QC = {};
  }
  
  window.QC.tokenizer = {
    cache: new Map(),
    
    count: function(text) {
      if (!text || text.length === 0) {
        return 0;
      }
      
      if (this.cache.has(text)) {
        return this.cache.get(text);
      }
      
      // Simple approximation: characters / 4 + words * 0.3
      const chars = text.length;
      const words = text.split(/\s+/).filter(w => w.length > 0).length;
      const estimated = Math.round((chars / 4) + (words * 0.3));
      
      // Cache with limit
      if (this.cache.size > 1000) {
        this.cache.clear();
      }
      this.cache.set(text, estimated);
      
      return estimated;
    }
  };
})();