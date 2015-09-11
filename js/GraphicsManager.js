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
        GraphicsManager.levelselContext = GraphicsManager.createCanvas("levelselCanvas").getContext("2d");
        GraphicsManager.levelselContext.canvas.style["z-index"] = 2;

        GraphicsManager.worldselContext = GraphicsManager.createCanvas("worldselCanvas").getContext("2d");
        GraphicsManager.worldselContext.canvas.style["z-index"] = 2;

        GraphicsManager.introContext = GraphicsManager.createCanvas("introCanvas").getContext("2d");
        GraphicsManager.introContext.canvas.style["z-index"] = 2;

        GraphicsManager.levelContext = GraphicsManager.createCanvas("levelCanvas").getContext("2d");
        GraphicsManager.levelContext.canvas.style["z-index"] = 0;

        GraphicsManager.enemiesContext = GraphicsManager.createCanvas("enemiesCanvas").getContext("2d");
        GraphicsManager.enemiesContext.canvas.style["z-index"] = 1;

        GraphicsManager.googooliContext = GraphicsManager.createCanvas("googooliCanvas").getContext("2d");
        GraphicsManager.googooliContext.canvas.style["z-index"] = 1;

        GraphicsManager.guiContext = GraphicsManager.createCanvas("guiCanvas").getContext("2d");
        GraphicsManager.guiContext.canvas.style["z-index"] = 2;

        GraphicsManager.overlayContext = GraphicsManager.createCanvas("overlayCanvas").getContext("2d");
        GraphicsManager.overlayContext.canvas.style["z-index"] = 3;

        GraphicsManager.prizeContext = GraphicsManager.createCanvas("prizeCanvas").getContext("2d");
        GraphicsManager.prizeContext.canvas.style["z-index"] = 4;

        GraphicsManager.calcMaxCssZoom();
        GraphicsManager.fitScreen();
    },

    calcMaxCssZoom: function()
    {
        GraphicsManager.maxCssZoom = Math.min(screen.width / GraphicsManager.CANVAS_WIDTH,
            screen.height / GraphicsManager.CANVAS_HEIGHT);
    },

    createCanvas: function(id)
    {
        var canvas = document.createElement("canvas");
        canvas.width = GraphicsManager.CANVAS_WIDTH;
        canvas.height = GraphicsManager.CANVAS_HEIGHT;
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
        GraphicsManager.cssZoom = canvasList[0].style.width.replace("px", "") / canvasList[0].width;
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
        var ctx = GraphicsManager.introContext;
        ctx.save();

        var pattern = ctx.createPattern(document.getElementById("illusion"), "repeat");
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        ctx.textAlign = "center";
        ctx.fillStyle = "rgba(241, 192, 21, 0.8)";
        ctx.font = "italic 50px 'Comic Sans MS'";
        ctx.fillText("Googooli", ctx.canvas.width / 2, ctx.canvas.height * 1 / 6);

        var button = new Button(ctx, ctx.canvas.width / 2, ctx.canvas.height / 2, function()
        {
            SoundManager.playClick();
            Button.clearListening();
            GraphicsManager.clearCanvas(this.ctx);
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
        var ctx = GraphicsManager.worldselContext;
        ctx.save();

        var pattern = ctx.createPattern(document.getElementById("illusion"), "repeat");
        ctx.fillStyle = pattern;
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

                SoundManager.playClick();
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

        GraphicsManager.renderBack(ctx, function()
        {
            SoundManager.playClick();
            Button.clearListening();
            GraphicsManager.clearCanvas(GraphicsManager.worldselContext);
            GameManager.gotoINTRO();
        });

        ctx.restore();
    },

    renderLEVELSEL: function()
    {
        var ctx = GraphicsManager.levelselContext;
        ctx.save();

        var pattern = ctx.createPattern(document.getElementById("illusion"), "repeat");
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        var world = GameManager.world;
        var n = Worlds[world].levels.length;

        for(var i = 0; i < n; ++i)
        {
            var button = new Button(ctx, ctx.canvas.width * (i + 1) / (n + 1), ctx.canvas.height / 2, function()
            {
                if(this.locked)
                {
                    SoundManager.playError();
                }
                else
                {
                    SoundManager.playClick();
                    Button.clearListening();
                    GraphicsManager.clearCanvas(this.ctx);
                    GameManager.level = this.text - 1;
                    GameManager.gotoPLAY();
                }
            });
            // button.data = i;
            button.locked = !Persistent.data.worlds[world].levels[i];
            if(button.locked)
                button.icon = document.getElementById("locked");
            else
            {
                var levelData = Worlds[GameManager.world].levels[GameManager.level];
                var time = Persistent.data.worlds[world].levels[i].highscore / 1000;
                if(time <= levelData.gold) button.icon = document.getElementById("gold");
                else if(time <= levelData.silver) button.icon = document.getElementById("silver");
                else if(time <= levelData.bronze) button.icon = document.getElementById("bronze");
                else button.icon = document.getElementById("carrot");
            }
            button.width = ctx.canvas.width / (n + 1) - 10;
            button.height = ctx.canvas.height / 3;
            button.text = i + 1;
            button.show();
        }

        GraphicsManager.renderBack(ctx, function()
        {
            SoundManager.playClick();
            GraphicsManager.clearCanvas(GraphicsManager.levelselContext);
            Button.clearListening();
            GameManager.gotoWORLDSEL();
        });

        ctx.restore();
    },

    renderPLAY: function()
    {
        GraphicsManager.renderLevel();
        GraphicsManager.startRenderingGoogooli();
        GraphicsManager.renderTime(GameManager.timer.getTime());
        GraphicsManager.renderGuiButtons();
    },

    renderPRIZE: function(newHighscore)
    {
        var ctx = GraphicsManager.prizeContext;
        ctx.save();

        var width = 200;
        var height = 200;
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        Graphics.roundedRect(ctx,
            ctx.canvas.width / 2 - width / 2,
            ctx.canvas.height / 2 - height / 2,
            width, height, 5);
        ctx.fill();

        var levelData = Worlds[GameManager.world].levels[GameManager.level];
        var time = GameManager.timer.getTime() / 1000;
        var prizeImg = null;
        if(time <= levelData.gold) prizeImg = document.getElementById("gold");
        else if(time <= levelData.silver) prizeImg = document.getElementById("silver");
        else if(time <= levelData.bronze) prizeImg = document.getElementById("bronze");
        else prizeImg = document.getElementById("carrot");
        ctx.drawImage(prizeImg,
            ctx.canvas.width / 2 - prizeImg.width / 2,
            ctx.canvas.height / 2 - prizeImg.height / 2 - 100,
            prizeImg.width, prizeImg.height);

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
            SoundManager.playClick();
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

    renderGameover: function()
    {
        var ctx = GraphicsManager.guiContext;
        ctx.save();
        
        ctx.font = "Bold 70px Georgia";
        var width = ctx.measureText("GAMEOVER").width;
        ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
        Graphics.roundedRect(ctx,
            ctx.canvas.width / 2 - width / 2 - 5,
            ctx.canvas.height / 2 - 40, width + 10, 80, 5);
        ctx.fill();
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "rgba(255, 0, 0, 0.7)";
        ctx.fillText("GAMEOVER", ctx.canvas.width / 2, ctx.canvas.height / 2);
        
        ctx.restore();
    },

    /* GUI BUTTONS */

    renderGuiButtons: function()
    {
        var ctx = GraphicsManager.guiContext;
        ctx.save();

        GraphicsManager.renderBack(ctx, function()
        {
            SoundManager.playClick();
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
            SoundManager.playClick();
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
            SoundManager.playClick();
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
            SoundManager.playClick();
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

        if('ontouchstart' in document.documentElement ||
            (window.navigator.maxTouchPoints && window.navigator.maxTouchPoints > 1))
        {
            GraphicsManager.guiContext.drawImage(document.getElementById("leftShaded"),
                50 - 37, GraphicsManager.guiContext.canvas.height - 65);
            GraphicsManager.guiContext.drawImage(document.getElementById("rightShaded"),
                50 - 0, GraphicsManager.guiContext.canvas.height - 65);
            GraphicsManager.guiContext.drawImage(document.getElementById("upShaded"),
                GraphicsManager.guiContext.canvas.width - 65, GraphicsManager.guiContext.canvas.height - 50 - 37);
            GraphicsManager.guiContext.drawImage(document.getElementById("downShaded"),
                GraphicsManager.guiContext.canvas.width - 65, GraphicsManager.guiContext.canvas.height - 50);
        }
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
        GraphicsManager.levelContext.clearRect(0, 0, GraphicsManager.levelContext.canvas.width, GraphicsManager.levelContext.canvas.height);
        GraphicsManager._render(GameManager.levelImage, GraphicsManager.levelContext, Camera);
    },

    /* ENEMIES */

    renderEnemies: function()
    {
        var ctx = GraphicsManager.enemiesContext;
        ctx.save();

        GraphicsManager.clearCanvas(ctx);
        GraphicsManager.enemyImageIdx = (GraphicsManager.enemyImageIdx + 1) % Enemies.images.length;
        for(var i = 0; i < Enemies.data.length; ++i)
        {
            var enemy = Enemies.data[i];
            var img = Enemies.images[GraphicsManager.enemyImageIdx];
            var x = ctx.canvas.width / 2 + enemy.x - Camera.x - 32;
            var y = ctx.canvas.height / 2 + enemy.y - Camera.y - 32;
            ctx.drawImage(img, x, y);
        }

        ctx.restore();
    },

    /* GOOGOOLI */

    clearGoogooli: function()
    {
        if(!GraphicsManager.googooliPrevX)
            return;
        var ctx = GraphicsManager.googooliContext;
        ctx.clearRect(GraphicsManager.googooliPrevX, GraphicsManager.googooliPrevY, Googooli.WIDTH, Googooli.HEIGHT);
    },

    startRenderingGoogooli: function()
    {
        if(!GraphicsManager.googooliRequestID)
            GraphicsManager.requestGoogooliRender();
    },

    stopRenderingGoogooli: function()
    {
        if(GraphicsManager.googooliRequestID)
        {
            window.cancelAnimationFrame(GraphicsManager.googooliRequestID);
            GraphicsManager.googooliRequestID = 0;
        }
    },

    renderGoogooli: function()
    {
        GraphicsManager.clearGoogooli();
        var ctx = GraphicsManager.googooliContext;
        var dx = Math.floor(ctx.canvas.width / 2 + (Googooli.x - Camera.x) - Googooli.WIDTH / 2);
        var dy = Math.floor(ctx.canvas.height / 2 + (Googooli.y - Camera.y) - Googooli.HEIGHT / 2);
        ctx.drawImage(Googooli.images[Googooli.row][Googooli.col], dx, dy);
        GraphicsManager.googooliPrevX = dx;
        GraphicsManager.googooliPrevY = dy;
    },

    requestGoogooliRender: function()
    {
        GraphicsManager.googooliRequestID = window.requestAnimationFrame(function()
        {
            GraphicsManager.requestGoogooliRender();
        });
        GraphicsManager.renderGoogooli();
    },

    /* TIME */

    startRenderingTime: function()
    {
        if(!GraphicsManager.timeRequestID)
            GraphicsManager.requestTimeRender();
    },

    stopRenderingTime: function()
    {
        if(GraphicsManager.timeRequestID)
        {
            window.cancelAnimationFrame(GraphicsManager.timeRequestID);
            GraphicsManager.timeRequestID = 0;
        }
    },

    renderTime: function(time)
    {
        GraphicsManager.clearTime();
        var ctx = GraphicsManager.guiContext;
        var timer = Timer.format(time);
        // console.log(timer);

        ctx.save();
        ctx.font = "20px serif";
        var width = ctx.measureText(timer).width;
        ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
        Graphics.roundedRect(ctx, 5, 5, width + 10, 25, 5);
        ctx.fill();
        ctx.fillStyle = "white";
        ctx.fillText(timer, 10, 25);
        ctx.restore();
    },

    clearTime: function()
    {
        var ctx = GraphicsManager.guiContext;
        ctx.save();
        ctx.font = "20px serif";
        var width = ctx.measureText("0000000000:00:000").width;
        ctx.clearRect(5, 5, width + 10, 25);
        ctx.restore();
    },

    requestTimeRender: function()
    {
        GraphicsManager.timeRequestID = window.requestAnimationFrame(function()
        {
            GraphicsManager.requestTimeRender();
        });
        GraphicsManager.renderTime(GameManager.timer.getTime());
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
