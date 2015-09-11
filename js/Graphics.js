"use strict";

var Graphics =
{
    roundedRect: function(ctx, x, y, width, height, radius)
    {
        ctx.beginPath();
        ctx.moveTo(x, y + radius);
        ctx.lineTo(x, y + height - radius);
        ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
        ctx.lineTo(x + width - radius, y + height);
        ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
        ctx.lineTo(x + width, y + radius);
        ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
        ctx.lineTo(x + radius, y);
        ctx.quadraticCurveTo(x, y, x, y + radius);
    },

    opacitate: function(ctx, finalOp, time)
    {
        var canvas = ctx.canvas;
        
        /* Just in case */
        if( isNaN(time) )
        {
            console.log("ERROR: time is NaN. Falling back to 400ms.");
            time = 400;
        }
        
        if(Geometry.opacitateStartTime === undefined)
        {
            /* threshold */
            time -= 40;
            /* Geometry is done in first call to function */
            if(canvas.style.opacity === "") canvas.style.opacity = 1;
            Geometry.opacitateTimeStamp = Geometry.opacitateStartTime = new Date().getTime();
            Geometry.opacitateRequestID = requestAnimationFrame(function() {ctx.opacitate(finalOp, time);});
        }
        else
        {
            /* mark time */
            var clock = new Date().getTime();
            /* previous cycle */
            var prevRemTime = time - Geometry.opacitateTimeStamp + Geometry.opacitateStartTime;
            var prevRemOp = finalOp - canvas.style.opacity;
            /* current cycle */
            var curRemTime = time - clock + Geometry.opacitateStartTime;
            var curRemOp = curRemTime * prevRemOp / prevRemTime;
            /* calculate opacity */
            canvas.style.opacity = finalOp - curRemOp;
            /* update timeStamp */
            Geometry.opacitateTimeStamp = clock;
            
            if(curRemTime <= 0)
            {
                canvas.style.opacity = finalOp;
                Geometry.opacitateStartTime = undefined;
                cancelAnimationFrame(Geometry.opacitateRequestID);
            }
            else
                Geometry.opacitateRequestID = requestAnimationFrame(function() {ctx.opacitate(finalOp, time);});
        }
    },

    fadeout: function(ctx, time)
    {
        var canvas = ctx.canvas;
        ctx.opacitate(0, time - 30);
        window.setTimeout(function() {ctx.clearRect(0, 0, canvas.width, canvas.height);
            canvas.style.opacity = 1;}, time - 30);
    }
};