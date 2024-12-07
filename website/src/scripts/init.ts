import { logoschemes, projectsData, reposData, translationData } from './globals';
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

    let logoscheme = "germany";
    if (new Date().getMonth() == 6) {
        logoscheme = "lgbt";
    }

    // For the mean time
    logoscheme = "ukraine";

    console.log(`%c______________________________________________________________
%c_/\\/\\/\\/\\/\\______________________________________________/\\/\\_
%c_/\\/\\____/\\/\\__/\\/\\__/\\/\\____/\\/\\/\\____/\\/\\/\\____________/\\/\\_
%c_/\\/\\/\\/\\/\\____/\\/\\/\\/\\____/\\/\\/\\/\\/\\______/\\/\\______/\\/\\/\\/\\_
%c_/\\/\\____/\/\\__/\\/\\________/\\/\\________/\\/\\/\\/\\____/\\/\\__/\\/\\__
%c_/\\/\\/\\/\\/\\____/\\/\\__________/\\/\\/\\/\\__/\\/\\/\\/\\/\\____/\\/\\/\\/\\_`,
        logoschemes.flags[logoscheme][0],
        logoschemes.flags[logoscheme][1],
        logoschemes.flags[logoscheme][2],
        logoschemes.flags[logoscheme][3],
        logoschemes.flags[logoscheme][4],
        logoschemes.flags[logoscheme][5]
    );
}