import { writable } from 'svelte/store';
import type { TranslationData, RepoData } from './Types'

// I LOVE this
export const colourScheme = writable(localStorage.getItem("colourscheme") ?? "contrast");
export const translationData = writable<TranslationData>(null);
export const projectsData = writable<RepoData>(null);
export const reposData = writable<RepoData>(null);
export const greeting = writable(localStorage.getItem("greeter_ver") !== "1");

export const colourSchemes = {
    "nord" : {
        background : "hsl(203deg, 30%,  26%)",
        intense    : "hsl(202deg, 30%,  17%)",
        text       : "hsl(191deg, 100%, 91%)",
        primary    : "hsl(146deg, 100%, 40%)",
        secondary  : "hsl(169deg, 100%, 33%)"
    },
    "air" : {
        background : "hsl(190deg, 100%, 90%)",
        intense    : "hsl(190deg, 100%, 70%)",
        text       : "hsl(190deg, 50%,  20%)",
        primary    : "hsl(180deg, 100%, 80%)",
        secondary  : "hsl(200deg, 100%, 80%)"
    },
    "sweet" : {
        background : "hsl(260deg, 100%, 25%)",
        intense    : "hsl(260deg, 100%, 15%)",
        text       : "hsl(260deg, 100%, 100%)",
        primary    : "hsl(260deg, 100%, 50%)",
        secondary  : "hsl(280deg, 100%, 50%)"
    },
    "contrast" : {
        background : "hsl(0deg,   0%,   0%)",
        intense    : "hsl(0deg,   0%,   10%)",
        text       : "hsl(100deg, 100%, 50%)",
        primary    : "hsl(0deg,   0%,   20%)",
        secondary  : "hsl(0deg,   0%,   20%)"
    },
    "sleek" : {
        background : "hsl(0deg,   0%,   5%)",
        intense    : "hsl(0deg,   0%,   10%)",
        text       : "hsl(191deg, 100%, 91%)",
        primary    : "hsl(0deg,   0%,   15%)",
        secondary  : "hsl(0deg,   0%,   30%)"
    },
    "night" : {
        background : "hsl(0deg,   0%,   0%)",
        intense    : "hsl(0deg,   0%,   5%)",
        text       : "hsl(0deg,   0%,   85%)",
        primary    : "hsl(146deg, 100%, 25%)",
        secondary  : "hsl(169deg, 100%, 30%)"
    },
    "white" : {
        background : "hsl(190deg, 0%,   90%)",
        intense    : "hsl(190deg, 0%,   100%)",
        text       : "hsl(190deg, 0%,   20%)",
        primary    : "hsl(146deg, 100%, 75%)",
        secondary  : "hsl(169deg, 100%, 70%)"
    }
}