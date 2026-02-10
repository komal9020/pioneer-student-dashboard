let editMode = false;

// load profile
function loadProfile() {
  fetch("http://localhost:3000/student/profile")
    .then(res => res.json())
    .then(d => {
      photo.src = "http://localhost:3000/uploads/" + d.photo;

      viewName.textContent = d.name;
      viewClass.textContent = d.class;
      viewRoll.textContent = "Roll No: " + (d.roll || "STU2024001");

      nameInput.value = d.name;
      emailInput.value = d.email;
      classInput.value = d.class;
      rollInput.value = d.roll || "STU2024001";
    });
}

loadProfile();

// choose photo
function choosePhoto() {
  if (editMode) photoInput.click();
}

photoInput.onchange = e => {
  photo.src = URL.createObjectURL(e.target.files[0]);
};

// edit toggle
function toggleEdit() {
  editMode = !editMode;

  nameInput.disabled = !editMode;
  emailInput.disabled = !editMode;

  editBtn.textContent = editMode ? "Save Profile" : "Edit Profile";

  if (!editMode) {
    const fd = new FormData();
    fd.append("name", nameInput.value);
    fd.append("email", emailInput.value);
    if (photoInput.files[0]) fd.append("photo", photoInput.files[0]);

    fetch("http://localhost:3000/student/update-limited", {
      method: "POST",
      body: fd
    }).then(() => loadProfile());
  }
}

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
     loadProfile(); // refresh data only

    });
  }