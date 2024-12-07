<script lang="ts">
    export let hidden = false;
    export let fixed = false;

    let toggled = fixed;
    
    import { greeting, translationData } from "./globals";
    import ClickyButton from "./ClickyButton.svelte";
    import type { TranslationData } from "./Types";

    let navbarlabels : TranslationData["menu"];
    translationData.subscribe((data) => {
        navbarlabels = data?.menu
    });

    function backToGithub() {
        hidden = true;
        setTimeout(() => {
            window.location.href = "https://github.com/GermanBread";
        }, 500);
    }
    function scrollto(sectionMount) {
        document.body.querySelector(`#${sectionMount}-mount`)?.scrollIntoView();
    }
</script>

<div id="navbar-mount" class:fixed>
    <div class="buttons">
        <ClickyButton clickEvent="{backToGithub}"                    visible="{!hidden && !toggled}" delay=".2s " label="{navbarlabels?.github}"   />
        <ClickyButton clickEvent="{() => { scrollto("about"); }}"    visible="{!hidden && !toggled}" delay=".4s " label="{navbarlabels?.about}"    />
        <ClickyButton clickEvent="{() => { scrollto("projects"); }}" visible="{!hidden && !toggled}" delay=".6s " label="{navbarlabels?.projects}" />
        <ClickyButton clickEvent="{() => { scrollto("repos"); }}"    visible="{!hidden && !toggled}" delay=".8s " label="{navbarlabels?.repos}"    />
        <ClickyButton clickEvent="{() => { scrollto("credits"); }}"  visible="{!hidden && !toggled}" delay="1s  " label="{navbarlabels?.credits}"  />
        <ClickyButton clickEvent="{() => { $greeting = true; }}"     visible="{!hidden && !toggled}" delay="1.2s" label="{navbarlabels?.theme}"    />
    </div>
    {#if fixed}
        <button on:click="{() => {toggled = !toggled;}}" class="toggle" class:toggled class:hidden></button>
    {/if}
</div>

<style lang="scss">
    #navbar-mount {
        &.fixed {
            position: fixed;
            top: .25em;
            width: 100vw;
            z-index: 5;
        }
        >.buttons {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
        }
    }
    .toggle {
        position: fixed;
        top: 0;
        right: 0;
        width: 3em;
        height: 3em;
        transition: transform .5s ease-out;
        
        border: none;
        background-color: var(--text);
        box-shadow: 0 0 .25em var(--shadow);
        border-radius: 0 0 0 1em;
        aspect-ratio: 1;

        $hamburger-padding-inline: 1em;
        $hamburger-padding-block: 1.1em;
        &::before {
            position: absolute;
            top: $hamburger-padding-block;
            left: $hamburger-padding-inline;
            right: $hamburger-padding-inline;
            height: .2em;
            
            content: '';
            background-color: var(--intense);

            transform: rotateZ(45deg);

            transition: transform .1s ease-out;
        }
        &::after {
            position: absolute;
            left: $hamburger-padding-inline;
            right: $hamburger-padding-inline;
            bottom: $hamburger-padding-block;
            height: .2em;
            
            content: '';
            background-color: var(--intense);

            transform: rotateZ(-45deg);

            transition: transform .1s .1s ease-out;
        }
        
        &.toggled {
            &::before {
                transform: rotateZ(-45deg);
            }
            &::after {
                transform: rotateZ(45deg);
            }
        }
        &.hidden {
            transition: transform .5s ease-in;
            transform: translateY(-5em);
        }
    }
</style>