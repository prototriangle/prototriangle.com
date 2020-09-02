<template>
    <li class="nav-item" @mouseleave="subClose">
        <a ref="text" :data-scroll="itemData.url[0] === '#'" :href="itemData.url" @click="notifyNavigate(itemData.url)" @mouseover="subOpen" @touchstart="handleTouch">{{ itemData.text }}</a>
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
        },
        handleTouch: function () {
            if (this.itemData.submenu === undefined) return;
            // console.log("Touch Handle");
            this.open = !this.open;
            this.$el.firstElementChild.toggleAttribute("triggered");
        },
        notifyNavigate: function (target) {
            this.$emit("navigate", target);
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
    //pointer-events: none;
}

.sub-nav {
    cursor: unset;
}

.sub-nav.hidden {
    opacity: 0;
}


.sub-nav.hidden ul li > a {
    pointer-events: none;
}

</style>
