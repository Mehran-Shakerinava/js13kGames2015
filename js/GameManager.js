"use strict";

/* Application start point */
window.addEventListener("load", function()
{
    GameManager.init();
});

var GameManager = {
    state: "LOADING",
    timer: null,
    world: null,
    levelIdx: null,
    levelImage: null,

    init: function()
    {
        Persistent.load();
        Camera.width = GraphicsManager.CANVAS_WIDTH;
        Camera.height = GraphicsManager.CANVAS_HEIGHT;

        Googooli.init(document.getElementById("googooli"));
        GraphicsManager.init();
        SoundManager.init();

        EventManager.addResizeEventListener();
        EventManager.addKeyboardEventListener();
        SoundManager.playAudio();

        this.timer = new Timer();
        this.gotoINTRO();
    },

    gotoINTRO: function()
    {
        this.state = "INTRO";
        Controller.turnOff();
        GraphicsManager.renderINTRO();
    },

    gotoWORLDSEL: function()
    {
        this.state = "WORLDSEL";
        Controller.turnOff();
        GraphicsManager.renderWORLDSEL();
    },

    gotoLEVELSEL: function(world)
    {
        this.state = "LEVELSEL";
        Controller.turnOff();
        GraphicsManager.clearCanvas(GraphicsManager.guiContext);
        GraphicsManager.renderLEVELSEL(world);
    },

    gotoPLAY: function(world, idx)
    {
        this.state = "PLAY";
        this.timer.reset();
        Controller.turnOff();
        this.world = world;
        this.levelIdx = idx;

        // console.log(world);
        // console.log(idx);
        // console.log(Worlds[world].levels[idx]);

        this.loadLevel(Worlds[world].levels[idx]);
        GraphicsManager.renderPLAY();
        Controller.turnOn();
    },

    gotoPRIZE: function()
    {
        this.state = "PRIZE";
        
        this.unlockLevel(this.world, this.levelIdx + 1);

        var newHighscore = false;
        var levelData = Persistent.data.worlds[this.world].levels[this.levelIdx];

        if(this.timer.getTime() < levelData.highscore || levelData.highscore == null)
        {
            newHighscore = true;
            levelData.highscore = this.timer.getTime();
            Persistent.save();
        }

        GraphicsManager.renderPRIZE(newHighscore);
    },

    loadLevel: function(level)
    {
        this.createLevel(level);
        var startNode = level.nodes[level.start];
        Googooli.teleport(startNode.x, startNode.y);
        Googooli.die();
        Googooli.comeToLife();
        Camera.teleport(startNode.x, startNode.y);
        Camera.bounce();
        Camera.teleport(Camera.aimX, Camera.aimY);
    },

    createLevel: function(level)
    {
        if(!level.toCanvas)
        {
            this.planeToCanvas(level.nodes);
            level.toCanvas = true;
        }
        var maxX = -Infinity,
            maxY = -Infinity;
        for(var i = 0; i < level.nodes.length; ++i)
        {
            var node = level.nodes[i];
            var x = node.x + node.radius;
            var y = node.y + node.radius;

            if(x > maxX) maxX = x;
            if(y > maxY) maxY = y;
        }

        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        canvas.width = maxX + OFFSET;
        canvas.height = maxY + OFFSET;

        var pattern = ctx.createPattern(document.getElementById(level.fg), "repeat");
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.globalCompositeOperation = "destination-out";

        for(var i = 0; i < level.nodes.length; ++i)
        {
            var node = level.nodes[i];
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, 2 * Math.PI);
            ctx.fill();

            for(var j = 0; j < node.links.length; ++j)
            {
                var node2 = level.nodes[node.links[j]];

                var dx = node.x - node2.x;
                var dy = node.y - node2.y;

                var p1x = node.x - dy * Math.sqrt(Math.sqr(node.radius) / (Math.sqr(dx) + Math.sqr(dy)));
                var p1y = node.y + dx * Math.sqrt(Math.sqr(node.radius) / (Math.sqr(dx) + Math.sqr(dy)));
                var p2x = 2 * node.x - p1x;
                var p2y = 2 * node.y - p1y;
                var p3x = node2.x + dy * Math.sqrt(Math.sqr(node2.radius) / (Math.sqr(dx) + Math.sqr(dy)));
                var p3y = node2.y - dx * Math.sqrt(Math.sqr(node2.radius) / (Math.sqr(dx) + Math.sqr(dy)));
                var p4x = 2 * node2.x - p3x;
                var p4y = 2 * node2.y - p3y;

                ctx.beginPath();
                ctx.moveTo(p1x, p1y);
                ctx.lineTo(p2x, p2y);
                ctx.lineTo(p3x, p3y);
                ctx.lineTo(p4x, p4y);
                ctx.fill();
            }
        }

        Googooli.collisionImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        var canvas2 = canvas;
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        canvas.width = maxX + OFFSET;
        canvas.height = maxY + OFFSET;

        var pattern = ctx.createPattern(document.getElementById(level.bg), "repeat");
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // var pattern = ctx.createPattern(document.getElementById("warning"), "repeat");
        ctx.fillStyle = "rgba(0, 255, 200, 0.2)";
        var node = level.nodes[level.finish];
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 4 / 5, 0, 2 * Math.PI);
        ctx.fill();

        ctx.shadowColor = "black";
        ctx.shadowBlur = 40;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        ctx.drawImage(canvas2, 0, 0);

        this.levelImage = canvas;
    },

    planeToCanvas: function(points)
    {
        var minX = Infinity,
            minY = Infinity;
        for(var i = 0; i < points.length; ++i)
        {
            var x = points[i].x - points[i].radius;
            /* canvas y coordinates are reversed */
            var y = -points[i].y - points[i].radius;

            if(x < minX) minX = x;
            if(y < minY) minY = y;
        }
        for(var i = 0; i < points.length; ++i)
        {
            points[i].x = points[i].x - minX + OFFSET;
            points[i].y = -points[i].y - minY + OFFSET;
        }
    },

    unlockLevel: function(world, idx)
    {
        if(!Persistent.data.worlds[world].levels[idx])
        {
            Persistent.data.worlds[world].levels[idx] = { highscore: null };
            Persistent.save();
        }
    }
};

Math.sqr = function(x)
{
    return x * x;
};

/* distance of points from the edge of the canvas */
var OFFSET = 250;