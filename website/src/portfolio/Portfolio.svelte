<script lang="ts">
import { TextAnimationState, TranslationData } from "../scripts/types";
import { translationData } from "../scripts/globals";
import Navrow from "../components/Navrow.svelte";
import SectionSep from "./SectionSep.svelte";
import Projects from "./Projects.svelte";
import { fly } from "svelte/transition";
import Credits from "./Credits.svelte";
import About from "./About.svelte";
import Repos from "./Repos.svelte";
import { onMount } from "svelte";

    let animatedTextBackground: HTMLElement,
        hiTextAnimationState = TextAnimationState.DeletingEnd,
        selectedHiText: string = "",
        hiTextCooldown: number = 0,
        shownHiText: string = "";

    function pickRandom<T>(array: T[]) {
        if (!array) return undefined;
        const _index = Math.floor(Math.random() * array.length);
        return array[_index];
    }

    async function animateBuzzWords() {
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

    function chooseHiText() {
        return $translationData.portfolio.greetings[Math.floor(Math.random() * $translationData.portfolio.greetings.length)];
    }

    async function animateHiText() {
        switch (hiTextAnimationState) {
            case TextAnimationState.Typing:
                shownHiText = selectedHiText.slice(0, shownHiText.length + 1);
                if (shownHiText.length == selectedHiText.length) {
                    hiTextCooldown = 10;
                    hiTextAnimationState = TextAnimationState.TypingEnd;
                }
                break;
            case TextAnimationState.Deleting:
                shownHiText = selectedHiText.slice(0, shownHiText.length - 1);
                if (shownHiText.length == 0) {
                    hiTextCooldown = 5;
                    hiTextAnimationState = TextAnimationState.DeletingEnd;
                }
                break;
            case TextAnimationState.TypingEnd:
                hiTextCooldown--;
                if (hiTextCooldown <= 0) hiTextAnimationState = TextAnimationState.Deleting;
                break;
            case TextAnimationState.DeletingEnd:
                {
                    let choice = chooseHiText();
                    //while (choice == selectedHiText) choice = chooseHiText();

                    selectedHiText = choice;
                }

                hiTextCooldown--;
                if (hiTextCooldown <= 0) hiTextAnimationState = TextAnimationState.Typing;
                break;
        }
    }

    translationData.subscribe((e) => {
        if (e != null) setInterval(animateHiText, 100);
    });

    onMount(() => {
        animateBuzzWords();
    })
</script>

<div id="logo-mount" in:fly="{{ duration: 1000, y: -50 }}">
    <div id="hello">
        <span>{shownHiText}</span>
    </div>
    <div in:fly="{{ y: 50, duration: 2000, delay: 1000 }}">
        <Navrow />
    </div>
    <div class="background-wrapper">
        <div class="background" bind:this="{animatedTextBackground}" in:fly="{{ y: 25, duration: 2000, delay: 1000 }}">
            {#each Array(Math.ceil(window.innerHeight / 125) * Math.ceil(window.innerWidth / 125)) as _, i}
                <div class="text" class:active="{Math.random() > .75}">{pickRandom($translationData?.portfolio.buzzwords) ?? ""}</div>
            {/each}
        </div>
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
            
            height: 5.5rem;
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

    .background-wrapper {
        z-index: -5;
        
        position: absolute;

        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        max-height: 100vh;
        overflow-y: hidden;

        &::after {
            content: '';
            position: absolute;

            left: 0;
            right: 0;
            bottom: 0;
            height: 25vh;

            background: linear-gradient(-.5turn, transparent, var(--background));
        }
    }
    
    .background {
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
    }
</style>