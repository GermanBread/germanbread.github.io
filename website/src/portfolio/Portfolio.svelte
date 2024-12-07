<script lang="ts">
    import Navrow from "../components/Navrow.svelte";
	import SectionSep from "./SectionSep.svelte";
	import Projects from "./Projects.svelte";
	import Credits from "./Credits.svelte";
	import About from "./About.svelte";
	import Repos from "./Repos.svelte";
    import { onMount } from "svelte";
    import { translationData } from "../scripts/globals";

    let animatedTextBackground : HTMLElement;

    function pickRandom<T>(array : T[]) {
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
                console.log("firing!");
            }
            animateBuzzWords();
        }, 1500);
    }

    onMount(() => {
        animateBuzzWords();
    })
</script>

<div id="logo-mount">
    <div id="hello">
        <span>Hi</span>
    </div>
    <Navrow />
    <div class="background" bind:this="{animatedTextBackground}">
        {#each Array(Math.ceil(window.innerHeight / 30)) as _, i}
            <div class="row">
                {#each Array(Math.ceil(window.innerWidth / 150)) as _, j}
                    <div class="text" class:active="{Math.random() > .75}">{pickRandom($translationData?.portfolio.buzzwords) ?? ""}</div>
                {/each}
            </div>
        {/each}
    </div>
    
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

        color: transparent;
        overflow: hidden;

        .row {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(20ch, 1fr));
            overflow: hidden;
            
            max-height: 1.5rem;
            padding: 1rem;
            gap: 1rem;
        }

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