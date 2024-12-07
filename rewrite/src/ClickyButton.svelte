<script lang="ts">
    import cssVars from 'svelte-css-vars';
    
    export let label = "Clicky Button";
    export let visible = true;
    export let delay = "0s";
    export let clickEvent = () => { };

    $: transition = {
        transitionDelay : delay
    };
</script>

<button on:click="{clickEvent}" class:visible use:cssVars="{transition}">
    {label}
</button>

<style lang="scss">
    button {
        min-width: 15ch;
        flex-grow: 0;

        font-size: 1.5em;
        border: none;
        
        background-color: var(--text);
        color: var(--background);

        //box-shadow: 0 0 .25em var(--shadow);

        margin-inline: .75em;
        margin-block: .25em;
        
        height: 2.5em;
        border-radius: 1em;

        transition:
            opacity .5s ease-in,
            transform .5s ease-in;
        
        // Hide the buttons by default and let them fly in later
        opacity: 0;
        transform: translateY(1em);
        pointer-events: none;

        &.visible {
            transition:
                opacity .5s ease-out,
                transform .5s ease-out;
            
            pointer-events: all;
            
            opacity: 1;
            transform: translateY(0em);
            transition-delay: var(--transitionDelay);
            @media (prefers-reduced-motion: reduce) {
                transition-delay: 0s;
                transition-duration: 0s;
            }
        }

        &:hover, &:focus {
            transition-delay: 0s;
        }
        &:active {
            background-color: var(--background);
            color: var(--text);
        }

        @media (prefers-reduced-motion: reduce) {
            transition-delay: 0s;
        }
    }
</style>