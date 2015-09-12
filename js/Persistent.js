var Persistent =
{
    data: null,

    defaultData:
    {
        audioOn: true,
        musicOn: true,

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
        else
        {
            Persistent.data = Persistent.defaultData;
            console.log("Loaded default data.")
        }
    },

    save: function()
    {
        window.localStorage.setItem("GOOGOOLI", JSON.stringify(Persistent.data));
    }
};