<template>
    <div>
        <h2>Forgotten</h2>
        <h3>Game Design Studio Coursework</h3>
        <h4>Preview Video:</h4>
        <Html5Video width="100%"
                    :download-url="vidMp4.url"
                    :sources="[vidWebm, vidMp4]"/>
        <GitHubGistEmbed gist-id="85be14d297c80c8b3c0a76375743325b"/>
    </div>
</template>

<script>


import GitHubGistEmbed from "@/components/GitHubGistEmbed";
import Html5Video from "@/components/Html5Video";

export default {
    name: "ProjectForgotten",
    components: {Html5Video, GitHubGistEmbed},
    data: function () {
        return {
            vidWebm: {
                url: require('@/assets/ForgottenPreview.webm'),
                mimeType: "video/webm;"
            },
            vidMp4: {
                url: require('@/assets/ForgottenPreview.mp4'),
                mimeType: "video/mp4;"
            }
        }
    }
}
</script>