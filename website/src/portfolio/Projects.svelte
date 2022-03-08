<script lang="ts">
import { projectsData, translationData } from "../scripts/globals";
import type { RepoData, TranslationData } from "../scripts/types";

    let translation: TranslationData["projects"],
        projects: RepoData;

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
                    <div class="repo-card">
                        <div class="split1">
                            <h1>{project.name}</h1>
                            <p>{project.license ?? "-"}</p>
                        </div>
                        <div class="split2">
                            <p>{project.description ?? "-"}</p>
                            <p>{project.url}</p>
                        </div>
                        <a href="{project.url}" target="_blank" class="open-link">
                            <svg width="512px" height="512px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><polygon points="400 464 48 464 48 104 240 104 240 72 16 72 16 496 432 496 432 272 400 272 400 464" class="ci-primary"/><polygon points="304 16 304 48 441.373 48 188.687 300.687 211.313 323.313 464 70.627 464 208 496 208 496 16 304 16" class="ci-primary"/></svg>
                            <p>{translation?.open}</p>
                        </a>
                    </div>
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
        padding-inline: 10%;
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

    a.open-link {
        display: flex;
        gap: .5em;
        align-items: center;
        justify-content: flex-end;

        fill: var(--text);
        color: var(--text);
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }

        >svg {
            width: 2em;
            height: 2em;
        }
    }
</style>