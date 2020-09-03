<template>
    <div v-show="visible" id="project-modal" class="modal"  @click.prevent.stop="$emit('project-modal-close')">
        <div class="modal-content-box" @click.prevent.stop="">
            <div class="modal-header">
                <button @click.prevent.stop="$emit('project-modal-close')">
                    🗙
                </button>
                <h2 id="modal-title">Project: {{ this.title }}</h2>
            </div>
            <div class="modal-content-body">
                <component v-bind:is="contentComponent" class="modal-content-component"></component>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ProjectModal",
    props: {
        visible: {
            type: Boolean,
            required: true
        },
        contentComponent: {
            type: Object
        },
        title: {
            type: String
        }
    },
    mount() {
        this.show()
    }
}
</script>

<style scoped>
.modal {
    position: fixed;
    z-index: 1000;
    padding-top: 10%;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: #f2f2f2;
    background-color: rgba(0, 0, 0, 0.4);
    box-sizing: border-box;
}

/* Modal Content */
.modal-content-box {
    background-color: #fefefe;
    margin: 0 auto;
    border: 1px solid #888;
    width: 80%;
}

.modal-content-box {
    padding: 0;
    z-index: 2000;
}

.modal-content-box .modal-content-body {
    padding: 1rem;
}

.modal-header {
    display: inline-flex;
    background: cyan;
    border: solid cyan 1rem;
    box-sizing: border-box;
    width: 100%;
}

.modal-content-box #modal-title {
    margin: 0 0 0 1rem;
    padding-top: 0.5rem;
    color: #2f2f2f;
}

button {
    display: inline-block;
    border: none;
    padding: 1rem 1rem;
    width: 3rem;
    height: 3rem;
    margin: 0;
    text-decoration: none;
    color: #0f0f0f;
    font-family: sans-serif;
    font-size: 1rem;
    cursor: pointer;
    text-align: center;
    transition: background 250ms ease-in-out,
    transform 150ms ease;
    -webkit-appearance: none;
    -moz-appearance: none;
    border-radius: 0.3rem;
}
</style>