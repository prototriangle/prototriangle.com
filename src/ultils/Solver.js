// FABRIK Solver

export class Solver {
    constructor(pointArray) {
        this.points = pointArray;
        this.lengths = this.calculateLengths(this.points);
    }

    runIK(target, iterations = 4) {
        if (target === undefined) return;
        // console.log("Running IK..")
        const startPoint = this.points[0];
        for (let i = 0; i < iterations; ++i) {
            this.points = this.runBackwards(this.points, this.lengths, target);
            this.points = this.runForwards(this.points, this.lengths, startPoint);
        }
        // console.log("IK Done!")
        return this.points;
    }

    diff(x1, y1, x2, y2) {
        const x = x2 - x1;
        const y = y2 - y1;
        return {x: x, y: y}
    }

    diffV(p1, p2) {
        if (!p1 || !p2)
            return null;
        return this.diff(p1.x, p1.y, p2.x, p2.y);
    }

    magnitude(x, y) {
        return Math.sqrt(x * x + y * y);
    }

    magnitudeV(p) {
        return this.magnitude(p.x, p.y);
    }

    distance(x1, y1, x2, y2) {
        const {x, y} = this.diff(x1, y1, x2, y2);
        return this.magnitude(x, y)
    }

    distanceV(p1, p2) {
        return this.distance(p1.x, p1.y, p2.x, p2.y);
    }

    unitDirVec(x1, y1, x2, y2) {
        const {x, y} = this.diff(x1, y1, x2, y2);
        const m = this.magnitude(x, y);
        return {x: (x / m), y: (y / m)};
    }

    unitDirVecV(p1, p2) {
        return this.unitDirVec(p1.x, p1.y, p2.x, p2.y);
    }

    mul(scalar, vector) {
        return {x: scalar * vector.x, y: scalar * vector.y};
    }

    add(v1, v2) {
        return {x: v1.x + v2.x, y: v1.y + v2.y};
    }

    calculateLengths(points) {
        // calculate lengths array
        let lengths = [];
        for (let i = 1, l = points.length; i < l; i++) {
            lengths.push(this.distanceV(points[i - 1], points[i]));
        }
        return lengths
    }

    runBackwards(points, lengths, endTarget) {
        // copy points array
        let newPoints = [...points];
        // set end point to target
        newPoints[points.length - 1] = endTarget;
        // iterate
        for (let i = 1, l = points.length; i < l; i++) {
            let j = l - i;
            let k = j - 1;
            let pL = newPoints[j];
            let pF = points[k]
            newPoints[k] = this.add(pL, this.mul(lengths[k], this.unitDirVecV(pL, pF)));
        }
        return newPoints;
    }

    runForwards(points, lengths, startTarget) {
        // copy points array
        let newPoints = [...points];
        // set end point to target
        newPoints[0] = startTarget;
        // iterate
        for (let i = 0, l = points.length - 2; i < l; i++) {
            let j = i;
            let k = j + 1;
            let pL = newPoints[j];
            let pF = points[k]
            newPoints[k] = this.add(pL, this.mul(lengths[k], this.unitDirVecV(pL, pF)));
        }
        return newPoints;
    }

}
