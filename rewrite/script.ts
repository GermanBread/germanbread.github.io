var nav : HTMLElement
var hint : HTMLElement

function init() {
    nav = document.getElementById("navmenu")
    hint = document.getElementById("scroll-hint")
    handlescroll()

    window.addEventListener("scroll", handlescroll)
    window.addEventListener("scroll", hidescrollhint)

    fetchpersonalrepos(document.getElementById("repos-list"))
    fetchcontibutionrepos(document.getElementById("contributions-list"))
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

function fetchpersonalrepos(root : HTMLElement) {
    fetch('https://api.github.com/users/GermanBread/repos')
        .then(function name(response : Response) {
            if (!response.ok) {
                throw "Github responded with " + response.status;
            }
            response.json().then(function name(data) {
                root.innerHTML = ""
                for (let index = 0; index < data.length; index++) {
                    const element = data[index];
                    root.appendChild(createpanel(element))
                }
            })
        }).catch(function name(error) {
            root.innerHTML = error
        })
}
function fetchcontibutionrepos(root : HTMLElement) {
    root.innerHTML = ""

    fetch('https://api.github.com/repos/Lightcord/Lightcord')
        .then(function name(response : Response) {
            if (!response.ok) {
                throw "Github responded with " + response.status;
            }
            response.json().then(function name(data) {
                root.appendChild(createpanel(data))
            })
        }).catch(function name(error) {
            root.innerHTML = error
        })
    
    fetch('https://api.github.com/repos/arch-community/qbot')
        .then(function name(response : Response) {
            if (!response.ok) {
                throw "Github responded with " + response.status;
            }
            response.json().then(function name(data) {
                root.appendChild(createpanel(data))
            })
        }).catch(function name(error) {
            root.innerHTML = error
        })

    
}
function createpanel(data) : HTMLElement {
    var panel : HTMLAnchorElement = document.createElement("a")
    var header : HTMLElement = document.createElement("h3")
    var content : HTMLElement = document.createElement("p")
    
    panel.href = data.html_url
    panel.classList.add("list-panel")
    header.innerHTML = data.name + (data.archived ? " (archived)" : "") + (data.fork ? " (forked)" : "")
    content.innerHTML = data.description ?? "No description provided"
    
    panel.appendChild(header)
    panel.appendChild(document.createElement("hr"))
    panel.appendChild(content)

    return panel
}