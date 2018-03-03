interface IGameWorldBAUnique {
	name: String;
}

interface IGameWorldBASize {
	width: Number;
	height: Number;
}
interface IGameWorldBAPoint {
	x: Number;
	y: Number;
}
interface IGameWorldBARectangle extends IGameWorldBASize, IGameWorldBAPoint {
	radian: Number;
	originX: Number;
	originY: Number;
}
interface IGameWorldBACircle extends IGameWorldBAPoint {
	radius: Number;
}
interface IGameWorldBAMovable extends IGameWorldBAPoint {
	moveX(x: Number): Number;
	moveY(y: Number): Number;
	move(distance: Number, degree: Number): IGameWorldBAPoint;
}
interface IGameWorldBAIntersect {
	intersectByRectangle(rectangle: IGameWorldBARectangle): Boolean;
	intersectByCircle(circle: IGameWorldBACircle): Boolean;
}

abstract class GameWorldBAMapBase implements IGameWorldBAUnique, IGameWorldBASize {
	public name: String;
	public width: Number;
	public height: Number;

	public colliders: GameWorldBAColliderBase[];
}
abstract class GameWorldBAColliderBase implements IGameWorldBAUnique, IGameWorldBAPoint {
	public name: string;
	public x: Number;
	public y: Number;
	public isTrigger: Boolean;
	public weight: Number;
	private _acceleration: Number;
}
abstract class GameWorldBAMathLibrary {
	//#region CalculateByCoordianateSystem

	//#endregion

	//#region Intersect
	public static intersectPointByVectors(
		point: IGameWorldBAPoint,
		vector1P1: IGameWorldBAPoint,
		vector1P2: IGameWorldBAPoint,
		vector2P1: IGameWorldBAPoint,
		vector2P2: IGameWorldBAPoint,
		distanceVectors: Number
	): Boolean {
		var distanceByVector1 = this.getDistanceByPointToVector(point, vector1P1, vector1P2);
		var distanceByVector2 = this.getDistanceByPointToVector(point, vector2P1, vector2P2);
		return Math.abs((+distanceByVector1 + +distanceByVector2) - +distanceVectors) <= 0.9;
	}

	public static intersectPointByRectangle(
		point: IGameWorldBAPoint,
		rectangle: IGameWorldBARectangle
	): Boolean {
		var originRectangle: IGameWorldBAPoint = {
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

		var state1 = this.intersectPointByVectors(point,
			rectanglePoint1,
			rectanglePoint2,
			rectanglePoint3,
			rectanglePoint4,
			rectangle.height
		);
		var state2 = this.intersectPointByVectors(point,
			this.getPointByRadian(originRectangle, {
				x: +rectangle.x,
				y: +rectangle.y
			}, rectangle.radian),
			this.getPointByRadian(originRectangle, {
				x: +rectangle.x,
				y: +rectangle.y + +rectangle.height
			}, rectangle.radian),
			this.getPointByRadian(originRectangle, {
				x: +rectangle.x + +rectangle.width,
				y: +rectangle.y
			}, rectangle.radian),
			this.getPointByRadian(originRectangle, {
				x: +rectangle.x + +rectangle.width,
				y: +rectangle.y + +rectangle.height
			}, rectangle.radian),
			rectangle.width
		);
		return state1 && state2;
	}

	public static intersectRectangleByRectangle(
		rectangle1: IGameWorldBARectangle,
		rectangle2: IGameWorldBARectangle
	): Boolean {
		var originRectangle1: IGameWorldBAPoint = {
			x: rectangle1.originX,
			y: rectangle1.originY
		};
		var originRectangle2: IGameWorldBAPoint = {
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

		var state1 = this.intersectPointByRectangle(
			rectangle1Point1, rectangle2);

		var state2 = this.intersectPointByRectangle(
			rectangle1Point2, rectangle2);

		var state3 = this.intersectPointByRectangle(
			rectangle1Point3, rectangle2);

		var state4 = this.intersectPointByRectangle(
			rectangle1Point4, rectangle2);

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

		var state5 = this.intersectPointByRectangle(
			rectangle2Point1, rectangle1);

		var state6 = this.intersectPointByRectangle(
			rectangle2Point2, rectangle1);

		var state7 = this.intersectPointByRectangle(
			rectangle2Point3, rectangle1);

		var state8 = this.intersectPointByRectangle(
			rectangle2Point4, rectangle1);

		var intersectByPoint = state1 || state2 || state3 || state4 ||
			state5 || state6 || state7 || state8;

		return intersectByPoint;
	}
	//#endregion
	public static getPointByRadian(
		origin: IGameWorldBAPoint,
		point: IGameWorldBAPoint,
		radian: Number
	): IGameWorldBAPoint {
		var pointByOrigin: IGameWorldBAPoint = {
			x: +point.x - +origin.x,
			y: +point.y - +origin.y,
		};

		var pointRadian = Math.atan2(+pointByOrigin.y, +pointByOrigin.x);
		var pointRadianAndParameterRadian = +pointRadian + +radian;

		var pointDistance = Math.sqrt((+pointByOrigin.x * +pointByOrigin.x) + (+pointByOrigin.y * +pointByOrigin.y));

		var returnObject: IGameWorldBAPoint = {
			x: (pointDistance * Math.cos(pointRadianAndParameterRadian)) + +origin.x,
			y: (pointDistance * Math.sin(pointRadianAndParameterRadian)) + +origin.y
		};
		return returnObject;
	}
	public static getDistanceByPointToVector(
		point: IGameWorldBAPoint,
		vectorP1: IGameWorldBAPoint,
		vectorP2: IGameWorldBAPoint
	): Number {
		var point1 = vectorP1;
		var point2: IGameWorldBAPoint = {
			x: +vectorP2.x - +point1.x,
			y: +vectorP2.y - +point1.y
		};

		var point3: IGameWorldBAPoint = {
			x: +point.x - +point1.x,
			y: +point.y - +point1.y
		};

		var beta = Math.atan2(+point2.y, +point2.x);

		var teta = Math.atan2(+point3.y, +point3.x);

		var alpha = teta - beta;

		var distance__a_c = Math.sqrt((+point3.x * +point3.x) + (+point3.y * +point3.y));

		var height = Math.sin(alpha) * distance__a_c;

		return Math.abs(height);
	}
}
class GameWorldBARectangle implements IGameWorldBARectangle, IGameWorldBAIntersect {
	radian: Number;
	width: Number;
	height: Number;
	x: Number;
	y: Number;
	originX: Number;
	originY: Number;
	intersectByRectangle(rectangle: IGameWorldBARectangle): Boolean {
		return GameWorldBAMathLibrary.intersectRectangleByRectangle(this, rectangle);
	}
	intersectByCircle(circle: IGameWorldBACircle): Boolean {
		throw new Error("Method not implemented.");
	}
}
class GameWorldBACircle implements IGameWorldBACircle, IGameWorldBAIntersect {
	radius: Number;
	x: Number;
	y: Number;
	intersectByRectangle(rectangle: IGameWorldBARectangle): Boolean {
		throw new Error("Method not implemented.");
	}
	intersectByCircle(circle: IGameWorldBACircle): Boolean {
		throw new Error("Method not implemented.");
	}
}