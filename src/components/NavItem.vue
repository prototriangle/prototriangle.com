<template>
    <li class="nav-item" @mouseleave="subClose">
        <a :href="itemData.url" @mouseover="subOpen">{{itemData.text}}</a>
        <div v-if="itemData.submenu !== undefined" :class="{hidden: !open}" class="sub-nav">
            <ul>
                <NavItem v-for="(item, index) in itemData.submenu" :key="index" :item-data="item"/>
            </ul>
        </div>
    </li>
</template>

<script>
    export default {
        name: 'NavItem',
        props: {
            itemData: Object
        },
        methods: {
            subOpen: function () {
                this.open = true;
            },
            subClose: function () {
                this.open = false;
            }
        },
        data: function () {
            return {
                open: false
            }
        }
    }
</script>

<style>
    .sub-nav ul {
        list-style-type: none;
        float: none;
        padding: 0;
    }

    .sub-nav ul li {
        display: block;
        float: none;
        padding-top: 1vw;
    }

    .sub-nav.hidden {
        opacity: 0;
    }
</style>
