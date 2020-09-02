<template>
    <video :width="width" controls
           :poster="posterUrl">
        <source v-for="s in sources" :key='s.mimeType'
                :src="s.url"
                :type='s.mimeType'>
        <p>
            Your browser doesn't support HTML5 video.
            <span v-if="downloadUrl">
                Here is a <a :href="downloadUrl" download>link to the video</a> instead.
            </span>
        </p>
    </video>
</template>

<script>
export default {
    name: "Html5Video",
    props: {
        width: {
            type: String,
            require: true
        },
        posterUrl: {
            type: String,
        },
        sources: {
            type: Array,
        },
        downloadUrl: {
            type: String,
        }
    }
}
</script>

<style scoped>
video {
    border-color: #ddd #ddd #ccc;
    border-radius: 6px;
}
</style>