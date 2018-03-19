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

	public static intersectRectangleByCircle(
		rectangle: IGameWorldBARectangle,
		circle: IGameWorldBACircle
	): Boolean {
		var originRectangle: IGameWorldBAPoint = {
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

		var distance__RectangleBorder1_CircleCenter = this.getDistanceByPointToVector(
			{
				x: +circle.x,
				y: +circle.y
			},
			rectanglePoint1,
			rectanglePoint3
		);
		var distance__RectangleBorder2_CircleCenter = this.getDistanceByPointToVector(
			{
				x: +circle.x,
				y: +circle.y
			},
			rectanglePoint1,
			rectanglePoint2
		);
		var distance__RectangleBorder3_CircleCenter = this.getDistanceByPointToVector(
			{
				x: +circle.x,
				y: +circle.y
			},
			rectanglePoint2,
			rectanglePoint4
		);
		var distance__RectangleBorder4_CircleCenter = this.getDistanceByPointToVector(
			{
				x: +circle.x,
				y: +circle.y
			},
			rectanglePoint3,
			rectanglePoint4
		);

		var state1 = +distance__RectangleBorder1_CircleCenter <= +circle.radius + 0.1;
		var state2 = +distance__RectangleBorder2_CircleCenter <= +circle.radius + 0.1;
		var state3 = +distance__RectangleBorder3_CircleCenter <= +circle.radius + 0.1;
		var state4 = +distance__RectangleBorder4_CircleCenter <= +circle.radius + 0.1;

		return state1 ||  state2 || state3 ||  state4;
	}

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

	// Converts from degrees to radians.
	public static getRadianFromDegree (degrees) {
		return degrees * Math.PI / 180;
	};

	// Converts from radians to degrees.
	public static getDegreeFromRadian(radians) {
		return radians * 180 / Math.PI;
	};

	public static getDistanceByPointToVector(
		point: IGameWorldBAPoint,
		vectorP1: IGameWorldBAPoint,
		vectorP2: IGameWorldBAPoint
	): Number {
		var a_to_p = [+point.x - +vectorP1.x, +point.y - +vectorP1.y]     // Storing vector A -> P
		var a_to_b = [+vectorP2.x - +vectorP1.x, +vectorP2.y - +vectorP1.y]     // Storing vector A -> B

		var atb2 = a_to_b[0] ** 2 + a_to_b[1] ** 2  // ** 2 means "squared"
		//   Basically finding the squared magnitude
		//   of a_to_b

		var atp_dot_atb = a_to_p[0] * a_to_b[0] + a_to_p[1] * a_to_b[1]
		// The dot product of a_to_p and a_to_b

		var t = atp_dot_atb / atb2              // The normalized "distance" from a to
		//   your closest point
		var shortestPoint = {
			x: +vectorP1.x + a_to_b[0] * t,
			y: +vectorP1.y + a_to_b[1] * t
		}
		var differentPoint = {
			x: +shortestPoint.x - +point.x,
			y: +shortestPoint.y - +point.y
		}

		var distance = Math.sqrt((differentPoint.x ** 2) + (differentPoint.y ** 2));

		return distance;
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
		return GameWorldBAMathLibrary.intersectRectangleByCircle(this, circle);
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

