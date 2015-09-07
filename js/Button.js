/* static constants */
Button.DEF_WIDTH  = 100;
Button.DEF_HEIGHT = 100;

/**
 * @constructor
 */
function Button(ctx, x, y, job)
{
	this.ctx = ctx;
	this.x = x;
	this.y = y;
	/* the functionality of the button */
	this.job = job;
	
	/* API */
	this.icon = null;
	this.text = null;
	this.width  = Button.DEF_WIDTH;
	this.height = Button.DEF_HEIGHT;
}

Button.prototype =
{
	show: function(ctx)
	{
		var ctx = this.ctx;
		ctx.save();
		ctx.fillStyle = "rgba(241, 192, 21, 0.8)";
		ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
		
		ctx.fillStyle = "#313830";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.font = "Bold " + Math.floor(this.height / 3) + "px Arial";
		
		if(this.icon && this.text)
		{
			var dw = Math.min( this.width , this.icon.width );
			var dh = Math.min( this.height, this.icon.height);
			ctx.drawImage(this.icon,
				Math.floor( this.x - dw / 2 ),
				Math.floor( this.y + this.height / 4 - dh / 2 ),
				dw, dh);
			ctx.fillText(this.text, this.x, this.y - this.height / 4);
		}
		else if(this.icon)
		{
			var dw = Math.min( this.width , this.icon.width );
			var dh = Math.min( this.height, this.icon.height);
			ctx.drawImage(this.icon,
				Math.floor( this.x - dw / 2 ),
				Math.floor( this.y - dh / 2 ),
				dw, dh);
		}
		else if(this.text)
		{
			ctx.fillText(this.text, this.x, this.y);
		}
		ctx.restore();
		this.listen();
	},

	clear: function()
	{
		this.ctx.clearRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
	},

	listen: function()
	{
		Button.listening.add(this);
	},

	unlisten: function()
	{
		for(var i = Button.listening.begin; i != null; i = i.next)
			if(i.data === this)
				Button.listening.del(i);
	},

	covers: function(x, y)
	{
		return (this.x - this.width / 2 <= x && x <= this.x + this.width / 2 &&
			this.y - this.height / 2 <= y && y <= this.y + this.height / 2);
	}
};

Button.listening = new LinkedList();

Button.clearListening = function()
{
	Button.listening.begin = null;
};

Button.mouseup = function(event)
{
	// console.log(event);

	for(var i = Button.listening.begin; i != null; i = i.next)
	{
		var button = i.data;
		var p = getCanvasXY(button.ctx.canvas, event);
		
		// console.log(button);
		
		if(button.covers(p.x, p.y))
		{
			// console.log("covers!");
			button.job();
		}
	}
};

function getCanvasXY(canvas, event)
{
	var clientX, clientY;
	if(event.clientX)
	{
		/* mouse click */
		clientX = event.clientX;
		clientY = event.clientY;
	}
	else if(event.touches && event.touches.length)
	{
		/* touchstart */
		clientX = event.touches[event.touches.length - 1].clientX;
		clientY = event.touches[event.touches.length - 1].clientY;
	}
	else
	{
		/* touchend */
		clientX = event.changedTouches[0].clientX;
		clientY = event.changedTouches[0].clientY;
	}
	var rect = canvas.getBoundingClientRect();
	var x = clientX - rect.left;
	var y = clientY - rect.top;
	x = x * canvas.width / canvas.style.width.replace("px", "");
	y = y * canvas.height / canvas.style.height.replace("px", "");
	return {x:x, y:y};
}

if('ontouchstart' in document.documentElement ||
	(window.navigator.maxTouchPoints && window.navigator.maxTouchPoints > 1))
{
	/* touch */
	window.addEventListener("touchend", function(event) {Button.touchend(event);});
}
else
{
	/* mouse */
	window.addEventListener("mouseup", function(event) {Button.mouseup(event);});
}