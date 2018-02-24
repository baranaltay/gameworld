// Converts from degrees to radians.
Math.radians = function (degrees) {
	return degrees * Math.PI / 180;
};

// Converts from radians to degrees.
Math.degrees = function (radians) {
	return radians * 180 / Math.PI;
};

var mainObject = new GameWorldBARectangle();
mainObject.x = 20;
mainObject.y = 20;
mainObject.width = 30;
mainObject.height = 50;
mainObject.originX = mainObject.x + (mainObject.width / 2);
mainObject.originY = mainObject.y + (mainObject.height / 2);
mainObject.radian = Math.radians(0);

var sideObject = new GameWorldBARectangle();
sideObject.x = 40;
sideObject.y = 40;
sideObject.width = 50;
sideObject.height = 10;
sideObject.originX = sideObject.x;
sideObject.originY = sideObject.y;
sideObject.radian = Math.radians(180);

var irrelevantObject = new GameWorldBARectangle();
irrelevantObject.x = 40;
irrelevantObject.y = 110;
irrelevantObject.width = 50;
irrelevantObject.height = 20;
irrelevantObject.originX = irrelevantObject.x;
irrelevantObject.originY = irrelevantObject.y;
irrelevantObject.radian = 0;

window.onload = function () {
	var mainEl = document.getElementById('mainObject');
	var sideEl = document.getElementById('sideObject');
	var irrelevantEl = document.getElementById('irrelevantObject');

	mainEl.style.width = mainObject.width + 'px';
	mainEl.style.height = mainObject.height + 'px';
	mainEl.style.left = mainObject.x + 'px';
	mainEl.style.top = mainObject.y + 'px';
	mainEl.style.transformOrigin = (mainObject.originX - mainObject.x) + 'px ' + (mainObject.originY - mainObject.y) + 'px';
	mainEl.style.transform = 'rotateZ(' + Math.degrees(mainObject.radian) + 'deg)';

	sideEl.style.width = sideObject.width + 'px';
	sideEl.style.height = sideObject.height + 'px';
	sideEl.style.left = sideObject.x + 'px';
	sideEl.style.top = sideObject.y + 'px';
	sideEl.style.transformOrigin = (sideObject.originX - sideObject.x) + 'px ' + (sideObject.originY - sideObject.y) + 'px';
	sideEl.style.transform = 'rotateZ(' + Math.degrees(sideObject.radian) + 'deg)';

	irrelevantEl.style.width = irrelevantObject.width + 'px';
	irrelevantEl.style.height = irrelevantObject.height + 'px';
	irrelevantEl.style.left = irrelevantObject.x + 'px';
	irrelevantEl.style.top = irrelevantObject.y + 'px';
	irrelevantEl.style.transformOrigin = (irrelevantObject.originX - irrelevantObject.x) + 'px ' + (irrelevantObject.originY - irrelevantObject.y) + 'px';
	irrelevantEl.style.transform = 'rotateZ(' + Math.degrees(irrelevantObject.radian) + 'deg)';

	document.body.addEventListener('keydown', function (event) {

		switch (event.which) {
			case 65: // a
				sideObject.radian = Math.radians(Math.degrees(sideObject.radian) - 1);
				break;
			case 68: // d
				sideObject.radian = Math.radians(Math.degrees(sideObject.radian) + 1);
				break;
		}
		sideEl.style.transform = 'rotateZ(' + Math.degrees(sideObject.radian) + 'deg)';

		var mytest = sideObject.intersectByRectangle(mainObject);
		mainEl.style.borderColor = 'black';
		if (mytest) {
			mainEl.style.borderColor = 'red';
		}
	});

	document.body.addEventListener('mousemove', function (event) {
		sideObject.x = event.x;
		sideObject.y = event.y;
		sideObject.originX = sideObject.x;
		sideObject.originY = sideObject.y;

		sideEl.style.left = sideObject.x + 'px';
		sideEl.style.top = sideObject.y + 'px';

		var mytest = sideObject.intersectByRectangle(mainObject);
		mainEl.style.borderColor = 'black';
		if (mytest) {
			mainEl.style.borderColor = 'red';
		}
	});
};