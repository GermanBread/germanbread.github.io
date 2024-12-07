<script lang="ts">
	import Portfolio from "./portfolio/Portfolio.svelte";
	//import LandingPage from "./main/LandingPage.svelte";
    import Greeting from "./greeter/Greeter.svelte";
	//import Memes from "./memes/Memes.svelte";
	// Note: might scrap multi-"page" idea completely

    import { currentTheme, greeting, page, themes } from "./scripts/globals";

	let appTheme : string;

	page.subscribe((val) => {
		localStorage.setItem("page", val);
	});
	$page = "portfolio";

	//if (Object.keys(themes).indexOf($currentTheme) === -1) {
	//	$currentTheme = "dark-contrast";
	//}
	
	$: {
        appTheme = "";
		Object.keys(themes[$currentTheme]).forEach(key => {
            appTheme += `--${key}: ${themes[$currentTheme][key]};`
        });
    }
</script>

<main>
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