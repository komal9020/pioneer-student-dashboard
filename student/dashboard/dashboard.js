console.log("Dashboard loaded");

// Fetch latest profile data
fetch("http://localhost:3000/student/profile")
  .then(res => res.json())
  .then(data => {
    // Update name
    const nameEl = document.getElementById("studentName");
    if (nameEl) {
      nameEl.innerText = data.name;
    }

    // Update profile photo (if exists)
    const photoEl = document.getElementById("studentPhoto");
    if (photoEl && data.photo) {
      photoEl.src = "http://localhost:3000/uploads/" + data.photo;
    }
  })
  .catch(err => {
    console.error("Dashboard profile load error", err);
  });
