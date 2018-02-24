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
    //#region CalculateByCoordianateSystem
    //#endregion
    //#region Intersect
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
        var state1 = this.intersectPointByVectors(point, this.getPointByRadian(originRectangle, {
            x: +rectangle.x,
            y: +rectangle.y
        }, rectangle.radian), this.getPointByRadian(originRectangle, {
            x: +rectangle.x + +rectangle.width,
            y: +rectangle.y
        }, rectangle.radian), this.getPointByRadian(originRectangle, {
            x: +rectangle.x,
            y: +rectangle.y + +rectangle.height
        }, rectangle.radian), this.getPointByRadian(originRectangle, {
            x: +rectangle.x + +rectangle.width,
            y: +rectangle.y + +rectangle.height
        }, rectangle.radian), rectangle.height);
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
        var state1 = this.intersectPointByRectangle(this.getPointByRadian(originRectangle1, {
            x: rectangle1.x,
            y: rectangle1.y
        }, rectangle1.radian), rectangle2);
        var state2 = this.intersectPointByRectangle(this.getPointByRadian(originRectangle1, {
            x: +rectangle1.x + +rectangle1.width,
            y: rectangle1.y
        }, rectangle1.radian), rectangle2);
        var state3 = this.intersectPointByRectangle(this.getPointByRadian(originRectangle1, {
            x: rectangle1.x,
            y: +rectangle1.y + +rectangle1.height
        }, rectangle1.radian), rectangle2);
        var state4 = this.intersectPointByRectangle(this.getPointByRadian(originRectangle1, {
            x: +rectangle1.x + +rectangle1.width,
            y: +rectangle1.y + +rectangle1.height
        }, rectangle1.radian), rectangle2);
        var state5 = this.intersectPointByRectangle(this.getPointByRadian(originRectangle2, {
            x: rectangle2.x,
            y: rectangle2.y
        }, rectangle2.radian), rectangle1);
        var state6 = this.intersectPointByRectangle(this.getPointByRadian(originRectangle2, {
            x: +rectangle2.x + +rectangle2.width,
            y: rectangle2.y
        }, rectangle2.radian), rectangle1);
        var state7 = this.intersectPointByRectangle(this.getPointByRadian(originRectangle2, {
            x: rectangle2.x,
            y: +rectangle2.y + +rectangle2.height
        }, rectangle2.radian), rectangle1);
        var state8 = this.intersectPointByRectangle(this.getPointByRadian(originRectangle2, {
            x: +rectangle2.x + +rectangle2.width,
            y: +rectangle2.y + +rectangle2.height
        }, rectangle2.radian), rectangle1);
        return state1 || state2 || state3 || state4 ||
            state5 || state6 || state7 || state8;
    };
    //#endregion
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
    GameWorldBAMathLibrary.getDistanceByPointToVector = function (point, vectorP1, vectorP2) {
        var point1 = vectorP1;
        var point2 = {
            x: +vectorP2.x - +point1.x,
            y: +vectorP2.y - +point1.y
        };
        var point3 = {
            x: +point.x - +point1.x,
            y: +point.y - +point1.y
        };
        var beta = Math.atan2(+point2.y, +point2.x);
        var teta = Math.atan2(+point3.y, +point3.x);
        var alpha = teta - beta;
        var distance__a_c = Math.sqrt((+point3.x * +point3.x) + (+point3.y * +point3.y));
        var height = Math.sin(alpha) * distance__a_c;
        return Math.abs(height);
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
        throw new Error("Method not implemented.");
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
