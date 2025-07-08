(function () {
    let tenantId = "unknown_tenant";
  
    try {
      const scripts = document.getElementsByTagName("script");
      for (let i = scripts.length - 1; i >= 0; i--) {
        const src = scripts[i].getAttribute("src");
        if (src && src.includes("widget.js")) {
          const url = new URL(src, window.location.href); // Ensures full URL is parsed
          tenantId = url.searchParams.get("tenantId") || "unknown_tenant";
          break;
        }
      }
    } catch (err) {
      console.warn("⚠️ Could not extract tenantId from script URL", err);
    }
  
    console.log("✅ Parsed tenantId:", tenantId);
  
    const toggleBtn = document.createElement("div");
    toggleBtn.id = "widget-toggle";
    toggleBtn.innerText = "Open Widget";
    Object.assign(toggleBtn.style, {
      position: "fixed",
      bottom: "20px",
      right: "20px",
      background: "#007bff",
      color: "#fff",
      padding: "10px 15px",
      borderRadius: "30px",
      cursor: "pointer",
      zIndex: 99999,
      boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
      fontFamily: "sans-serif",
    });
  
    const widgetBox = document.createElement("div");
    widgetBox.id = "widget-box";
    Object.assign(widgetBox.style, {
      position: "fixed",
      bottom: "70px",
      right: "20px",
      width: "300px",
      background: "#ffffff",
      border: "1px solid #ccc",
      borderRadius: "10px",
      padding: "15px",
      display: "none",
      zIndex: 99998,
      boxShadow: "0 0 10px rgba(0,0,0,0.15)",
      fontFamily: "sans-serif",
    });
  
    widgetBox.innerHTML = `
      <h4 style="margin-top: 0;">Your Info</h4>
      <input type="text" id="widgetNameInput" placeholder="Enter your name" style="width: 100%; padding: 8px; margin-bottom: 10px;" />
      <button id="widgetSubmitBtn" style="padding: 8px 12px; background: #007bff; color: #fff; border: none; border-radius: 5px; cursor: pointer;">Submit</button>
    `;
  
    document.body.appendChild(toggleBtn);
    document.body.appendChild(widgetBox);
  
    toggleBtn.addEventListener("click", () => {
      const isHidden = widgetBox.style.display === "none";
      widgetBox.style.display = isHidden ? "block" : "none";
  
      if (isHidden && !widgetBox.dataset.listenerAdded) {
        widgetBox.dataset.listenerAdded = "true";
        const submitBtn = widgetBox.querySelector("#widgetSubmitBtn");
        submitBtn.addEventListener("click", () => {
          const name = widgetBox.querySelector("#widgetNameInput").value.trim();
          if (!name) return alert("Please enter your name");
  
          fetch("http://localhost:3000/api/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, tenantId })
          })
            .then(res => res.json())
            .then(data => {
              alert(data.message || "Submitted!");
              widgetBox.querySelector("#widgetNameInput").value = "";
            })
            .catch(err => {
              alert("Failed to submit");
              console.error(err);
            });
        });
      }
    });
  })();
  