"use strict";

var EventManager = {
    touches: [],

    keydownListener: function(event)
    {
        switch(event.keyCode)
        {
            case 37:
                Controller.pressLeft();
                break;

            case 38:
                Controller.pressUp();
                break;

            case 39:
                Controller.pressRight();
                break;

            case 40:
                Controller.pressDown();
                break;
        }
    },

    keyupListener: function(event)
    {
        switch(event.keyCode)
        {
            case 37:
                Controller.releaseLeft();
                break;

            case 38:
                Controller.releaseUp();
                break;

            case 39:
                Controller.releaseRight();
                break;

            case 40:
                Controller.releaseDown();
                break;
        }
    },

    handleTouches: function()
    {
        var right = 0,
            down = 0,
            left = 0,
            up = 0;
        for(var i = 0; i < EventManager.touches.length; ++i)
        {
            var p = EventManager.getCanvasXY(GraphicsManager.guiContext.canvas, EventManager.touches[i]);
            var x = p.x;
            var y = p.y;

            if(50 - 37 <= x && x <= 50 && GraphicsManager.CANVAS_HEIGHT - 65 <= y && y <= GraphicsManager.CANVAS_HEIGHT - 35)
                left = 1;
            if(50 - 0 <= x && x <= 50 + 37 && GraphicsManager.CANVAS_HEIGHT - 65 <= y && y <= GraphicsManager.CANVAS_HEIGHT - 35)
                right = 1;
            if(GraphicsManager.CANVAS_WIDTH - 65 <= x && x <= GraphicsManager.CANVAS_WIDTH - 35 &&
                GraphicsManager.CANVAS_HEIGHT - 50 - 37 <= y && y <= GraphicsManager.CANVAS_HEIGHT - 50)
                up = 1;
            if(GraphicsManager.CANVAS_WIDTH - 65 <= x && x <= GraphicsManager.CANVAS_WIDTH - 35 &&
                GraphicsManager.CANVAS_HEIGHT - 50 <= y && y <= GraphicsManager.CANVAS_HEIGHT - 50 + 37)
                down = 1;
        }
        if(GameManager.state === "PLAY")
        {
            if(left != Controller.leftButton)
            {
                if(left)
                {
                    GraphicsManager.guiContext.drawImage(document.getElementById("leftFlat"),
                        50 - 37, GraphicsManager.guiContext.canvas.height - 65);
                    Controller.pressLeft();
                }
                else
                {
                    GraphicsManager.guiContext.drawImage(document.getElementById("leftShaded"),
                        50 - 37, GraphicsManager.guiContext.canvas.height - 65);
                    Controller.releaseLeft();
                }
            }
            if(right != Controller.rightButton)
            {
                if(right)
                {
                    GraphicsManager.guiContext.drawImage(document.getElementById("rightFlat"),
                        50 - 0, GraphicsManager.guiContext.canvas.height - 65);
                    Controller.pressRight();
                }
                else
                {
                    GraphicsManager.guiContext.drawImage(document.getElementById("rightShaded"),
                        50 - 0, GraphicsManager.guiContext.canvas.height - 65);
                    Controller.releaseRight();
                }
            }
            if(up != Controller.upButton)
            {
                if(up)
                {
                    GraphicsManager.guiContext.drawImage(document.getElementById("upFlat"),
                        GraphicsManager.guiContext.canvas.width - 65, GraphicsManager.guiContext.canvas.height - 50 - 37);
                    Controller.pressUp();
                }
                else
                {
                    GraphicsManager.guiContext.drawImage(document.getElementById("upShaded"),
                        GraphicsManager.guiContext.canvas.width - 65, GraphicsManager.guiContext.canvas.height - 50 - 37);
                    Controller.releaseUp();
                }
            }
            if(down != Controller.downButton)
            {
                if(down)
                {
                    GraphicsManager.guiContext.drawImage(document.getElementById("downFlat"),
                        GraphicsManager.guiContext.canvas.width - 65, GraphicsManager.guiContext.canvas.height - 50);
                    Controller.pressDown();
                }
                else
                {
                    GraphicsManager.guiContext.drawImage(document.getElementById("downShaded"),
                        GraphicsManager.guiContext.canvas.width - 65, GraphicsManager.guiContext.canvas.height - 50);
                    Controller.releaseDown();
                }
            }
        }
    },

    touchstartListener: function(evt)
    {
        evt.preventDefault();
        var touches = evt.changedTouches;

        for(var i = 0; i < touches.length; i++)
        {
            EventManager.touches.push(EventManager.copyTouch(touches[i]));
        }

        EventManager.handleTouches();
    },

    touchmoveListener: function(evt)
    {
        evt.preventDefault();
        var touches = evt.changedTouches;

        for(var i = 0; i < touches.length; i++)
        {
            var idx = EventManager.touchIndexById(touches[i].identifier);

            if(idx >= 0)
            {
                EventManager.touches.splice(idx, 1, EventManager.copyTouch(touches[i])); // swap in the new touch record
            }
            else
            {
                console.log("can't figure out which touch to continue");
            }
        }

        EventManager.handleTouches();
    },

    touchendListener: function(evt)
    {
        evt.preventDefault();
        var touches = evt.changedTouches;

        for(var i = 0; i < touches.length; i++)
        {
            var idx = EventManager.touchIndexById(touches[i].identifier);

            if(idx >= 0)
            {
                EventManager.touches.splice(idx, 1); // remove it; we're done
            }
            else
            {
                console.log("can't figure out which touch to end");
            }
        }

        EventManager.handleTouches();
    },

    touchcancelListener: function(evt)
    {
        evt.preventDefault();
        var touches = evt.changedTouches;

        for(var i = 0; i < touches.length; i++)
        {
            ongoingTouches.splice(i, 1); // remove it; we're done
        }

        EventManager.handleTouches();
    },

    copyTouch: function(touch)
    {
        return {
            identifier: touch.identifier,
            clientX: touch.clientX,
            clientY: touch.clientY
        };
    },

    touchIndexById: function(idToFind)
    {
        for(var i = 0; i < EventManager.touches.length; i++)
        {
            var id = EventManager.touches[i].identifier;

            if(id == idToFind)
            {
                return i;
            }
        }
        return -1; // not found
    },

    addControllerEventListeners: function()
    {
        /* touch */
        window.addEventListener("touchstart", function(event)
        {
            EventManager.touchstartListener(event);
        });
        window.addEventListener("touchend", function(event)
        {
            EventManager.touchendListener(event);
        });
        window.addEventListener("touchmove", function(event)
        {
            EventManager.touchmoveListener(event);
        });
        window.addEventListener("touchcancel", function(event)
        {
            EventManager.touchcancelListener(event);
        });

        /* keyboard */
        document.addEventListener("keydown", function(event)
        {
            EventManager.keydownListener(event);
        });
        document.addEventListener("keyup", function(event)
        {
            EventManager.keyupListener(event);
        });
    },

    addResizeEventListener: function()
    {
        /* Makes sure the game always fits the screen. */
        window.addEventListener("resize", function(event)
        {
            GraphicsManager.fitScreen();
        });
        /* Do initial fitScreen() */
        GraphicsManager.fitScreen();
    },

    getCanvasXY: function(canvas, event)
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
        return {
            x: x,
            y: y
        };
    }
};
