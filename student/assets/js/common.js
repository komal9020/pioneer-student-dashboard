function loadComponent(id, file) {
    fetch(file)
        .then(res => res.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
        })
        .catch(err => console.error("Component load error:", err));
}

loadComponent("sidebar", "../components/sidebar.html");
loadComponent("header", "../components/header.html");
loadComponent("sticky-notes", "../components/sticky-notes.html");
