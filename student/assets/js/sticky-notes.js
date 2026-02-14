let selectedColor = "yellow";

/* OPEN ADD NOTE MODAL */
function openAddModal() {
  document.getElementById("noteModal").classList.add("show");
}

/* CLOSE ADD NOTE MODAL */
function closeModal() {
  document.getElementById("noteModal").classList.remove("show");
}

/* CLOSE STICKY PANEL */
function closePanel() {
  document.querySelector(".sticky-panel").style.display = "none";
}

/* SELECT COLOR */
function selectColor(el) {
  selectedColor = el.dataset.color;

  // remove selection from all
  document.querySelectorAll(".color").forEach(c =>
    c.classList.remove("selected")
  );

  // select clicked one
  el.classList.add("selected");
}


/* SAVE NOTE FROM MODAL */
function saveNote() {
  const text = document.getElementById("noteText").value.trim();
  const subject = document.getElementById("noteSubject").value;

  if (!text || subject === "Select Subject") {
    alert("Please fill all fields");
    return;
  }

  const note = document.createElement("div");
  note.className = `note ${selectedColor}`;

  note.innerHTML = `
    <div class="note-top">
      <span class="tag">${subject}</span>
      <span class="close" onclick="this.closest('.note').remove()">×</span>
    </div>
    <p>${text}</p>
    <small>Just now</small>
  `;

  document.getElementById("notesContainer").prepend(note);

  // reset form
  document.getElementById("noteText").value = "";
  document.getElementById("noteSubject").value = "Select Subject";
  closeModal();
}
