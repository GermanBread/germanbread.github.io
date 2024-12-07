var nav, hint;
function init() {
    nav = document.getElementById("navmenu");
    hint = document.getElementById("scroll-hint");
    handlescroll();
    window.addEventListener("scroll", handlescroll);
    window.addEventListener("scroll", hidescrollhint);
    fetchpersonalrepos(document.getElementById("repos-list"));
    fetchcontibutionrepos(document.getElementById("contributions-list"));
}
function handlescroll() {
    var elements = document.body.getElementsByTagName("window");
    if (window.scrollY > 50) {
        nav.classList.add("attached");
        for (var index = 1; index < elements.length; index++) {
            var element = elements[index];
            element.classList.remove("hidden");
        }
    }
    else {
        nav.classList.remove("attached");
        for (var index = 1; index < elements.length; index++) {
            var element = elements[index];
            element.classList.add("hidden");
        }
    }
}
function hidescrollhint() {
    if (window.scrollY > 50) {
        hint.classList.add("hidden");
    }
    else {
        hint.classList.remove("hidden");
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
