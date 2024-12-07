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
    @import '../styles/content.scss';

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

            transition: background-position .5s ease;

            >.text {
                transform: scale(.75);
                transform-origin: left;
                filter: blur(.1em);
                transition:
                    transform .5s cubic-bezier(0.785, 0.135, 0.15, 0.86),
                    filter .5s cubic-bezier(0.785, 0.135, 0.15, 0.86);
                
                @media (prefers-reduced-motion: reduce), (max-width: 600px) {
                    transition: none;
                    transform: none;
                    filter: none;
                }
            }

            &:hover >.text {
                transform: none;
                filter: none;
            }
        }

        a {
            color: var(--text);
            text-decoration: none;
        }
    }
</style>