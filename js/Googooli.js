"use strict";

var Googooli =
{
    /* CONSTANTS */
    WIDTH: 64,
    HEIGHT: 64,
    
    /* FRICTION < ACCEL */
    ACCEL: 150,
    MAX_VEL: 300,
    FRICTION: 50,

    x: 0,
    y: 0,

    velX: 0,
    velY: 0,

    /* Controller handles these */
    accelX: 0,
    accelY: 0,

    updateRequestID: 0,
    updateTimeStamp: 0,

    image: null,
    imageData: null,
    collisionImageData: null,

    init: function(image)
    {
        var canvas = document.createElement("canvas");
        canvas.width = this.WIDTH;
        canvas.height = this.HEIGHT;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, this.WIDTH, this.HEIGHT, 0, 0, this.WIDTH, this.HEIGHT);
        this.imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        this.image = canvas;
    },

    comeToLife: function()
    {
        this.reset();
        this.startUpdating();
    },

    die: function()
    {
        this.stopUpdating();
        this.velX = this.velY = 0;
    },

    reset: function()
    {
        this.stopUpdating();
        this.velX = this.velY = 0;
    },

    /* UPDATING */

    startUpdating: function()
    {
        if(!this.updateRequestID)
            this.requestUpdate();
    },

    stopUpdating: function()
    {
        if(this.updateRequestID)
        {
            window.cancelAnimationFrame(this.updateRequestID);
            this.updateRequestID = 0;
            this.updateTimeStamp = 0;
        }
    },

    requestUpdate: function()
    {
        this.updateRequestID = window.requestAnimationFrame(function()
        {
            Googooli.requestUpdate();
        });
        this.update();
    },

    update: function()
    {
        var now = Date.now();
        var dt = 0;
        if(this.updateTimeStamp)
            dt = now - this.updateTimeStamp;
        this.updateTimeStamp = now;
        dt /= 1000;
        
        /* if [Googooli has started to move] & [timer hasn't started] */
        if((this.accelX || this.accelY) && !GameManager.timer.getTime())
        {
            GameManager.timer.start();
            GraphicsManager.startRenderingTime();
        }

        /* update velX */
        if(this.accelX)
        {
            this.velX += this.accelX * this.ACCEL * dt;
            if(Math.abs(this.velX) > this.MAX_VEL)
                this.velX = Math.sign(this.velX) * this.MAX_VEL;
        }
        else
        {
            if(Math.abs(this.velX) < this.FRICTION * dt)
                this.velX = 0;
            this.velX -= Math.sign(this.velX) * this.FRICTION * dt;
        }

        /* update velY */
        if(this.accelY)
        {
            this.velY += this.accelY * this.ACCEL * dt;
            if(Math.abs(this.velY) > this.MAX_VEL)
                this.velY = Math.sign(this.velY) * this.MAX_VEL;
        }
        else
        {
            if(Math.abs(this.velY) < this.FRICTION * dt)
                this.velY = 0;
            this.velY -= Math.sign(this.velY) * this.FRICTION * dt;
        }

        this.x += this.velX * dt;
        this.y += this.velY * dt;
        if(this.checkCollision())
        {
            /* Try moving along Y only. */
            this.x -= this.velX * dt;
            var tmp = this.velX;
            this.velX = 0;
            if(this.checkCollision())
            {
                /* Try moving along X only. */
                this.x += this.velX * dt;
                this.y -= this.velY * dt;
                this.velX = tmp;
                this.velY = 0;
                if(this.checkCollision())
                {
                    /* Don't move at all. */
                    this.x -= this.velX * dt;
                    this.velX = 0;
                }
            }
        }

        Camera.teleport(this.x, this.y);
        GraphicsManager.renderLevel();

        var level = Worlds[GameManager.world].levels[GameManager.levelIdx];
        var finishNode = level.nodes[level.finish];
        if(GameManager.timer.running &&
            Math.distance(this.x, this.y, finishNode.x, finishNode.y) < finishNode.radius * 4 / 5)
        {
            GameManager.timer.stop();
            GameManager.gotoPRIZE();
        }
    },

    teleport: function(x, y)
    {
        this.x = x;
        this.y = y;
    },

    checkCollision: function()
    {
        var collisionData = this.collisionImageData.data;
        var imageData = this.imageData.data;
        for(var dx = 0; dx < this.image.width; ++dx)
            for(var dy = 0; dy < this.image.height; ++dy)
            {
                var x = Math.floor(this.x - this.WIDTH / 2 + dx);
                var y = Math.floor(this.y - this.HEIGHT / 2 + dy);
                /* check if both are opaque */
                if(collisionData[4 * (y * this.collisionImageData.width + x) + 3] > 10 && imageData[4 * (dy * this.image.width + dx) + 3] > 10)
                    return true;
            }
        return false;
    }
};

Math.distance = function(x1, y1, x2, y2)
{
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
};
