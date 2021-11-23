<script lang="ts">
    export let label : string = "Label here",
        on : boolean = false;
</script>

<div>
    <input type="checkbox" id="toggle" bind:checked="{on}">
    <label for="toggle">{label}</label>
</div>

<style lang="scss">
    div {
        display: grid;
        grid-template-columns: 2em 1fr;
        gap: .5em;
        
        height: 1.5em;
        font-size: 1.5rem;
    }
    input {
        margin: 0;
        
        position: relative;
        appearance: none;
        border: none;

        &::before, &::after {
            position: absolute;
            bottom: .3em;
            right: .1em;
            left: .1em;
            top: .3em;
            
            content: '';
            border-radius: 5em;
            transition: all .25s ease;
        }
        
        &::before {
            transform: scaleY(0);
            
            background-color: var(--primary);
        }
        &::after {
            border: var(--text) solid .1em;
        }

        &:active {
            &::after {
                box-shadow: 0 0 .15em var(--text);
            }
        }

        &:checked {
            &::before, &::after {
                right: 0em;
                left: 0em;
            }
            &::before {
                transform: none;
            }
            &::after {
                box-shadow: 0 0 .15em var(--text);
            }
            &:active::after {
                box-shadow: none;
            }
        }
    }
    label {
        user-select: none;
        -webkit-user-select: none;
    }
</style>