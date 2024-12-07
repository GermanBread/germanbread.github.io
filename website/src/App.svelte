<script lang="ts">
	import Portfolio from "./portfolio/Portfolio.svelte";
    import Greeting from "./greeter/Greeter.svelte";

    import { currentTheme, greeting, themes, translationData } from "./scripts/globals";
	import { onMount } from "svelte";

	// Despite what your linter might tell you, this variable is being used
	let appTheme : string;

	let translationLoaded : boolean = false
	
	function checkIfTranslationAvailable() {
        if ($translationData != undefined) translationLoaded = true;
        else requestAnimationFrame(checkIfTranslationAvailable);
    }

	if (Object.keys(themes).indexOf($currentTheme) === -1) {
		$currentTheme = "dark-contrast";
	}
	
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
	<Portfolio />
	{/if}
	{/if}

	<div class="overlay"></div>

    {@html `<style>
		:root {
			${appTheme}
		}
	</style>`}
</main>

<style lang=scss>
    @import 'styles/global.scss';

	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;

		opacity: .025;
		z-index: 999999;
		background: repeating-linear-gradient(
			to bottom,
			white 0px,
			white 2px,
			black 2px,
			black 4px
		);
		pointer-events: none;
		animation: scanline .25s infinite step-end;
	}
	
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

	@keyframes scanline {
		50% {
			transform: translateY(2px);
		}
	}
</style>