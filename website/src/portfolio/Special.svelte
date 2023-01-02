<script lang=ts>
import type { TranslationData } from "../scripts/types";

import { translationData } from "../scripts/globals";

    let translation : TranslationData["special"];
    
    $: translation = $translationData?.special;
</script>

<main>
    <h1>{translation.title}</h1>
    <div>
        <a href="https://experimental.breadwas.uber.space">{translation.link}</a>
    </div>
</main>

<style lang=scss>
    $newhomepage-bg: rgb(24 24 27);

    main {
        background: $newhomepage-bg;
        box-shadow: inset 0 0 .5em var(--intense);
        
        padding: 5rem;
    }

    div {
        display: flex;
        justify-content: center;
    }
    
    a {
        width: max-content;
        color: white;
        padding: .5rem;
        border: .125rem white solid;
        text-decoration: none;

        &:active {
            color: black;
            background: white;
        }
    }

    h1 {
        text-align: center;
        margin-top: 0;
    }
</style>