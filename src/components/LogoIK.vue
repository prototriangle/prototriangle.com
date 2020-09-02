<template>
    <!--suppress HtmlDeprecatedAttribute -->
    <svg
            xmlns:svg="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xmlns="http://www.w3.org/2000/svg"
            :id="idString"
            version="1.1"
            :viewBox="'0 0 ' + svgWidth + ' ' + svgHeight"
            :height="svgHeight"
            :width="svgWidth">
        <svg:style id="base-style">
            svg {
            stroke-width: {{ strokeWidth }};
            stroke-linecap:round;
            stroke-linejoin:round;
            stroke-miterlimit:4;
            stroke-dasharray:none;
            }

            #link-layer, #joint-layer {
            fill:none;
            fill-opacity:0;
            stroke:currentColor;
            stroke-opacity:1;
            }

            #joint-mask #mask-geom {
            fill:none;
            fill-opacity:0;
            }

            #mask-geom #white-path {
            fill:none;
            fill-opacity:0;
            stroke:#ffffff;
            stroke-opacity:1;
            stroke-width: {{ strokeWidth }};
            }

            #mask-geom #black-circles {
            fill:#000000;
            fill-opacity:1;
            stroke:#000000;
            stroke-opacity:1;
            stroke-width: 1;
            }
        </svg:style>
        <svg:defs id="defs">
            <svg:filter id="inset-shadow">
                <!-- Shadow Offset -->
                <svg:feOffset dx="6" dy="6"/>
                <!-- Shadow Blur -->
                <svg:feGaussianBlur stdDeviation="8" result="offset-blur"/>
                <!-- Invert the drop shadow to create an inner shadow -->
                <svg:feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse"/>
                <!-- Color & Opacity -->
                <svg:feFlood flood-color="currentColor" flood-opacity="0.9" result="color"/>
                <!-- Clip color inside shadow -->
                <svg:feComposite operator="in" in="color" in2="inverse" result="shadow"/>
                <!-- Shadow Opacity -->
                <svg:feComponentTransfer in="shadow" result="shadow">
                    <!--suppress HtmlUnknownTag -->
                    <svg:feFuncA type="linear" slope="1.1"/>
                </svg:feComponentTransfer>
            </svg:filter>
            <svg:g id="joint-circles" shape-rendering="geometricPrecision">
                <svg:circle v-for="(j, i) in points.slice(0, -1)" :id="'c' + (i+1)" :key="i" :cx="j.x" :cy="j.y"
                            :r="circleRadius"/>
                <svg:circle id="c4" :cx="ee.x" :cy="ee.y" :r="circleRadius" stroke-dasharray="92"
                            :transform="'rotate(' + eeAngle + ', ' + ee.x + ', ' + ee.y +')'"/>
            </svg:g>
            <svg:polyline id="arm-path" :points="pointsString"/>
            <svg:g id="mask-geom">
                <svg:use id="white-path" x="0" y="0" xlink:href="#arm-path"/>
                <svg:use id="black-circles" x="0" y="0" xlink:href="#joint-circles"/>
            </svg:g>
            <svg:mask id="joint-mask">
                <svg:use x="0" y="0" xlink:href="#mask-geom"/>
            </svg:mask>
        </svg:defs>
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
    {x: 55 * 2, y: -71 * 2},
    {x: 110 * 2, y: -11 * 2},
    {x: 170 * 2, y: -56 * 2}
]

let solver = new Solver(initPoints)

export default {
    name: 'LogoIK',
    props: {
        doIK: Boolean,
        clickEvent: Object,
        origin: Object,
        idString: {
            type: String,
            default: () => "logo"
        },
        svgWidth: Number,
        svgHeight: Number,
    }, watch: {
        origin: function (rawO) {
            if (!this.doIK || !rawO) return;
            const o = this.coordConvert(rawO);
            // console.log("New Origin");
            // console.log(o);
            const d = solver.diffV(this.points[0], o);
            if (!d)
                return null;
            const f = v => {
                return {x: v.x + d.x, y: v.y + d.y}
            };
            initPoints = initPoints.map(f);
            this.points = this.points.map(f);
            solver.points = this.points;
        },
        clickEvent: function (evt) {
            if (!this.doIK || !evt.valid) return;
            let svgCoords = this.coordConvert(evt);
            if (svgCoords === null) return;
            this.startPoint = this.coordConvert(this.ee);
            console.log(`new start point (${this.startPoint.x},${this.startPoint.y})`);
            this.targetPoint = {x: svgCoords.x, y: svgCoords.y};
            console.log(`new target point (${this.targetPoint.x},${this.targetPoint.y})`);
            this.animateStart = undefined;
            if (!this.isAnimating)
                window.requestAnimationFrame(this.runLoop);
            this.$el.style.color = '#a1430a';
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
        },
        bufferAmount: function () {
            return this.circleRadius * 1.6;
        }
    },
    methods: {
        runLoop(timestamp) {
            if (this.animateStart === undefined) {
                this.animateStart = timestamp;
            }
            const progress = (timestamp - this.animateStart) / this.animateTime;
            const progBarWidth = 80;
            const dispProg = Math.min(progBarWidth, Math.floor(progress * progBarWidth));
            console.log(`${"▰".repeat(dispProg)}${"▱".repeat(progBarWidth - dispProg)}`);
            if (progress >= 1) {
                this.$el.style.color = 'black';
                this.animateStart = undefined;
                this.startPoint = this.ee;
                this.isAnimating = false;
            } else {
                this.tweenPoint = solver.add(solver.mul(progress, this.targetPoint), solver.mul(1 - progress, this.startPoint));
                this.points = solver.runIK(this.tweenPoint, 8);
                const penJoint = this.points[this.points.length - 2];
                this.eeAngle = calcAngleDegrees(this.ee.x - penJoint.x, this.ee.y - penJoint.y) + 160;
                this.isAnimating = true;
                window.requestAnimationFrame(this.runLoop);
            }
        },
        coordConvert: function (screenCoords) {
            // noinspection JSUnresolvedFunction
            let pt = this.$el.createSVGPoint();
            pt.x = screenCoords.x;
            pt.y = screenCoords.y;
            // noinspection JSUnresolvedFunction
            const ctm = this.$el.getScreenCTM();
            if (!ctm)
                return null;
            const ret = pt.matrixTransform(ctm.inverse());
            ret.x = Math.max(Math.min(ret.x, this.svgWidth - this.bufferAmount), this.bufferAmount);
            ret.y = Math.max(Math.min(ret.y, this.svgHeight - this.bufferAmount), this.bufferAmount);
            return ret;
        }
    },
    data: function () {
        return {
            eeAngle: 125,
            targetPoint: initPoints[initPoints.length - 1],
            startPoint: initPoints[initPoints.length - 1],
            tweenPoint: initPoints[initPoints.length - 1],
            points: initPoints,
            animateTime: 2000,
            animateStart: undefined,
            threshold: 100,
            circleRadius: 40,
            strokeWidth: 20,
            isAnimating: false,
        }
    }
}
</script>

<style>
</style>
