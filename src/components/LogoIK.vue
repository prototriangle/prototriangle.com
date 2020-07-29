<template>
    <!--suppress HtmlDeprecatedAttribute -->
    <svg
            xmlns:svg="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xmlns="http://www.w3.org/2000/svg"
            :id="idString"
            version="1.1"
            viewBox="-260 -180 500 750"
            height="500"
            width="700">
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
                <svg:circle v-for="(j, i) in points.slice(0, -1)" :id="'c' + (i+1)" :key="i" :cx="j.x" :cy="j.y"
                            r="20"/>
                <svg:circle id="c4" :cx="ee.x" :cy="ee.y" r="20" stroke-dasharray="92"
                            :transform="'rotate(' + eeAngle + ', ' + ee.x + ', ' + ee.y +')'"/>
            </svg:g>
            <svg:polyline id="arm-path" :points="pointsString"/>
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
    import {Solver} from "@/ultils/Solver";

    function calcAngleDegrees(x, y) {
        return Math.atan2(y, x) * 180 / Math.PI;
    }

    let initPoints = [
        {x: 0, y: 0},
        {x: 55, y: -71},
        {x: 110, y: -11},
        {x: 170, y: -56,}
    ]

    let solver = new Solver(initPoints)

    export default {
        name: 'LogoIK',
        props: {
            clickEvent: Object,
            origin: Object,
            idString: {
                type: String,
                default: () => "logo"
            }
        }, watch: {
            origin: function (rawO) {
                const o = this.coordConvert(rawO);
                console.log("New Origin");
                console.log(o);
                const d = solver.diffV(this.points[0], o);
                const f = v => {
                    return {x: v.x + d.x, y: v.y + d.y}
                };
                initPoints = initPoints.map(f);
                this.points = this.points.map(f);
                solver.points = this.points;
            },
            clickEvent: function (evt) {
                if (!evt.valid) return;
                let svgCoords = this.coordConvert(evt);
                if (svgCoords === null) return;
                let goal = {x: svgCoords.x, y: svgCoords.y};
                this.countdown = 50;
                this.tweenVector = solver.mul(1 / 50, solver.diffV(this.ee, goal));
                this.targetPoint = goal;
                this.timers.push(window.setInterval(this.runLoop, 20));
            }

        },
        computed: {
            ee: function () {
                return this.points[this.points.length - 1]
            },
            pointsString: function () {
                let arr = []
                this.points.forEach((j) => {
                    arr.push(j.x.toString() + ',' + j.y.toString())
                });
                return arr.join(' ');
            }
        },
        methods: {
            runLoop() {
                // console.log(this.countdown);
                if (this.countdown <= 0) this.timers.forEach(t => window.clearInterval(t));
                this.tweenPoint = solver.add(this.ee, this.tweenVector);
                // console.log(JSON.stringify(this.tweenPoint));
                this.points = solver.runIK(this.tweenPoint);
                const penJoint = this.points[this.points.length - 2];
                this.eeAngle = calcAngleDegrees(this.ee.x - penJoint.x, this.ee.y - penJoint.y) + 45;
                this.countdown -= 1;
            },
            coordConvert: function (screenCoords) {
                const svg = document.getElementById(this.idString);
                let pt = svg.createSVGPoint();
                pt.x = screenCoords.x;
                pt.y = screenCoords.y;
                return pt.matrixTransform(svg.getScreenCTM().inverse());
            }
        },
        data: function () {
            return {
                eeAngle: 45,
                targetPoint: initPoints[initPoints.length - 1],
                tweenPoint: initPoints[initPoints.length - 1],
                tweenVector: {x: 0, y: 0},
                points: initPoints,
                countdown: 0,
                timers: [],
                threshold: 100,
            }
        }
    }
</script>

<style>
</style>
