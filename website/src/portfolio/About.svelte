<script lang="ts">
    import { fly } from "svelte/transition";
    import { translationData } from "../scripts/globals";
    import type { TranslationData } from "../scripts/types";
    import ClickyButton from "../components/ClickyButton.svelte";
    import ProgressBar from "../components/ProgressBar.svelte";

    let translation : TranslationData["about"];

    const maxexperience = () => translation?.skills.programming.reduce((acc, val) => acc.years_of_experience > val.years_of_experience ? acc : val);
    
    $: translation = $translationData?.about;
</script>

<div id="about-mount" class="view" in:fly="{{ y: 50, duration: 2000, delay: 1000 }}">
    <div id="title">
        <h1>{translation?.me}</h1>
        <hr>
    </div>

    <div class="highlight">
        <div class="card">
            <img class="avatar-border" src="/build/images/user-avatars/GermanBread.webp" alt="Github profile pic">
            <div>
                <h1>GermanBread</h1>
                <p>{translation?.skills.short}</p>
                <div class="social">
                    <ClickyButton clickEvent="{() => { window.open("https://github.com/GermanBread", "_blank");           }}" >Github</ClickyButton>
                    <ClickyButton clickEvent="{() => { window.open("https://discord.gg/tMCj6HF99y", "_blank");            }}" >Discord</ClickyButton>
                    <ClickyButton clickEvent="{() => { window.open("https://www.reddit.com/user/Mueslikuchen", "_blank"); }}" >Reddit</ClickyButton>
                    <ClickyButton clickEvent="{() => { window.open("https://twitter.com/YodaBigbrain", "_blank");         }}" >Twitter</ClickyButton>
                    <ClickyButton clickEvent="{() => { window.open("https://osu.ppy.sh/users/11376807", "_blank");        }}" >osu!</ClickyButton>
                </div>
            </div>
        </div>
    </div>
    
    <div class="panel">
        <h2>{translation?.skills.title}</h2>
        {#each translation?.skills.programming ?? [] as skill}
        <ProgressBar label="{skill?.label}" labelr="{skill.years_of_experience} {translation?.skills.year}" max={maxexperience().years_of_experience} value={skill?.years_of_experience}></ProgressBar>
        {/each}
        <p>{translation?.skills.ide}</p>
        <p>{translation?.skills.other}</p>
        <br>
        <h2>{translation?.os.title}</h2>
        <p>{translation?.os.content}</p>
        <p>{translation?.os.desktop}</p>
    </div>
    <div class="panel">
        <h1>{translation?.story.title}</h1>
        {#each translation?.story.content ?? [] as paragraph}
            {#each paragraph as line}
                <p>{line}</p>
            {/each}
            <br>
        {/each}
    </div>
</div>

<style lang="scss">
    @import '../styles/global.scss';
</style>