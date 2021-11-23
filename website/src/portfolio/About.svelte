<script lang="ts">
    import ClickyButton from "../components/ClickyButton.svelte";
import { translationData } from "../scripts/globals";
    import type { TranslationData } from "../scripts/types";

    let translation : TranslationData["about"],
        mount : HTMLElement;
    
    // Grab the prefers reduced media query.
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    
    function handlescroll() {
        mount.style.opacity = `${(window.scrollY - mount.getBoundingClientRect().top) / (window.innerHeight / 3)}`;
        // Check if the media query matches or is not available.
        if (!mediaQuery || mediaQuery.matches) {
            mount.style.transform = "none";
        } else {
            mount.style.transform = `translateY(${Math.log10(Math.max(window.scrollY - mount.getBoundingClientRect().top, 100) / (window.innerHeight / 2)) * 5}em)`;
        }
    }
    
    $: translation = $translationData?.about;
</script>

<svelte:window on:scroll="{handlescroll}" />

<div id="about-mount" class="view" bind:this="{mount}" style="opacity: 0;">
    <div id="title">
        <h1>{translation?.me}</h1>
        <hr>
    </div>
    <div class="highlight">
        <div class="card">
            <img src="/build/images/ghpfp.webp" alt="Github profile pic">
            <div>
                <h1>GermanBread</h1>
                <p>{translation?.skills.short}</p>
                <div class="social">
                    <ClickyButton clickEvent="{() => { window.open("https://github.com/GermanBread", "_blank");           }}" label="Github" />
                    <ClickyButton clickEvent="{() => { window.open("https://discord.gg/ThMTPkyHmq", "_blank");            }}" label="Discord" />
                    <ClickyButton clickEvent="{() => { window.open("https://www.reddit.com/user/Mueslikuchen", "_blank"); }}"label="Reddit" />
                    <ClickyButton clickEvent="{() => { window.open("https://twitter.com/YodaBigbrain", "_blank");         }}" label="Twitter" />
                    <ClickyButton clickEvent="{() => { window.open("https://osu.ppy.sh/users/11376807", "_blank");        }}" label="osu!" />
                </div>
            </div>
        </div>
    </div>
    {#if translation}
        <div class="panel">
            <h2>{translation.skills.title}</h2>
            <p>{translation.skills.programming}</p>
            <p>{translation.skills.ide}</p>
            <p>{translation.skills.other}</p>
            <br>
            <h2>{translation.os.title}</h2>
            <p>{translation.os.content}</p>
            <p>{translation.os.desktop}</p>
        </div>
        <div class="panel">
            <h1>{translation.story.title}</h1>
            {#each translation.story.content as paragraph}
                {#each paragraph as line}
                    <p>{line}</p>
                {/each}
                <br>
            {/each}
        </div>
    {/if}
</div>

<style lang="scss">
    @import '../styles/content.scss';

    .invisible {
        transform: translateY(1em);
        opacity: 0;
    }

    .card {
        display: flex;
        flex-wrap: wrap;
        gap: 2em;
        
        >img {
            max-height: 356px;
            max-width: clamp(0px, 100%, 400px);

            border: .1em dashed var(--text);
            //box-shadow: 0 0 .5em var(--shadow);
        }

        >div {
            flex-basis: 50%;
            flex-grow: 1;
        }
    }

    .social {
        display: flex;
        flex-wrap: wrap;
        gap: 1em;

        >a {
            display: flex;
            align-content: center;
            justify-content: center;

            flex-basis: 20ch;
            
            padding: .5em;
            border-radius: 5em;

            border: none;
            //box-shadow: 0 0 .25em var(--shadow);

            font-size: 1.5rem;

            background-color: var(--text);
            color: var(--background);

            &:hover {
                text-decoration: none;
            }

            &:active {
                background-color: var(--background);
                color: var(--text);
            }
        }
    }
</style>