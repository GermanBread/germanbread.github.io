<script lang="ts">
import ClickyButton from "../components/ClickyButton.svelte";
import Toggle from '../components/Toggle.svelte';

import { translationData, greeting, currentTheme, themes, greeterVer } from "../scripts/globals";
import type { TranslationData } from "../scripts/types";
import { fly } from "svelte/transition";
import { onMount } from 'svelte';

    let translation : TranslationData["greeting"],
        previewTheme = $currentTheme,    
        darkmode = previewTheme.startsWith("dark"),
        highContrastMode = previewTheme.endsWith("contrast"),
        themeIndex : number,
        theme = "";
    $: translation = $translationData?.greeting;
    $: themeIndex = Number(!darkmode) | Number(!highContrastMode) << 1;
    $: previewTheme = Object.keys(themes).at(themeIndex);

    onMount(() => {
        setTimeout(() => {
			window.scroll(0, 0);
		}, 100);
    });

    function quit() {
        $greeting = false;
        localStorage.setItem("theme", previewTheme);
        $currentTheme = previewTheme;
        localStorage.setItem("greeter_ver", greeterVer.toString());
        setTimeout(() => {
			window.scroll(0, 0);
		}, 100);
    }

    $: {
        theme = "";
        Object.keys(themes[previewTheme]).forEach(key => {
            theme += `--${key}: ${themes[previewTheme][key]};`
        });
    }
</script>

<div id="greeting-mount" class="view {previewTheme}" style="{theme}"
    in:fly="{{ duration : 1000, y : -15 }}">
    <div id="title">
        <h1>{translation?.title ?? "..."}</h1>
        <hr>
    </div>
    <div class="panel center">
        <h1>{translation?.theme}</h1>
        <div class="left">
            <Toggle label="{translation?.dark ?? "..."}" bind:on="{darkmode}" />
            <Toggle label="{translation?.contrast ?? "..."}" bind:on="{highContrastMode}" />
        </div>
        <ClickyButton clickEvent="{() => { quit(); }}">{$translationData?.greeting.done ?? "..."}</ClickyButton>
    </div>
</div>

<style lang="scss">
    @import "../styles/global.scss";

    #greeting-mount {
        background-color: var(--background);
        color: var(--text);
        
        hr {
            transition: border-color 1s 0.5s ease-in-out;
        }

        transition: background-color 1s ease-in-out,
            color 1s 0.5s ease-in-out;

        >.panel {
            transition: background-color 1s ease-in-out;
        }
    }

    .panel::before {
        display: none;
    }

    .center, .left {
        display: flex;
        flex-direction: column;
    }
    
    .center {
        align-items: center;
    }

    .left {
        align-items: left;
    }

    hr {
        width: 100%;
    }
</style>
