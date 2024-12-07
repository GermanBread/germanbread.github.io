var nav : HTMLElement
var hint : HTMLElement

function init() {
    nav = document.getElementById("navmenu")
    hint = document.getElementById("scroll-hint")
    handlescroll()

    window.addEventListener("scroll", handlescroll)
    window.addEventListener("scroll", hidescrollhint)
    window.addEventListener("resize", handleresize)
}

function handlescroll() {
    if (window.scrollY > 50) {
        nav.classList.add("attached")
    } else {
        nav.classList.remove("attached")
    }
}
function handleresize() {
    if (window.innerWidth < 380) {
        hint.classList.add("hidden")
        var elements = document.body.getElementsByTagName("window")
        for (let index = 0; index < elements.length; index++) {
            const element = elements[index];
            element.classList.remove("hidden")
        }
        window.removeEventListener("resize", handleresize)
    }
}
function hidescrollhint() {
    if (window.scrollY > 50) {
        hint.classList.add("hidden")
        var elements = document.body.getElementsByTagName("window")
        for (let index = 0; index < elements.length; index++) {
            const element = elements[index];
            element.classList.remove("hidden")
        }
        document.getElementById("about")
        window.removeEventListener("scroll", hidescrollhint)
    }
}