<script lang="ts">
	import SectionSep from "./SectionSep.svelte";
	import Projects from "./Projects.svelte";
	import Greeting from "./Greeting.svelte";
	import Credits from "./Credits.svelte";
	import About from "./About.svelte";
	import Repos from "./Repos.svelte";
	import Logo from "./Logo.svelte";
	
	import { colourScheme, colourSchemes, greeting } from "./globals";
	import { onMount } from "svelte";

	$: currentScheme = `
	    --background : ${colourSchemes[$colourScheme].background};
		--intense    : ${colourSchemes[$colourScheme].intense};
		--text       : ${colourSchemes[$colourScheme].text};
		--primary    : ${colourSchemes[$colourScheme].primary};
		--secondary  : ${colourSchemes[$colourScheme].secondary};
	`;
</script>

<main>
	{#if $greeting}
		<Greeting />
	{:else}
		<Logo />
		<About />
		<SectionSep />
		<Projects />
		<SectionSep />
		<Repos />
		<SectionSep />
		<Credits />
	{/if}
	{@html `<style>
		:root {
			${currentScheme}
		}
	</style>`}
</main>

<style lang="scss">
	@import './colourschemes.scss';

	:global(body) {
		padding: 0;
		overflow-x: hidden;
		
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
	}
</style>