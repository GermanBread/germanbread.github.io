<script lang="ts">
    export let label = "Clicky Button";
    export let visible = true;
    export let clickEvent = () => { };
</script>

<button on:click="{clickEvent}" class:visible>
    {label}
</button>

<style lang="scss">
    button {
        min-width: 10ch;
        flex-grow: 0;
        @media (max-width: 600px) {
            flex-grow: 1;
        }

        font-size: 1.5em;
        border: none;
        
        background-color: var(--text);
        color: var(--background);

        //box-shadow: 0 0 .25em var(--shadow);

        margin: .25em;
        
        height: 2.5em;

        transition:
            background-color .5s ease-in,
            color .5s .25s ease-in;
        
        // Hide the buttons by default and let them fly in later
        opacity: 0;
        transform: translateY(1em);
        pointer-events: none;

        &.visible {
            pointer-events: all;
            
            opacity: 1;
            transform: translateY(0em);
        }
        &:active {
            transition:
                background-color .5s .25s ease-in,
                color .5s ease-in;
            
            background-color: var(--background);
            color: var(--text);
        }
    }
</style>