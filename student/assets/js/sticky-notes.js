const API = "http://localhost:3000/api/sticky-notes";
let selectedColor = "yellow";

/* Open + Close box */
function openNoteBox() {
    document.getElementById("addNoteBox").style.display = "block";
}

function closeNoteBox() {
    document.getElementById("addNoteBox").style.display = "none";
    document.getElementById("noteMessage").value = "";
    document.getElementById("noteSubject").value = "";
}

/* Select color */
function selectColor(color) {
    selectedColor = color;
    document.querySelectorAll(".dot").forEach(d => d.classList.remove("active"));
    document.querySelector(".dot." + color).classList.add("active");
}

/* Save note (backend already exists) */
function saveNote() {
    const message = document.getElementById("noteMessage").value;
    const subject = document.getElementById("noteSubject").value;

    if (!message || !subject) {
        alert("Please enter message and select subject");
        return;
    }

    fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            subject: subject,
            message: message,
            color: selectedColor,
            posted_by: "Student"
        })
    })
    .then(res => res.json())
    .then(() => {
        closeNoteBox();
        // optional: reload notes list if you have it
    })
    .catch(err => console.error(err));
}
