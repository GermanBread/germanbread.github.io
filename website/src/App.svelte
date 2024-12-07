<script lang="ts">
	import Portfolio from "./portfolio/Portfolio.svelte";
	//import LandingPage from "./main/LandingPage.svelte";
    import Greeting from "./greeter/Greeter.svelte";
	//import Memes from "./memes/Memes.svelte";
	// Note: might scrap multi-"page" idea completely
	// Note2 (from the future): I might use Svelte Kit

    import { currentTheme, greeting, page, themes, translationData } from "./scripts/globals";
	import { onMount } from "svelte";

	// Despite what your linter might tell you, this variable is used
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
	{#if translationLoaded}
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
</style>