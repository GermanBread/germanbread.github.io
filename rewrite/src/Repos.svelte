<script lang="ts">
    import { translationData, reposData } from "./globals";
    import type { RepoData, TranslationData } from "./Types";

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
                    <a class="highlight" href="{repo.url}">
                        <h2>{repo.name} {repo.forked ? `(${translation.panel.forked})` : ""} {repo.archived ? `(${translation.panel.archived})` : ""}</h2>
                        <p>{repo.license ? `${repo.license} — ` : ""}{repo.description ?? translation?.panel.nodescription}</p>
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
    @import 'content.scss';

    .panel {
        padding-block: 3em;
    }

    #repos {
        display: flex;
        flex-wrap: wrap;
        gap: .5em;
        
        .highlight {
            padding: 1em;
            flex-basis: 40%;
            flex-grow: 1;
        }

        a {
            color: var(--text);
            
            &.hover {
                text-decoration: none;
            }
        }
    }
</style>