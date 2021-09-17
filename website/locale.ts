var locale : string
var translationData : {
    errors : {
        notranslation : string
    }
};

// Github Pages does not offer shipping localised websites as far as I know
// So I will have to deal with this (still kind of proud of this code)

async function initlocale() {
    locale = navigator.language.match("\\w+")[0];

    fetchTranslation(locale).then((json) => {
        translationData = json;
        translateDOM();
    });
}

async function fetchTranslation(country_code : string) : Promise<any> {
    var response = await fetch(`/locales/${locale}.json`);
    if (response.status != 200) {
        console.warn("Welp, seems like we don't have a translation for you. Falling back to english.")
        locale = "en";
        response = await fetch(`/locales/${locale}.json`);
    }
    return response.json();
}

function translateDOM() {
    var elements = Array<HTMLElement>();
    
    // Menu bar
    elements.push(document.querySelector("#menu-button"));
    elements = elements.concat(deconstructToArray(document.querySelector("#menu-items").children));
    
    // Logo
    elements = elements.concat(deconstructToArray(document.querySelector("#logo-captions").children));
    elements.push(document.querySelector("#scroll-hint"));
    
    // About
    elements = elements.concat(deconstructToArray(document.querySelector("#section-about-text").children));
    
    // Credits
    elements = elements.concat(deconstructToArray(document.querySelector("#section-credits-content").children));

    // Now do the magic part
    elements.forEach(element => {
        var matches = element.innerHTML.match('{.+?}');
        if (matches?.length > 0) {
            matches.forEach(match => {
                var content = element.innerHTML.replace(match, 
                    getTranslation(match.slice(1, match.length - 1)));
                element.innerHTML = content;
            });
        }
    });

    // Reveal the website
    document.body.classList.remove("basicallyhideeverything");
}

function translateRepos() {
    var elements = Array<HTMLElement>();
    
    // Repos
    document.querySelectorAll("#section-repos-content h1").forEach(element => {
        elements.push(element as HTMLElement);
    });
    document.querySelectorAll("#repos-list .list-panel").forEach(element => {
        elements = elements.concat(deconstructToArray(element.children));
    });
    document.querySelectorAll("#contributions-list .list-panel").forEach(element => {
        elements = elements.concat(deconstructToArray(element.children));
    });
    elements.push(document.querySelector("#browser-compat"));
    document.querySelectorAll("#section-repos-content div").forEach(element => {
        elements.push(element as HTMLElement);
    });
    
    // Now do the magic part
    elements.forEach(element => {
        var matches = element.innerHTML.match('{.+?}');
        if (matches?.length > 0) {
            matches.forEach(match => {
                var content = element.innerHTML.replace(match, 
                    getTranslation(match.slice(1, match.length - 1)));
                element.innerHTML = content;
            });
        }
    });
}

function getTranslation(key : string) : string {
    return eval("translationData." + key) ??
        translationData.errors.notranslation.replace("%string%", key);
}

function deconstructToArray(collection : HTMLCollection) {
    var array : Array<HTMLElement> = Array()
    for (let index = 0; index < collection.length; index++) {
        array.push(collection.item(index) as HTMLElement)
    }
    return array;
}
