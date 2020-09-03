<template>
    <div id="app" @click="clickHandler">
        <LogoIK :doIK="doIK" :click-event="clickEvent" :id-string="svgID" :origin="armOrigin"
                :svg-width="logoWidth"
                :svg-height="logoHeight"/>

        <Cover @navigate="navHandler">
            <template v-slot:upper-box>
                <h1 id="main-title" class="inset">prototriangle</h1>
            </template>
            <template v-slot:lower-box>
                <NavBar :menu="menu"/>
            </template>
            <template v-slot:right-box>
                <img id="static-logo" :src="logoURL" :alt="logoAltText"/>
            </template>
        </Cover>

        <div :id="projectGalleryID">
            <h1>Projects</h1>
            <HexGallery :galleryContent="galleryContent"/>
        </div>
    </div>
</template>

<script>
import 'normalize-css';
import Cover from "@/view/Cover";
import NavBar from "@/components/NavBar";
import LogoIK from "@/components/LogoIK";
import HexGallery from "@/components/HexGallery";

import ProjectForgotten from "@/view/ProjectForgotten";


const logoTypes = {
    STATIC: 'static',
    DYNAMIC: 'dynamic'
}

export default {
    name: 'App',
    components: {
        HexGallery,
        Cover,
        NavBar,
        LogoIK
    },
    created() {
        window.addEventListener("resize", this.resizeHandler);
        window.setTimeout(this.resizeHandler, 500);
        window.setTimeout(this.resizeHandler, 1000);
        window.setTimeout(function () {
            let e = document.getElementsByTagName("svg");
            // console.log(e);
            e[0].style.opacity = '1';
        }, 1500);
    },
    destroyed() {
        window.removeEventListener("resize", this.resizeHandler);
    },
    methods: {
        clickHandler(evt) {
            this.clickEvent = {x: evt.clientX, y: evt.clientY, valid: true};
        },
        navHandler() {
            // console.log(`navHandler(${target})`)
        },
        resizeHandler() {
            // check if static logo visible
            const l = document.getElementById("static-logo");
            const displayVal = getComputedStyle(l, null).display;
            if (displayVal !== "none") {
                // visible so return
                this.doIK = false;
                this.logoType = logoTypes.STATIC;

                return;
            }
            let viewport = this.viewportDimensions();
            this.logoWidth = viewport.width;
            this.logoHeight = viewport.height;
            // not visible so do ik and position
            this.doIK = true;
            this.logoType = logoTypes.DYNAMIC;
            // get rect of title
            const r = document.getElementById("main-title").getBoundingClientRect();
            // set logo origin relative to title
            this.armOrigin = {x: r.x + this.originOffset.x + r.width, y: r.y + this.originOffset.y};

        },
        viewportDimensions: function () {
            const mainElement = (document.compatMode && document.compatMode === 'CSS1Compat') ?
                document.documentElement : document.body;
            let width = mainElement.clientWidth;
            let height = mainElement.clientHeight;
            if (window.innerWidth && width > window.innerWidth) {

                width = window.innerWidth;
                height = window.innerHeight;
            }
            return {width: width, height: height};
        },
        hideSVG: function () {
            document.getElementById(this.svgID).style.opacity = "0";
        },
        showSVG: function () {
            document.getElementById(this.svgID).style.opacity = "1";
        }
    },
    watch: {
        originOffset: function () {
            this.resizeHandler();
        }
    },
    data: function () {
        return {
            doIK: true,
            logoType: logoTypes.DYNAMIC,
            clickEvent: {x: undefined, y: undefined, valid: false},
            armOrigin: {x: 65, y: 196},
            originOffset: {x: 100, y: 143},
            logoWidth: 1900,
            logoHeight: 1080,
            svgID: "dynamic-logo",
            projectGalleryID: "projects",
            logoURL: require('./assets/logo.svg'),
            logoAltText: "prototriangle logo",
            galleryContent: [
                {
                    title: "Robotic Hand",
                    image: require("@/assets/abarm1.jpg"),
                    status: "ongoing",
                    subtitle: "Embedded development @ Augment Bionics"
                },
                {
                    title: "Turtlebot3 Navigation",
                    image: require("@/assets/rss_robot.jpg"),
                    subtitle: "Practical project for 'Robotics: Science and Systems' @ The University of Edinburgh",
                    view: ProjectForgotten
                },
                {
                    title: "\"Forgotten...\"",
                    image: require("@/assets/forgottensnap.png"),
                    subtitle: "Unity game for 'Game Design Studio' course @ The University of Edinburgh",
                    view: ProjectForgotten
                },
                {
                    title: "\"Sine and Punishment\"",
                    image: require("@/assets/sineandpun_screenshot01.jpg"),
                    subtitle: "Unity game produced as part of The Global Game Jam"
                },
                {
                    title: "Android Activity Tracker / IoT",
                    image: require("@/assets/activetrack1.png"),
                    subtitle: "Unity game produced as part of The Global Game Jam"
                },
                {
                    title: "Greenhouse Automation",
                    image: require("@/assets/greenhouse1.jpg"),
                    status: "ongoing",
                    subtitle: "Greenhouse automation project"
                },
            ],
            menu: [
                {
                    text: "projects",
                    url: "#projects"
                }
            ]
        }
    }
}

</script>

<!--suppress CssInvalidPropertyValue -->
<style id="app-stylesheet">
html {
    font-family: "Fira Sans", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    scroll-behavior: smooth;
}

@media screen and (prefers-reduced-motion: reduce) {
    html {
        scroll-behavior: auto;
    }
}

body {
    background-image: url('./assets/iso.png');
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
    text-shadow: 0 2px 3px rgba(255, 255, 255, 0.43);
    -webkit-background-clip: text;
    -moz-background-clip: text;
    background-clip: text;
}

svg {
    transition: all 0.7s ease;
    opacity: 0;
    position: absolute;
}

#static-logo {
    display: none;
}

@media (max-width: 700px) {
    #static-logo {
        display: inline;
        max-width: 60%;
    }

    svg {
        display: none;
    }
}

#projects {
    margin-top: 58%;
    margin-bottom: 16%;
}

#projects h1 {
    box-sizing: border-box;
    width: 100%;
    text-align: center;
    padding: 1em;
}


</style>
