"use strict";

/* TODO: support all screen ratios */

var GraphicsManager =
{
	/* constants */
	CANVAS_WIDTH:  480,
	CANVAS_HEIGHT: 320,

	cssZoom:    1,
	maxCssZoom: 1,
	
	init: function()
	{
		this.levelselContext = this.createCanvas("levelselCanvas").getContext("2d");
		this.levelselContext.canvas.style["z-index"] = 2;

		this.worldselContext = this.createCanvas("worldselCanvas").getContext("2d");
		this.worldselContext.canvas.style["z-index"] = 2;

		this.introContext = this.createCanvas("introCanvas").getContext("2d");
		this.introContext.canvas.style["z-index"] = 2;

		this.levelContext = this.createCanvas("levelCanvas").getContext("2d");
		this.levelContext.canvas.style["z-index"] = 0;
		
		this.googooliContext = this.createCanvas("googooliCanvas").getContext("2d");
		this.googooliContext.canvas.style["z-index"] = 1;
		
		this.guiContext = this.createCanvas("guiCanvas").getContext("2d");
		this.guiContext.canvas.style["z-index"] = 2;
		
        this.calcMaxCssZoom();
		this.fitScreen();
	},

	calcMaxCssZoom: function()
	{
		this.maxCssZoom = Math.min(screen.width  / this.CANVAS_WIDTH,
								   screen.height / this.CANVAS_HEIGHT);
	},

	createCanvas: function(id)
	{
		var canvas = document.createElement("canvas");
		canvas.width  = this.CANVAS_WIDTH;
		canvas.height = this.CANVAS_HEIGHT;
		canvas.id = id;
		document.body.appendChild(canvas);
		return canvas;
	},

	fitScreen: function()
	{
		var canvasList = document.querySelectorAll("canvas");
		for(var i = 0; i < canvasList.length; ++i)
		{
			var canvas = canvasList[i];

        	if(window.innerWidth / window.innerHeight > canvas.width / canvas.height)
	        {
				canvas.style.height = window.innerHeight - 1 + "px";
				canvas.style.width  = window.innerHeight * canvas.width / canvas.height - 1 + "px";
			}
	        else
	        {
	            canvas.style.width  = window.innerWidth - 1 + "px";
				canvas.style.height = window.innerWidth * canvas.height / canvas.width - 1 + "px";
	        }
		}
		this.cssZoom = canvasList[0].style.width.replace("px", "") / canvasList[0].width;
	},

	/* STATES */

	renderINTRO: function()
	{
		var ctx = this.introContext;
		ctx.save();
		ctx.fillStyle = "rgba(50, 100, 150, 1)";
		ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		
		ctx.textAlign = "center";
		ctx.fillStyle = "white";
		ctx.font = "Bold 50px Arial";
		ctx.fillText("GOOGOOLI", ctx.canvas.width / 2, ctx.canvas.height * 1 / 6);
		ctx.strokeStyle = "black";
		ctx.strokeText("GOOGOOLI", ctx.canvas.width / 2, ctx.canvas.height * 1 / 6);

		var button = new Button(ctx, ctx.canvas.width / 2, ctx.canvas.height / 2, function()
		{
			Button.clearListening();
			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
			GameManager.gotoWORLDSEL();
		});
		button.icon = document.getElementById("play");
		button.show();

		ctx.restore();
	},

	renderWORLDSEL: function()
	{
		var ctx = this.worldselContext;
		ctx.save();
		ctx.fillStyle = "rgba(50, 100, 150, 1)";
		ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		
		var button = new Button(ctx, ctx.canvas.width / 2, ctx.canvas.height / 4, function()
		{
			Button.clearListening();
			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
			GameManager.gotoLEVELSEL("A");
		});
		button.width = 500;
		button.text = "ROBOT FACTORY";
		button.show();

		var button = new Button(ctx, ctx.canvas.width / 2, ctx.canvas.height / 2, function()
		{
			Button.clearListening();
			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
			GameManager.gotoLEVELSEL("B");
		});
		button.width = 500;
		button.text = "HUMAN ANATOMY";
		button.show();

		var button = new Button(ctx, ctx.canvas.width / 2, ctx.canvas.height * 3 / 4, function()
		{
			Button.clearListening();
			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
			GameManager.gotoLEVELSEL("C");
		});
		button.width = 500;
		button.text = "DELUSIONAL";
		button.show();

		this.renderBack(ctx, function()
		{
			GraphicsManager.clearCanvas(GraphicsManager.worldselContext);
			Button.clearListening();
			GameManager.gotoINTRO();
		});

		ctx.restore();
	},

	renderLEVELSEL: function(world)
	{
		var ctx = this.levelselContext;
		ctx.save();
		ctx.fillStyle = "rgba(50, 100, 150, 1)";
		ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

		var dx = ctx.canvas.width  / 6;
		var dy = ctx.canvas.height / 3;
		for(var i = 0; i < 5; ++i)
			for(var j = 0; j < 2; ++j)
			{
				var x = (i + 1) * dx;
				var y = (j + 1) * dy;
				var idx = j * 5 + i;
				
				var button = new Button(ctx, x, y, function()
				{
					if(this.locked)
					{
						console.log("ERROR");
						// SoundManager.playError();
					}
					else
					{
						Button.clearListening();
						ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
						GameManager.gotoPLAY(world, this.text - 1);	
						
					}
				});
				button.locked = !Persistent.data.worlds[world].levels[idx];
				if(button.locked)
					button.icon = document.getElementById("locked");
				button.width  = dx * 4 / 5;
				button.height = dy * 4 / 5;
				button.text = idx + 1;
				button.show();
			}

		this.renderBack(ctx, function()
		{
			GraphicsManager.clearCanvas(GraphicsManager.levelselContext);
			Button.clearListening();
			GameManager.gotoWORLDSEL();
		});

		ctx.restore();
	},

	renderPLAY: function()
	{
		this.renderLevel();
		this.startRenderingGoogooli();
		this.renderTime(GameManager.timer.getTime());
		this.renderGuiButtons();
	},

	/* GUI BUTTONS */

	renderGuiButtons: function()
	{
		var ctx = this.guiContext;
		ctx.save();

		this.renderBack(ctx, function()
		{
			GraphicsManager.clearGoogooli();
			GraphicsManager.clearCanvas(GraphicsManager.levelContext);
			GraphicsManager.clearCanvas(GraphicsManager.guiContext);
			Button.clearListening();
			GameManager.gotoLEVELSEL(GameManager.world);
		});

		var replayButton = new Button(ctx, ctx.canvas.width - 55, 20, function()
		{
			GraphicsManager.clearGoogooli();
			GraphicsManager.clearCanvas(GraphicsManager.levelContext);
			GraphicsManager.clearCanvas(GraphicsManager.guiContext);
			Button.clearListening();
			GameManager.gotoPLAY(GameManager.world, GameManager.levelIdx);
		});
		replayButton.icon = document.getElementById("repeat");
		replayButton.width = 30;
		replayButton.height = 30;
		replayButton.show();

		var pauseButton = new Button(ctx, ctx.canvas.width - 90, 20, function()
		{
			Googooli.stopUpdating();
			GameManager.timer.stop();
			GraphicsManager.stopRenderingTime();
			var ctx = GraphicsManager.guiContext;
			ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
			ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		});
		pauseButton.icon = document.getElementById("pause");
		pauseButton.width = 30;
		pauseButton.height = 30;
		pauseButton.show();

		ctx.restore();
	},

	renderBack: function(ctx, job)
	{
		var button = new Button(ctx, ctx.canvas.width - 20, 20, job);
		button.icon = document.getElementById("back");
		button.width = 30;
		button.height = 30;
		button.show();
	},

	/* LEVEL */

	renderLevel: function()
	{
		this.levelContext.clearRect(0, 0, this.levelContext.canvas.width, this.levelContext.canvas.height);
		this._render(GameManager.levelImage, this.levelContext, Camera);
	},

	/* GOOGOOLI */

	clearGoogooli: function()
	{
		if(!this.googooliPrevX)
			return;
		var ctx = this.googooliContext;
		ctx.clearRect(this.googooliPrevX, this.googooliPrevY, Googooli.image.width, Googooli.image.height);
	},

	startRenderingGoogooli: function()
	{
		this.googooliRequestId = window.requestAnimationFrame(function()
		{
			GraphicsManager.startRenderingGoogooli();
		});
		this.renderGoogooli();
	},

	renderGoogooli: function()
	{
		this.clearGoogooli();
		var ctx = this.googooliContext;
		var dx = Math.floor( ctx.canvas.width  / 2 + (Googooli.x - Camera.x) - Googooli.WIDTH  / 2 );
		var dy = Math.floor( ctx.canvas.height / 2 + (Googooli.y - Camera.y) - Googooli.HEIGHT / 2 );
		ctx.drawImage(Googooli.image, dx, dy);
		this.googooliPrevX = dx;
		this.googooliPrevY = dy;
	},

	/* TIME */

	startRenderingTime: function()
	{
		this.timeRequestId = window.requestAnimationFrame(function()
		{
			GraphicsManager.startRenderingTime();
		});
		this.renderTime(GameManager.timer.getTime());
	},

	stopRenderingTime: function()
	{
		window.cancelAnimationFrame(this.timeRequestId);
		this.timeRequestId = null;
	},

	clearTime: function()
	{
		var ctx = this.guiContext;
		ctx.save();
		ctx.font = "20px serif";
		var width = ctx.measureText("0000000000:00:000").width;
		ctx.clearRect(15, 10, width + 15, 30);
		ctx.restore();
	},

	renderTime: function(time)
	{
		// console.log(time);

		var milliseconds = time % 1000 + "";
		while(milliseconds.length < 3)
			milliseconds = "0" + milliseconds;

		time = Math.floor(time / 1000);
		var seconds = time % 60 + "";
		while(seconds.length < 2)
			seconds = "0" + seconds;
		
		time = Math.floor(time / 60);
		var minutes = time + "";
		while(minutes.length < 2)
			minutes = "0" + minutes;

		this.clearTime();
		var ctx = this.guiContext;
		var timer = minutes + ":" + seconds + ":" + milliseconds;
		// console.log(timer);
		
		ctx.save();
		ctx.font = "20px serif";
		var width = ctx.measureText(timer).width;
		ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
		ctx.fillRect( 15, 10, width + 10, 25);
		ctx.fillStyle = "white";
		ctx.fillText(timer, 20, 30);
		ctx.restore();
	},

	/* MASTER RENDERER */

	_render: function(src, ctx, cam)
	{
		var wz = ctx.canvas.width  / cam.width;
		var hz = ctx.canvas.height / cam.height;
		var sx = Math.floor( Math.max(0, cam.x - cam.width  / 2) );
		var sy = Math.floor( Math.max(0, cam.y - cam.height / 2) );
		var sw = Math.floor( Math.min(src.width , cam.x + cam.width  / 2) - sx );
		var sh = Math.floor( Math.min(src.height, cam.y + cam.height / 2) - sy );
		var dx = Math.floor( wz * (sx - (cam.x - cam.width  / 2)) );
		var dy = Math.floor( hz * (sy - (cam.y - cam.height / 2)) );
		var dw = Math.floor( wz * sw );
		var dh = Math.floor( hz * sh );
		ctx.drawImage(src, sx, sy, sw, sh, dx, dy, dw, dh);
	},

	/* MASTER CLEARER */

	clearCanvas: function(ctx)
	{
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	}
};

/* creates a rectangle with rounded corners */
CanvasRenderingContext2D.prototype.roundedRect = function(x, y, width, height, radius)
{
	var ctx = this;
	ctx.beginPath();
	ctx.moveTo(x, y + radius);
	ctx.lineTo(x, y + height - radius);
	ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
	ctx.lineTo(x + width - radius, y + height);
	ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
	ctx.lineTo(x + width, y + radius);
	ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
	ctx.lineTo(x + radius, y);
	ctx.quadraticCurveTo(x, y, x, y + radius);
};