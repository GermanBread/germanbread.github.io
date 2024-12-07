var about : HTMLElement, about_content : HTMLElement,
    repos : HTMLElement, repos_content : HTMLElement
var about_rect : DOMRect,
    repos_rect : DOMRect

var transition_offset : number = 40 * (window.innerHeight / 100)
var transition_smoothness : number = 40 * (window.innerHeight / 100);
var parallax_multiplier : number = 1 * (window.innerHeight / 100);

var values_initialised : boolean = false

function init() {
    
    if (!values_initialised) {
        about = document.getElementById("section-about")
        about_content = document.getElementById("section-about-content")
        about_rect = about.getBoundingClientRect()
        
        repos = document.getElementById("section-repos")
        repos_content = document.getElementById("section-repos-content")
        repos_rect = repos.getBoundingClientRect()

        values_initialised = true
    }
    
    handlescroll()

    window.addEventListener("scroll", handlescroll)

    document.getElementById("repos-list").innerHTML = ""
    document.getElementById("contributions-list").innerHTML = ""

    fetchpersonalrepos(document.getElementById("repos-list"))
    fetchcontibutionrepos(document.getElementById("contributions-list"))
}

// Copied from https://stackoverflow.com/questions/11409895/whats-the-most-elegant-way-to-cap-a-number-to-a-segment
function clamp(num : number, min :number, max :number) : number {
    return num <= min 
        ? min 
        : num >= max 
            ? max 
            : num
}

function handlescroll() {
    

    // About section
    {
        var bounds : DOMRect = about_rect

        var computed_opacity : number = clamp((window.scrollY - bounds.top + transition_offset) / transition_smoothness, 0, 1)
            -clamp((window.scrollY - bounds.bottom - bounds.top - transition_offset), 0, 1)
        var computed_offset : number = (window.scrollY - bounds.top) / parallax_multiplier
        
        about.style.opacity = computed_opacity.toString()
        about_content.style.transform = "translateY(" + -computed_offset + "px)"
    }
    
    // Repos section
    {
        var bounds : DOMRect = repos_rect

        var computed_opacity : number = clamp((window.scrollY - bounds.top + transition_offset) / transition_smoothness, 0, 1)
            -clamp((window.scrollY - bounds.bottom - bounds.top - transition_offset), 0, 1)
        var computed_offset : number = (window.scrollY - bounds.top) / parallax_multiplier
        
        repos.style.opacity = computed_opacity.toString()
        repos_content.style.transform = "translateY(" + -computed_offset + "px)"
    }
}

function fetchpersonalrepos(root: HTMLElement) {
    fetch('https://api.github.com/users/GermanBread/repos')
        .then(response => {
            if (!response.ok) {
                throw "Github responded with " + response.status;
            }
            response.json().then(data => {
                root.innerHTML = ""
                for (let index = 0; index < data.length; index++) {
                    const json = data[index];
                    root.appendChild(createpanel(json))
                }
            })
        }).catch(error => root.innerHTML = error)
}
function fetchcontibutionrepos(root: HTMLElement) {
    const fetchrepo = (url: string) => {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw "Github responded with " + response.status;
                }
                response.json().then(json => {
                    root.appendChild(createpanel(json))
                })
            })
            .catch(error => root.innerHTML = error)
    }

    root.innerHTML = ""

    fetchrepo('https://api.github.com/repos/arch-community/qbot')
    fetchrepo('https://api.github.com/repos/Lightcord/Lightcord')
}
function createpanel({ name, description, archived, fork, html_url }): HTMLElement {
    var panel: HTMLAnchorElement = document.createElement("a")
    var header: HTMLElement = document.createElement("h3")
    var content: HTMLElement = document.createElement("p")

    panel.href = html_url
    panel.classList.add("list-panel")
    header.innerHTML = name + (archived ? " (archived)" : "") + (fork ? " (forked)" : "")
    content.innerHTML = description ?? "No description provided"

    panel.appendChild(header)
    panel.appendChild(document.createElement("hr"))
    panel.appendChild(content)

    return panel
}