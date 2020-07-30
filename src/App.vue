<template>
    <div id="app" @click="clickHandler">
        <LogoIK :click-event="clickEvent" :id-string="svgID" :origin="armOrigin"/>
        <Cover>
            <template v-slot:upper-box>
                <h1 id="main-title" class="inset">prototriangle</h1>
            </template>
            <template v-slot:lower-box>
                <NavBar :menu="menu"/>
            </template>
            <template v-slot:right-box>
                <!--suppress HtmlUnknownTarget -->
                <!--<img :src="logoURL" :alt="logoAltText">-->
            </template>
        </Cover>
    </div>
</template>

<script>
    import Normalize from 'normalize-css'
    import Cover from "@/view/Cover";
    import NavBar from "@/components/NavBar";
    import LogoIK from "@/components/LogoIK";

    export default {
        name: 'App',
        components: {
            Cover,
            NavBar,
            LogoIK
        },
        created() {
            window.addEventListener("resize", this.resizeHandler);
            window.setTimeout(this.resizeHandler, 100);
            window.setTimeout(this.resizeHandler, 1000);
        },
        destroyed() {
            window.removeEventListener("resize", this.resizeHandler);
        },
        methods: {
            clickHandler(evt) {
                this.clickEvent = {x: evt.clientX, y: evt.clientY, valid: true};
                // console.log(JSON.stringify(this.clickEvent));
            },
            resizeHandler() {
                const r = document.getElementById("main-title").getBoundingClientRect();
                // this.armOrigin = {x: window.innerWidth / 2, y: window.innerHeight / 2};
                this.armOrigin = {x: r.x + this.originOffset.x + r.width, y: r.y + this.originOffset.y};
            }
        },
        watch: {
          originOffset: function () {
              this.resizeHandler();
          }
        },
        data: function () {
            return {
                clickEvent: {x: undefined, y: undefined, valid: false},
                armOrigin: {x: 65, y: 196},
                originOffset: {x: 100, y: 143},
                svgID: "prototriangle-logo",
                logoURL: require('./assets/logo-masked.svg'),
                logoAltText: "prototriangle logo",
                menu: [
                    {
                        text: "about",
                        url: "#about"
                    },
                    {
                        text: "portfolio",
                        submenu: [
                            {
                                text: "current projects",
                                url: "/#current"
                            },
                            {
                                text: "past projects",
                                url: "/#past"
                            }
                        ]
                    }
                ]
            }
        },
        Normalize
    }

</script>

<style>
    html {
        font-family: "Fira Sans", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    body {
        background-image: url("https://www.toptal.com/designers/subtlepatterns/patterns/cubes.png");
        background-position-x: center;
    }

    #app {
        position: absolute;
        margin: 0;
        width: 100%;
        top: 0;
        left: 0;
    }

    h1 {
        font-family: "Roboto Slab", serif;
        font-weight: bold;
        font-size: 3rem;
        /*text-align: center;*/
        margin: 0;
    }

    h1.inset {
        background-color: #000000;
        color: transparent;
        text-shadow: 0px 2px 3px rgba(255, 255, 255, 0.43);
        -webkit-background-clip: text;
        -moz-background-clip: text;
        background-clip: text;
    }

    svg {
        width: 100%;
        height: 100vh;
        position: absolute;
        transition: all 3s ease;
    }

    .cover {
        z-index: 999;
        position: relative;
        text-align: right;
    }

</style>
