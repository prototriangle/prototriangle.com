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
    grid-template-areas:
    'upper-box  right-box'
    'lower-box  right-box';
    width: 90vw;
    grid-template-columns: 1.25fr 2fr;
    grid-template-rows: 1fr 1fr;
    margin: calc(30vw - 10vh) auto auto auto;
    z-index: 999;
    position: relative;
    text-align: right;
}

.cover .upper-box {
    /*background-color: lightblue;*/
    grid-area: upper-box;
    align-self: center;
}

.cover .lower-box {
    /*background-color: lightgreen;*/
    grid-area: lower-box;
    align-self: start;
    justify-self: right;
    text-align: right;
}

.cover .right-box {
    /*background-color: lightcoral;*/
    grid-area: right-box;
    align-self: center;
    justify-self: right;
    text-align: right;
}


@media (max-width: 700px) {
    .cover {
        margin: 32.5vh auto auto auto;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 0.5fr 0.5fr;
        grid-template-areas:
        'right-box'
        'upper-box'
        'lower-box';
        width: 100%;
    }

    .cover .right-box {
        padding: 4vw;
    }

    .cover .lower-box {
        padding: 4vw;
    }

    .cover .upper-box {
        align-self: start;
        padding: 4vw;
    }
}

@media (max-width: 350px) {
    .cover {
        margin: 10.5vh auto auto auto;
    }
}

</style>
