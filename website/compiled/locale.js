var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var locale;
var translationData;
function initlocale() {
    return __awaiter(this, void 0, void 0, function* () {
        locale = navigator.language.match("\\w+")[0];
        fetchTranslation(locale).then((json) => {
            translationData = json;
            translateDOM();
        });
    });
}
function fetchTranslation(country_code) {
    return __awaiter(this, void 0, void 0, function* () {
        var response = yield fetch(`/locales/${locale}.json`);
        if (response.status != 200) {
            console.warn("Welp, seems like we don't have a translation for you. Falling back to english.");
            locale = "en";
            response = yield fetch(`/locales/${locale}.json`);
        }
        return response.json();
    });
}
function translateElements(elements) {
    elements.forEach(element => {
        var matches = element.innerHTML.match('{.+?}');
        if ((matches === null || matches === void 0 ? void 0 : matches.length) > 0) {
            matches.forEach(match => {
                const replacement = getTranslation(match.slice(1, match.length - 1));
                var content = element.innerHTML.replace(match, replacement[0]);
                element.innerHTML = content;
                if (replacement[1])
                    element.classList.add("translationerror");
            });
        }
    });
}
function translateDOM() {
    var elements = Array();
    elements.push(document.querySelector("#menu-button"));
    elements = elements.concat(deconstructToArray(document.querySelector("#menu-items").children));
    elements = elements.concat(deconstructToArray(document.querySelector("#logo-captions").children));
    elements.push(document.querySelector("#scroll-hint"));
    elements = elements.concat(deconstructToArray(document.querySelector("#section-about-text").children));
    elements = elements.concat(deconstructToArray(document.querySelector("#section-credits-content").children));
    translateElements(elements);
    ready();
}
function translateRepos() {
    var elements = Array();
    document.querySelectorAll("#section-repos-content h1").forEach(element => {
        elements.push(element);
    });
    document.querySelectorAll("#repos-list .list-panel").forEach(element => {
        elements = elements.concat(deconstructToArray(element.children));
    });
    document.querySelectorAll("#contributions-list .list-panel").forEach(element => {
        elements = elements.concat(deconstructToArray(element.children));
    });
    elements.push(document.querySelector("#browser-compat"));
    document.querySelectorAll("#section-repos-content div").forEach(element => {
        elements.push(element);
    });
    translateElements(elements);
    ready();
}
function getTranslation(key) {
    const result = eval("translationData." + key);
    return [
        result !== null && result !== void 0 ? result : translationData.errors.notranslation.replace("%string%", key),
        !result
    ];
}
function deconstructToArray(collection) {
    var array = Array();
    for (let index = 0; index < collection.length; index++) {
        array.push(collection.item(index));
    }
    return array;
}
