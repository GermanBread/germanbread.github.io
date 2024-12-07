var nav : HTMLElement
var hint : HTMLElement

function init() {
    nav = document.getElementById("navmenu")
    hint = document.getElementById("scroll-hint")
    handlescroll()

    window.addEventListener("scroll", handlescroll)
    window.addEventListener("scroll", hidescrollhint)
}

function handlescroll() {
    var elements = document.body.getElementsByTagName("window")
    if (window.scrollY > 50) {
        nav.classList.add("attached")
        for (let index = 1; index < elements.length; index++) {
            const element = elements[index];
            element.classList.remove("hidden")
        }
    } else {
        nav.classList.remove("attached")
        for (let index = 1; index < elements.length; index++) {
            const element = elements[index];
            element.classList.add("hidden")
        }
    }
}
function hidescrollhint() {
    if (window.scrollY > 50) {
        hint.classList.add("hidden")
    } else {
        hint.classList.remove("hidden")
    }
}