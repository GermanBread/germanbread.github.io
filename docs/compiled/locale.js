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
let jsonData;
function initlocale() {
    locale = navigator.language.match("\\w+")[0];
    fetchTranslation(locale).then((json) => {
        jsonData = json;
        translateDOM(json);
    });
}
function fetchTranslation(country_code) {
    return __awaiter(this, void 0, void 0, function* () {
        var response = yield fetch(`/locales/${locale}.json`);
        if (response.status != 200) {
            console.warn("Welp, seems like we don't have a translation for you. Falling back to english.");
            locale = "en";
            response = yield fetch(`/locales/en.json`);
        }
        return response.json();
    });
}
function translateDOM(data) {
    var elements = Array();
    elements.push(document.querySelector("#menu-button"));
    elements = elements.concat(deconstructToArray(document.querySelector("#list-links").children));
    elements = elements.concat(deconstructToArray(document.querySelector("#logo-captions").children));
    elements.push(document.querySelector("#scroll-hint"));
    elements = elements.concat(deconstructToArray(document.querySelector("#section-about-text").children));
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
    elements = elements.concat(deconstructToArray(document.querySelector("#section-credits-content").children));
    elements.forEach(element => {
        var matches = element.innerHTML.match('{.+?}');
        if ((matches === null || matches === void 0 ? void 0 : matches.length) > 0) {
            matches.forEach(match => {
                var _a;
                var content = element.innerHTML.replace(match, (_a = getValue(data, match.slice(1, match.length - 1))) !== null && _a !== void 0 ? _a : data.errors.notranslation.replace("%string%", match));
                element.innerHTML = content;
            });
        }
    });
    document.body.classList.remove("basicallyhideeverything");
}
function getValue(json, key, fullKey = key) {
    const levels = key.split('.');
    if (json === undefined)
        return jsonData.errors.notranslation.replace("%string%", fullKey);
    if (levels.length === 1)
        return json[key];
    return getValue(json[levels[0]], levels.slice(1, levels.length).join('.'), key);
}
function deconstructToArray(collection) {
    var array = Array();
    for (let index = 0; index < collection.length; index++) {
        array.push(collection.item(index));
    }
    return array;
}
