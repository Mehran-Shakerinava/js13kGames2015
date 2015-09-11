"use strict";

var Geometry =
{
    length: function(x, y)
    {
        return Math.sqrt(x * x + y * y);
    },

    distance: function(x1, y1, x2, y2)
    {
        return Geometry.length(x2 - x1, y2 - y1);
    },

    sqr: function(x)
    {
        return x * x;
    }
};