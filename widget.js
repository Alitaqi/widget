(function () {
    // Create toggle button
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
  
    // Create widget box
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
      <input type="text" id="widgetNameInput" placeholder="Enter your name" style="width: 100%; padding: 8px; margin-bottom: 10px; box-sizing: border-box;" />
      <button id="widgetSubmitBtn" style="padding: 8px 12px; background: #007bff; color: #fff; border: none; border-radius: 5px; cursor: pointer;">Submit</button>
    `;
  
    // Append to document
    document.body.appendChild(toggleBtn);
    document.body.appendChild(widgetBox);
  
    // Toggle widget visibility
    toggleBtn.addEventListener("click", () => {
      widgetBox.style.display = widgetBox.style.display === "none" ? "block" : "none";
    });
  
    // Handle submit
    document.getElementById("widgetSubmitBtn").addEventListener("click", () => {
      const name = document.getElementById("widgetNameInput").value;
      console.log("Name from widget:", name);
      alert(`Hello, ${name}! Check the console.`);
    });
  })();
  