(function() {
  'use strict';
  
  let updateTimeout = null;
  let allMessageTexts = new Set();
  
  function getAllMessages() {
    const messages = [];
    allMessageTexts.clear();
    
    // Find ALL message elements - both user and assistant
    const allElements = document.querySelectorAll('*');
    
    allElements.forEach(el => {
      // Skip hidden elements, buttons, inputs, metadata
      if (el.offsetParent === null) return;
      if (['BUTTON', 'INPUT', 'TEXTAREA', 'ICON', 'SVG'].includes(el.tagName)) return;
      if (el.closest('[class*="button"], [class*="icon"], [class*="meta"]')) return;
      
      const text = el.innerText?.trim();
      if (!text || text.length < 10) return;
      
      // Filter out UI text
      if (text.includes('Thinking completed') || 
          text.includes('How can I help') ||
          text.includes('Auto') ||
          text.includes('Subscribe') ||
          text.includes('Notification')) {
        return;
      }
      
      // Avoid duplicates by checking text content
      if (!allMessageTexts.has(text)) {
        allMessageTexts.add(text);
        messages.push(text);
      }
    });
    
    return messages;
  }
  
  function countAllMessages() {
    const messages = getAllMessages();
    let total = 0;
    
    messages.forEach(msg => {
      total += window.QC.tokenizer.count(msg);
    });
    
    // Also count current input
    const input = document.querySelector('textarea[placeholder*="message"], textarea[class*="input"]');
    if (input && input.value) {
      total += window.QC.tokenizer.count(input.value);
    }
    
    return total;
  }
  
  function updateCounter() {
    const total = countAllMessages();
    
    if (window.QC.ui) {
      window.QC.ui.update(total);
    }
}
  
  function debouncedUpdate() {
    if (updateTimeout) {
      clearTimeout(updateTimeout);
    }
    updateTimeout = setTimeout(updateCounter, 1000);
  }
  
  function init() {
setTimeout(() => {
      if (!window.QC.ui) {
return;
      }
      
      window.QC.ui.init();
      
      // Initial count
      updateCounter();
      
      // Watch for input changes
      const input = document.querySelector('textarea[placeholder*="message"], textarea[class*="input"]');
      if (input) {
        input.addEventListener('input', debouncedUpdate);
      }
      
      // Watch for new messages with minimal DOM observation
      const observer = new MutationObserver(() => {
        debouncedUpdate();
      });
      
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
}, 1000);
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();