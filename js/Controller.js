"use strict";

var Controller =
{
	on:     false,
	
	upButton:    0,
	downButton:  0,
	leftButton:  0,
	rightButton: 0,
	

	turnOn: function()
	{
		if(this.on) return;
		this.on = true;
	},

	turnOff: function()
	{
		if(!this.on) return;
		this.on = false;
		
		this.releaseUp();
		this.releaseLeft();
		this.releaseDown();
		this.releaseRight();
	},

	toggleOnOff: function()
	{
		if(this.on)
			this.turnOff();
		else
			this.turnOn();
	},

	pressRight: function()
	{
		if(!this.on)
			return;
		if(!this.rightButton)
		{
			this.rightButton = 1;
			Googooli.accelX += 1;
		}
	},

	releaseRight: function()
	{
		if(this.rightButton)
		{
			this.rightButton = 0;
			Googooli.accelX -= 1;
		}
	},

	pressUp: function()
	{
		if(!this.on)
			return;
		if(!this.upButton)
		{
			this.upButton = 1;
			Googooli.accelY -= 1;
		}
	},

	releaseUp: function()
	{
		if(this.upButton)
		{
			this.upButton = 0;
			Googooli.accelY += 1;
		}
	},

	pressLeft: function()
	{
		if(!this.on)
			return;
		if(!this.leftButton)
		{
			this.leftButton = 1;
			Googooli.accelX -= 1;
		}
	},

	releaseLeft: function()
	{
		if(this.leftButton)
		{
			this.leftButton = 0;
			Googooli.accelX += 1;
		}
	},

	pressDown: function()
	{
		if(!this.on)
			return;
		if(!this.downButton)
		{
			this.downButton = 1;
			Googooli.accelY += 1;
		}
	},

	releaseDown: function()
	{
		if(this.downButton)
		{
			this.downButton = 0;
			Googooli.accelY -= 1;
		}
	}

	// move: function(dx, dy)
	// {
	// 	if(!this.on) return;
		
	// 	if(!GameManager.timer.running && !this.played)
	// 	{
	// 		GameManager.timer.start();
	// 		GraphicsManager.startRenderingTime();
	// 	}

	// 	this.played = true;
		
	// 	Googooli.move(dx, dy);
	// 	GraphicsManager.renderGoogooli();
		
	// 	var idx = GameManager.level;
	// 	var finishNode = Levels[idx].nodes[Levels[idx].finish];
	// 	if(Math.distance(Googooli.x, Googooli.y, finishNode.x, finishNode.y) < finishNode.radius * 4 / 5
	// 		&& GameManager.timer.running)
	// 	{
	// 		GameManager.timer.stop();
	// 		GraphicsManager.stopRenderingTime();
	// 		//GraphicsManager.renderResult();
	// 	}

	// 	Camera.capture(Googooli.x, Googooli.y);
	// 	Camera.bounce(GameManager.levelImage.width, GameManager.levelImage.height);
	// 	Camera.startMove();
	// },

	// crossFinish: function(x1, y1, x2, y2)
	// {
	// 	var finishx1 = Level.DATA[GameManager.level].finishStartX;
	// 	var finishy1 = Level.DATA[GameManager.level].finishStartY;
	// 	var finishx2 = Level.DATA[GameManager.level].finishEndX;
	// 	var finishy2 = Level.DATA[GameManager.level].finishEndY;

	// 	if( Math.crossProduct(x1 - finishx1, y1 - finishy1, finishx2 - finishx1, finishy2 - finishy1) *
	// 		Math.crossProduct(x2 - finishx1, y2 - finishy1, finishx2 - finishx1, finishy2 - finishy1) <= 0 &&
	// 		Math.crossProduct(finishx1 - x1, finishy1 - y1, x2 - x1, y2 - y1) *
	// 		Math.crossProduct(finishx2 - x1, finishy2 - y1, x2 - x1, y2 - y1) <= 0 )
	// 	{
	// 		return true;
	// 	}
		
	// 	console.log(Math.crossProduct(x1 - finishx1, y1 - finishy1, finishx2 - finishx1, finishy2 - finishy1) *
	// 		Math.crossProduct(x2 - finishx1, y2 - finishy1, finishx2 - finishx1, finishy2 - finishy1));
	// 	console.log(Math.crossProduct(finishx1 - x1, finishy1 - y1, x2 - x1, y2 - y1) *
	// 		Math.crossProduct(finishx2 - x1, finishy2 - y1, x2 - x1, y2 - y1));

	// 	return false;
	// }
};

// Math.crossProduct = function(x1, y1, x2, y2)
// {
// 	return x1 * y2 - x2 * y1;
// };