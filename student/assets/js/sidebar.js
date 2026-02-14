


// Active menu highlight
const items = document.querySelectorAll(".menu-item");

items.forEach(item => {
  item.addEventListener("click", () => {
    items.forEach(i => i.classList.remove("active"));
    item.classList.add("active");
  });
});

// Toggle sidebar (YouTube style)
function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("collapsed");
}



function goToChat() {
  window.location.href = "../../chat/chat.html";
}
