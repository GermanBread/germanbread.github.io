<script lang=ts>
    export let label = "",
        labelr = "",
        value = 5,
        max = 10;
</script>

<main>
    <div class="labels">
        <p>{label}</p>
        <div class="spacer" />
        <p>{labelr}</p>
    </div>
    <progress {value} {max} />
</main>

<style lang=scss>
    .labels {
        display: flex;
    }

    .spacer {
        flex-grow: 1;
    }
    
    p {
        margin: 0px;
        margin-top: 1rem;
        font-weight: bold;
    }
    progress {
        border: none;
        height: .75rem;
        width: 100%;
        border-radius: 1rem;
        background: var(--background);

        &::-moz-progress-bar, &::-webkit-progress-bar {
            border-radius: 1rem;
            background: linear-gradient(45deg, var(--primary), var(--secondary));
        }
    }
</style>