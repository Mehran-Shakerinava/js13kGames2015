var Persistent =
{
    data:
    {
        worlds:
        {
            A:
            {
                levels:
                [
                    {
                        highscore: null
                    }
                    /* Other levels are locked. */
                ]
            },

            B:
            {
                levels:
                [
                    {
                        highscore: null
                    }
                    /* Other levels are locked. */
                ]
            },

            C:
            {
                levels:
                [
                    {
                        highscore: null
                    }
                    /* Other levels are locked. */
                ]
            }
        }
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
