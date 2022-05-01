import { writable } from 'svelte/store';
import type { TranslationData, RepoData } from './types'

export const greeterVer = 2;

// I LOVE this
export const currentTheme = writable(localStorage.getItem("theme") ?? "dark");
export const translationData = writable<TranslationData>(null);
export const projectsData = writable<RepoData>(null);
export const reposData = writable<RepoData>(null);
export const greeting = writable(localStorage.getItem("greeter_ver") !== greeterVer.toString());

export const themes = {
    "dark-contrast" : {
        background : "hsl(0deg,   0%,   0%  )",
        intense    : "hsl(0deg,   0%,   5%  )",
        text       : "hsl(100deg, 100%, 50% )",
        primary    : "hsl(150deg, 25%,  10% )",
        secondary  : "hsl(150deg, 25%,  10% )"
    },
    "light-contrast" : {
        background : "hsl(0deg,   0%,   100%)",
        intense    : "hsl(0deg,   0%,   90% )",
        text       : "hsl(150deg, 0%,   0%  )",
        primary    : "hsl(150deg, 25%,  80% )",
        secondary  : "hsl(150deg, 25%,  80% )"
    },
    "dark" : {
        background : "hsl(210deg, 15%,  8%  )",
        intense    : "hsl(210deg, 15%,  6%  )",
        text       : "hsl(210deg, 15%,  100%)",
        primary    : "hsl(150deg, 100%, 35% )",
        secondary  : "hsl(170deg, 100%, 35% )"
    },
    "light" : {
        background : "hsl(210deg, 0%,   92% )",
        intense    : "hsl(210deg, 0%,   84% )",
        text       : "hsl(210deg, 0%,   0%  )",
        primary    : "hsl(150deg, 100%, 60% )",
        secondary  : "hsl(170deg, 100%, 60% )"
    }
};

export const logoschemes = {
    flags : {
        "ukraine" : [
            'background-color: rgb(0  ,  0,255); color: rgb(255,255,255);',
            'background-color: rgb(0  ,  0,255); color: rgb(255,255,255);',
            'background-color: rgb(0  ,  0,255); color: rgb(255,255,255);',
            'background-color: rgb(255,255,  0); color: rgb(0  ,0  ,0  );',
            'background-color: rgb(255,255,  0); color: rgb(0  ,0  ,0  );',
            'background-color: rgb(255,255,  0); color: rgb(0  ,0  ,0  );'
        ],
        "germany" : [
            'background-color: rgb(0  ,0  ,0  ); color: rgb(255,255,255);',
            'background-color: rgb(0  ,0  ,0  ); color: rgb(255,255,255);',
            'background-color: rgb(255,0  ,0  ); color: rgb(0  ,0  ,0  );',
            'background-color: rgb(255,0  ,0  ); color: rgb(0  ,0  ,0  );',
            'background-color: rgb(255,255,0  ); color: rgb(0  ,0  ,0  );',
            'background-color: rgb(255,255,0  ); color: rgb(0  ,0  ,0  );'
        ],
        "lgbt" : [
            'background-color: rgb(255,0  ,0  ); color: rgb(0  ,0  ,0  );',
            'background-color: rgb(255,125,0  ); color: rgb(0  ,0  ,0  );',
            'background-color: rgb(255,255,0  ); color: rgb(0  ,0  ,0  );',
            'background-color: rgb(0  ,255,0  ); color: rgb(0  ,0  ,0  );',
            'background-color: rgb(0  ,125,255); color: rgb(0  ,0  ,0  );',
            'background-color: rgb(125,0  ,255); color: rgb(255,255,255);'
        ]
    }
}