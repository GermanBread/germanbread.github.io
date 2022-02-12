<script lang="ts">
    import ColourCard from "./ColourCard.svelte";
    
    import { themes } from "../scripts/globals";

    export let selected = localStorage.getItem("colourscheme") ?? "contrast";
    const palettes = Object.keys(themes);
    console.log(Object.keys(themes));

    $: localStorage.setItem("colourscheme", selected);
</script>

<div id="palettes-mount">
    {#each palettes as palette}
        <ColourCard palette="{palette}" bind:selected />
    {/each}
</div>

<style lang="scss">
    @import '../styles/content.scss';

    #palettes-mount {
        display: flex;
        flex-wrap: wrap;
        gap: 1em;
    }

    .palette-title {
        text-transform: capitalize;
        text-align: center;
    }
</style>