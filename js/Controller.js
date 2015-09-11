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
		if(Controller.on) return;
		Controller.on = true;
	},

	turnOff: function()
	{
		if(!Controller.on) return;
		Controller.on = false;
		
		Controller.releaseUp();
		Controller.releaseLeft();
		Controller.releaseDown();
		Controller.releaseRight();
	},

	toggleOnOff: function()
	{
		if(Controller.on)
			Controller.turnOff();
		else
			Controller.turnOn();
	},

	pressRight: function()
	{
		if(!Controller.on)
			return;
		if(!Controller.rightButton)
		{
			Controller.rightButton = 1;
			Googooli.accelX += 1;
		}
	},

	releaseRight: function()
	{
		if(Controller.rightButton)
		{
			Controller.rightButton = 0;
			Googooli.accelX -= 1;
		}
	},

	pressUp: function()
	{
		if(!Controller.on)
			return;
		if(!Controller.upButton)
		{
			Controller.upButton = 1;
			Googooli.accelY -= 1;
		}
	},

	releaseUp: function()
	{
		if(Controller.upButton)
		{
			Controller.upButton = 0;
			Googooli.accelY += 1;
		}
	},

	pressLeft: function()
	{
		if(!Controller.on)
			return;
		if(!Controller.leftButton)
		{
			Controller.leftButton = 1;
			Googooli.accelX -= 1;
		}
	},

	releaseLeft: function()
	{
		if(Controller.leftButton)
		{
			Controller.leftButton = 0;
			Googooli.accelX += 1;
		}
	},

	pressDown: function()
	{
		if(!Controller.on)
			return;
		if(!Controller.downButton)
		{
			Controller.downButton = 1;
			Googooli.accelY += 1;
		}
	},

	releaseDown: function()
	{
		if(Controller.downButton)
		{
			Controller.downButton = 0;
			Googooli.accelY -= 1;
		}
	}
};