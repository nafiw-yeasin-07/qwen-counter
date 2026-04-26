// Bridge Client - Communicates with injected script

(function() {
  'use strict';
  
  const bridge = {
    listeners: new Map(),
    
    init() {
      window.addEventListener('message', (event) => {
        if (event.source !== window) return;
        if (!event.data || !event.data.qwenCounter) return;
        
        const { type, payload } = event.data;
        const callback = this.listeners.get(type);
        if (callback) callback(payload);
      });
      
      this.injectBridge();
    },
    
    injectBridge() {
      const script = document.createElement('script');
      script.src = chrome.runtime.getURL('src/injected/bridge.js');
      script.onload = () => script.remove();
      (document.head || document.documentElement).appendChild(script);
    },
    
    on(type, callback) {
      this.listeners.set(type, callback);
    },
    
    request(type, payload = {}) {
      return new Promise((resolve) => {
        const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        this.once(`${type}_response_${requestId}`, resolve);
        
        window.postMessage({
          qwenCounter: true,
          type,
          requestId,
          payload
        }, '*');
      });
    },
    
    once(type, callback) {
      const wrapper = (payload) => {
        this.listeners.delete(type);
        callback(payload);
      };
      this.listeners.set(type, wrapper);
    },
    
    emit(type, payload = {}) {
      window.postMessage({
        qwenCounter: true,
        type,
        payload
      }, '*');
    }
  };
  
  window.QwenCounterBridge = bridge;
})();