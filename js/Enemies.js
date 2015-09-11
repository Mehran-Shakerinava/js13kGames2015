"use strict";

var Enemies =
{
    updateRequestID: 0,
    images: [],
    data: null,

    init: function(spritesheet)
    {
        /* create Enemies.images[0] */
        var canvas = document.createElement("canvas");
        canvas.width = 64;
        canvas.height = 64;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(spritesheet, 0, 0, 64, 64, 0, 0, 64, 64);
        Enemies.images.push(canvas);

        /* create Enemies.images[1] */
        var canvas = document.createElement("canvas");
        canvas.width = 64;
        canvas.height = 64;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(spritesheet, 64, 0, 64, 64, 0, 0, 64, 64);
        Enemies.images.push(canvas);
    },

    load: function()
    {
        var world = GameManager.world;
        var idx = GameManager.level;
        Enemies.data = Worlds[world].levels[idx].enemies;
    },

    /* UPDATING */

    startUpdating: function()
    {
        if(!Enemies.updateRequestID)
            Enemies.requestUpdate();
    },

    stopUpdating: function()
    {
        if(Enemies.updateRequestID)
        {
            window.cancelAnimationFrame(Enemies.updateRequestID);
            Enemies.updateRequestID = 0;
        }
    },

    requestUpdate: function()
    {
        Enemies.updateRequestID = window.requestAnimationFrame(function()
        {
            Enemies.requestUpdate();
        });
        Enemies.update();
    },

    update: function()
    {
        var t = GameManager.timer.getTime() / 1000;
        for(var i = 0; i < Enemies.data.length; ++i)
        {
            var enemy = Enemies.data[i];
            if(!enemy.r) enemy.r = Geometry.length(enemy.radius.x, enemy.radius.y);
            if(!Camera.r) Camera.r = Geometry.length(Camera.width, Camera.height) / 2;
            
            /* if( might be seen ) */
            if(Geometry.distance(Camera.x, Camera.y, enemy.center.x, enemy.center.y) <= Camera.r + enemy.r)
            {
                /* calculate x & y */
                if(enemy.motion === "circular")
                {
                    enemy.x = enemy.center.x + enemy.r * Math.cos(enemy.omega * t + enemy.offset);
                    enemy.y = enemy.center.y + enemy.r * Math.sin(enemy.omega * t + enemy.offset);
                }
                else /* enemy.motion === "linear" */
                {
                    enemy.x = enemy.center.x + enemy.radius.x * Math.cos(enemy.omega * t + enemy.offset);
                    enemy.y = enemy.center.y + enemy.radius.y * Math.sin(enemy.omega * t + enemy.offset);
                }
            }
        }
        GraphicsManager.renderEnemies();
    }
};