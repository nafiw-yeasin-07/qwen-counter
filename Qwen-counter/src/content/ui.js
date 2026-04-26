(function() {
  'use strict';
  
  if (!window.QC) {
    window.QC = {};
  }
  
  let el = null;
  
  window.QC.ui = {
    init: function() {
      if (el || document.querySelector('.qc-root')) {
return;
      }
      
      el = document.createElement('div');
      el.className = 'qc-root';
      el.innerHTML = `
        <div class="qc-header">
          <span class="qc-count">0</span>
          <span class="qc-limit">/ 1M</span>
        </div>
        <div class="qc-bar-track">
          <div class="qc-bar-fill"></div>
        </div>
      `;
      
      document.body.appendChild(el);
},
    
    update: function(count) {
      if (!el) {
        this.init();
      }
      
      if (!el) return;
      
      const limit = window.QC.CONST.CONTEXT_LIMIT;
      const pct = Math.min(1, count / limit);
      
      const fill = el.querySelector('.qc-bar-fill');
      const countEl = el.querySelector('.qc-count');
      
      if (countEl) {
        countEl.textContent = count.toLocaleString();
      }
      
      if (fill) {
        fill.style.width = (pct * 100) + '%';
        fill.className = 'qc-bar-fill';
        
        if (pct >= window.QC.CONST.CRIT_PCT) {
          fill.classList.add('crit');
        } else if (pct >= window.QC.CONST.WARN_PCT) {
          fill.classList.add('warn');
        }
      }
    }
  };
})();