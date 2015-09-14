"use strict";

var Worlds =
[
    /* 0 */
    {
        name: "In the Polygon",
        bg: "lodyas",
        fg: "triangular",

        levels:
        [
            /* 0 */
            {
                nodes:
                [
                    /* 0 */
                    {
                        x: 0,
                        y: 0,
                        radius: 100,
                        links: [1]
                    },

                    /* 1 */
                    {
                        x: -200,
                        y: -200,
                        radius: 100,
                        links: [2]
                    },

                    /* 2 */
                    {
                        x: -300,
                        y: -200,
                        radius: 100,
                        links: [3]
                    },

                    /* 3 */
                    {
                        x: -500,
                        y: 0,
                        radius: 100,
                        links: [4]
                    },

                    /* 4 */
                    {
                        x: -600,
                        y: 0,
                        radius: 100,
                        links: [5]
                    },

                    /* 5 */
                    {
                        x: -800,
                        y: -200,
                        radius: 100,
                        links: []
                    }
                ],

                enemies: [],

                start: 0,
                finish: 5,

                gold: 5.5,
                silver: 7,
                bronze: 9
            },

            /* 1 */
            {
                nodes:
                [
                    /* 0 */
                    {
                        x: 0,
                        y: 0,
                        radius: 50,
                        links: [1]
                    },

                    /* 1 */
                    {
                        x: -200,
                        y: -200,
                        radius: 100,
                        links: [2]
                    },

                    /* 2 */
                    {
                        x: -200,
                        y: -500,
                        radius: 50,
                        links: [3]
                    },

                    /* 3 */
                    {
                        x: -700,
                        y: -700,
                        radius: 40,
                        links: [4]
                    },

                    /* 4 */
                    {
                        x: -900,
                        y: -400,
                        radius: 40,
                        links: [5]
                    },

                    /* 5 */
                    {
                        x: -400,
                        y: -400,
                        radius: 100,
                        links: []
                    }
                ],
                
                enemies:
                [
                    /* 0 */
                    {
                        motion: "circular",

                        center:
                        {
                            x: -220,
                            y: -200
                        },

                        radius:
                        {
                            x: 0,
                            y: 32
                        },

                        omega: 5,
                        offset: 0
                    },
                    
                    /* 1 */
                    {
                        motion: "linear",

                        center:
                        {
                            x: -450,
                            y: -370
                        },

                        radius:
                        {
                            x: 100,
                            y: 0
                        },

                        omega: 4,
                        offset: 0
                    }
                ],
                
                start: 0,
                finish: 5,

                gold: 11,
                silver: 13,
                bronze: 15
            },

            /* 2 */
            {
                nodes:
                [
                    /* 0 */
                    {
                        x: 0,
                        y: 0,
                        radius: 60,
                        links: [1]
                    },

                    /* 1 */
                    {
                        x: 0,
                        y: 300,
                        radius: 60,
                        links: [2]
                    },

                    /* 2 */
                    {
                        x: 1000,
                        y: 300,
                        radius: 60,
                        links: [3]
                    },

                    /* 3 */
                    {
                        x: 1000,
                        y: -700,
                        radius: 50,
                        links: [6]
                    },

                    /* 4 */
                    {
                        x: 900,
                        y: 0,
                        radius: 130,
                        links: [5]
                    },

                    /* 5 */
                    {
                        x: 1100,
                        y: 0,
                        radius: 130,
                        links: []
                    },

                    /* 6 */
                    {
                        x: -400,
                        y: -700,
                        radius: 50,
                        links: [11]
                    },

                    /* 7 */
                    {
                        x: 300,
                        y: -700,
                        radius: 86,
                        links: []
                    },

                    /* 8 */
                    {
                        x: 200,
                        y: -500,
                        radius: 2,
                        links: [7]
                    },

                    /* 9 */
                    {
                        x: 500,
                        y: -700,
                        radius: 2,
                        links: [7]
                    },

                    /* 10 */
                    {
                        x: 200,
                        y: -900,
                        radius: 2,
                        links: [7]
                    },

                    /* 11 */
                    {
                        x: -400,
                        y: -300,
                        radius: 45,
                        links: [12]
                    },

                    /* 12 */
                    {
                        x: -600,
                        y: -300,
                        radius: 38,
                        links: [12]
                    }

                ],

                enemies:
                [
                    /* 0 */
                    {
                        motion: "circular",

                        center:
                        {
                            x: 900,
                            y: 0
                        },

                        radius:
                        {
                            x: 0,
                            y: 90
                        },

                        omega: 2,
                        offset: 0
                    },

                    /* 1 */
                    {
                        motion: "circular",

                        center:
                        {
                            x: 1100,
                            y: 0
                        },

                        radius:
                        {
                            x: 0,
                            y: 90
                        },

                        omega: -2,
                        offset: 0
                    },

                    /* 2 */
                    {
                        motion: "linear",

                        center:
                        {
                            x: 240,
                            y: -625
                        },

                        radius:
                        {
                            x: 0,
                            y: 50
                        },

                        omega: 2,
                        offset: 0
                    },

                    /* 3 */
                    {
                        motion: "linear",

                        center:
                        {
                            x: 240,
                            y: -775
                        },

                        radius:
                        {
                            x: 0,
                            y: -50
                        },

                        omega: 2,
                        offset: 0
                    }
                ],

                start: 0,
                finish: 12,

                gold: 20,
                silver: 23,
                bronze: 26
            },

            /* 3 */
            {
                nodes:
                [
                    /* 0 */
                    {
                        x: 0,
                        y: 0,
                        radius: 50,
                        links: [1]
                    },

                    /* 1 */
                    {
                        x: 0,
                        y: -300,
                        radius: 50,
                        links: [2]
                    },

                    /* 2 */
                    {
                        x: -400,
                        y: -300,
                        radius: 37,
                        links: [3]
                    },

                    /* 3 */
                    {
                        x: -600,
                        y: -100,
                        radius: 40,
                        links: [5]
                    },

                    /* 4 */
                    {
                        x: -450,
                        y: -200,
                        radius: 100 * Math.SQRT2,
                        links: []
                    },

                    /* 5 */
                    {
                        x: -600,
                        y: 100,
                        radius: 50,
                        links: []
                    }

                ],

                enemies:
                [
                    /* 0 */
                    {
                        motion: "circular",

                        center:
                        {
                            x: -450,
                            y: -200
                        },

                        radius:
                        {
                            x: 0,
                            y: 110
                        },

                        omega: 2,
                        offset: 0
                    },
                    
                    /* 1 */
                    {
                        motion: "circular",

                        center:
                        {
                            x: -450,
                            y: -200
                        },

                        radius:
                        {
                            x: 0,
                            y: 40
                        },

                        omega: -2,
                        offset: 0
                    }

                ],

                start: 0,
                finish: 5,

                gold: 7.5,
                silver: 9,
                bronze: 12
            }
        ]
    },

    /* 1 */
    {
        name: "On Brick Walls",
        bg: "hixs",
        fg: "triangular",

        levels:
        [
            /* 0 */
            {
                nodes:
                [
                    /* 0 */
                    {
                        x: 0,
                        y: 0,
                        radius: 100,
                        links: [1]
                    },

                    /* 1 */
                    {
                        x: -500,
                        y: 0,
                        radius: 100,
                        links: []
                    }
                ],

                enemies:
                [
                    /* 0 */
                    {
                        motion: "circular",

                        center:
                        {
                            x: -250,
                            y: 0
                        },

                        radius:
                        {
                            x: 0,
                            y: 32
                        },

                        omega: 5,
                        offset: 0
                    }
                ],

                start: 0,
                finish: 1,

                gold: 5,
                silver: 6,
                bronze: 7
            },

            /* 1 */
            {
                nodes:
                [
                    /* 0 */
                    {
                        x: -200,
                        y: 0,
                        radius: 100,
                        links: [1]
                    },

                    /* 1 */
                    {
                        x: 0,
                        y: 0,
                        radius: 150,
                        links: [2]
                    },

                    /* 2 */
                    {
                        x: 200,
                        y: 0,
                        radius: 100,
                        links: []
                    }
                ],

                enemies:
                [
                    /* 0 */
                    {
                        motion: "linear",

                        center:
                        {
                            x: 0,
                            y: 0
                        },

                        radius:
                        {
                            x: 0,
                            y: 115
                        },

                        omega: 2,
                        offset: 0
                    }
                ],

                start: 0,
                finish: 2,

                gold: 2.5,
                silver: 3.25,
                bronze: 4
            },

            /* 2 */
            {
                nodes:
                [
                    /* 0 */
                    {
                        x: 0,
                        y: 0,
                        radius: 150,
                        links: [1]
                    },

                    /* 1 */
                    {
                        x: -600,
                        y: 0,
                        radius: 150,
                        links: [2]
                    },

                    /* 2 */
                    {
                        x: -675,
                        y: 0,
                        radius: 50,
                        links: []
                    }

                ],

                enemies:
                [
                    /* 0 */
                    {
                        motion: "circular",

                        center:
                        {
                            x: -300,
                            y: 0
                        },

                        radius:
                        {
                            x: 0,
                            y: 96
                        },

                        omega: 7,
                        offset: 0
                    },

                    /* 1 */
                    {
                        motion: "circular",

                        center:
                        {
                            x: -300,
                            y: 0
                        },

                        radius:
                        {
                            x: 0,
                            y: 32
                        },

                        omega: 5,
                        offset: Math.PI
                    }
                ],

                start: 0,
                finish: 2,

                gold: 4,
                silver: 6,
                bronze: 10
            },

            /* 3 */
            {
                nodes:
                [
                    /* 0 */
                    {
                        x: 0,
                        y: 0,
                        radius: 50,
                        links: [1]
                    },

                    /* 1 */
                    {
                        x: -125,
                        y: 0,
                        radius: 150,
                        links: [2]
                    },

                    /* 2 */
                    {
                        x: -500,
                        y: 0,
                        radius: 150,
                        links: [3]
                    },

                    /* 3 */
                    {
                        x: -625,
                        y: 0,
                        radius: 50,
                        links: []
                    }

                ],

                enemies:
                [
                    /* 0 */
                    {
                        motion: "linear",

                        center:
                        {
                            x: -125,
                            y: 0
                        },

                        radius:
                        {
                            x: 0,
                            y: 110
                        },

                        omega: 3,
                        offset: Math.PI / 2
                    },

                    /* 1 */
                    {
                        motion: "linear",

                        center:
                        {
                            x: -250,
                            y: 0
                        },

                        radius:
                        {
                            x: 0,
                            y: 110
                        },

                        omega: 3,
                        offset: Math.PI * 3 / 2
                    },


                    /* 2 */
                    {
                        motion: "linear",

                        center:
                        {
                            x: -375,
                            y: 0
                        },

                        radius:
                        {
                            x: 0,
                            y: 110
                        },

                        omega: 3,
                        offset: Math.PI / 2
                    },


                    /* 3 */
                    {
                        motion: "linear",

                        center:
                        {
                            x: -500,
                            y: 0
                        },

                        radius:
                        {
                            x: 0,
                            y: 110
                        },

                        omega: 3,
                        offset: Math.PI * 3 / 2
                    }
                ],

                start: 0,
                finish: 3,

                gold: 5,
                silver: 10,
                bronze: 15
            },

            /* 4 */
            {
                nodes:
                [
                    /* 0 */
                    {
                        x: 0,
                        y: 0,
                        radius: 150,
                        links: [1]
                    },

                    /* 1 */
                    {
                        x: 150,
                        y: 0,
                        radius: 150,
                        links: [2]
                    },

                    /* 2 */
                    {
                        x: 450,
                        y: 0,
                        radius: 150,
                        links: [3]
                    },

                    /* 3 */
                    {
                        x: 650,
                        y: 0,
                        radius: 50,
                        links: []
                    }
                ],

                enemies:
                [
                    /* 0 */
                    {
                        motion: "linear",

                        center:
                        {
                            x: 150,
                            y: 0
                        },

                        radius:
                        {
                            x: 120,
                            y: 0
                        },

                        omega: 1,
                        offset: Math.PI / 2
                    },

                    /* 1 */
                    {
                        motion: "linear",

                        center:
                        {
                            x: 300,
                            y: -100
                        },

                        radius:
                        {
                            x: 120,
                            y: 0
                        },

                        omega: 2,
                        offset: Math.PI * 3 / 2
                    },

                    /* 2 */
                    {
                        motion: "linear",

                        center:
                        {
                            x: 300,
                            y: 100
                        },

                        radius:
                        {
                            x: 120,
                            y: 0
                        },

                        omega: 2,
                        offset: Math.PI * 3 / 2
                    },

                    /* 3 */
                    {
                        motion: "linear",

                        center:
                        {
                            x: 450,
                            y: 0
                        },

                        radius:
                        {
                            x: 120,
                            y: 0
                        },

                        omega: 1,
                        offset: Math.PI / 2
                    }
                ],

                start: 0,
                finish: 3,

                gold: 7,
                silver: 12,
                bronze: 15
            }
        ]
    },

    /* 2 */
    {
        name: "Hexagons",
        bg: "hixs",
        fg: "hex",

        levels:
        [
            /* 0 */
            {
                nodes:
                [
                    /* 0 */
                    {
                        x: -300,
                        y: 75,
                        radius: 50,
                        links: [1]
                    },

                    /* 1 */
                    {
                        x: 0,
                        y: 300,
                        radius: 100,
                        links: [2]
                    },

                    /* 2 */
                    {
                        x: 300,
                        y: 0,
                        radius: 100,
                        links: [3]
                    },

                    /* 3 */
                    {
                        x: 0,
                        y: -300,
                        radius: 100,
                        links: [4]
                    },

                    /* 4 */
                    {
                        x: -300,
                        y: -75,
                        radius: 50,
                        links: []
                    }
                ],

                enemies:
                [
                    /* 0 */
                    {
                        motion: "linear",

                        center:
                        {
                            x: 0,
                            y: 290
                        },

                        radius:
                        {
                            x: 0,
                            y: 60
                        },

                        omega: 3,
                        offset: 0
                    },

                    /* 1 */
                    {
                        motion: "linear",

                        center:
                        {
                            x: 275,
                            y: 0
                        },

                        radius:
                        {
                            x: 60,
                            y: 0
                        },

                        omega: 3,
                        offset: 0
                    },

                    /* 2 */
                    {
                        motion: "linear",

                        center:
                        {
                            x: 0,
                            y: -290
                        },

                        radius:
                        {
                            x: 0,
                            y: 60
                        },

                        omega: 3,
                        offset: 0
                    }
                ],

                start: 0,
                finish: 4,

                gold: 8.5,
                silver: 11,
                bronze: 14
            },

            /* 1 */
            {
                nodes:
                [
                    /* 0 */
                    {
                        x: -350,
                        y: 0,
                        radius: 50,
                        links: [1]
                    },

                    /* 1 */
                    {
                        x: -125,
                        y: 0,
                        radius: 50,
                        links: [2]
                    },

                    /* 2 */
                    {
                        x: 0,
                        y: 0,
                        radius: 200,
                        links: [3]
                    },

                    /* 3 */
                    {
                        x: 125,
                        y: 0,
                        radius: 50,
                        links: [4]
                    },

                    /* 4 */
                    {
                        x: 350,
                        y: 0,
                        radius: 50,
                        links: []
                    }
                ],

                enemies:
                [
                    /* 0 */
                    {
                        motion: "circular",

                        center:
                        {
                            x: 0,
                            y: 0
                        },

                        radius:
                        {
                            x: 150,
                            y: 0
                        },

                        omega: 4,
                        offset: Math.PI / 2
                    },

                    /* 1 */
                    {
                        motion: "linear",

                        center:
                        {
                            x: 0,
                            y: 0
                        },

                        radius:
                        {
                            x: 70,
                            y: 0
                        },

                        omega: 2,
                        offset: 0
                    },

                    /* 2 */
                    {
                        motion: "linear",

                        center:
                        {
                            x: 0,
                            y: 0
                        },

                        radius:
                        {
                            x: 0,
                            y: 70
                        },

                        omega: 2,
                        offset: 0
                    }
                ],

                start: 0,
                finish: 4,

                gold: 6,
                silver: 8,
                bronze: 10
            },

            /* 2 */
            {
                nodes:
                [
                    /* 0 */
                    {
                        x: 0,
                        y: -800,
                        radius: 40,
                        links: [1]
                    },

                    /* 1 */
                    {
                        x: 0,
                        y: -500,
                        radius: 80,
                        links: [2]
                    },

                    /* 2 */
                    {
                        x: 0,
                        y: 0,
                        radius: 500,
                        links: [3]
                    },

                    /* 3 */
                    {
                        x: 0,
                        y: 500,
                        radius: 80,
                        links: [4]
                    },

                    /* 4 */
                    {
                        x: 0,
                        y: 800,
                        radius: 40,
                        links: []
                    }

                ],

                enemies:
                [
                    /* 0 */
                    {
                        motion: "linear",

                        center:
                        {
                            x: 0,
                            y: -300
                        },

                        radius:
                        {
                            x: 360,
                            y: 0
                        },

                        omega: 4,
                        offset: Math.PI
                    },

                    /* 1 */
                    {
                        motion: "linear",

                        center:
                        {
                            x: 0,
                            y: -100
                        },

                        radius:
                        {
                            x: 450,
                            y: 0
                        },

                        omega: 5,
                        offset: 0
                    },

                    /* 2 */
                    {
                        motion: "linear",

                        center:
                        {
                            x: 0,
                            y: 100
                        },

                        radius:
                        {
                            x: 450,
                            y: 0
                        },

                        omega: 5,
                        offset: Math.PI / 2
                    },

                    /* 3 */
                    {
                        motion: "linear",

                        center:
                        {
                            x: 0,
                            y: 300
                        },

                        radius:
                        {
                            x: 360,
                            y: 0
                        },

                        omega: 4,
                        offset: Math.PI * 3 / 2
                    }
                ],

                start: 0,
                finish: 4,

                gold: 9,
                silver: 12,
                bronze: 15
            },

            /* 3 */
            {
                nodes:
                [
                    /* 0 */
                    {
                        x: 50,
                        y: 350,
                        radius: 50,
                        links: [1]
                    },

                    /* 1 */
                    {
                        x: 250,
                        y: 350,
                        radius: 50,
                        links: [2]
                    },

                    /* 2 */
                    {
                        x: 250,
                        y: 300,
                        radius: 100,
                        links: [3]
                    },

                    /* 3 */
                    {
                        x: 350,
                        y: 300,
                        radius: 100,
                        links: [4]
                    },

                    /* 4 */
                    {
                        x: 350,
                        y: 350,
                        radius: 50,
                        links: [5]
                    },

                    /* 5 */
                    {
                        x: 600,
                        y: 350,
                        radius: 50,
                        links: [6]
                    },

                    /* 6 */
                    {
                        x: 600,
                        y: 50,
                        radius: 50,
                        links: [7]
                    },

                    /* 7 */
                    {
                        x: 550,
                        y: 75.5,
                        radius: 75.5,
                        links: [8]
                    },

                    /* 8 */
                    {
                        x: 100,
                        y: 75.5,
                        radius: 75.5,
                        links: [9]
                    },

                    /* 9 */
                    {
                        x: 50,
                        y: 50,
                        radius: 50,
                        links: [10]
                    },

                    /* 10 */
                    {
                        x: 50,
                        y: 200,
                        radius: 50,
                        links: []
                    }
                ],

                enemies:
                [
                    /* 0 */
                    {
                        motion: "circular",

                        center:
                        {
                            x: 250,
                            y: 300
                        },

                        radius:
                        {
                            x: 0,
                            y: 60
                        },

                        omega: 3,
                        offset: 0
                    },

                    /* 1 */
                    {
                        motion: "circular",

                        center:
                        {
                            x: 350,
                            y: 300
                        },

                        radius:
                        {
                            x: 0,
                            y: 60
                        },

                        omega: 3,
                        offset: 0
                    },

                    /* 2 */
                    {
                        motion: "linear",

                        center:
                        {
                            x: 500,
                            y: 75.5
                        },

                        radius:
                        {
                            x: 0,
                            y: 40
                        },

                        omega: 2.5,
                        offset: Math.PI / 2
                    },

                    /* 3 */
                    {
                        motion: "linear",

                        center:
                        {
                            x: 325,
                            y: 75.5
                        },

                        radius:
                        {
                            x: 0,
                            y: 40
                        },

                        omega: 3,
                        offset: Math.PI * 3 / 2
                    },

                    /* 4 */
                    {
                        motion: "linear",

                        center:
                        {
                            x: 150,
                            y: 75.5
                        },

                        radius:
                        {
                            x: 0,
                            y: 40
                        },

                        omega: 2.5,
                        offset: Math.PI / 2
                    }
                ],

                start: 0,
                finish: 10,

                gold: 11,
                silver: 13,
                bronze: 15
            }
        ]
    }
];