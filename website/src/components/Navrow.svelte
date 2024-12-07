<script lang="ts">
import { greeting, page, translationData } from "../scripts/globals";
import type { TranslationData } from "../scripts/types";
    
    let navbarlabels : TranslationData["menu"],
        scrolled : Boolean;
    $: navbarlabels = $translationData?.menu;

    function scrollto(sectionMount) {
        document.body.querySelector(`#${sectionMount}-mount`)?.scrollIntoView();
    }
</script>

<svelte:window on:scroll="{() => {
    scrolled = window.scrollY > (window.innerHeight / 10)
}}" />

<div id="navbar-mount" class:compact="{!scrolled}">
    <div class="bg">
        <div class="buttons">
            <!--<button on:click="{() => { $page = "main"; }}"      >{navbarlabels?.back}    </button>-->
            <button on:click="{() => { scrollto("logo"); }}"    >{navbarlabels?.logo}    </button>
            <button on:click="{() => { scrollto("about"); }}"   >{navbarlabels?.about}   </button>
            <button on:click="{() => { scrollto("projects"); }}">{navbarlabels?.projects}</button>
            <button on:click="{() => { scrollto("repos"); }}"   >{navbarlabels?.repos}   </button>
            <button on:click="{() => { scrollto("credits"); }}" >{navbarlabels?.credits} </button>
            <button on:click="{() => { $greeting = true; }}"    >{navbarlabels?.theme}   </button>
        </div>
    </div>
</div>

<style lang="scss">
    #navbar-mount {
        z-index: 5;

        position: sticky;
        top: 0em;

        height: max-content;

        >div::after {
            position: absolute;

            $padding: 0;
            bottom: $padding;
            right: $padding;
            left: $padding;
            top: $padding;

            content: '';
            z-index: -1;
            background-color: transparent;
            backdrop-filter: blur(1em) grayscale(.5);

            transition: background-color .5s ease;
        }

        &:hover >div::after {
            background-color: var(--background);
        }

        &.compact {
            margin-inline: clamp(1em, 25vw, 50em);
            border-radius: 1em;

            >div::after {
                border-radius: 1em;
                $padding: -2em;
                bottom: $padding;
                right: $padding;
                left: $padding;
                top: $padding;
            }
        }
    }

    .buttons {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        
        button {
            flex-grow: 1;
            margin: 0;
            margin-inline: .1em;
            font-size: 1.2rem;
            
            color: var(--text);
            background: none;
            
            border: none;
            border-radius: 0;
            border-bottom: .25em solid var(--text);

            opacity: .25;

            &:hover {
                opacity: 1;
            }
        }
    }
</style>