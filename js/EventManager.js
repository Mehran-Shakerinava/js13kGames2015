"use strict";

var EventManager =
{
	// screenX: null,
	// screenY: null,
	// move: function(dx, dy)
	// {
	// 	/* Googooli moves exactly twice(2x) our displacement in fullscreen mode. */
	// 	var mult = 2 / GraphicsManager.maxCssZoom;
	// 	dx *= mult;
	// 	dy *= mult;
	// 	/* REVERSED! */
	// 	Controller.move(dx, -dy);
	// },

	keydownListener: function(event)
	{
		switch(event.keyCode)
		{
			case 37:
				Controller.pressLeft();
				break;

			case 38:
				Controller.pressUp();
				break;

			case 39:
				Controller.pressRight();
				break;

			case 40:
				Controller.pressDown();
				break;
		}
		
		// /* if (Last Mouse position is known AND Mouse Left Button is pressed) */
		// if(this.screenX != null && event.buttons & 1 === 1)
		// {
		// 	var dx = event.screenX - this.screenX;
		// 	var dy = event.screenY - this.screenY;
		// 	this.move(dx, dy);
		// }
		// this.screenX = event.screenX;
		// this.screenY = event.screenY;
	},

	keyupListener: function(event)
	{
		switch(event.keyCode)
		{
			case 37:
				Controller.releaseLeft();
				break;

			case 38:
				Controller.releaseUp();
				break;

			case 39:
				Controller.releaseRight();
				break;

			case 40:
				Controller.releaseDown();
				break;
		}
	},

	// touchmove: function(event)
	// {
	// 	if(this.screenX != null)
	// 	{
	// 		var dx = event.changedTouches[0].screenX - this.screenX;
	// 		var dy = event.changedTouches[0].screenY - this.screenY;
	// 		this.move(dx, dy);
	// 	}
	// 	this.screenX = event.changedTouches[0].screenX;
	// 	this.screenY = event.changedTouches[0].screenY;
	// },

	addKeyboardEventListener: function()
	{
		document.addEventListener("keydown", function(event) {EventManager.keydownListener(event);});
		document.addEventListener("keyup", function(event) {EventManager.keyupListener(event);});
	},

	addResizeEventListener: function()
	{
		/* Makes sure the game always fits the screen. */
		window.addEventListener("resize", function(event) {GraphicsManager.fitScreen();});
		/* Do initial fitScreen() */ 
		GraphicsManager.fitScreen();
	}
};