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
                    <a class="card" href="{project.url}" target="_blank">
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
    @import '../styles/content.scss';

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
    
    .card {
        color: var(--text);

        * {
            margin: 0;
        }

        h1, p {
            padding-block: .5em;
        }
        
        &:hover {
            text-decoration: none;

            >.split1 >p, >.split2 {
                transition: opacity .5s ease-out,
                    transform .5s ease-out;
                
                transform: translateX(0em);
                opacity: 1;
            }
        }
        
        >.split1 {
            h1 {
                font-size: 2.5rem;

                word-wrap: break-word;
                overflow-wrap: anywhere;
            }
            p {
                font-size: 1.5rem;
                
                transition: opacity .5s ease-in,
                    transform .5s ease-in;
                
                transform: translateX(-1em);
                opacity: 0;

                word-wrap: break-word;
                overflow-wrap: anywhere;

                @media (prefers-reduced-motion: reduce), (max-width: 600px) {
                    transition: none;
                    transform: none;
                    opacity: 1;
                }
            }
        }

        >.split2 {
            transition: opacity .5s ease-in,
                transform .5s ease-in;
            
            transform: translateX(5em);
            opacity: 0;

            word-wrap: break-word;
            overflow-wrap: anywhere;

            @media (prefers-reduced-motion: reduce), (max-width: 600px) {
                transition: none;
                transform: none;
                opacity: 1;
            }
        }
    }
</style>