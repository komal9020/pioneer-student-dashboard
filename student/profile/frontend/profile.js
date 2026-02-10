let editMode = false;

// Load profile from DB
function loadProfile() {
  fetch("http://localhost:3000/student/profile")
    .then(res => res.json())
    .then(data => {
      profilePhoto.src =
        "http://localhost:3000/uploads/" + data.photo;

      viewName.textContent = data.name;
      viewClass.textContent = data.class;
      viewRoll.textContent = "Class Code: " + data.class_code;

      nameInput.value = data.name;
      emailInput.value = data.email;
      classInput.value = data.class;
      classCodeInput.value = data.class_code;
    });
}

loadProfile();

// Enable photo select
function choosePhoto() {
  if (editMode) {
    photoInput.click();
  }
}

// Preview photo
photoInput.onchange = e => {
  profilePhoto.src = URL.createObjectURL(e.target.files[0]);
};

// Toggle edit / save
function toggleEdit() {
  editMode = !editMode;

  nameInput.disabled = !editMode;
  emailInput.disabled = !editMode;

  editBtn.textContent = editMode ? "Save Profile" : "Edit Profile";

  // SAVE DATA
  if (!editMode) {
    const formData = new FormData(profileForm);

    fetch("http://localhost:3000/student/update-limited", {
      method: "POST",
      body: formData
    })
    .then(() => {
      alert("Profile updated successfully");

      // ✅ CORRECT REDIRECT PATH
      window.location.href = "../dashboard/dashboard.html";
    });
  }
}
