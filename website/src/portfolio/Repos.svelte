<script lang="ts">
    import { translationData, reposData } from "../scripts/globals";
    import type { RepoData, TranslationData } from "../scripts/types";

    let translation : TranslationData["repos"],
        repos : RepoData;

    $: {
        translation = $translationData?.repos;
        repos = $reposData;
    }
</script>

<div id="repos-mount" class="view">
    <div id="title">
        <h1>{translation?.personal}</h1>
        <hr>
    </div>
    {#if repos}
        <div class="panel">
            <div id="repos">
                {#each repos as repo}
                    <a class="highlight" href="{repo.url}" target="_blank">
                        <div class="text">
                            <h2>{repo.name} {repo.forked ? `(${translation.panel.forked})` : ""} {repo.archived ? `(${translation.panel.archived})` : ""}</h2>
                            <p>{repo.license ? `${repo.license} — ` : ""}{repo.description ?? translation?.panel.nodescription}</p>
                        </div>
                    </a>    
                {/each}
            </div>
        </div>
    {:else}
        <div class="panel">
            {translation?.loading}
        </div>
    {/if}
</div>

<style lang="scss">
    @import '../styles/global.scss';

    .panel {
        padding-block: 3em;
    }

    #repos {
        display: flex;
        flex-wrap: wrap;
        gap: .5em;
        
        .highlight {
            padding: 1em;
            padding-inline: 2em;
            flex-basis: 40%;
            flex-grow: 1;

            background-size: 150%;
        }

        a {
            color: var(--text);
            text-decoration: none;
        }
    }
</style>