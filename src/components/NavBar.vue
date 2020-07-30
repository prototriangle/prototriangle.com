<template>
    <ul class="nav-bar">
        <NavItem v-for="(item, index) in menu" :key="index" :item-data="item"/>
    </ul>
</template>

<script>
    import NavItem from "@/components/NavItem";

    export default {
        name: 'NavBar',
        props: {
            menu: Array
        },
        components: {
            NavItem
        }
    }
</script>

<style>
    ul.nav-bar {
        width: 100%;
        font-size: 1.4rem;
        font-weight: bold;
        font-family: "Roboto Slab", serif;
        list-style-type: none;
        padding: 0;
        display: flex;
        flex-direction: row;
    }

    ul.nav-bar > li {
        width: 50%;
        display: block;
        float: left;
        /*text-align: center;*/
    }

    ul.nav-bar > li > a,
    ul.nav-bar > li > a:visited {
        /*border-left: 3px black solid;*/
        /*border-right: 3px black solid;*/
        /*padding-left: 1vw;*/
        /*padding-right: 1vw;*/
    }

    ul.nav-bar li a,
    ul.nav-bar li a:visited {
        text-decoration: none;
        color: black;
        text-shadow: 0 0 2px white;
        transition: all 0.4s;
    }

    ul.nav-bar li a:hover,
    ul.nav-bar li a:focus,
    ul.nav-bar li a:active {
        text-decoration: underline;
        color: #f6ffff;
        text-shadow: 0 3px 8px black;
        transition: all 0.2s;
    }
</style>
