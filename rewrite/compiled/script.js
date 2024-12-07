var about, about_content, repos, repos_content;
var about_rect, repos_rect;
var transition_offset = 40 * (window.innerHeight / 100) * (window.innerWidth / 2500);
var transition_smoothness = 40 * (window.innerHeight / 100);
var parallax_multiplier = 1 * (window.innerHeight / 100);
var values_initialised = false;
function init() {
    fetchpersonalrepos(document.getElementById("repos-list"));
    fetchcontibutionrepos(document.getElementById("contributions-list"));
    if (!values_initialised) {
        about = document.getElementById("section-about");
        about_content = document.getElementById("section-about-content");
        about_rect = about.getBoundingClientRect();
        repos = document.getElementById("section-repos");
        repos_content = document.getElementById("section-repos-content");
        repos_rect = repos.getBoundingClientRect();
        values_initialised = true;
    }
    handlescroll();
    window.addEventListener("scroll", handlescroll);
    document.getElementById("repos-list").innerHTML = "";
    document.getElementById("contributions-list").innerHTML = "";
}
// Copied from https://stackoverflow.com/questions/11409895/whats-the-most-elegant-way-to-cap-a-number-to-a-segment
function clamp(num, min, max) {
    return ((num <= min) ? min : ((num >= max) ? max : num));
}
function clamp01(num) {
    return ((num <= 0) ? 0 : ((num >= 1) ? 1 : num));
}
function handlescroll() {
    function calculate_opacity(bounds) {
        return clamp((window.scrollY - bounds.top + transition_offset) / transition_smoothness, 0, 1)
            - clamp((window.scrollY - bounds.bottom - bounds.top - transition_offset), 0, 1);
    }
    function calculate_transform(bounds) {
        return (window.scrollY - bounds.top) / parallax_multiplier;
    }
    // About section
    {
        var computed_opacity = calculate_opacity(about_rect);
        var computed_offset = calculate_transform(about_rect);
        about.style.opacity = computed_opacity.toString();
        about_content.style.transform = "translateY(" + -computed_offset + "px)";
    }
    // Repos section
    {
        console.log({
            Y: window.scrollY,
            top: repos_rect.top,
            height: repos_rect.height,
            bottom: repos_rect.bottom,
            offset: transition_offset
        });
        var computed_opacity = calculate_opacity(repos_rect);
        var computed_offset = calculate_transform(repos_rect);
        repos.style.opacity = computed_opacity.toString();
        repos_content.style.transform = "translateY(" + -computed_offset + "px)";
    }
}
function fetchpersonalrepos(root) {
    fetch('https://api.github.com/users/GermanBread/repos')
        .then(function (response) {
        if (!response.ok) {
            throw "Github responded with " + response.status;
        }
        response.json().then(function (data) {
            root.innerHTML = "";
            for (var index = 0; index < data.length; index++) {
                var json = data[index];
                root.appendChild(createpanel(json));
            }
        });
    })["catch"](function (error) { return root.innerHTML = error; });
}
function fetchcontibutionrepos(root) {
    var fetchrepo = function (url) {
        fetch(url)
            .then(function (response) {
            if (!response.ok) {
                throw "Github responded with " + response.status;
            }
            response.json().then(function (json) {
                root.appendChild(createpanel(json));
            });
        })["catch"](function (error) { return root.innerHTML = error; });
    };
    root.innerHTML = "";
    fetchrepo('https://api.github.com/repos/arch-community/qbot');
    fetchrepo('https://api.github.com/repos/Lightcord/Lightcord');
}
function createpanel(_a) {
    var name = _a.name, description = _a.description, archived = _a.archived, fork = _a.fork, html_url = _a.html_url;
    var panel = document.createElement("a");
    var header = document.createElement("h3");
    var content = document.createElement("p");
    panel.href = html_url;
    panel.classList.add("list-panel");
    header.innerHTML = name + (archived ? " (archived)" : "") + (fork ? " (forked)" : "");
    content.innerHTML = description !== null && description !== void 0 ? description : "No description provided";
    panel.appendChild(header);
    panel.appendChild(document.createElement("hr"));
    panel.appendChild(content);
    return panel;
}
