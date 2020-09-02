<template>
    <div>
        <h2>Forgotten</h2>
        <h3>Game Design Studio Coursework</h3>
        <h4>Preview Video:</h4>
        <Html5Video width="100%"
                    :download-url="videoSources.lastItem.url"
                    :sources="videoSources"/>
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
            videoSources: [
                {
                    url: require('@/assets/ForgottenPreview.webm'),
                    mimeType: "video/webm;"
                },
                {
                    url: require('@/assets/ForgottenPreview.mp4'),
                    mimeType: "video/mp4;"
                }
            ],
        }
    }
}
</script>