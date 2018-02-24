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
abstract class GameWorldBAMatchLibrary {
	//#region CalculateByCoordianateSystem

	//#endregion

	//#region Intersect
	public static intersectPointByRectangle(
		point: IGameWorldBAPoint,
		rectangle: IGameWorldBARectangle
	): Boolean {

		return true;
	}

	public static intersectRectangleByRectangle(
		rectangle1: IGameWorldBARectangle,
		rectangle2: IGameWorldBARectangle
	): Boolean {
		
		return true;
	}
	//#endregion
}
class GameWorldBARectangle implements IGameWorldBARectangle, IGameWorldBAIntersect {
	public width: Number;
	public height: Number;
	public x: Number;
	public y: Number;
	public degree: Number;
	public transformOrigin: IGameWorldBAPoint;

	intersect
	intersectByRectangle(rectangle: IGameWorldBARectangle): Boolean {
		throw new Error("Method not implemented.");
	}
	intersectByCircle(circle: IGameWorldBACircle): Boolean {
		throw new Error("Method not implemented.");
	}
}
class GameWorldBACircle implements IGameWorldBACircle, IGameWorldBAIntersect {
	public radius: Number;
	public x: Number;
	public y: Number;

	intersectByRectangle(rectangle: IGameWorldBARectangle): Boolean {
		throw new Error("Method not implemented.");
	}
	intersectByCircle(circle: IGameWorldBACircle): Boolean {
		throw new Error("Method not implemented.");
	}
}