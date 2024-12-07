var logo : HTMLElement,
    menu : HTMLElement,
    about : HTMLElement,
    repos : HTMLElement,
    credits : HTMLElement,
    scroll_hint : HTMLElement;
var about_rect : DOMRect,
    repos_rect : DOMRect,
    credits_rect : DOMRect;

var runlevel : number

var parallax_multiplier : number = 0 * (window.innerHeight / 1000);

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

    window.addEventListener("scroll", handlescroll);
    window.addEventListener("scroll", hidescrollhint);

    initmenu();

    ready();
}

// can be called from anywhere, will increment the counter
function ready() {
    runlevel++;
    switch (runlevel) {
        case 3:
            initlocale();
            break;
    }
}

function hidescrollhint() {
    if (window.scrollY <= about_rect.top)
        scroll_hint.style.opacity = clamp01(getprogress(window.scrollY, about_rect.top, 0)).toString();
    else
        scroll_hint.style.opacity = "0";
}

function handlescroll() {
    about_rect = about.getBoundingClientRect();
    repos_rect = repos.getBoundingClientRect();
    credits_rect = credits.getBoundingClientRect();

    // About section
    about.style.opacity = calculate_opacity(about_rect).toString();
    
    // Repos section
    repos.style.opacity = calculate_opacity(repos_rect).toString();

    // Credits section
    credits.style.opacity = calculate_opacity(credits_rect).toString();
}

//#region helpers
// Copied from https://stackoverflow.com/questions/11409895/whats-the-most-elegant-way-to-cap-a-number-to-a-segment
function clamp(num : number, min : number, max : number) : number {
    return ((num <= min) ? min : ((num >= max) ? max : num));
}
function clamp01(num : number) : number {
    return ((num <= 0) ? 0 : ((num >= 1) ? 1 : num));
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
// I decided to ditch this because it caused a lot of issues. Might consider adding it back for a menu of some sort
function calculate_transform(bounds : DOMRect, multiplier : number) : number {
    return (window.scrollY - bounds.top + window.scrollY) * multiplier;
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