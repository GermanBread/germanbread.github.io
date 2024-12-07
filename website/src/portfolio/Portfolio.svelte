<script lang="ts">
import { translationData } from "../scripts/globals";
import Navrow from "../components/Navrow.svelte";
import SectionSep from "./SectionSep.svelte";
import Projects from "./Projects.svelte";
import { fly } from "svelte/transition";
import Credits from "./Credits.svelte";
import About from "./About.svelte";
import Repos from "./Repos.svelte";
import { onMount } from "svelte";

    let animatedTextBackground: HTMLElement;

    function pickRandom<T>(array: T[]) {
        if (!array) return undefined;
        const _index = Math.floor(Math.random() * array.length);
        return array[_index];
    }

    function animateBuzzWords() {
        setTimeout(() => {
            if (animatedTextBackground && window.scrollY < animatedTextBackground?.getBoundingClientRect().height) {
                const _children = animatedTextBackground.querySelectorAll(".text");
                _children.forEach((child) => {
                    child.classList.remove("active");
                    if (Math.random() > .75) child.classList.add("active");
                });
            }
            animateBuzzWords();
        }, 1500);
    }

    onMount(() => {
        animateBuzzWords();
    })
</script>

<div id="logo-mount" in:fly="{{ duration: 1000, y: -50 }}">
    <div id="hello">
        <span>Hi</span>
    </div>
    <div in:fly="{{ y: 50, duration: 2000, delay: 1000 }}">
        <Navrow />
    </div>
    <div class="background" bind:this="{animatedTextBackground}" in:fly="{{ y: 25, duration: 2000, delay: 1000 }}">
        {#each Array(Math.ceil(window.innerHeight / 150) * Math.ceil(window.innerWidth / 150)) as _, i}
            <div class="text" class:active="{Math.random() > .75}">{pickRandom($translationData?.portfolio.buzzwords) ?? ""}</div>
        {/each}
    </div>
    
    <div>
        <About/>
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

        user-select: none;

        >span {
            position: relative;
            
            font-size: 4rem;
            text-align: center;
            
            color: var(--text);
            
            font-weight: 500;

            &::after {
                content: ' ';
                
                position: absolute;
                bottom: .1em;
                right: -.75ch;
                width: .75ch;
                height: .1em;

                opacity: 1;
                background-color: var(--text);

                animation: cursor 1.5s infinite ease-in-out;
            }
        }

        @keyframes cursor {
            to {
                opacity: 0;
            }
        }
    }

    .background {
        position: absolute;

        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        z-index: -5;

        padding: 2%;
        gap: 1em;

        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(25ch, 1fr));
        grid-template-rows: repeat(auto-fit, minmax(3em, 1fr));

        color: transparent;
        overflow: hidden;

        .text {
            user-select: none;
            
            background: linear-gradient(.25turn, var(--primary), var(--secondary));
            background-clip: text;
            -webkit-background-clip: text;

            filter: grayscale(1);
            
            overflow: hidden;
            font-size: 1.5rem;
            text-align: center;
            opacity: .5;

            transition: filter 1s ease;

            &.active {
                filter: none;
            }
        }

        &::after {
            content: '';
            position: absolute;

            left: 0;
            right: 0;
            bottom: 0;
            height: 10vh;

            background: linear-gradient(-.5turn, transparent, var(--background));
        }
    }
</style>