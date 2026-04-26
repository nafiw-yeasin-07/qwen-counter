(function() {
  const origFetch = window.fetch;
  window.fetch = async (...args) => {
    const url = typeof args[0] === "string" ? args[0] : args[0]?.url || "";
    const res = await origFetch(...args);
    if (url.includes("/chat") || url.includes("/completions") || url.includes("/v1/messages")) {
      const clone = res.clone();
      clone.json().then(data => {
        window.postMessage({ qc: true, type: "qc:api", payload: data }, "*");
      }).catch(() => {});
    }
    return res;
  };
  window.addEventListener("message", (e) => {
    if (e.data?.qc && e.data.type === "qc:ping") {
      window.postMessage({ qc: true, type: "qc:res", rid: e.data.rid, ok: true, payload: { status: "ready" } }, "*");
    }
  });
})();