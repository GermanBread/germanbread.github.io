<script lang="ts">
    import Navrow from "../components/Navrow.svelte";
	import SectionSep from "./SectionSep.svelte";
	import Projects from "./Projects.svelte";
	import Credits from "./Credits.svelte";
	import About from "./About.svelte";
	import Repos from "./Repos.svelte";
    import { onMount } from "svelte";
    import { currentTheme } from "../scripts/globals";
    
    let hidden = true,
        forceHidden = true,
        y : number,
        logoMount : HTMLElement;
    $: hidden = (y > logoMount?.clientTop + logoMount?.clientHeight / 16) || forceHidden;

    onMount(() => {
        setTimeout(() => {
            forceHidden = false;
        }, 500);
    })
</script>

<svelte:window bind:scrollY="{y}" />

<div id="logo-mount" bind:this="{logoMount}">
    <div id="hello" class:hidden>
        <span>Hi.</span>
    </div>
    <Navrow />
    <div class="cover"></div>
    
    <div class="background" class:dark="{($currentTheme).startsWith("dark")}"></div>
    
    <div>
        <About />
        <SectionSep />
        <Projects />
        <SectionSep />
        <Repos />
        <SectionSep />
        <Credits />
    </div>
</div>

<style lang="scss">
    #hello {
        display: grid;
        place-content: center;
        min-height: 50vh;
        
        >span {
            font-size: 4rem;
            text-align: center;
            
            text-shadow: .05em .05em .1em var(--shadow);
            color: var(--text);
            opacity: 1;
            
            font-weight: 500;
            text-decoration: underline;

            transition: transform .5s ease-out,
                opacity .5s ease-out;
        }

        &.hidden >span {
            transform: translateY(-2em);
            opacity: 0;

            transition: transform .5s ease-in,
                opacity .5s ease-in;
        }
    }

    .cover {
        z-index: -3;
        
        position: absolute;
        
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        //height: 35%;

        background-color: transparent;
        backdrop-filter: blur(.5em);
    }

    .background {
        position: absolute;

        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        z-index: -5;

        background-size: cover;

        background-image: url('/build/images/taiga.webp');
        &.dark {
            background-image: url('/build/images/sunset.webp');
        }
    }
</style>