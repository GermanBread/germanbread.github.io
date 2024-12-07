<script lang="ts">
	import Portfolio from "./portfolio/Portfolio.svelte";
	//import LandingPage from "./main/LandingPage.svelte";
    import Greeting from "./greeter/Greeter.svelte";
	//import Memes from "./memes/Memes.svelte";
	// Note: might scrap multi-"page" idea completely

    import { currentTheme, greeting, page, themes, translationData } from "./scripts/globals";
import { onMount } from "svelte";

	let appTheme : string;

	page.subscribe((val) => {
		localStorage.setItem("page", val);
	});
	$page = "portfolio";

	let translationLoaded : boolean = false
	
	function checkIfTranslationAvailable() {
        // Slowly fade in, even if the content is already loaded
        if (!$translationData) setTimeout(() => {
            translationLoaded = true;
        }, 100);
        else requestAnimationFrame(checkIfTranslationAvailable);
    }

	//if (Object.keys(themes).indexOf($currentTheme) === -1) {
	//	$currentTheme = "dark-contrast";
	//}
	
	$: {
        appTheme = "";
		Object.keys(themes[$currentTheme]).forEach(key => {
            appTheme += `--${key}: ${themes[$currentTheme][key]};`
        });
    }

	onMount(() => {
		checkIfTranslationAvailable();
	});
</script>

<main>
    <div class="loading-cover" class:visible="{!translationLoaded}"></div>
	
	{#if $greeting}
		<Greeting />
	{:else}
		<!--{#if $page === "memes"}
			<Memes />
		{:else if $page === "portfolio"}
			<Portfolio />
		{:else}
			<LandingPage />
		{/if}-->
		<Portfolio />
    {/if}

    {@html `<style>
		:root {
			${appTheme}
		}
	</style>`}
</main>

<style lang="scss">
    @import 'styles/global.scss';
	
	:global(body) {
		padding: 0;
		
		--shadow: #000A;
		background-color: var(--background);
		color: var(--text);
	}

	:global(html) {
		scroll-behavior: smooth;
		@media (prefers-reduced-motion: reduce) {
			scroll-behavior: auto;
		}
		font-size: clamp(12px, 2vw, 18px);
		* {
			font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		}
	}

	.loading-cover {
        position: fixed;
        
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        pointer-events: none;
        z-index: 999;
        transition: background-color 1s;

        &.visible {
            background-color: var(--background, black);
        }
    }
</style>