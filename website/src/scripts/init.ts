import { projectsData, reposData, translationData } from './globals';
import type { TranslationData } from './types'

export async function init() {
    let data : TranslationData = null;
    try {
        data = await (await fetch(`/build/locales/${navigator.language.match("\\w+")[0]}.json`)).json();
    } catch (error) {
        console.log("We don't have a translation for you :(")
        data = await (await fetch('/build/locales/en.json')).json();
    }

    translationData.set(data);
    projectsData.set(await (await fetch("/build/cache/projects.json")).json());
    reposData.set(await (await fetch("/build/cache/repos.json")).json());
}