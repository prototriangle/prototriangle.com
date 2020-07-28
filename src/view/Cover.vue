<template>
    <div class="cover">
        <div class="upper-box">
            <slot name="upper-box"></slot>
        </div>
        <div class="lower-box">
            <slot name="lower-box"></slot>
        </div>
        <div class="right-box">
            <slot name="right-box"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'cover'
    }
</script>

<style>
    .cover {
        display: grid;
        width: 50vw;
        grid-template-columns: 1.25fr 2fr;
        grid-template-rows: 1fr 1fr;
        margin: calc(30vw - 10vh) auto auto auto;
    }

    .cover .upper-box {
        /*background-color: lightblue;*/
        align-self: center;
    }

    .cover .lower-box {
        /*background-color: lightgreen;*/
        align-self: start;
    }

    .cover .right-box {
        /*background-color: lightcoral;*/
        grid-column: 2/3;
        grid-row: 1/3;
        text-align: center;
        align-self: center;
    }
</style>
