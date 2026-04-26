(function() {
  'use strict';
  
  if (!window.QC) {
    window.QC = {};
  }
  
  window.QC.CONST = {
    CONTEXT_LIMIT: 1000000,
    WARN_PCT: 0.75,
    CRIT_PCT: 0.90,
    UPDATE_MS: 500,
    SELECTORS: {
      INPUT: 'textarea[placeholder*="message"], textarea[class*="input"], .ql-editor[contenteditable="true"]',
      CHAT_CONTAINER: 'main, article, [class*="chat"], [class*="message"]'
    }
  };
})();