<script lang="ts">
    import cssVars from 'svelte-css-vars';
    import { colourSchemes } from '../scripts/globals';

    export let palette : string,
        selected : string;
    
    let shown;
    $: shown = colourSchemes[palette];
</script>

<div class="card" use:cssVars="{shown}" on:mousedown="{() => { selected = palette; }}">
    <div class="split1">
        <p>Text</p>
        <div class="highlight">AaBbCcDd</div>
        <div class="panel">Hello, world!</div>
    </div>
    <div class="split2">
        <h1>{palette}</h1>
    </div>
</div>

<style lang="scss">
    @import '../styles/content.scss';
    
    .card {
        transform: scale(var(--scale, 1));
        
        flex-basis: 40%;
        flex-grow: 1;
        
        display: flex;
        gap: .25em;

        padding: .75em;
        border-radius: .5em;

        border: .1em dashed var(--text);

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
</style>