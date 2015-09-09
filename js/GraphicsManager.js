"use strict";

/* TODO: support all screen ratios */

var GraphicsManager = {
    /* constants */
    CANVAS_WIDTH: 480,
    CANVAS_HEIGHT: 320,

    cssZoom: 1,
    maxCssZoom: 1,

    enemyImageIdx: 0,

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

        this.enemiesContext = this.createCanvas("enemiesCanvas").getContext("2d");
        this.enemiesContext.canvas.style["z-index"] = 1;

        this.guiContext = this.createCanvas("guiCanvas").getContext("2d");
        this.guiContext.canvas.style["z-index"] = 2;

        this.overlayContext = this.createCanvas("overlayCanvas").getContext("2d");
        this.overlayContext.canvas.style["z-index"] = 3;

        this.prizeContext = this.createCanvas("prizeCanvas").getContext("2d");
        this.prizeContext.canvas.style["z-index"] = 4;

        this.calcMaxCssZoom();
        this.fitScreen();
    },

    calcMaxCssZoom: function()
    {
        this.maxCssZoom = Math.min(screen.width / this.CANVAS_WIDTH,
            screen.height / this.CANVAS_HEIGHT);
    },

    createCanvas: function(id)
    {
        var canvas = document.createElement("canvas");
        canvas.width = this.CANVAS_WIDTH;
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
                canvas.style.width = window.innerHeight * canvas.width / canvas.height - 1 + "px";
            }
            else
            {
                canvas.style.width = window.innerWidth - 1 + "px";
                canvas.style.height = window.innerWidth * canvas.height / canvas.width - 1 + "px";
            }
        }
        this.cssZoom = canvasList[0].style.width.replace("px", "") / canvasList[0].width;
    },

    clearScreen: function()
    {
        var canvasList = document.querySelectorAll("canvas");
        for(var i = 0; i < canvasList.length; ++i)
        {
            var canvas = canvasList[i];
            var ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    },

    /* STATES */

    renderINTRO: function()
    {
        var ctx = this.introContext;
        ctx.save();
        ctx.fillStyle = "rgba(50, 100, 150, 1)";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        ctx.textAlign = "center";
        ctx.fillStyle = "black";
        ctx.font = "italic 50px 'Comic Sans MS'";
        ctx.fillText("Googooli", ctx.canvas.width / 2, ctx.canvas.height * 1 / 6);
        
        var button = new Button(ctx, ctx.canvas.width / 2, ctx.canvas.height / 2, function()
        {
            Button.clearListening();
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            GameManager.gotoWORLDSEL();
        });
        button.icon = document.getElementById("play");
        button.width = 80;
        button.height = 80;
        button.show();

        ctx.restore();
    },

    renderWORLDSEL: function()
    {
        var ctx = this.worldselContext;
        ctx.save();
        
        ctx.fillStyle = "rgba(50, 100, 150, 1)";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        for(var i = 0; i < Worlds.length; ++i)
        {
            var button = new Button(ctx, ctx.canvas.width / 2, ctx.canvas.height * (i + 1) / (Worlds.length + 1), function()
            {
                if(this.locked)
                {
                    SoundManager.playError();
                    return;
                }
                
                Button.clearListening();
                GraphicsManager.clearCanvas(GraphicsManager.worldselContext);
                GameManager.world = this.data;
                GameManager.gotoLEVELSEL();
            });
            button.data = i;
            button.locked = !Persistent.data.worlds[i];
            button.width = ctx.canvas.width * 2 / 3;
            button.height = ctx.canvas.height / (Worlds.length + 1) - 10;
            if(button.locked)
                button.icon = document.getElementById("locked");
            else
                button.text = Worlds[i].name;
            button.show();
        }

        this.renderBack(ctx, function()
        {
            Button.clearListening();
            GraphicsManager.clearCanvas(GraphicsManager.worldselContext);
            GameManager.gotoINTRO();
        });

        ctx.restore();
    },

    renderLEVELSEL: function()
    {
        var ctx = this.levelselContext;
        ctx.save();
        ctx.fillStyle = "rgba(50, 100, 150, 1)";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        var world = GameManager.world;
        var n = Worlds[world].levels.length;

        for(var i = 0; i < Worlds[world].levels.length; ++i)
        {
            var button = new Button(ctx, ctx.canvas.width * (i + 1) / (n + 1), ctx.canvas.height / 2, function()
            {
                if(this.locked)
                {
                    SoundManager.playError();
                }
                else
                {
                    Button.clearListening();
                    GraphicsManager.clearCanvas(this.ctx);
                    GameManager.level = this.data;
                    GameManager.gotoPLAY();
                }
            });
            button.data = i;
            button.locked = !Persistent.data.worlds[world].levels[i];
            if(button.locked)
                button.icon = document.getElementById("locked");
            button.width = ctx.canvas.width / (n + 1) - 10;
            button.height = ctx.canvas.height / 3;
            button.text = i + 1;
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

    renderPRIZE: function(newHighscore)
    {
        var ctx = this.prizeContext;
        ctx.save();
        var width = 200;
        var height = 200;
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        ctx.fillRect(ctx.canvas.width / 2 - width / 2,
            ctx.canvas.height / 2 - height / 2,
            width, height);
        var goldImg = document.getElementById("gold");
        ctx.drawImage(goldImg,
            ctx.canvas.width / 2 - goldImg.width / 2,
            ctx.canvas.height / 2 - goldImg.height / 2 - 100,
            goldImg.width, goldImg.height);

        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "italic 16px Arial";
        var highscore = Persistent.data.worlds[GameManager.world].levels[GameManager.level].highscore;
        var text = (newHighscore ? "New highscore!" : "highscore: " + Timer.format(highscore));
        ctx.fillText(text, ctx.canvas.width / 2, ctx.canvas.height / 3 + 15);
        // ctx.strokeText(text, ctx.canvas.width / 2, ctx.canvas.height / 3 + 15);

        var nextButton = new Button(ctx, ctx.canvas.width / 2, ctx.canvas.height * 2 / 3 + 15, function()
        {
            Googooli.reset();
            GameManager.timer.reset();
            GraphicsManager.stopRenderingTime();
            GraphicsManager.stopRenderingGoogooli();
            Button.clearListening();
            GraphicsManager.clearScreen();

            if(GameManager.level + 1 < Worlds[GameManager.world].levels.length)
                GameManager.level++;
            else
            {
                GameManager.level = 0;
                if(GameManager.world + 1 < Worlds.length)
                    GameManager.world++;
                else
                {
                    GameManager.world = 0;
                    console.log("Congratulations!");
                }
            }   
            GameManager.gotoPLAY();
        });
        nextButton.icon = document.getElementById("play");
        nextButton.width = 45;
        nextButton.height = 45;
        nextButton.show();

        ctx.restore();
    },

    /* GUI BUTTONS */

    renderGuiButtons: function()
    {
        var ctx = this.guiContext;
        ctx.save();

        this.renderBack(ctx, function()
        {
            Googooli.reset();
            GameManager.timer.stop();
            GraphicsManager.stopRenderingTime();
            GraphicsManager.stopRenderingGoogooli();
            Button.clearListening();
            GraphicsManager.clearScreen();

            GameManager.gotoLEVELSEL(GameManager.world);
        });

        var replayButton = new Button(ctx, ctx.canvas.width - 55, 20, function()
        {
            Googooli.reset();
            GameManager.timer.stop();
            GraphicsManager.stopRenderingTime();
            GraphicsManager.stopRenderingGoogooli();
            Button.clearListening();
            GraphicsManager.clearScreen();

            GameManager.gotoPLAY(GameManager.world, GameManager.level);
        });
        replayButton.icon = document.getElementById("repeat");
        replayButton.width = 30;
        replayButton.height = 30;
        replayButton.show();

        var pauseButton = new Button(ctx, ctx.canvas.width - 90, 20, function()
        {
            this.unlisten();
            this.clear();
            playButton.show();

            GraphicsManager.stopRenderingTime();
            GraphicsManager.stopRenderingGoogooli();
            GameManager.timer.stop();
            Googooli.stopUpdating();
            Enemies.stopUpdating();

            var ctx = GraphicsManager.overlayContext;
            ctx.save();
            ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.restore();
        });
        pauseButton.icon = document.getElementById("pause");
        pauseButton.width = 30;
        pauseButton.height = 30;
        pauseButton.show();

        var playButton = new Button(ctx, ctx.canvas.width - 90, 20, function()
        {
            this.unlisten();
            this.clear();
            pauseButton.show();

            Googooli.startUpdating();
            Enemies.startUpdating();
            GraphicsManager.startRenderingGoogooli();
            if(GameManager.timer.getTime() && GameManager.state === "PLAY")
            {
                GameManager.timer.start();
                GraphicsManager.startRenderingTime();
            }

            GraphicsManager.clearCanvas(GraphicsManager.overlayContext);
        });
        playButton.icon = document.getElementById("play");
        playButton.width = 30;
        playButton.height = 30;

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

    /* ENEMIES */

    renderEnemies: function()
    {
        var ctx = this.enemiesContext;
        ctx.save();
        
        this.clearCanvas(ctx);
        this.enemyImageIdx = (this.enemyImageIdx + 1) % Enemies.images.length;
        for(var i = 0; i < Enemies.data.length; ++i)
        {
            var enemy = Enemies.data[i];
            var img = Enemies.images[this.enemyImageIdx];
            var x = ctx.canvas.width  / 2 + enemy.x - Camera.x - 32;
            var y = ctx.canvas.height / 2 + enemy.y - Camera.y - 32;
            ctx.drawImage(img, x, y);
        }
        
        ctx.restore();
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
        if(!this.googooliRequestID)
            this.requestGoogooliRender();
    },

    stopRenderingGoogooli: function()
    {
        if(this.googooliRequestID)
        {
            window.cancelAnimationFrame(this.googooliRequestID);
            this.googooliRequestID = 0;
        }
    },

    renderGoogooli: function()
    {
        this.clearGoogooli();
        var ctx = this.googooliContext;
        var dx = Math.floor(ctx.canvas.width / 2 + (Googooli.x - Camera.x) - Googooli.WIDTH / 2);
        var dy = Math.floor(ctx.canvas.height / 2 + (Googooli.y - Camera.y) - Googooli.HEIGHT / 2);
        ctx.drawImage(Googooli.image, dx, dy);
        this.googooliPrevX = dx;
        this.googooliPrevY = dy;
    },

    requestGoogooliRender: function()
    {
        this.googooliRequestID = window.requestAnimationFrame(function()
        {
            GraphicsManager.requestGoogooliRender();
        });
        this.renderGoogooli();
    },

    /* TIME */

    startRenderingTime: function()
    {
        if(!this.timeRequestID)
            this.requestTimeRender();
    },

    stopRenderingTime: function()
    {
        if(this.timeRequestID)
        {
            window.cancelAnimationFrame(this.timeRequestID);
            this.timeRequestID = 0;
        }
    },

    renderTime: function(time)
    {
        this.clearTime();
        var ctx = this.guiContext;
        var timer = Timer.format(time);
        // console.log(timer);

        ctx.save();
        ctx.font = "20px serif";
        var width = ctx.measureText(timer).width;
        ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
        ctx.fillRect(15, 10, width + 10, 25);
        ctx.fillStyle = "white";
        ctx.fillText(timer, 20, 30);
        ctx.restore();
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

    requestTimeRender: function()
    {
        this.timeRequestID = window.requestAnimationFrame(function()
        {
            GraphicsManager.requestTimeRender();
        });
        this.renderTime(GameManager.timer.getTime());
    },

    /* MASTER RENDERER */

    _render: function(src, ctx, cam)
    {
        var wz = ctx.canvas.width / cam.width;
        var hz = ctx.canvas.height / cam.height;
        var sx = Math.floor(Math.max(0, cam.x - cam.width / 2));
        var sy = Math.floor(Math.max(0, cam.y - cam.height / 2));
        var sw = Math.floor(Math.min(src.width, cam.x + cam.width / 2) - sx);
        var sh = Math.floor(Math.min(src.height, cam.y + cam.height / 2) - sy);
        var dx = Math.floor(wz * (sx - (cam.x - cam.width / 2)));
        var dy = Math.floor(hz * (sy - (cam.y - cam.height / 2)));
        var dw = Math.floor(wz * sw);
        var dh = Math.floor(hz * sh);
        ctx.drawImage(src, sx, sy, sw, sh, dx, dy, dw, dh);
    },

    /* MASTER CLEARER */

    clearCanvas: function(ctx)
    {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
};

/* A Masterpiece! - highly efficient code */
/* gradually changes opacity to [finalOp] during [time] miliseconds */
CanvasRenderingContext2D.prototype.opacitate = function(finalOp, time)
{
    var ctx = this;
    var canvas = ctx.canvas;
    
    /* Just in case */
    if( isNaN(time) )
    {
        console.log("ERROR: time is NaN. Falling back to [AnimTime].");
        time = AnimTime;
    }
    
    if(this.opacitateStartTime === undefined)
    {
        /* threshold */
        time -= 40;
        /* this is done in first call to function */
        if(canvas.style.opacity === "") canvas.style.opacity = 1;
        this.opacitateTimeStamp = this.opacitateStartTime = new Date().getTime();
        this.opacitateRequestID = requestAnimationFrame(function() {ctx.opacitate(finalOp, time);});
    }
    else
    {
        /* mark time */
        var clock = new Date().getTime();
        /* previous cycle */
        var prevRemTime = time - this.opacitateTimeStamp + this.opacitateStartTime;
        var prevRemOp = finalOp - canvas.style.opacity;
        /* current cycle */
        var curRemTime = time - clock + this.opacitateStartTime;
        var curRemOp = curRemTime * prevRemOp / prevRemTime;
        /* calculate opacity */
        canvas.style.opacity = finalOp - curRemOp;
        /* update timeStamp */
        this.opacitateTimeStamp = clock;
        
        if(curRemTime <= 0)
        {
            canvas.style.opacity = finalOp;
            this.opacitateStartTime = undefined;
            cancelAnimationFrame(this.opacitateRequestID);
        }
        else
            this.opacitateRequestID = requestAnimationFrame(function() {ctx.opacitate(finalOp, time);});
    }
};

CanvasRenderingContext2D.prototype.fadeout = function(time)
{
    var ctx = this;
    var canvas = ctx.canvas;
    ctx.opacitate(0, time - 30);
    window.setTimeout(function() {ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.style.opacity = 1;}, time - 30);
};
