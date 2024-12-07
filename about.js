// Recreate the windows one by one (animation stuff)
function recreatePanels() {
    var _root = document.getElementById("panels");
    var _children = _root.children; // Forgive me on this name
    
    for (let index = 0; index < _children.length; index++) {
        var child = _children.item(index);
        setTimeout((_root, child) => {
            child.classList.remove("noanim");
            child.replaceWith(child);
        }, index * 500, _root, child);
    }
}

function rebuildMenu() {
    var _root = document.getElementsByClassName("navmenu").item(0);
    var _children = _root.children;
    
    for (let index = 0; index < _children.length; index++) {
        var child = _children.item(index);
        setTimeout((_root, child) => {
            child.style.animationDelay = (index / 8) + 's';
            child.classList.remove("noanim");
            child.replaceWith(child);
        }, 0, _root, child);
    }
}

// Get all my repos using the GitHub API
function fetchRepos() {
    var _root = document.getElementById("repos");
    fetch('https://api.github.com/users/GermanBread/repos').then(function (response) {
        // Everything was ok
        if (!response.ok) {
            throw "Server returned: " + response.status;
        }
        _root.innerHTML = "Fetching, please wait";
        response.json().then(function (json) {
            _root.innerHTML = "";
            for (let index = 0; index < json.length; index++) {
                const element = json[index];
                createRepoPanel(element, _root, index);
            }
        });
    }).catch(message => error(message, _root));

    // Then for some specific repos
    // Redefine root
    var _croot = document.getElementById("contributions");
    _croot.innerHTML = "";
    createFakePanel('https://api.github.com/repos/Lightcord/Lightcord', _croot, 0);
    createFakePanel('https://api.github.com/repos/Lightcord/lc-installer-linux', _croot, 1);
    createFakePanel('https://api.github.com/repos/arch-community/qbot', _croot, 2);
}
function createFakePanel(url, root, index) {
    fetch(url).then(function (response) {
        // Everything was ok
        if (!response.ok) {
            throw "Server returned: " + response.status;
        }
        response.json().then(function (json) {
            //console.log(json);
            createRepoPanel(json, root, index);
        });
    }).catch(function (message) { error(message + " for " + url, root) });
}

function createRepoPanel(repo, root, index) {
    var _panel = document.createElement("a");
    _panel.href = repo.html_url;
    _panel.classList.add("panel-element");
    _panel.style.animationDelay = (index / 5) + "s";

    switch (index % 3) {
        case 0:
            _panel.style.borderRightColor = "#25A"
            break;
        case 1:
            _panel.style.borderRightColor = "#2A2"
            break;
        case 2:
            _panel.style.borderRightColor = "#A22"
            break;
    }

    switch (repo.language) {
        case "Shell":
            _panel.classList.add("bash");
            break;
        
        case "C#":
            _panel.classList.add("cs");
            break;
        
        case "C++":
            _panel.classList.add("cpp");
            break;
    
        default:
            _panel.classList.add("unknown");
            break;
    }
    
    var _title = document.createElement("h2");
    _title.innerText = repo.name + (repo.archived ? " (archived)" : "") + (repo.fork ? " (forked)" : "");
    
    var _message = document.createElement("p");
    _message.innerText = repo.description;

    var _attributes = document.createElement("p");
    _attributes.innerText = "Last commit " + new Date(Date.parse(repo.updated_at)).toLocaleDateString();
    
    _panel.append(_title);
    _panel.append(_message);
    _panel.append(_attributes);
    
    root.append(_panel);
}

function error(message, root) {
    // Something went wrong, log it
    console.log(message);

    // Create a fake entry that contains the error
    var _error = document.createElement("div");
    _error.classList.add("panel-element");
    _error.style.width = "90%";
    _error.style.margin = "20px";
    _error.style.borderRightColor = "#F05050";
    
    var _title = document.createElement("h2");
    _title.innerText = "Failed to fetch";
    
    var _message = document.createElement("p");
    _message.innerText = message;
    
    _error.append(_title);
    _error.append(_message);
    
    root.append(_error);
}