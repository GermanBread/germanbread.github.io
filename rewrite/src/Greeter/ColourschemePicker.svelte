<script lang="ts">
    import { colourScheme } from "../globals";
    export let selected = localStorage.getItem("colourscheme") ?? "contrast";
    const palettes = [ "nord", "air", "sweet", "contrast", "sleek", "night", "white" ];

    $: localStorage.setItem("colourscheme", selected);
</script>

<div id="palettes-mount">
    {#each palettes as palette}
        <h2 class="palette-title">{palette}</h2>    
        <div class="card {palette}" on:mousedown="{() => { selected = palette; }}">
            <div class="split1">
                <p>Text</p>
                <div class="highlight">:)</div>
                <div class="panel">Hello, world!</div>
            </div>
            <div class="split2">
                <h1>{palette}</h1>
            </div>
        </div>
    {/each}
</div>

<style lang="scss">
    @import '../content.scss';

    .card {
        display: flex;
        gap: 1em;

        padding: 1em;
        border-radius: 1em;

        border: .1em dashed var(--text);

        margin-block: 1em;
        
        color: var(--text);
        background-color: var(--background);

        .split1 {
            flex-basis: 60%;
            
            flex-grow: 0;
            flex-shrink: 1;

            .highlight {
                padding: 1em;
                border-bottom-right-radius: 0;
                border-bottom-left-radius: 0;
                
                &::after {
                    content: none;
                }
            }
            .panel {
                padding: 1em;
                border-top-right-radius: 0;
                border-top-left-radius: 0;
            }
        }
        .split2 {
            flex-shrink: 0;
            flex-grow: 1;

            display: grid;
            place-content: center;

            text-align: center;
            text-transform: capitalize;
        }
    }

    .palette-title {
        text-transform: capitalize;
        text-align: center;
    }
</style>