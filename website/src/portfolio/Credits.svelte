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
    @import '../styles/content.scss';

    a {
        color: var(--text);
    }

    .highlight {
        padding: 2em;
        padding-bottom: 4em;

        a {
            font-size: 2rem;
        }
    }

    .card {
        display: flex;
        flex-wrap: wrap;
        gap: 1em;
        padding: 1em;
        padding-inline: 5em;

        color: var(--text);
        
        &:hover {
            text-decoration: none;
        }
        
        >.split1 {
            flex-basis: 25%;
            flex-shrink: 0;
            flex-grow: 1;

            h1 {
                margin-bottom: .5em;
                font-size: 2.5rem;

                word-wrap: break-word;
                overflow-wrap: anywhere;
            }
            p {
                font-size: 1.5rem;
                
                word-wrap: break-word;
                overflow-wrap: anywhere;
            }
        }

        >.split2 {
            flex-basis: 75%;
            flex-shrink: 1;
            flex-grow: 0;

            word-wrap: break-word;
            overflow-wrap: anywhere;
        }
    }
</style>