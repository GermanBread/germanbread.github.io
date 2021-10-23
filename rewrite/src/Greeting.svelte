<script lang="ts">
    import { translationData, greeting, colourScheme } from "./globals";
    import type { TranslationData } from "./Types";
    import Colourscheme from "./Greeter/ColourschemePicker.svelte";
    import ClickyButton from "./ClickyButton.svelte";

    let selectedPalette : string;
    let translation : TranslationData["greeting"];
    $: translation = $translationData?.greeting;
    let root : HTMLElement;

    function fadeout() {
        localStorage.setItem("greeter_ver", "1");
        $colourScheme = selectedPalette;
        $greeting = false;
    }

    $: console.log(selectedPalette);
</script>

<div id="greeting-mount" class="view {selectedPalette}" bind:this="{root}">
    <div id="title">
        <h1>{translation?.title ?? "..."}</h1>
    </div>
    <div class="panel">
        <h2>{translation?.palette ?? "..."}</h2>
        <hr />
        <Colourscheme bind:selected={selectedPalette} />
    </div>
    <div class="panel center">
        <ClickyButton label={translation?.done} clickEvent="{() => { fadeout(); }}" />
    </div>
</div>

<style lang="scss">
    @import "content.scss";

    #greeting-mount {
        color: var(--text);
        hr {
            border-color: var(--text);
            transition: border-color 1s 0.5s ease-in-out;
        }
        background-color: var(--background);

        transition: background-color 1s ease-in-out,
            color 1s 0.5s ease-in-out;

        > .panel {
            transition: background-color 1s ease-in-out;
        }
    }

    .center {
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
