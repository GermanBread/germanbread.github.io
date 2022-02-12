<script lang="ts">
import { page, translationData } from "../scripts/globals";
import type { TranslationData } from "../scripts/types";
import { onMount } from "svelte";
    
    let translation : TranslationData["landing"];
    $: translation = $translationData?.landing;

    let cards : HTMLElement[] = [];

    // Svelte use:inView is a thing made by someone btw, it does not give me enough granular control though
    function scrollHandler() {
        let biggest = cards.reduce((acc, cur) => acc = acc.getBoundingClientRect().top > cur.getBoundingClientRect().top ? acc : cur);
        cards.forEach((card, index) => {
            let top = ((scrollY + window.innerHeight * 1.1) / window.innerHeight) - (card.getBoundingClientRect().top / biggest.getBoundingClientRect().top) - .5;
            let transform = Math.max(2 - top*2, 0);
            card.style.opacity = `${top}`;
            if (index % 2) {
                card.style.transform = `translateX(${transform}em)`;
            } else {
                card.style.transform = `translateX(-${transform}em)`;
            }
        });
    }

    // Call first time
    onMount(scrollHandler);
</script>

<svelte:window on:scroll="{scrollHandler}"/>

<main>
    <div class="view">
        <div id="title">
            <h1>{translation?.title}</h1>
            <hr>
        </div>
        <div class="highlight" bind:this="{cards[cards.length]}">
            <div class="flex flex-g2">
                <div class="split">
                    <svg class="inverted inset" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.5 11h-11c-.275 0-.5.225-.5.5v1a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm0-4h-11c-.275 0-.5.225-.5.5v1a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm-5 8h-6c-.275 0-.5.225-.5.5v1a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm5-12h-11c-.275 0-.5.225-.5.5v1a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z"/></svg>
                </div>
                <div class="split">
                    <h1>{translation?.main}</h1>
                    <p>{translation?.maindesc}</p>
                    <button on:click="{() => { $page = "portfolio"; }}">{translation?.go}</button>
                </div>
            </div>
        </div>
        <div class="highlight" bind:this="{cards[cards.length]}">
            <div class="flex flex-g2">
                <div class="split">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 44 44" style="enable-background:new 0 0 44 44;" xml:space="preserve"><g><path d="M22,0C9.869,0,0,9.869,0,22s9.869,22,22,22s22-9.869,22-22S34.131,0,22,0z M26.359,16.232l6-5   c0.426-0.354,1.056-0.296,1.409,0.128s0.296,1.055-0.128,1.408L28.562,17l5.078,4.232c0.424,0.354,0.481,0.984,0.128,1.408   C33.57,22.877,33.286,23,32.999,23c-0.226,0-0.452-0.076-0.64-0.232l-6-5C26.132,17.578,26,17.297,26,17   S26.132,16.422,26.359,16.232z M11.359,12.768c-0.424-0.354-0.481-0.984-0.128-1.408c0.354-0.424,0.982-0.482,1.409-0.128l6,5   C18.868,16.422,19,16.703,19,17s-0.132,0.578-0.359,0.768l-6,5C12.453,22.924,12.227,23,12.001,23c-0.287,0-0.571-0.123-0.77-0.36   c-0.354-0.424-0.296-1.055,0.128-1.408L16.437,17L11.359,12.768z M22,40c-6.617,0-12-5.383-12-12c0-0.552,0.447-1,1-1h22   c0.553,0,1,0.448,1,1C34,34.617,28.617,40,22,40z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
                </div>
                <div class="split">
                    <h1>{translation?.memes}</h1>
                    <p>{translation?.memesdesc}</p>
                    <button on:click="{() => { $page = "memes"; }}">{translation?.go}</button>
                </div>
            </div>
        </div>
        <div class="highlight" bind:this="{cards[cards.length]}">
            <div class="flex flex-g2">
                <div class="split">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="226.777px" height="226.777px" viewBox="0 0 226.777 226.777" enable-background="new 0 0 226.777 226.777" xml:space="preserve"><path fill="#FFFFFF" d="M113.385,0C50.763,0,0,50.763,0,113.385s50.764,113.385,113.385,113.385s113.385-50.764,113.385-113.385  S176.006,0,113.385,0z M124.641,158.821L92.318,99.729l-31.305,54.214h52.174l2.382,4.878H52.109L115.568,52.66l59.092,106.161  H124.641z"/></svg>
                </div>
                <div class="split">
                    <h1>{translation?.arnix}</h1>
                    <p>{translation?.arnixdesc}</p>
                    <button on:click="{() => { window.location.replace("/Arnix") }}">{translation?.go}</button>
                </div>
            </div>
        </div>
        <div id="spacer"></div>
    </div>
</main>

<style lang="scss">
    @import '../styles/flex.scss';
    @import '../styles/content.scss';

    #spacer {
        height: 25vh;
    }

    svg {
        height: 10em;
        width: 10em;
        border-radius: 50em;

        fill: var(--text);
        background-color: var(--background);
        * {
            fill: var(--text);
            background-color: var(--background);
        }

        &.inverted {
            fill: var(--background);
            background-color: var(--text);
            * {
                fill: var(--background);
                background-color: var(--text);
            }
        }
        &.inset {
            padding: 1em;
            height: 8em;
            width: 8em;
        }
    }
</style>