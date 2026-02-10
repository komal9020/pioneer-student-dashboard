function sendMessage() {
    const input = document.getElementById("messageInput");
    const text = input.value.trim();

    if (text === "") return;

    const chatMessages = document.getElementById("chatMessages");

    const msgDiv = document.createElement("div");
    msgDiv.className = "message sent";
    msgDiv.textContent = text;

    chatMessages.appendChild(msgDiv);
    input.value = "";
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
