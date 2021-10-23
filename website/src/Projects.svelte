<script lang="ts">
    import { projectsData, translationData } from "./globals";
    import type { RepoData, TranslationData } from "./Types";

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
        <div id="projects">
            {#each projects.filter(x => !x.error) as project}
                <div class="highlight">
                    <a href="{project.url}" class="card">
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
    @import 'content.scss';

    #projects {
        max-width: 100ch;
        background-color: var(--intense);
        border-radius: .5em;

        padding-block: 1em;
    }

    .highlight {
        margin-block: 2em;
        padding: 0em;
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

            >.split1 >p, >.split2 {
                transition: opacity .5s ease-out,
                    transform .5s ease-out;
                
                transform: translateX(0em);
                opacity: 1;
            }
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
                
                transition: opacity .5s ease-in,
                    transform .5s ease-in;
                
                transform: translateX(-1em);
                opacity: 0;

                word-wrap: break-word;
                overflow-wrap: anywhere;

                @media (prefers-reduced-motion: reduce), (max-width: 600px) {
                    transition: none;
                    transform: translateX(0em);
                    opacity: 1;
                }
            }
        }

        >.split2 {
            flex-basis: 75%;
            flex-shrink: 1;
            flex-grow: 0;

            transition: opacity .5s ease-in,
                transform .5s ease-in;
            
            transform: translateX(5em);
            opacity: 0;

            word-wrap: break-word;
            overflow-wrap: anywhere;

            @media (prefers-reduced-motion: reduce), (max-width: 600px) {
                transition: none;
                transform: translateX(0em);
                opacity: 1;
            }
        }
    }
</style>