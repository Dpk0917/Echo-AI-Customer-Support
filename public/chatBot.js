(function () {
  const scriptTag = document.currentScript || document.querySelector('script[data-owner-id]');
  if (!scriptTag) {
    console.log("chatBot.js: script tag not found");
    return;
  }
  const scriptSrc = scriptTag.getAttribute("src");
  const baseUrl = new URL(scriptSrc).origin;
  const api_Url = baseUrl + "/api/chat";

  const ownerId = scriptTag.getAttribute("data-owner-id");

  if (!ownerId) {
    console.log("owner id not found");
    return;
  }

  const button = document.createElement("div");
  button.innerHTML = "💬";

  Object.assign(button.style, {
    position: "fixed",
    bottom: "24px",
    right: "24px",
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    background: "#000",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "22px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.35)",
    zIndex: "999999",
  });

  document.body.appendChild(button);

  // create chat box
  const box = document.createElement("div");

  Object.assign(box.style, {
    position: "fixed",
    bottom: "90px",
    right: "24px",
    width: "320px",
    height: "420px",
    background: "#fff",
    borderRadius: "14px",
    boxShadow: "0 25px 60px rgba(0,0,0,0.25)",
    display: "none",
    flexDirection: "column",
    overflow: "hidden",
    zIndex: "999999",
    fontFamily: "Inter, system-ui, sans-serif",
  });

  box.innerHTML = `
  <div style="
    background:#000;
    color:#fff;
    padding:12px 14px;
    font-size:14px;
    display:flex;
    justify-content:space-between;
    align-items:center;
  ">
    <span>Echo AI Support</span>
    <span id="chat-close" style="cursor:pointer;font-size:16px">✕</span>
  </div>

  <div id="chat-messages" style="
    flex:1;
    padding:10px;
    overflow-y:auto;
    font-size:13px;
    display:flex;
    flex-direction:column;
  "></div>

  <div style="
    display:flex;
    border-top:1px solid #e5e7eb;
    padding:8px;
    gap:6px;
  ">
    <input 
      id="chat-input"
      type="text"
      placeholder="Type a message"
      style="
        flex:1;
        padding:8px 10px;
        border:1px solid #d1d5db;
        border-radius:8px;
        font-size:13px;
        outline:none;
      "
    />
    <button id="chat-send" style="
        padding:8px 12px;
        border:none;
        background:#000;
        color:#fff;
        border-radius:8px;
        cursor:pointer;
    ">
      Send
    </button>
  </div>
  `;

  document.body.appendChild(box);

  const closeBtn = box.querySelector("#chat-close");
  const sendBtn = box.querySelector("#chat-send");
  const input = box.querySelector("#chat-input");
  const messages = box.querySelector("#chat-messages");

  // open chat
  button.onclick = () => {
    box.style.display = "flex";
  };

  // close chat
  closeBtn.onclick = () => {
    box.style.display = "none";
  };

  function addMessage(text, from) {
    const bubble = document.createElement("div");
    bubble.innerText = text;

    Object.assign(bubble.style, {
      maxWidth: "78%",
      padding: "8px 12px",
      borderRadius: "14px",
      fontSize: "13px",
      lineHeight: "1.4",
      marginBottom: "8px",
      alignSelf: from === "user" ? "flex-end" : "flex-start",
      background: from === "user" ? "#000" : "#e5e7eb",
      color: from === "user" ? "#fff" : "#111",
      borderTopRightRadius: from === "user" ? "4px" : "14px",
      borderTopLeftRadius: from === "user" ? "14px" : "4px",
    });

    messages.appendChild(bubble);
    messages.scrollTop = messages.scrollHeight;
  }

  // send on Enter key
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      sendBtn.click();
    }
  });

  // send message
  sendBtn.onclick = async () => {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");
    input.value = "";

    const typing= document.createElement("div");
    typing.innerText = "Echo is typing...";
    Object.assign(typing.style, {
  
      
      fontSize: "12px",
      color:"#6b7280",
      marginBottom: "8px",
      alignSelf: "flex-start",
      
    });
    messages.appendChild(typing);
    messages.scrollTop = messages.scrollHeight;

    try {
      const res = await fetch(api_Url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          ownerId: ownerId,
        }),
      });

      const data = await res.json();
      typing.remove();

      addMessage(data.reply, "bot");

    } catch (err) {
      typing.remove();
      addMessage("Server error", "bot");
    }
  };
})(); 