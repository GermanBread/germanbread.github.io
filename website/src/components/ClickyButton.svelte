<script lang="ts">
    export let clickEvent = () => { };
</script>

<button on:click="{clickEvent}">
    <slot>Clicky button</slot>
</button>

<style lang="scss">
    button {
        min-width: 10ch;

        font-size: 1.5em;
        border: dashed .1rem var(--background);
        box-shadow: 0 0 .5rem var(--shadow);
        
        background-color: var(--text);
        color: var(--background);

        margin: .5rem;
        height: 3.5rem;
        
        &:active {
            background-color: var(--background);
            color: var(--text);
            border-color: var(--text);
        }
    }
</style>