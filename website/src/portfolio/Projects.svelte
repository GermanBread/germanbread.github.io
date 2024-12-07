<script lang="ts">
    import { projectsData, translationData } from "../scripts/globals";
    import type { RepoData, TranslationData } from "../scripts/types";

    let translation : TranslationData["projects"],
        projects : RepoData;

    $: {
        translation = $translationData?.projects;
        projects = $projectsData;
    }
</script>

<div id="projects-mount" class="view">
    <div id="title">
        <h1>{translation?.title}</h1>
        <hr>
    </div>
    {#if projects}
        <div id="projects" class="panel">
            {#each projects.filter(x => !x.error) as project}
                <div class="highlight">
                    <a class="repo-card" href="{project.url}" target="_blank">
                        <div class="split1">
                            <h1>{project.name}</h1>
                            <p>{project.license ?? "-"}</p>
                        </div>
                        <div class="split2">
                            <p>{project.description ?? "-"}</p>
                            <p>{project.url}</p>
                        </div>
                    </a>
                </div>
            {/each}
        </div>
    {:else}
        <div class="panel">
            {translation?.loading}
        </div>
    {/if}
</div>

<style lang="scss">
    @import '../styles/global.scss';

    #projects {
        display: flex;
        flex-direction: column;
        gap: 1em;

        padding: 2.5em;
    }

    .highlight {
        padding-block: 1em;
        padding-inline: 5em;
    }
    
    .repo-card {
        color: var(--text);

        text-decoration: none;

        * {
            margin: 0;
        }

        h1, p {
            padding-block: .5em;
        }

        >.split1 {
            h1 {
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
            word-wrap: break-word;
            overflow-wrap: anywhere;
        }
    }
</style>