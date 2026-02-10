const filters = document.querySelectorAll(".filter");

filters.forEach(btn => {
    btn.addEventListener("click", () => {
        filters.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        // Future: filter notes by subject
    });
});

console.log("Notes page loaded");
