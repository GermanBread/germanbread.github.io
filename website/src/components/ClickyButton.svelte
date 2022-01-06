<script lang="ts">
    export let label = "Clicky Button";
    export let clickEvent = () => { };
</script>

<button on:click="{clickEvent}">
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
            background-color 1s ease-in,
            color 1s .5s ease-in;
    }
</style>