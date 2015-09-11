"use strict";

/* Application start point */
window.addEventListener("load", function()
{
    GameManager.init();
});

var GameManager =
{
    state: "LOADING",
    timer: null,
    world: 0,
    level: 0,
    levelImage: null,

    init: function()
    {
        Persistent.load();
        Button.addEventListeners();
        Camera.width = GraphicsManager.CANVAS_WIDTH;
        Camera.height = GraphicsManager.CANVAS_HEIGHT;

        Googooli.init(document.getElementById("googooli"));
        Enemies.init(document.getElementById("enemy"));
        GraphicsManager.init();
        SoundManager.init();

        EventManager.addResizeEventListener();
        EventManager.addControllerEventListeners();
        // SoundManager.playAudio();

        GameManager.timer = new Timer();
        GameManager.gotoINTRO();
    },

    gotoINTRO: function()
    {
        GameManager.state = "INTRO";
        Controller.turnOff();
        GraphicsManager.renderINTRO();
    },

    gotoWORLDSEL: function()
    {
        GameManager.state = "WORLDSEL";
        Controller.turnOff();
        GraphicsManager.renderWORLDSEL();
    },

    gotoLEVELSEL: function()
    {
        GameManager.state = "LEVELSEL";
        Controller.turnOff();
        GraphicsManager.clearCanvas(GraphicsManager.guiContext);
        GraphicsManager.renderLEVELSEL();
    },

    gotoPLAY: function()
    {
        GameManager.state = "PLAY";
        GameManager.timer.reset();
        Controller.turnOff();

        GameManager.loadLevel(Worlds[GameManager.world].levels[GameManager.level]);
        Googooli.comeToLife();
        Enemies.load();
        Enemies.startUpdating();
        Camera.teleport(Googooli.x, Googooli.y);
        GraphicsManager.renderPLAY();
        Controller.turnOn();
    },

    gotoPRIZE: function()
    {
        GameManager.state = "PRIZE";

        GameManager.unlockLevel(GameManager.world, GameManager.level + 1);

        var newHighscore = false;
        var levelData = Persistent.data.worlds[GameManager.world].levels[GameManager.level];

        if(GameManager.timer.getTime() < levelData.highscore || levelData.highscore == null)
        {
            newHighscore = true;
            levelData.highscore = GameManager.timer.getTime();
            Persistent.save();
        }

        GraphicsManager.renderPRIZE(newHighscore);
    },

    loadLevel: function(level)
    {
        GameManager.createLevel(level);
        var startNode = level.nodes[level.start];
        Googooli.teleport(startNode.x, startNode.y);
    },

    createLevel: function()
    {
        var worldData = Worlds[GameManager.world];
        var levelData = worldData.levels[GameManager.level];
        var points = levelData.nodes;
        if(!levelData.enemies)
            levelData.enemies = [];

        if(!levelData.transformed)
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
            for(var i = 0; i < levelData.enemies.length; ++i)
            {
                var point = levelData.enemies[i].center;
                point.x = point.x - minX + OFFSET;
                point.y = -point.y - minY + OFFSET;
            }
            levelData.transformed = true;
        }

        var maxX = -Infinity,
            maxY = -Infinity;
        for(var i = 0; i < levelData.nodes.length; ++i)
        {
            var node = levelData.nodes[i];
            var x = node.x + node.radius;
            var y = node.y + node.radius;

            if(x > maxX) maxX = x;
            if(y > maxY) maxY = y;
        }

        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        canvas.width = maxX + OFFSET;
        canvas.height = maxY + OFFSET;

        var pattern = ctx.createPattern(document.getElementById(worldData.fg), "repeat");
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "black";
        ctx.globalCompositeOperation = "destination-out";

        for(var i = 0; i < levelData.nodes.length; ++i)
        {
            var node = levelData.nodes[i];
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, 2 * Math.PI);
            ctx.fill();

            for(var j = 0; j < node.links.length; ++j)
            {
                var node2 = levelData.nodes[node.links[j]];

                var dx = node.x - node2.x;
                var dy = node.y - node2.y;

                var p1x = node.x - dy * Math.sqrt(Geometry.sqr(node.radius) / (Geometry.sqr(dx) + Geometry.sqr(dy)));
                var p1y = node.y + dx * Math.sqrt(Geometry.sqr(node.radius) / (Geometry.sqr(dx) + Geometry.sqr(dy)));
                var p2x = 2 * node.x - p1x;
                var p2y = 2 * node.y - p1y;
                var p3x = node2.x + dy * Math.sqrt(Geometry.sqr(node2.radius) / (Geometry.sqr(dx) + Geometry.sqr(dy)));
                var p3y = node2.y - dx * Math.sqrt(Geometry.sqr(node2.radius) / (Geometry.sqr(dx) + Geometry.sqr(dy)));
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

        /* BOOM performance down the drain! */
        //Googooli.collisionImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        Googooli.wallsContext = ctx;

        var canvas2 = canvas;
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        canvas.width = maxX + OFFSET;
        canvas.height = maxY + OFFSET;

        var pattern = ctx.createPattern(document.getElementById(worldData.bg), "repeat");
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "rgba(0, 255, 200, 0.2)";
        var node = levelData.nodes[levelData.finish];
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 4 / 5, 0, 2 * Math.PI);
        ctx.fill();

        ctx.shadowColor = "black";
        ctx.shadowBlur = 40;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        ctx.drawImage(canvas2, 0, 0);

        GameManager.levelImage = canvas;
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
        if(!Persistent.data.worlds[world])
        {
            Persistent.data.worlds[world] = {
                levels: []
            };
        }
        if(!Persistent.data.worlds[world].levels[idx])
        {
            Persistent.data.worlds[world].levels[idx] = {
                highscore: null
            };
        }
        Persistent.save();
    }
};

/* distance of points from the edge of the canvas */
var OFFSET = 250;
