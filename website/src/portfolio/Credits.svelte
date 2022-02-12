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
                <ul class="cool-people">
                    <li class="cool-person"><img class="avatar-border" alt="" src="/build/images/user-avatars/Reimnop.webp"><a href="https://github.com/Reimnop"  target="_blank">Reimnop</a></li>
                    <li class="cool-person"><img class="avatar-border" alt="" src="/build/images/user-avatars/tyoungjr.webp"><a href="https://github.com/tyoungjr" target="_blank">tmoney</a></li>
                    <li class="cool-person"><img class="avatar-border" alt="" src="/build/images/user-avatars/jakeupz.webp"><a href="https://github.com/jakeupz"  target="_blank">bacon</a></li>
                </ul>
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

    .cool-people {
        display: flex;
        flex-direction: column;
        gap: 1em;
    }
    
    .cool-person {
        display: flex;
        gap: 1em;

        list-style: none;

        >img {
            flex-grow: 0;
            aspect-ratio: 1;
            height: 3em;
        }
        >a {
            margin-block: auto;
            width: auto;
        }
    }
</style>