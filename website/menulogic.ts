var menu : HTMLElement
var menu_collapsed : boolean

function initmenu() {
    menu = document.getElementById("menu-content")
    menu_collapsed = menu.classList.contains("hidden")
}

function togglemenu() {
    if (menu_collapsed)
        menu.classList.remove("hidden")
    else
        menu.classList.add("hidden")
    menu_collapsed = !menu_collapsed
}