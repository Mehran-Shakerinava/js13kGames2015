var Persistent = {
    data:
    {
        worlds:
        {
            A:
            {
                levels: [
                    {
                        highscore: Infinity
                    }
                    /* Other levels are locked. */
                ]
            },

            B:
            {
                levels: [
                    {
                        highscore: Infinity
                    }
                    /* Other levels are locked. */
                ]
            },

            C:
            {
                levels: [
                    {
                        highscore: Infinity
                    }
                    /* Other levels are locked. */
                ]
            }
        }
    },

    load: function()
    {
        var data = JSON.parse(window.localStorage.getItem("GOOGOOLI"));
        if(data)
            Persistent.data = data;
    },

    save: function()
    {
        window.localStorage.setItem("GOOGOOLI", Persistent.data);
    }
};
