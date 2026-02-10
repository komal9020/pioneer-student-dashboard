const API = "http://localhost:5000";

function login() {
  fetch(API + "/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email.value,
      password: password.value
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.token) {
      localStorage.setItem("token", data.token);
      window.location = "profile.html";
    } else alert("Login failed");
  });
}

function updateProfile() {
  const fd = new FormData();
  fd.append("name", name.value);
  fd.append("email", email.value);
  fd.append("password", password.value);
  fd.append("address", address.value);
  fd.append("gender", gender.value);
  fd.append("photo", photo.files[0]);

  fetch(API + "/profile", {
    method: "PUT",
    headers: {
      "Authorization": localStorage.getItem("token")
    },
    body: fd
  })
  .then(res => res.json())
  .then(() => alert("Profile Updated"));
}
