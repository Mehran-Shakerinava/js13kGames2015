"use strict";

var Worlds =
{
	A:
	{
		levels:
		[
			/* 0 */
			{
                bg: "lodyas",
                fg: "triangular",

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

				start: 0,
				finish: 5
			},
			
			/* 1 */
			{
                bg: "hixs",
                fg: "hex",

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

				start: 0,
				finish: 5
			},

			/* 2 */
			{
                bg: "lodyas",
                fg: "triangular",

				nodes:
				[
					/* 0 */
					{
						x: -500,
						y:  500,
						radius: 50,
						links: [1]
					},

					/* 1 */
					{
						x: -700,
						y: -200,
						radius: 40,
						links: [2]
					},

					/* 2 */
					{
						x: -500,
						y: -700,
						radius: 60,
						links: [3]
					},

					/* 3 */
					{
						x: 0,
						y: -700,
						radius: 70,
						links: [4]
					},

					/* 4 */
					{
						x: 0,
						y: -300,
						radius: 70,
						links: [5]
					},

					/* 5 */
					{
						x: -400,
						y: -300,
						radius: 50,
						links: [6]
					},

					/* 6 */
					{
						x: -400,
						y: 0,
						radius: 40,
						links: [7]
					},
					/* 7 */
					{
						x: 300,
						y: 0,
						radius: 45,
						links: [8]
					},
					/* 8 */
					{
						x: 300,
						y: -700,
						radius: 60,
						links: [9]
					},
					/* 9 */
					{
						x: 900,
						y: -700,
						radius: 100,
						links: [10]
					},
					/* 10 */
					{
						x: 900,
						y: 0,
						radius: 60,
						links: [11]
					},
					/* 11 */
					{
						x: 500,
						y: 0,
						radius: 39,
						links: []
					}

				],

				start: 0,
				finish: 11
				
			},
			/* 3 */
			{
                bg: "hixs",
                fg: "hex",
                
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

				start: 0,
				finish: 12
				
			},
			/* 4 */
			{
                bg: "lodyas",
                fg: "triangular",

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
						y: 1000,
						radius: 50,
						links: [8]
					},

					/* 6 */
					{
						x: -500,
						y: 500,
						radius: 100,
						links: [7]
					},
					/* 7 */
					{
						x: -700,
						y: 500,
						radius: 100,
						links: []
					},
					/* 8 */
					{
						x: 1400,
						y: 1000,
						radius: 40,
						links: [9]
					},
					/* 9 */
					{
						x: 2000,
						y: -200,
						radius: 45,
						links: [13]
					},
					/* 10 */
					{
						x: 1690,
						y: 380,
						radius: 100,
						links: [12]
					},
					/* 11 */
					{
						x: 1710,
						y: 420,
						radius: 100,
						links: [12]
					},
					/* 12 */
					{
						x: 1700,
						y: 350,
						radius: 100,
						links: []
					},
					/* 13 */
					{
						x: 2000,
						y: -1200,
						radius: 45,
						links: [17]
					},
					/* 14 */
					{
						x: 2000,
						y: -450,
						radius: 200,
						links: []
					},
					/* 15 */
					{
						x: 2000,
						y: -750,
						radius: 150,
						links: []
					},
					/* 16 */
					{
						x: 2000,
						y: -950,
						radius: 120,
						links: []
					},
					/* 17 */
					{
						x: 1500,
						y: -1200,
						radius: 40,
						links: [18]
					},
					/* 18 */
					{
						x: 1500,
						y: -900,
						radius: 38,
						links: [19]
					},
					/* 19 */
					{
						x: 900,
						y: -500,
						radius: 40,
						links: []
					},
					/* 20 */
					{
						x: 1250,
						y: -650,
						radius: 100,
						links: [21]
					},
					/* 21 */
					{
						x: 1150,
						y: -750,
						radius: 100,
						links: []
					}

				],

				start: 0,
				finish: 19
			}
		]
	},

	B:
	{

	},

	C:
	{

	}
};