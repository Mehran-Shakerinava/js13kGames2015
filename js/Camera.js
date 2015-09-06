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
		if(this.requestID === null && (this.aimX !== this.x || this.aimY !== this.y))
			this.move();
	},

	move: function()
	{
		this.requestID = window.requestAnimationFrame(function() {Camera.move();});
		
		var flag = false;
		
		if(Math.abs(this.aimX - this.x) >= this.speed)
		{
			this.x = this.x + (this.aimX > this.x ? +this.speed : -this.speed);
			flag = true;
		}
		
		if(Math.abs(this.aimY - this.y) >= this.speed)
		{
			this.y = this.y + (this.aimY > this.y ? +this.speed : -this.speed);
			flag = true;
		}

		if(flag && this.speed < 7)
			this.speed += 0.25;
		if(!flag && this.speed > 0.25)
			this.speed -= 0.25;

		GraphicsManager.renderCamera();
		
		if(Math.abs(this.aimX - this.x) < 1 && Math.abs(this.aimY - this.y) < 1)
		{
			window.cancelAnimationFrame(this.requestID);
			this.requestID = null;
			this.speed = 0.25;
		}
	},

	teleport: function(x, y)
	{
		this.x = x;
		this.y = y;
		this.clearAim();
	},

	capture: function(x, y)
	{
		this.clearAim();
		
		if(Math.abs(x - this.x) > this.width * this.CAPTURE)
			this.aimX = x + (x < this.x ? +1 : -1) * this.width  * this.CAPTURE;
		
		if(Math.abs(y - this.y) > this.height * this.CAPTURE)
			this.aimY = y + (y < this.y ? +1 : -1) * this.height * this.CAPTURE;
	},

	bounce: function(width, height)
	{
		/* Bounce off right wall */
		if(this.aimX + this.width / 2 > width)
			this.aimX = width - this.width / 2;
		
		/* Bounce off left wall */
		if(this.aimX - this.width / 2 < 0)
			this.aimX = this.width / 2;
		
		/* Bounce off bottom wall */
		if(this.aimY + this.height / 2 > height)
			this.aimY = height - this.height / 2;
		
		/* Bounce off top wall */
		if(this.aimY - this.height / 2 < 0)
			this.aimY = this.height / 2;
	},

	clearAim: function()
	{
		this.aimX = this.x;
		this.aimY = this.y;
	}
};

Math.distance = function(x1, y1, x2, y2)
{
	return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
};