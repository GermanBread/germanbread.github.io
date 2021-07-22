var nav;
var hint;
function init() {
    nav = document.getElementById("navmenu");
    hint = document.getElementById("scroll-hint");
    handlescroll();
    window.addEventListener("scroll", handlescroll);
    window.addEventListener("scroll", hidescrollhint);
}
function handlescroll() {
    if (window.scrollY > 50) {
        nav.classList.add("attached");
    }
    else {
        nav.classList.remove("attached");
    }
}
function hidescrollhint() {
    if (window.scrollY > 50) {
        hint.classList.add("hidden");
        var elements = document.body.getElementsByTagName("window");
        for (var index = 1; index < elements.length; index++) {
            var element = elements[index];
            element.classList.remove("hidden");
        }
        //window.removeEventListener("scroll", hidescrollhint)
    }
    else {
        hint.classList.remove("hidden");
        var elements = document.body.getElementsByTagName("window");
        for (var index = 1; index < elements.length; index++) {
            var element = elements[index];
            element.classList.add("hidden");
        }
    }
}
