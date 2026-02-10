// This file MUST load AFTER header.html is injected
(function () {

  const notificationBtn = document.getElementById("notificationBtn");
  const notificationPanel = document.getElementById("notificationPanel");

  const userBtn = document.getElementById("userBtn");
  const userDropdown = document.getElementById("userDropdown");

  if (!notificationBtn || !notificationPanel || !userBtn || !userDropdown) {
    console.error("Header elements not found");
    return;
  }

  // 🔔 Notification toggle
  notificationBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    notificationPanel.style.display =
      notificationPanel.style.display === "block" ? "none" : "block";
    userDropdown.style.display = "none";
  });

  // 👤 User dropdown toggle
  userBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    userDropdown.style.display =
      userDropdown.style.display === "flex" ? "none" : "flex";
    notificationPanel.style.display = "none";
  });

  // ❌ Close when clicking outside
  document.addEventListener("click", function () {
    notificationPanel.style.display = "none";
    userDropdown.style.display = "none";
  });

})();
fetch("http://localhost:3000/student/profile")
  .then(res => res.json())
  .then(data => {
    const nameEl = document.getElementById("headerName");
    const photoEl = document.getElementById("headerPhoto");

    if (nameEl) {
      nameEl.innerText = data.name;
    }

    if (photoEl && data.photo) {
      photoEl.src = "http://localhost:3000/uploads/" + data.photo;
    }
  });
