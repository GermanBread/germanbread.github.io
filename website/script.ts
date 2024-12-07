var logo : HTMLElement,
    menu : HTMLElement,
    about : HTMLElement,
    repos : HTMLElement,
    credits : HTMLElement,
    scroll_hint : HTMLElement;
var logo_rect : DOMRect,
    about_rect : DOMRect,
    repos_rect : DOMRect,
    credits_rect : DOMRect;

var runlevel : number

function init() {
    logo = document.getElementById("section-logo");
    menu = document.getElementById("menu-wrapper");
    about = document.getElementById("section-about");
    repos = document.getElementById("section-repos");
    credits = document.getElementById("section-credits");
    scroll_hint = document.getElementById("scroll-hint");

    runlevel = 0;

    document.getElementById("repos-list").innerHTML = "";
    document.getElementById("contributions-list").innerHTML = "";
    
    fetchpersonalrepos(document.getElementById("repos-list"))
        .then(() => ready());
    fetchcontibutionrepos(document.getElementById("contributions-list"))
        .then(() => ready());
    
    handlescroll();
    hidescrollhint();

    scroll_hint.style.opacity = "1"; // I don't know why but else the scroll hint won't appear
    window.addEventListener("scroll", handlescroll);
    window.addEventListener("scroll", hidescrollhint);

    initmenu();
    initlocale();

    ready();
}

// Can be called from anywhere, will increment the counter
// 3 "ready" calls in total (init, repos, contibutions)
// I want my page to load FAST and not break while doing so. Hence the runlevels.
function ready() {
    runlevel++;
    switch (runlevel) {
        case 3:
            translateRepos();
            break;
        case 4:
            // We're ready to display the DOM. Now reveal the website.
            document.body.classList.remove("basicallyhideeverything");
    }
}

function hidescrollhint() {
    if (window.scrollY <= about_rect.top)
        scroll_hint.style.opacity = clamp01(getprogress(window.scrollY, about_rect.top, 0)).toString();
    else
        scroll_hint.style.opacity = "0";
}

function handlescroll() {
    logo_rect = logo.getBoundingClientRect();
    about_rect = about.getBoundingClientRect();
    repos_rect = repos.getBoundingClientRect();
    credits_rect = credits.getBoundingClientRect();

    // Logo section
    logo.style.opacity = calculate_opacity(logo_rect).toString();
    
    // About section
    about.style.opacity = calculate_opacity(about_rect).toString();
    
    // Repos section
    repos.style.opacity = calculate_opacity(repos_rect).toString();

    // Credits section
    credits.style.opacity = calculate_opacity(credits_rect).toString();
}

//#region helpers
function clamp(num : number, min : number, max : number) : number {
    return Math.min(Math.max(num, min), max);
}
function clamp01(num : number) : number {
    return clamp(num, 0, 1);
}

function getprogress(num : number, start : number, stop : number) : number {
    return (num - start) / (stop - start);
}

function calculate_opacity(bounds : DOMRect) : number {
    var progress : number = getprogress(window.scrollY + window.innerHeight / 2, bounds.top + window.scrollY, bounds.bottom + window.scrollY);
    if (progress >= 0 && progress <= 1)
        return clamp01(progress * 8) - clamp01((progress - 0.875) * 8);
    else
        return 0;
}

async function fetchpersonalrepos(root : HTMLElement) {
    let url = "https://api.github.com/users/GermanBread/repos";
    const response = await fetch(url);
    if (!response.ok) {
        console.log("Github responded with " + response.status + ` (${url})`);
        root.innerHTML = "{errors.unavailable}";
        return;
    }
    const json = await response.json();
    root.innerHTML = "";
    for (let index = 0; index < json.length; index++) {
        root.appendChild(createpanel(json[index]));
    }
}
async function fetchcontibutionrepos(root : HTMLElement) {
    async function fetchrepo(url : string) {
        const response = await fetch(url);
        if (!response.ok) {
            console.log("Github responded with " + response.status + ` (${url})`);
            root.innerHTML = "{errors.unavailable}";
            return;
        }
        const json = await response.json();
        root.appendChild(createpanel(json));
    }

    root.innerHTML = "";

    await fetchrepo('https://api.github.com/repos/arch-community/qbot');
    await fetchrepo('https://api.github.com/repos/Lightcord/Lightcord');
    await fetchrepo('https://api.github.com/repos/Lightcord/lc-installer-linux');
}
function createpanel({ name, description, archived, fork, html_url }) : HTMLElement {
    var panel: HTMLAnchorElement = document.createElement("a");
    var header: HTMLElement = document.createElement("h3");
    var content: HTMLElement = document.createElement("p");

    panel.href = html_url;
    panel.classList.add("list-panel");
    header.innerHTML = name + (archived ? " ({repos.panel.archived})" : "") + (fork ? " ({repos.panel.forked})" : "");
    content.innerHTML = description ?? "{repos.panel.nodescription}";

    panel.appendChild(header);
    panel.appendChild(document.createElement("hr"));
    panel.appendChild(content);

    return panel;
}
//#endregion