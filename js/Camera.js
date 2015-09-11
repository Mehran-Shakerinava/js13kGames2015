"use strict";

var Camera =
{
	width:  480,
	height: 320,

	x: 0,
	y: 0,

	/* constants */
	CAPTURE: 0.10,
	
	aimX: 0,
	aimY: 0,

	speed: 0.25,

	requestID: null,
	
	startMove: function()
	{
		if(Camera.requestID === null && (Camera.aimX !== Camera.x || Camera.aimY !== Camera.y))
			Camera.move();
	},

	move: function()
	{
		Camera.requestID = window.requestAnimationFrame(function() {Camera.move();});
		
		var flag = false;
		
		if(Math.abs(Camera.aimX - Camera.x) >= Camera.speed)
		{
			Camera.x = Camera.x + (Camera.aimX > Camera.x ? +Camera.speed : -Camera.speed);
			flag = true;
		}
		
		if(Math.abs(Camera.aimY - Camera.y) >= Camera.speed)
		{
			Camera.y = Camera.y + (Camera.aimY > Camera.y ? +Camera.speed : -Camera.speed);
			flag = true;
		}

		if(flag && Camera.speed < 7)
			Camera.speed += 0.25;
		if(!flag && Camera.speed > 0.25)
			Camera.speed -= 0.25;

		GraphicsManager.renderCamera();
		
		if(Math.abs(Camera.aimX - Camera.x) < 1 && Math.abs(Camera.aimY - Camera.y) < 1)
		{
			window.cancelAnimationFrame(Camera.requestID);
			Camera.requestID = null;
			Camera.speed = 0.25;
		}
	},

	teleport: function(x, y)
	{
		Camera.x = x;
		Camera.y = y;
		Camera.clearAim();
	},

	capture: function(x, y)
	{
		Camera.clearAim();
		
		if(Math.abs(x - Camera.x) > Camera.width * Camera.CAPTURE)
			Camera.aimX = x + (x < Camera.x ? +1 : -1) * Camera.width  * Camera.CAPTURE;
		
		if(Math.abs(y - Camera.y) > Camera.height * Camera.CAPTURE)
			Camera.aimY = y + (y < Camera.y ? +1 : -1) * Camera.height * Camera.CAPTURE;
	},

	bounce: function(width, height)
	{
		/* Bounce off right wall */
		if(Camera.aimX + Camera.width / 2 > width)
			Camera.aimX = width - Camera.width / 2;
		
		/* Bounce off left wall */
		if(Camera.aimX - Camera.width / 2 < 0)
			Camera.aimX = Camera.width / 2;
		
		/* Bounce off bottom wall */
		if(Camera.aimY + Camera.height / 2 > height)
			Camera.aimY = height - Camera.height / 2;
		
		/* Bounce off top wall */
		if(Camera.aimY - Camera.height / 2 < 0)
			Camera.aimY = Camera.height / 2;
	},

	clearAim: function()
	{
		Camera.aimX = Camera.x;
		Camera.aimY = Camera.y;
	}
};