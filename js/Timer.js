"use strict";

/**
 * Best JS Timer ever!
 * @author Mehran Shakerinava
 * (cc3) by Creative Commons
 */

/**
 * @constructor
 */
function Timer()
{
	this.time = 0;
	this.startTime = 0;
	this.running = false;
}

Timer.prototype =
{
	start: function()
	{
		if(this.running) return;
		this.running = true;
		
		this.startTime = Date.now();
	},

	stop: function()
	{
		if(!this.running) return;
		this.running = false;
		
		this.time += Date.now() - this.startTime;
	},

	reset: function()
	{
		if(this.running) this.stop();
		
		this.time = 0;
	},

	getTime: function()
	{
		if(this.running)
			return this.time + Date.now() - this.startTime;
		else
			return this.time;
	}
};