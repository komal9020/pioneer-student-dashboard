// Load Common Components
function loadComponent(id, file) {
    fetch(file)
    .then(res => res.text())
    .then(data => {
        document.getElementById(id).innerHTML = data;
    });
}

loadComponent("header", "../components/header.html");
loadComponent("sidebar", "../components/sidebar.html");
loadComponent("footer", "../components/footer.html");

// Load Dashboard Data
fetch('http://localhost:5000/api/dashboard')
.then(res => res.json())
.then(data => {
    document.getElementById('attendance').innerText = data[0].attendance_percentage + "%";
    document.getElementById('results').innerText = data[0].overall_percentage + "%";
    document.getElementById('fees').innerText = "₹" + data[0].pending_fees;
});

