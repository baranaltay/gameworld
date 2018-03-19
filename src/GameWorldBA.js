var GameWorldBAMapBase = /** @class */ (function () {
    function GameWorldBAMapBase() {
    }
    return GameWorldBAMapBase;
}());
var GameWorldBAColliderBase = /** @class */ (function () {
    function GameWorldBAColliderBase() {
    }
    return GameWorldBAColliderBase;
}());
var GameWorldBAMathLibrary = /** @class */ (function () {
    function GameWorldBAMathLibrary() {
    }
    GameWorldBAMathLibrary.intersectPointByVectors = function (point, vector1P1, vector1P2, vector2P1, vector2P2, distanceVectors) {
        var distanceByVector1 = this.getDistanceByPointToVector(point, vector1P1, vector1P2);
        var distanceByVector2 = this.getDistanceByPointToVector(point, vector2P1, vector2P2);
        return Math.abs((+distanceByVector1 + +distanceByVector2) - +distanceVectors) <= 0.9;
    };
    GameWorldBAMathLibrary.intersectPointByRectangle = function (point, rectangle) {
        var originRectangle = {
            x: rectangle.originX,
            y: rectangle.originY
        };
        var rectanglePoint1 = this.getPointByRadian(originRectangle, {
            x: +rectangle.x,
            y: +rectangle.y
        }, rectangle.radian);
        var rectanglePoint2 = this.getPointByRadian(originRectangle, {
            x: +rectangle.x + +rectangle.width,
            y: +rectangle.y
        }, rectangle.radian);
        var rectanglePoint3 = this.getPointByRadian(originRectangle, {
            x: +rectangle.x,
            y: +rectangle.y + +rectangle.height
        }, rectangle.radian);
        var rectanglePoint4 = this.getPointByRadian(originRectangle, {
            x: +rectangle.x + +rectangle.width,
            y: +rectangle.y + +rectangle.height
        }, rectangle.radian);
        var state1 = this.intersectPointByVectors(point, rectanglePoint1, rectanglePoint2, rectanglePoint3, rectanglePoint4, rectangle.height);
        var state2 = this.intersectPointByVectors(point, this.getPointByRadian(originRectangle, {
            x: +rectangle.x,
            y: +rectangle.y
        }, rectangle.radian), this.getPointByRadian(originRectangle, {
            x: +rectangle.x,
            y: +rectangle.y + +rectangle.height
        }, rectangle.radian), this.getPointByRadian(originRectangle, {
            x: +rectangle.x + +rectangle.width,
            y: +rectangle.y
        }, rectangle.radian), this.getPointByRadian(originRectangle, {
            x: +rectangle.x + +rectangle.width,
            y: +rectangle.y + +rectangle.height
        }, rectangle.radian), rectangle.width);
        return state1 && state2;
    };
    GameWorldBAMathLibrary.intersectRectangleByRectangle = function (rectangle1, rectangle2) {
        var originRectangle1 = {
            x: rectangle1.originX,
            y: rectangle1.originY
        };
        var originRectangle2 = {
            x: rectangle2.originX,
            y: rectangle2.originY
        };
        var rectangle1Point1 = this.getPointByRadian(originRectangle1, {
            x: rectangle1.x,
            y: rectangle1.y
        }, rectangle1.radian);
        var rectangle1Point2 = this.getPointByRadian(originRectangle1, {
            x: +rectangle1.x + +rectangle1.width,
            y: rectangle1.y
        }, rectangle1.radian);
        var rectangle1Point3 = this.getPointByRadian(originRectangle1, {
            x: rectangle1.x,
            y: +rectangle1.y + +rectangle1.height
        }, rectangle1.radian);
        var rectangle1Point4 = this.getPointByRadian(originRectangle1, {
            x: +rectangle1.x + +rectangle1.width,
            y: +rectangle1.y + +rectangle1.height
        }, rectangle1.radian);
        var state1 = this.intersectPointByRectangle(rectangle1Point1, rectangle2);
        var state2 = this.intersectPointByRectangle(rectangle1Point2, rectangle2);
        var state3 = this.intersectPointByRectangle(rectangle1Point3, rectangle2);
        var state4 = this.intersectPointByRectangle(rectangle1Point4, rectangle2);
        var rectangle2Point1 = this.getPointByRadian(originRectangle2, {
            x: rectangle2.x,
            y: rectangle2.y
        }, rectangle2.radian);
        var rectangle2Point2 = this.getPointByRadian(originRectangle2, {
            x: +rectangle2.x + +rectangle2.width,
            y: rectangle2.y
        }, rectangle2.radian);
        var rectangle2Point3 = this.getPointByRadian(originRectangle2, {
            x: rectangle2.x,
            y: +rectangle2.y + +rectangle2.height
        }, rectangle2.radian);
        var rectangle2Point4 = this.getPointByRadian(originRectangle2, {
            x: +rectangle2.x + +rectangle2.width,
            y: +rectangle2.y + +rectangle2.height
        }, rectangle2.radian);
        var state5 = this.intersectPointByRectangle(rectangle2Point1, rectangle1);
        var state6 = this.intersectPointByRectangle(rectangle2Point2, rectangle1);
        var state7 = this.intersectPointByRectangle(rectangle2Point3, rectangle1);
        var state8 = this.intersectPointByRectangle(rectangle2Point4, rectangle1);
        var intersectByPoint = state1 || state2 || state3 || state4 ||
            state5 || state6 || state7 || state8;
        return intersectByPoint;
    };
    GameWorldBAMathLibrary.intersectRectangleByCircle = function (rectangle, circle) {
        var originRectangle = {
            x: rectangle.originX,
            y: rectangle.originY
        };
        var rectanglePoint1 = this.getPointByRadian(originRectangle, {
            x: rectangle.x,
            y: rectangle.y
        }, rectangle.radian);
        var rectanglePoint2 = this.getPointByRadian(originRectangle, {
            x: +rectangle.x + +rectangle.width,
            y: rectangle.y
        }, rectangle.radian);
        var rectanglePoint3 = this.getPointByRadian(originRectangle, {
            x: rectangle.x,
            y: +rectangle.y + +rectangle.height
        }, rectangle.radian);
        var rectanglePoint4 = this.getPointByRadian(originRectangle, {
            x: +rectangle.x + +rectangle.width,
            y: +rectangle.y + +rectangle.height
        }, rectangle.radian);
        var distance__RectangleBorder1_CircleCenter = this.getDistanceByPointToVector({
            x: +circle.x,
            y: +circle.y
        }, rectanglePoint1, rectanglePoint3);
        var distance__RectangleBorder2_CircleCenter = this.getDistanceByPointToVector({
            x: +circle.x,
            y: +circle.y
        }, rectanglePoint1, rectanglePoint2);
        var distance__RectangleBorder3_CircleCenter = this.getDistanceByPointToVector({
            x: +circle.x,
            y: +circle.y
        }, rectanglePoint2, rectanglePoint4);
        var distance__RectangleBorder4_CircleCenter = this.getDistanceByPointToVector({
            x: +circle.x,
            y: +circle.y
        }, rectanglePoint3, rectanglePoint4);
        var state1 = +distance__RectangleBorder1_CircleCenter <= +circle.radius + 0.1;
        var state2 = +distance__RectangleBorder2_CircleCenter <= +circle.radius + 0.1;
        var state3 = +distance__RectangleBorder3_CircleCenter <= +circle.radius + 0.1;
        var state4 = +distance__RectangleBorder4_CircleCenter <= +circle.radius + 0.1;
        return state1 || state2 || state3 || state4;
    };
    GameWorldBAMathLibrary.getPointByRadian = function (origin, point, radian) {
        var pointByOrigin = {
            x: +point.x - +origin.x,
            y: +point.y - +origin.y
        };
        var pointRadian = Math.atan2(+pointByOrigin.y, +pointByOrigin.x);
        var pointRadianAndParameterRadian = +pointRadian + +radian;
        var pointDistance = Math.sqrt((+pointByOrigin.x * +pointByOrigin.x) + (+pointByOrigin.y * +pointByOrigin.y));
        var returnObject = {
            x: (pointDistance * Math.cos(pointRadianAndParameterRadian)) + +origin.x,
            y: (pointDistance * Math.sin(pointRadianAndParameterRadian)) + +origin.y
        };
        return returnObject;
    };
    // Converts from degrees to radians.
    GameWorldBAMathLibrary.getRadianFromDegree = function (degrees) {
        return degrees * Math.PI / 180;
    };
    ;
    // Converts from radians to degrees.
    GameWorldBAMathLibrary.getDegreeFromRadian = function (radians) {
        return radians * 180 / Math.PI;
    };
    ;
    GameWorldBAMathLibrary.getDistanceByPointToVector = function (point, vectorP1, vectorP2) {
        var a_to_p = [+point.x - +vectorP1.x, +point.y - +vectorP1.y]; // Storing vector A -> P
        var a_to_b = [+vectorP2.x - +vectorP1.x, +vectorP2.y - +vectorP1.y]; // Storing vector A -> B
        var atb2 = Math.pow(a_to_b[0], 2) + Math.pow(a_to_b[1], 2); // ** 2 means "squared"
        //   Basically finding the squared magnitude
        //   of a_to_b
        var atp_dot_atb = a_to_p[0] * a_to_b[0] + a_to_p[1] * a_to_b[1];
        // The dot product of a_to_p and a_to_b
        var t = atp_dot_atb / atb2; // The normalized "distance" from a to
        //   your closest point
        var shortestPoint = {
            x: +vectorP1.x + a_to_b[0] * t,
            y: +vectorP1.y + a_to_b[1] * t
        };
        var differentPoint = {
            x: +shortestPoint.x - +point.x,
            y: +shortestPoint.y - +point.y
        };
        var distance = Math.sqrt((Math.pow(differentPoint.x, 2)) + (Math.pow(differentPoint.y, 2)));
        return distance;
    };
    return GameWorldBAMathLibrary;
}());
var GameWorldBARectangle = /** @class */ (function () {
    function GameWorldBARectangle() {
    }
    GameWorldBARectangle.prototype.intersectByRectangle = function (rectangle) {
        return GameWorldBAMathLibrary.intersectRectangleByRectangle(this, rectangle);
    };
    GameWorldBARectangle.prototype.intersectByCircle = function (circle) {
        return GameWorldBAMathLibrary.intersectRectangleByCircle(this, circle);
    };
    return GameWorldBARectangle;
}());
var GameWorldBACircle = /** @class */ (function () {
    function GameWorldBACircle() {
    }
    GameWorldBACircle.prototype.intersectByRectangle = function (rectangle) {
        throw new Error("Method not implemented.");
    };
    GameWorldBACircle.prototype.intersectByCircle = function (circle) {
        throw new Error("Method not implemented.");
    };
    return GameWorldBACircle;
}());
