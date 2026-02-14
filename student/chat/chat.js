let selectedTeacher = null;

const teachers = [
  { id: 1, name: "Dr. Priya Sharma", subject: "Mathematics" },
  { id: 2, name: "Prof. Rajesh Kumar", subject: "Physics" },
  { id: 3, name: "Dr. Meera Patel", subject: "Chemistry" },
  { id: 4, name: "Dr. Sunita Singh", subject: "Biology" },
  { id: 5, name: "Ms. Anjali Verma", subject: "English" }
];

const messagesData = {
  1: [
    { sender: "teacher", text: "Hello! How can I help you?", time: "10:30 AM" },
    { sender: "student", text: "I have a doubt about discriminant.", time: "10:32 AM" },
    { sender: "teacher", text: "Sure! It is b² - 4ac.", time: "10:35 AM" }
  ]
};

/* Load Teachers */
function loadTeachers() {
  const list = document.getElementById("teacherList");
  list.innerHTML = "";

  teachers.forEach(t => {
    const div = document.createElement("div");
    div.className = "teacher";

    div.innerHTML = `
      <div class="avatar">${t.name.charAt(0)}</div>
      <div>
        <strong>${t.name}</strong><br>
        <span style="font-size:12px;color:gray">${t.subject}</span>
      </div>
      <div class="online-dot"></div>
    `;

    div.onclick = () => loadMessages(t.id, t.name, div);
    list.appendChild(div);
  });
}

/* Load Messages */
function loadMessages(id, name, element) {
  selectedTeacher = id;

  document.querySelectorAll(".teacher").forEach(t => t.classList.remove("active"));
  element.classList.add("active");

  document.getElementById("chatHeader").innerText = name;

  const box = document.getElementById("messages");
  box.innerHTML = "";

  const msgs = messagesData[id] || [];

  msgs.forEach(m => {
    const div = document.createElement("div");
    div.className = "message " + m.sender;
    div.innerHTML = `${m.text}<small>${m.time}</small>`;
    box.appendChild(div);
  });
}

/* Send Message */
function sendMessage() {
  const input = document.getElementById("messageInput");
  const text = input.value.trim();
  if (!text || !selectedTeacher) return;

  if (!messagesData[selectedTeacher]) {
    messagesData[selectedTeacher] = [];
  }

  messagesData[selectedTeacher].push({
    sender: "student",
    text: text,
    time: "Now"
  });

  input.value = "";
  loadMessages(selectedTeacher, document.getElementById("chatHeader").innerText, document.querySelector(".teacher.active"));
}

loadTeachers();
