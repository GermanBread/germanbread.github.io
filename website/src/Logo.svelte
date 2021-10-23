<script lang="ts">
    import Navrow from "./Navrow.svelte";
    import { onMount } from "svelte";
    
    let hidden = true,
        forceHidden = true,
        y : number,
        logoMount : HTMLElement;
    $: hidden = (y > logoMount?.clientTop + logoMount?.clientHeight / 4) || forceHidden;

    onMount(() => {
        setTimeout(() => {
            forceHidden = false;
        }, 500);
    })
</script>

<svelte:window bind:scrollY="{y}" />

<div id="logo-mount" bind:this="{logoMount}">
    {#if !forceHidden}
        <Navrow hidden="{!hidden}" fixed="{true}" />
    {/if}
    <div id="hello" class:hidden>
        <span>Hi.</span>
        <Navrow hidden="{hidden}" />
    </div>
</div>

<style lang="scss">
    #logo-mount {
        background: url('images/mads-schmidt-rasmussen-xfngap_DToE-unsplash.webp');
        background-size: cover;
        background-position: 50%;
        //background-attachment: fixed; // This line lags out Brave, why?

        display: grid;
        place-content: center;
        min-height: 100vh;
    }

    #hello {
        border-radius: 2em;
        aspect-ratio: 20/5;

        display: flex;
        flex-direction: column;

        transition: opacity .5s ease-out,
            transform .5s ease-out;

        &.hidden {
            transition: opacity .5s ease-in,
                transform .5s ease-in;

            transform: translateY(5em);
            opacity: 0;
        }
        
        >span {
            margin-bottom: 1em;
            font-size: 4rem;
            text-align: center;
            
            text-shadow: .05em .05em .1em var(--shadow);
            color: var(--text);
            
            font-weight: 500;
            text-decoration: underline;
        }
    }
</style>