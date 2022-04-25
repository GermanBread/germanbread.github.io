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

    let hiTextData = {
            // in milliseconds
            interval: 80,
            // int * interval
            deletionEndPause: 0,
            typingEndPause: 25,
            // do not change below
            cooldown: 0,
            state: TextAnimationState.DeletingEnd,
            madeChoice: false,
            shown: {
                length: 0,
                selected: "",
                value: ""
            }
        },
        wordBgData = {
            minlength: 1,
            element: null
        };

    function pickRandom<T>(array: T[]) {
        if (!array) return undefined;
        const _index = Math.floor(Math.random() * array.length);
        return array[_index];
    }

    async function animateBuzzWords() {
        if (wordBgData.element && window.scrollY < wordBgData.element?.getBoundingClientRect().height) {
            const _children = wordBgData.element.querySelectorAll(".text");
            _children.forEach((child) => {
                child.classList.remove("active");
                if (Math.random() > .75) child.classList.add("active");
            });
        }
    }

    function chooseHiText() {
        return $translationData.portfolio.greetings[Math.floor(Math.random() * $translationData.portfolio.greetings.length)];
    }

    async function animateHiText() {
        switch (hiTextData.state) {
            case TextAnimationState.Typing:
                do {
                    hiTextData.shown.length++;
                } while (hiTextData.shown.selected[hiTextData.shown.length - 1] == ' ');
                if (hiTextData.shown.length == hiTextData.shown.selected.length) {
                    hiTextData.cooldown = hiTextData.typingEndPause;
                    hiTextData.state = TextAnimationState.TypingEnd;
                }

                hiTextData.madeChoice = false;
                break;
            case TextAnimationState.Deleting:
                do {
                    hiTextData.shown.length--;
                } while (hiTextData.shown.selected[hiTextData.shown.length - 1] == ' ');
                if (hiTextData.shown.length == 0) {
                    hiTextData.cooldown = hiTextData.deletionEndPause;
                    hiTextData.state = TextAnimationState.DeletingEnd;
                }
                break;
            case TextAnimationState.TypingEnd:
                hiTextData.cooldown--;
                if (hiTextData.cooldown <= 0) hiTextData.state = TextAnimationState.Deleting;
                break;
            case TextAnimationState.DeletingEnd:
                if (!hiTextData.madeChoice) {
                    let choice = chooseHiText();

                    while (choice == hiTextData.shown.selected) {
                        choice = chooseHiText();
                    }

                    hiTextData.shown.selected = choice;

                    hiTextData.madeChoice = true;
                }

                hiTextData.cooldown--;
                if (hiTextData.cooldown <= 0) hiTextData.state = TextAnimationState.Typing;
                break;
        }

        hiTextData.shown.value = hiTextData.shown.selected.slice(0, hiTextData.shown.length);
    }

    translationData.subscribe((e) => {
        if (e != null) {
            setInterval(animateHiText, hiTextData.interval);
            setInterval(animateBuzzWords, 1500);
            wordBgData.minlength = e.portfolio.buzzwords.reduce((acc, val) => val.length < acc.length ? val : acc).length;
            console.log(wordBgData);
        }
    });
</script>

<div id="logo-mount" in:fly="{{ duration: 1000, y: -50 }}">
    <div id="hello">
        <span>{hiTextData.shown.value}</span>
    </div>
    <Navrow />
    <div class="background-wrapper">
        <div class="background" bind:this="{wordBgData.element}" in:fly="{{ y: 25, duration: 2000, delay: 1000 }}">
            {#each Array(Math.ceil(window.innerHeight / 50) * Math.ceil(window.innerWidth / wordBgData.minlength / 40)) as _, i}
            <div class="text" class:active="{Math.random() > .75}">{pickRandom($translationData?.portfolio.buzzwords) ?? ""}</div>
            {/each}
        </div>
    </div>
    
    <div>
        <About/>
        <SectionSep />
        <!--<Projects />
        <SectionSep />-->
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
            
            min-height: 4rem;
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
        display: flex;
        flex-wrap: wrap;
        padding: 2ch;
        gap: 2ch;

        color: transparent;
        overflow: hidden;

        .text {
            user-select: none;
            
            background: linear-gradient(.25turn, var(--primary), var(--secondary));
            background-clip: text;
            -webkit-background-clip: text;

            filter: grayscale(1);
            flex-shrink: 0;
            flex-grow: 1;
            
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