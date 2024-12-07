var menu;
var menu_collapsed;
function initmenu() {
    menu = document.getElementById("menu");
    menu_collapsed = menu.classList.contains("hidden");
    var children = document.querySelector("#menu-items").children;
    for (let index = 0; index < children.length; index++) {
        const element = children[index];
        if (index < children.length - 1)
            element.innerHTML += ",";
    }
}
function togglemenu() {
    if (menu_collapsed)
        menu.classList.remove("hidden");
    else
        menu.classList.add("hidden");
    menu_collapsed = !menu_collapsed;
}
