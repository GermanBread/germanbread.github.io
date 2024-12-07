<script lang="ts">
    import ClickyButton from "../components/ClickyButton.svelte";
    import { translationData } from "../scripts/globals";
    import type { TranslationData } from "../scripts/types";

    let translation : TranslationData["about"],
        mount : HTMLElement;
    
    // Grab the prefers reduced media query.
    // Brave Browser ignores (hover: none) on mobile?
    let mediaQueryMatches = window.matchMedia("(prefers-reduced-motion: reduce), (hover: none)");
    
    function handlescroll() {
        
        // Check if the media query matches or is not available.
        if (!mediaQueryMatches || mediaQueryMatches.matches) {
            mount.style.opacity = "1";
            mount.style.transform = "none";
        } else {
            mount.style.opacity = `${(window.scrollY - mount.getBoundingClientRect().top) / (window.innerHeight / 3)}`;
            mount.style.transform = `translateY(${Math.log1p(Math.max(window.scrollY - mount.getBoundingClientRect().top, 0) / (window.innerHeight / 2)) * 4 - 8}em)`;
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
    @import '../styles/global.scss';
</style>