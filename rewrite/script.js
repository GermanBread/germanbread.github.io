var nav;
function init() {
    nav = document.getElementById("navmenu");
    handlescroll();
    window.addEventListener("scroll", handlescroll);
}
function handlescroll() {
    if (window.scrollY > 50) {
        nav.classList.add("attached");
    }
    else {
        nav.classList.remove("attached");
    }
}
