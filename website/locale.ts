var locale : string
let jsonData;

// Github Pages does not offer shipping localised websites as far as I know
// So I will have to deal with this (still kind of proud of this code)

function initlocale() {
    locale = navigator.language.match("\\w+")[0];

    fetchTranslation(locale).then((json) => {
        jsonData = json;
        translateDOM(json);
    })
}

async function fetchTranslation(country_code : string) : Promise<any> {
    var response = await fetch(`/locales/${locale}.json`);
    if (response.status != 200) {
        console.warn("Welp, seems like we don't have a translation for you. Falling back to english.")
        locale = "en";
    }
    return response.json();
}

function translateDOM(data) {
    var elements = Array<HTMLElement>();
    
    // Menu bar
    elements.push(document.querySelector("#menu-button"));
    elements = elements.concat(deconstructToArray(document.querySelector("#menu-items").children));
    
    // Logo
    elements = elements.concat(deconstructToArray(document.querySelector("#logo-captions").children));
    elements.push(document.querySelector("#scroll-hint"));
    
    // About
    elements = elements.concat(deconstructToArray(document.querySelector("#section-about-text").children));
    
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
    
    // Credits
    elements = elements.concat(deconstructToArray(document.querySelector("#section-credits-content").children));

    // Now do the magic part
    elements.forEach(element => {
        var matches = element.innerHTML.match('{.+?}');
        if (matches?.length > 0) {
            matches.forEach(match => {
                var content = element.innerHTML.replace(match, 
                    getValue(data, match.slice(1, match.length - 1)) ??
                        data.errors.notranslation.replace("%string%", match));
                element.innerHTML = content;
            });
        }
    });

    // Reveal the website
    document.body.classList.remove("basicallyhideeverything");
}

function getValue(json, key : string, fullKey : string = key) : string {
    const levels = key.split('.');
    if (json === undefined)
        return jsonData.errors.notranslation.replace("%string%", fullKey);
    if (levels.length === 1)
        return json[key];
    return getValue(json[levels[0]], levels.slice(1, levels.length).join('.'), key);
}

function deconstructToArray(collection : HTMLCollection) {
    var array : Array<HTMLElement> = Array()
    for (let index = 0; index < collection.length; index++) {
        array.push(collection.item(index) as HTMLElement)
    }
    return array;
}