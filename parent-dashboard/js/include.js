function includeHTML(id, file) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
        });
}

// Load header and sidebar
includeHTML("header", "../includes/header.html");
includeHTML("sidebar", "../includes/sidebar.html");