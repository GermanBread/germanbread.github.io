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

// Some basic scrolling stuff
/*window.addEventListener("scroll", function handlescrolling() {
    console.log(window.scrollY);
    if (window.scrollY >= 50) {
        var _element = document.getElementById("repos-collection");
        _element.remove();
        _element.classList.remove("noanim");
        var _container = document.getElementById("panels");
        _container.appendChild(_element);
        removeEventListener("scroll", handlescrolling, false);
    }
}, false);*/

// Get all my repos using the GitHub API
function fetchRepos() {
    var _root = document.getElementById("repos");
    fetch('https://api.github.com/users/GermanBread/repos').then(function (response) {
        // Everything was ok
        if (!response.ok) {
            throw "Failed to fetch: " + response.status;
        }
        response.json().then(function (json) {
            for (let index = 0; index < json.length; index++) {
                const element = json[index];
                createRepoPanel(element, _root, index);
            }
        });
    }).catch(function (error) {
        // Something went wrong, log it
        console.log(error);
        
        // Create a fake entry that contains the error
        var _error = document.createElement("div");
        _error.classList.add("panel-element");
        _error.style.width = "90%";
        _error.style.margin = "auto";
        
        var _title = document.createElement("h2");
        _title.innerText = "Failed to fetch repos";
        
        var _message = document.createElement("p");
        _message.innerText = error;
        
        _error.append(_title);
        _error.append(_message);
        
        _root.append(_error);
    });
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
    
    var _title = document.createElement("h2");
    _title.innerText = repo.name;
    
    var _message = document.createElement("p");
    _message.innerText = repo.description;

    var _attributes = document.createElement("p");
    _attributes.innerText = "Last commit " + new Date(Date.parse(repo.updated_at)).toLocaleDateString();
    
    _panel.append(_title);
    _panel.append(_message);
    _panel.append(_attributes);
    
    root.append(_panel);
}