var Persistent =
{
    data:
    {
        worlds:
        [
            /* 0 */
            {
                levels:
                [
                    {
                        highscore: null
                    }
                    /* Other levels are locked. */
                ]
            }
            /* Other worlds are locked */
        ]
    },

    load: function()
    {
        var dataString = window.localStorage.getItem("GOOGOOLI");
        if(dataString != "undefined" && dataString != "null" && dataString)
            Persistent.data = JSON.parse(dataString);
    },

    save: function()
    {
        window.localStorage.setItem("GOOGOOLI", JSON.stringify(Persistent.data));
    }
};