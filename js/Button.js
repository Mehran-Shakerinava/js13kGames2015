/* static constants */
Button.DEF_WIDTH = 100;
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
    this.width = Button.DEF_WIDTH;
    this.height = Button.DEF_HEIGHT;
}

Button.prototype =
{
    show: function()
    {
        var ctx = this.ctx;
        ctx.save();
        ctx.fillStyle = this.color || "rgba(241, 192, 21, 0.8)";
        Graphics.roundedRect(ctx,
            this.x - this.width / 2, this.y - this.height / 2,
            this.width, this.height, 5);
        ctx.fill();

        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "italic " + Math.floor(this.height / 3) + "px 'Comic Sans MS'";

        if(this.icon && this.text)
        {
            var zoom = Math.min(this.width * 4 / 5 / this.icon.width, this.height * 2 / 5 / this.icon.height);
            var dw = zoom * this.icon.width;
            var dh = zoom * this.icon.height;
            ctx.drawImage(this.icon,
                Math.floor(this.x - dw / 2),
                Math.floor(this.y + this.height / 4 - dh / 2),
                dw, dh);
            ctx.fillText(this.text, this.x, this.y - this.height / 4);
        }
        else if(this.icon)
        {
            var dw = Math.min(this.width, this.icon.width);
            var dh = Math.min(this.height, this.icon.height);
            ctx.drawImage(this.icon,
                Math.floor(this.x - dw / 2),
                Math.floor(this.y - dh / 2),
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
        return(this.x - this.width / 2 <= x && x <= this.x + this.width / 2 &&
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
    for(var i = Button.listening.begin; i != null; i = i.next)
    {
        var button = i.data;
        var p = EventManager.getCanvasXY(button.ctx.canvas, event);
        if(button.covers(p.x, p.y))
            button.job();
    }
};

Button.mousedown = function(event)
{
    
};

Button.mousemove = function(event)
{
    for(var i = Button.listening.begin; i != null; i = i.next)
    {
        var button = i.data;
        var p = EventManager.getCanvasXY(button.ctx.canvas, event);
        if(button.covers(p.x, p.y))
        {
            document.body.style.cursor = "pointer";
            return;
        }
    }
    document.body.style.cursor = "default";
};

Button.addEventListeners = function()
{
    if('ontouchstart' in document.documentElement ||
        (window.navigator.maxTouchPoints && window.navigator.maxTouchPoints > 1))
    {
        /* touch */
        window.addEventListener("touchstart", function(event)
        {
            Button.mousedown(event);
        });
        window.addEventListener("touchend", function(event)
        {
            Button.mouseup(event);
        });
    }
    else
    {
        /* mouse */
        window.addEventListener("mouseup", function(event)
        {
            Button.mouseup(event);
        });
        window.addEventListener("mousedown", function(event)
        {
            Button.mousedown(event);
        });
        window.addEventListener("mousemove", function(event)
        {
            Button.mousemove(event);
        });
    }
};