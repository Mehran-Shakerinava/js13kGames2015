"use strict";

var Googooli = {
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

    wallsCanvas: null,
    helpContext: null,
    /* images[row][col] */
    row: 1,
    col: 1,
    images: [[], [], []],
    datas: [[], [], []],

    init: function(spritesheet)
    {
        for(var i = 0; i < 3; ++i)
            for(var j = 0; j < 3; ++j)
            {
                var canvas = document.createElement("canvas");
                canvas.width = Googooli.WIDTH;
                canvas.height = Googooli.HEIGHT;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(spritesheet, j * Googooli.WIDTH, i * Googooli.HEIGHT, Googooli.WIDTH, Googooli.HEIGHT,
                    0, 0, Googooli.WIDTH, Googooli.HEIGHT);
                Googooli.datas[i][j] = ctx.getImageData(0, 0, canvas.width, canvas.height);
                Googooli.images[i][j] = canvas;
            }

        var helpCanvas = document.createElement("canvas");
        helpCanvas.width = Googooli.WIDTH;
        helpCanvas.height = Googooli.HEIGHT;
        Googooli.helpContext = helpCanvas.getContext("2d");
    },

    comeToLife: function()
    {
        Googooli.reset();
        Googooli.startUpdating();
    },

    die: function()
    {
        if(Googooli.col === 2)
            return;
        GameManager.timer.stop();
        Controller.turnOff();
        Googooli.col = 2;
        GraphicsManager.renderGameover();
    },

    reset: function()
    {
        Googooli.stopUpdating();
        Googooli.velX = Googooli.velY = 0;
        Googooli.row = Googooli.col = 1;
    },

    /* UPDATING */

    startUpdating: function()
    {
        if(!Googooli.updateRequestID)
            Googooli.requestUpdate();
    },

    stopUpdating: function()
    {
        if(Googooli.updateRequestID)
        {
            window.cancelAnimationFrame(Googooli.updateRequestID);
            Googooli.updateRequestID = 0;
            Googooli.updateTimeStamp = 0;
        }
    },

    requestUpdate: function()
    {
        Googooli.updateRequestID = window.requestAnimationFrame(function()
        {
            Googooli.requestUpdate();
        });
        Googooli.update();
    },

    update: function()
    {
        var now = Date.now();
        var dt = 0;
        if(Googooli.updateTimeStamp)
            dt = now - Googooli.updateTimeStamp;
        Googooli.updateTimeStamp = now;
        dt /= 1000;

        /* if [Googooli has started to move] & [timer hasn't started] */
        if((Googooli.accelX || Googooli.accelY) && !GameManager.timer.getTime())
        {
            GameManager.timer.start();
            GraphicsManager.startRenderingTime();
        }

        /* update velX */
        if(Googooli.accelX)
        {
            Googooli.velX += Googooli.accelX * Googooli.ACCEL * dt;
            if(Math.abs(Googooli.velX) > Googooli.MAX_VEL)
                Googooli.velX = Math.sign(Googooli.velX) * Googooli.MAX_VEL;
        }
        else
        {
            if(Math.abs(Googooli.velX) < Googooli.FRICTION * dt)
                Googooli.velX = 0;
            Googooli.velX -= Math.sign(Googooli.velX) * Googooli.FRICTION * dt;
        }

        /* update velY */
        if(Googooli.accelY)
        {
            Googooli.velY += Googooli.accelY * Googooli.ACCEL * dt;
            if(Math.abs(Googooli.velY) > Googooli.MAX_VEL)
                Googooli.velY = Math.sign(Googooli.velY) * Googooli.MAX_VEL;
        }
        else
        {
            if(Math.abs(Googooli.velY) < Googooli.FRICTION * dt)
                Googooli.velY = 0;
            Googooli.velY -= Math.sign(Googooli.velY) * Googooli.FRICTION * dt;
        }

        var prevRow = Googooli.row;
        if(Googooli.velX > 7)
        {
            Googooli.row = 2;
            if(Googooli.checkCollision())
                Googooli.row = prevRow;
        }
        else if(Googooli.velX < -7)
        {
            Googooli.row = 0;
            if(Googooli.checkCollision())
                Googooli.row = prevRow;
        }
        else
        {
            Googooli.row = 1;
            if(Googooli.checkCollision())
                Googooli.row = prevRow;
        }

        Googooli.x += Googooli.velX * dt;
        Googooli.y += Googooli.velY * dt;
        if(Googooli.checkCollision())
        {
            /* Try moving along Y only. */
            Googooli.x -= Googooli.velX * dt;
            var tmp = Googooli.velX;
            Googooli.velX = 0;
            if(Googooli.checkCollision())
            {
                /* Try moving along X only. */
                Googooli.x += Googooli.velX * dt;
                Googooli.y -= Googooli.velY * dt;
                Googooli.velX = tmp;
                Googooli.velY = 0;
                if(Googooli.checkCollision())
                {
                    /* Don't move at all. */
                    Googooli.x -= Googooli.velX * dt;
                    Googooli.velX = 0;
                }
            }
        }

        /* if ( Googooli is dead ) */
        if(Googooli.col === 2)
            return;

        if(!Googooli.blinkTimeStamp && Math.random() < 0.005)
        {
            Googooli.blinkTimeStamp = now;
            Googooli.col = 0;
        }
        else if(now - Googooli.blinkTimeStamp > 400)
        {
            Googooli.blinkTimeStamp = 0;
            Googooli.col = 1;
        }

        Camera.teleport(Googooli.x, Googooli.y);
        GraphicsManager.renderLevel();

        var level = Worlds[GameManager.world].levels[GameManager.level];
        var finishNode = level.nodes[level.finish];
        if(GameManager.timer.running &&
            Geometry.distance(Googooli.x, Googooli.y, finishNode.x, finishNode.y) < finishNode.radius * 4 / 5)
        {
            GameManager.timer.stop();
            Controller.turnOff();
            GameManager.gotoPRIZE();
        }
    },

    teleport: function(x, y)
    {
        Googooli.x = x;
        Googooli.y = y;
    },

    checkCollision: function()
    {
        var data = Googooli.datas[Googooli.row][Googooli.col].data;

        Googooli.helpContext.clearRect(0, 0, Googooli.WIDTH, Googooli.HEIGHT);
        Googooli.helpContext.drawImage(Googooli.wallsContext.canvas, Googooli.x - Googooli.WIDTH / 2, Googooli.y - Googooli.HEIGHT / 2,
            Googooli.WIDTH, Googooli.HEIGHT, 0, 0, Googooli.WIDTH, Googooli.HEIGHT)
        var wallsData = Googooli.helpContext.getImageData(0, 0, Googooli.WIDTH, Googooli.HEIGHT).data;

        var enemiesData = GraphicsManager.enemiesContext.getImageData(
            Googooli.x - Camera.x + Camera.width / 2 - Googooli.WIDTH / 2,
            Googooli.y - Camera.y + Camera.height / 2 - Googooli.HEIGHT / 2,
            Googooli.WIDTH, Googooli.HEIGHT).data;

        var hitWall = false;
        for(var y = 0; y < Googooli.HEIGHT; ++y)
            for(var x = 0; x < Googooli.WIDTH; ++x)
            {
                /* check Googooli presence */
                if(data[4 * (y * Googooli.WIDTH + x) + 3] <= 10)
                    continue;
                /* check wall presence */
                if(!hitWall && wallsData[4 * (y * Googooli.WIDTH + x) + 3] > 10)
                    hitWall = true;
                /* check enemy presence */
                if(enemiesData[4 * (y * Googooli.WIDTH + x) + 3] > 10)
                    Googooli.die();
            }
        return hitWall;
    }
};
