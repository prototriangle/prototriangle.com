<template>
    <div class="gh-gist" v-html="rawHtml">

    </div>
</template>

<script>

// import axios from "axios";
export default {
    name: "GitHubGistEmbed",
    props: {
        gistId: {
            type: String,
            required: true
        },
    },
    mounted() {
        const url = `https://cors-anywhere.herokuapp.com/https://gist.github.com/${this.gistId}.js`;
        let re1 = /^document.write\('([^\n\r]*)'\)$/gm
        let re2 = /\\([/"'])/gm
        let re3 = /\\n/gm
        let re4 = /\\t/gm
        fetch(url)
            .then(response => response.text())
            .then(text => text.replace(re1, '$1'))
            .then(text => text.replace(re2, '$1'))
            .then(text => text.replace(re3, '\n'))
            .then(text => text.replace(re4, '\t'))
            .then(text => this.rawHtml = text)
            .catch(err => console.error(err));
    },
    data: function () {
        return {
            rawHtml: '',
        }
    }
}
</script>

<style scoped>

</style>