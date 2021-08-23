var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var logo, menu, about, repos, credits, scroll_hint;
var about_rect, repos_rect, credits_rect;
var runlevel;
var parallax_multiplier = 0 * (window.innerHeight / 1000);
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
    about.style.opacity = calculate_opacity(about_rect).toString();
    repos.style.opacity = calculate_opacity(repos_rect).toString();
    credits.style.opacity = calculate_opacity(credits_rect).toString();
}
function clamp(num, min, max) {
    return ((num <= min) ? min : ((num >= max) ? max : num));
}
function clamp01(num) {
    return ((num <= 0) ? 0 : ((num >= 1) ? 1 : num));
}
function getprogress(num, start, stop) {
    return (num - start) / (stop - start);
}
function calculate_opacity(bounds) {
    var progress = getprogress(window.scrollY + window.innerHeight / 2, bounds.top + window.scrollY, bounds.bottom + window.scrollY);
    if (progress >= 0 && progress <= 1)
        return clamp01(progress * 8) - clamp01((progress - 0.875) * 8);
    else
        return 0;
}
function calculate_transform(bounds, multiplier) {
    return (window.scrollY - bounds.top + window.scrollY) * multiplier;
}
function fetchpersonalrepos(root) {
    return __awaiter(this, void 0, void 0, function* () {
        let url = "https://api.github.com/users/GermanBread/repos";
        const response = yield fetch(url);
        if (!response.ok) {
            console.log("Github responded with " + response.status + ` (${url})`);
            root.innerHTML = "{errors.unavailable}";
            return;
        }
        const json = yield response.json();
        root.innerHTML = "";
        for (let index = 0; index < json.length; index++) {
            root.appendChild(createpanel(json[index]));
        }
    });
}
function fetchcontibutionrepos(root) {
    return __awaiter(this, void 0, void 0, function* () {
        function fetchrepo(url) {
            return __awaiter(this, void 0, void 0, function* () {
                const response = yield fetch(url);
                if (!response.ok) {
                    console.log("Github responded with " + response.status + ` (${url})`);
                    root.innerHTML = "{errors.unavailable}";
                    return;
                }
                const json = yield response.json();
                root.appendChild(createpanel(json));
            });
        }
        root.innerHTML = "";
        yield fetchrepo('https://api.github.com/repos/arch-community/qbot');
        yield fetchrepo('https://api.github.com/repos/Lightcord/Lightcord');
        yield fetchrepo('https://api.github.com/repos/Lightcord/lc-installer-linux');
    });
}
function createpanel({ name, description, archived, fork, html_url }) {
    var panel = document.createElement("a");
    var header = document.createElement("h3");
    var content = document.createElement("p");
    panel.href = html_url;
    panel.classList.add("list-panel");
    header.innerHTML = name + (archived ? " ({repos.panel.archived})" : "") + (fork ? " ({repos.panel.forked})" : "");
    content.innerHTML = description !== null && description !== void 0 ? description : "{repos.panel.nodescription}";
    panel.appendChild(header);
    panel.appendChild(document.createElement("hr"));
    panel.appendChild(content);
    return panel;
}
