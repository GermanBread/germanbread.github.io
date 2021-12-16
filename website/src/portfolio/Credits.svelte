<script lang="ts">
    import { translationData } from "../scripts/globals";
    import type { TranslationData } from "../scripts/types";

    let translation : TranslationData["credits"];
    $: translation = $translationData?.credits;
</script>

<div id="credits-mount" class="view">
    <div id="title">
        <h1>{translation?.title}</h1>
        <hr>
    </div>
    <div class="panel">
        <a href="https://svelte.dev/" target="_blank">{translation?.framework}</a>
    </div>
    <div class="highlight">
        <div class="card">
            <div class="split1">
                <h1>{translation?.people}</h1>
            </div>
            <div class="split2">
                <a href="https://github.com/Reimnop" target="_blank">Reimnop</a>
            </div>
        </div>
    </div>
</div>

<style lang="scss">
    @import '../styles/global.scss';

    a {
        color: var(--text);
    }

    .highlight {
        padding: 4em;

        a {
            font-size: 2rem;
        }
    }
</style>