<template>
    <!--suppress HtmlDeprecatedAttribute -->
    <svg
            xmlns:svg="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xmlns="http://www.w3.org/2000/svg"
            id="prototriangle-logo"
            version="1.1"
            viewBox="40 50 180 150"
            height="200"
            width="300">
        <svg:style id="base-style">
            svg {
            stroke-width:10;
            stroke-linecap:round;
            stroke-linejoin:round;
            stroke-miterlimit:4;
            stroke-dasharray:none;
            }

            #link-layer, #joint-layer {
            fill:none;
            fill-opacity:0;
            stroke:#000000;
            stroke-opacity:1
            }

            #joint-mask #white-path {
            fill:none;
            fill-opacity:0;
            stroke:#ffffff;
            stroke-opacity:1
            }

            #joint-mask black-circles {
            fill:#000000;
            fill-opacity:1;
            stroke:#000000;
            stroke-opacity:1
            }
        </svg:style>
        <svg:defs id="defs">
            <svg:filter id="inset-shadow">
                <!-- Shadow Offset -->
                <svg:feOffset dx="10" dy="10"/>
                <!-- Shadow Blur -->
                <svg:feGaussianBlur stdDeviation="10" result="offset-blur"/>
                <!-- Invert the drop shadow to create an inner shadow -->
                <svg:feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse"/>
                <!-- Color & Opacity -->
                <svg:feFlood flood-color="black" flood-opacity="1" result="color"/>
                <!-- Clip color inside shadow -->
                <svg:feComposite operator="in" in="color" in2="inverse" result="shadow"/>
                <!-- Shadow Opacity -->
                <svg:feComponentTransfer in="shadow" result="shadow">
                    <!--suppress HtmlUnknownTag -->
                    <svg:feFuncA type="linear" slope="1.1"/>
                </svg:feComponentTransfer>
            </svg:filter>
            <svg:g id="joint-circles">
                <svg:circle id="c1" cx="45" cy="165" r="20"/>
                <svg:circle id="c2" cx="100" cy="85" r="20"/>
                <svg:circle id="c3" cx="155" cy="145" r="20"/>
                <svg:circle id="c4" :cx="ee.x" :cy="ee.y" r="20" stroke-dasharray="92"
                            :transform="'rotate(' + ee.r + ', ' + ee.x + ', ' + ee.y +')'"/>
            </svg:g>
            <svg:polyline id="arm-path" :points="'45,165 100,85 155,145 ' + ee.x + ',' + ee.y"/>
        </svg:defs>
        <svg:mask id="joint-mask">
            <svg:use id="white-path" x="0" y="0" xlink:href="#arm-path"/>
            <svg:use id="black-circles" x="0" y="0" xlink:href="#joint-circles"/>
        </svg:mask>
        <svg:g filter="url(#inset-shadow)">
            <svg:g id="link-layer" mask="url(#joint-mask)">
                <svg:use x="0" y="0" xlink:href="#arm-path"/>
            </svg:g>
            <svg:g id="joint-layer">
                <svg:use x="0" y="0" xlink:href="#joint-circles"/>
            </svg:g>
        </svg:g>
    </svg>
</template>

<script>

    export default {
        name: 'LogoIK',
        props: {
            ee: {
                type: Object,
                default: function () {
                    return {
                        x: 215,
                        y: 100,
                        r: 6
                    }
                }
            }
        }
    }
</script>

<style>
</style>
