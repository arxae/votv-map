// Points of interest
// Graciously joinked from https://github.com/Questwalker/votv-map

import type { Poi } from './types';

export const pois: Poi[] = [
        // Satellites
    {
        Name: "Alpha",
        Description: "Home base, home sweet home",
        Category: "Satellite Dishes",
        Icon: "./icons/a.png",
        IconSize: 27,
        X: 0,
        Y: 0
    },
    {
        Name: "Bravo",
        Category: "Satellite Dishes",
        Icon: "./icons/b.png",
        IconSize: 27,
        X: -100,
        Y: -200
    },
    {
        Name: "Charlie",
        Category: "Satellite Dishes",
        Icon: "./icons/c.png",
        IconSize: 27,
        X: 0,
        Y: -200
    },
    {
        Name: "Delta",
        Category: "Satellite Dishes",
        Icon: "./icons/d.png",
        IconSize: 27,
        X: 100,
        Y: -200
    },
    {
        Name: "Echo",
        Category: "Satellite Dishes",
        Icon: "./icons/e.png",
        IconSize: 27,
        X: 200,
        Y: -100
    },
    {
        Name: "Foxtrot",
        Category: "Satellite Dishes",
        Icon: "./icons/f.png",
        IconSize: 27,
        X: 200,
        Y: 0
    },
    {
        Name: "Golf",
        Category: "Satellite Dishes",
        Icon: "./icons/g.png",
        IconSize: 27,
        X: 200,
        Y: 100
    },
    {
        Name: "Hotel",
        Category: "Satellite Dishes",
        Icon: "./icons/h.png",
        IconSize: 27,
        X: 100,
        Y: 200
    },
    {
        Name: "India",
        Category: "Satellite Dishes",
        Icon: "./icons/i.png",
        IconSize: 27,
        X: 0,
        Y: 200
    },
    {
        Name: "Juliett",
        Category: "Satellite Dishes",
        Icon: "./icons/j.png",
        IconSize: 27,
        X: -100,
        Y: 200
    },
    {
        Name: "Kilo",
        Category: "Satellite Dishes",
        Icon: "./icons/k.png",
        IconSize: 27,
        X: -200,
        Y: 100
    },
    {
        Name: "Lima",
        Category: "Satellite Dishes",
        Icon: "./icons/l.png",
        IconSize: 27,
        X: -200,
        Y: 0
    },
    {
        Name: "Mike",
        Category: "Satellite Dishes",
        Icon: "./icons/m.png",
        IconSize: 27,
        X: -200,
        Y: -100
    },
    {
        Name: "November",
        Category: "Satellite Dishes",
        Icon: "./icons/n.png",
        IconSize: 27,
        X: -300,
        Y: -300
    },
    {
        Name: "Oscar",
        Category: "Satellite Dishes",
        Icon: "./icons/o.png",
        IconSize: 27,
        X: 300,
        Y: -300
    },
    {
        Name: "Papa",
        Category: "Satellite Dishes",
        Icon: "./icons/p.png",
        IconSize: 27,
        X: 300,
        Y: 300
    },
    {
        Name: "Quebec",
        Category: "Satellite Dishes",
        Icon: "./icons/q.png",
        IconSize: 27,
        X: -300,
        Y: 300
    },
    {
        Name: "Romeo",
        Category: "Satellite Dishes",
        Icon: "./icons/r.png",
        IconSize: 27,
        X: -500,
        Y: -500
    },
    {
        Name: "Sierra",
        Category: "Satellite Dishes",
        Icon: "./icons/s.png",
        IconSize: 27,
        X: 0,
        Y: -500
    },
    {
        Name: "Tango",
        Category: "Satellite Dishes",
        Icon: "./icons/t.png",
        IconSize: 27,
        X: 500,
        Y: -500
    },
    {
        Name: "Uniform",
        Category: "Satellite Dishes",
        Icon: "./icons/u.png",
        IconSize: 27,
        X: 500,
        Y: 0
    },
    {
        Name: "Victor",
        Category: "Satellite Dishes",
        Icon: "./icons/v.png",
        IconSize: 27,
        X: 500,
        Y: 500
    },
    {
        Name: "Whiskey",
        Category: "Satellite Dishes",
        Icon: "./icons/w.png",
        IconSize: 27,
        X: 0,
        Y: 500
    },
    {
        Name: "Xray",
        Category: "Satellite Dishes",
        Icon: "./icons/x.png",
        IconSize: 27,
        X: -500,
        Y: 500
    },
    {
        Name: "Yankee",
        Category: "Satellite Dishes",
        Icon: "./icons/y.png",
        IconSize: 27,
        X: -500,
        Y: 0
    },
    {
        Name: "Zulu",
        Description: "Shh...",
        Category: "Satellite Dishes",
        Icon: "./icons/z.png",
        IconSize: 27,
        X: 10000,
        Y: 10000
    },
    // Transformers
    {
        Name: "Power Station",
        Category: "Transformers",
        Icon: "./icons/generator.png",
        IconSize: 32,
        X: 64,
        Y: 64.3
    },
    {
        Name: "Transformer #1",
        Description: "Target with <i>sv.target TF_1</i>.<br>Supplies and explosive items are strewn throughout the building. Inside, you can find some partially-filled gas cans and a toolbox, and you can find a lighter and instructions on how to make molotovs on the desk.",
        Category: "Transformers",
        Icon: "./icons/transformer1.png",
        IconSize: 32,
        X: 396.1,
        Y: 200
    },
    {
        Name: "Transformer #2",
        Description: "Target with <i>sv.target TF_2</i>.<br>Some trash lays around. You can find scrap and some almost-full gas cans inside. There are two benches outside.",
        Category: "Transformers",
        Icon: "./icons/transformer2.png",
        IconSize: 32,
        X: -546,
        Y: 234
    },
    {
        Name: "Transformer #3",
        Description: "Target with <i>sv.target TF_3</i>.<br>Garbage litters the area and the door is boarded up, which forces you to enter with a carefully-placed crouch jump, a crowbar, or by using the vent on the side of the building. A full gas can and some batteries can be found in the supply room, and there's instructions on how to make a cooler under some of the garbage. A cat bed for Maxwell can be found behind a pallet.",
        Category: "Transformers",
        Icon: "./icons/transformer3.png",
        IconSize: 32,
        X: -396.5,
        Y: -480.1
    },
    // CR Towers
    {
        Name: "Coordinate Radar #1",
        Description: "Target with <i>sv.target CR1</i>.",
        Category: "CR",
        Icon: "./icons/cr1.png",
        IconSize: 24,
        X: 103.9,
        Y: 446
    },
    {
        Name: "Coordinate Radar #2",
        Description: "Target with <i>sv.target CR2</i>.",
        Category: "CR",
        Icon: "./icons/cr2.png",
        IconSize: 24,
        X: 540,
        Y: -326.54
    },
    {
        Name: "Coordinate Radar #3",
        Description: "Target with <i>sv.target CR3</i>.",
        Category: "CR",
        Icon: "./icons/cr3.png",
        IconSize: 24,
        X: -624.47,
        Y: -369.8
    },
    // Furfur Totems
    {
        Name: "Furfur Totem",
        RelatedImages: ["./images/furfur1_1.png", "./images/furfur1_2.png"],
        Category: "Furfur Totems",
        Icon: "./icons/furfurA_0.png",
        IconSize: 24,
        X: -671.8,
        Y: -563.7
    },
    {
        Name: "Furfur Totem",
        Description: "Can be dug up around the rocks near the fence.",
        RelatedImages: ["./images/furfur2_1.png"],
        Category: "Furfur Totems",
        Icon: "./icons/furfurA_1.png",
        IconSize: 24,
        X: 253,
        Y: 585.1
    },
    {
        Name: "Furfur Totem",
        Description: "Can be dug up close to the root around 3am. You may need scuba gear to do it.",
        RelatedImages: ["./images/furfur3_1.png"],
        Category: "Furfur Totems",
        Icon: "./icons/furfurA_2.png",
        IconSize: 24,
        X: 391.1,
        Y: -383.7
    },
    // Metal Tiles
    {
        Name: "Metal Tile #1",
        Description: "On the roof above the living quarters, sitting next to the skylight.",
        RelatedImages: ["./images/tile1_1.png", "./images/tile1_2.png"],
        Category: "Metal Tiles",
        Icon: "./icons/metal_tile.png",
        IconSize: 24,
        X: -4.16,
        Y: 9.87
    },
    {
        Name: "Metal Tile #2",
        Description: "On top of the truss of the bridge.",
        RelatedImages: ["./images/tile2_1.png"],
        Category: "Metal Tiles",
        Icon: "./icons/metal_tile.png",
        IconSize: 24,
        X: -69.67,
        Y: -10.9
    },
    {
        Name: "Metal Tile #3",
        Description: "Found at the base of a tree in the wilderness, near TR_2.",
        RelatedImages: ["./images/tile3_1.png", "./images/tile3_2.png"],
        Category: "Metal Tiles",
        Icon: "./icons/metal_tile.png",
        IconSize: 24,
        X: -530.06,
        Y: 306.84
    },
    {
        Name: "Metal Tile #4",
        Description: "Behind the ladder on the third story of CR_3.",
        RelatedImages: ["./images/tile4_1.png", "./images/tile4_2.png"],
        Category: "Metal Tiles",
        Icon: "./icons/metal_tile.png",
        IconSize: 24,
        X: -624.5,
        Y: -371.7
    },
    {
        Name: "Metal Tile #5",
        Description: "Between some rocks behind the hole.",
        RelatedImages: ["./images/tile5_1.png", "./images/tile5_2.png"],
        Category: "Metal Tiles",
        Icon: "./icons/metal_tile.png",
        IconSize: 24,
        X: -658.5,
        Y: -29.9
    },
    {
        Name: "Metal Tile #6",
        Description: "On top of the lightning tower close to Xray.",
        RelatedImages: ["./images/tile6_1.png"],
        Category: "Metal Tiles",
        Icon: "./icons/metal_tile.png",
        IconSize: 24,
        X: -509.8,
        Y: 418.14
    },
    {
        Name: "Metal Tile #7",
        Description: "Found on the ground next to the green locker.",
        RelatedImages: ["./images/tile7_1.png", "./images/tile7_2.png"],
        Category: "Metal Tiles",
        Icon: "./icons/metal_tile.png",
        IconSize: 24,
        X: 616,
        Y: 621
    },
    {
        Name: "Metal Tile #8",
        Description: "Found to the right the server room of Sierra. Once you are near the doors, crouch under the railing and walk around the platform to find it.",
        RelatedImages: ["./images/tile8_1.png", "./images/tile8_2.png"],
        Category: "Metal Tiles",
        Icon: "./icons/metal_tile.png",
        IconSize: 24,
        X: 2.8,
        Y: -499.29
    },
    {
        Name: "Metal Tile #9",
        Description: "Sitting in the top window of the church.",
        RelatedImages: ["./images/tile9_1.png", "./images/tile9_2.png", "./images/tile9_3.png"],
        Category: "Metal Tiles",
        Icon: "./icons/metal_tile.png",
        IconSize: 24,
        X: 654.58,
        Y: -600.4
    },
    // Argemia Plushes
    {
        Name: "Red Argemia",
        Description: "Located in a steep pit next to a donut. Interacting with the donut will teleport you back home.<br>NOTE: The walls of the pit are too steep to allow you to walk out, so you can bring your ATV/a hook into the pit or interact with the donut to get out.",
        RelatedImages: ["./images/redArgemia1_1.png", "./images/redArgemia1_2.png"],
        Category: "Plushes",
        Icon: "./icons/red_argemia.png",
        IconSize: 24,
        X: 626,
        Y: -128
    },
    {
        Name: "Green Argemia",
        Description: "Outside of the fence, located on the top of the mountain",
        RelatedImages: ["./images/greenArgemia1_1.png", "./images/greenArgemia1_2.png", "./images/greenArgemia1_3.png"],
        Category: "Plushes",
        Icon: "./icons/green_argemia.png",
        IconSize: 24,
        X: 239,
        Y: 828
    },
    {
        Name: "Blue Argemia",
        Description: "In the river near quebec.",
        RelatedImages: ["./images/blueArgemia1_1.png"],
        Category: "Plushes",
        Icon: "./icons/blue_argemia.png",
        IconSize: 24,
        X: -309.6,
        Y: 394.1
    },
    {
        Name: "Cyan Argemia",
        Description: "To summon, put exactly 12 shrimp packs in the pool, and then trigger an explosion in the water. A gas can is a good way to create an explosion.",
        RelatedImages: ["./images/cyanArgemia1_1.png"],
        Category: "Plushes",
        Icon: "./icons/cyan_argemia.png",
        IconSize: 24,
        X: -8.5,
        Y: 23.5
    },
    {
        Name: "Magenta Argemia",
        Description: "Spawns after you pick up the lifecrystal signal.",
        RelatedImages: ["./images/magentaArgemia1_1.png"],
        Category: "Plushes",
        Icon: "./icons/magenta_argemia.png",
        IconSize: 24,
        X: 637.5,
        Y: 46.8
    },
    {
        Name: "Yellow Argemia",
        Description: "The yellow Argemia plush requires a ritual to spawn.<br>- First, place a shrimp pack (or multiple) at each corner of the map's fence.<br>- Next, place a shrimp pack on the sewer drain in the basement.<br>- Then, nearing 12:50 at night, stand in a corner of the basement and face away from the shrimp. Around 00:00, a wooshing sound will play, and you can turn to find the argemia summoned. It might take a couple minutes to spawn, so do not turn until you hear it spawn or at least 00:15.<br><br>You can use a clock/watch to help keep track of time. This ritual can be difficult to preform due to cockroaches or Arirals eating the shrimp you've placed.",
        RelatedImages: ["./images/yellowArgemia1_1.png", "./images/yellowArgemia1_2.png"],
        Category: "Plushes",
        Icon: "./icons/yellow_argemia.png",
        IconSize: 24,
        X: -11,
        Y: 23
    },
    {
        Name: "Glowing Blue Argemia",
        Description: "Found on top of an invisible cube in the sky. The item is fixed so only player interaction can move it. You can reach it by climbing the invisible wall with a hook.",
        RelatedImages: ["./images/glowingBlueArgemia1_1.png", "./images/glowingBlueArgemia1_2.png"],
        Category: "Plushes",
        Icon: "./icons/glowing_blue_argemia.png",
        IconSize: 24,
        X: 872,
        Y: -792
    },
    {
        Name: "Glowing Cyan Argemia",
        Description: "Needs to be dug up using a shovel. You can use a metal detector if you're having any trouble finding it. Be careful to not let the plushie roll down the hill.",
        RelatedImages: ["./images/glowingCyanArgemia1_1.png", "./images/glowingCyanArgemia1_2.png", "./images/glowingCyanArgemia1_3.png"],
        Category: "Plushes",
        Icon: "./icons/glowing_cyan_argemia.png",
        IconSize: 24,
        X: -634,
        Y: 181.4
    },
    {
        Name: "Glowing Magenta Argemia",
        Description: "The plush's spawn location is located near the top of the tower. In order for the plush to spawn, something (a piece of trash, a drone, etc.) needs to enter the spawning location's hitbox. The usual method is placing a drone around (35.22, -37.23) and then having the drone fly straight up. You can use a digital map to place the drone accurately.<br>When the plush spawns, it will fall. Make sure to watch the drone's camera and check outside often so you don't miss it.",
        RelatedImages: ["./images/glowingMagentaArgemia1_1.png", "./images/glowingMagentaArgemia1_2.png"],
        Category: "Plushes",
        Icon: "./icons/glowing_magenta_argemia.png",
        IconSize: 24,
        X: 35.22,
        Y: -37.23
    },
    {
        Name: "Antibreather Plush",
        Description: "Appears in the nest in the antibreather cave at 3:33am in-game. In order for it to spawn, you must be in the cave when the time passes. The plush won't disappear, but the plush only spawns in once, so don't lose it.<br>To open the cave, you need to be in the cave entrance when either wolfgang or the antibreather goes through it.",
        RelatedImages: ["./images/antibreatherPlush1_1.png", "./images/antibreatherPlush1_2.png"],
        Category: "Plushes",
        Icon: "./icons/antibreather_plush.png",
        IconSize: 24,
        X: -672.7,
        Y: -567
    },
    {
        Name: "Dream Plush",
        Description: "A rainbow flower teddy bear plush.",
        RelatedImages: ["./images/dreamPlush1_1.png"],
        Category: "Plushes",
        Icon: "./icons/dream_plush.png",
        IconSize: 24,
        X: 353,
        Y: -311.8
    },
    // Points of interest
    {
        Name: "Unknown Rozital Technology",
        Description: "Found situated between two rocks, and will do nothing until you discover a certain signal.",
        RelatedImages: ["./images/rozitalTech1_1.png", "./images/rozitalTech1_2.png", "./images/rozitalTech1_3.png", "./images/rozitalTech1_4.png"],
        Category: "Points of Interest",
        Icon: "./icons/rozital.png",
        IconSize: 24,
        X: 637,
        Y: 44
    },
    {
        Name: "Basalt Pillars",
        Description: "<div style=\"color: red;\">Warning: This could ruin your save</div><br>Can be found with the metal detector. Once dug up, it'll slowly grow out of the ground and start spreading. They will slowly spread in your direction. <u>The pillars have high durability, but they can be destroyed with a crowbar or shovel.</u>",
        RelatedImages: ["./images/basaltPillars1_1.png", "./images/basaltPillars1_2.png"],
        Category: "",
        Icon: "./icons/basalt_pillar.png",
        IconSize: 24,
        X: 465.5,
        Y: -86.1
    },
    {
        Name: "Green Locker",
        Description: "Insert all 9 metal tiles and press the button.",
        RelatedImages: ["./images/greenLocker1_1.png"],
        Category: "Points of Interest",
        Icon: "./icons/green_locker.png",
        IconSize: 24,
        X: 614.8,
        Y: 627.5
    },
    {
        Name: "Old Shack",
        Description: "A dilapidated, old shack sits in the middle of the woods, and inside, a scorch mark stains the smooth dirt ground. From the mark sprouts a vibrant blood-red tree.<br>The air is strong here...",
        Category: "Points of Interest",
        Icon: "./icons/shack.png",
        IconSize: 24,
        X: 408.5,
        Y: 24.3
    },
    // { // disabled as area has changed signifigantly
    //     name: "",
    //     description: "",
    //     related_images: [],
    //     category: "Points of Interest",
    //     icon: "./icons/debug.png",
    //     xPos: 655,
    //     yPos: -618.26
    // },
    {
        Name: "Well",
        RelatedImages: ["./images/well1_1.png"],
        Category: "Points of Interest",
        Icon: "./icons/well.png",
        IconSize: 24,
        X: 564.31,
        Y: 265.66
    },
    {
        Name: "Bunker",
        Category: "Points of Interest",
        Icon: "./icons/bunker.png",
        IconSize: 24,
        X: 60.25,
        Y: 625.5
    },
    {
        Name: "Picnic",
        Description: "Appears on day 8",
        Category: "Points of Interest",
        Icon: "./icons/heater.png",
        IconSize: 24,
        X: -199,
        Y: -483
    },
    {
        Name: "Ariral Campsite",
        Description: "Their new \"home\".",
        Category: "Points of Interest",
        Icon: "./icons/warp_arrow.png",
        IconSize: 24,
        X: 371.69,
        Y: 388.55
    },
    {
        Name: "Gravesite",
        Category: "Points of Interest",
        Icon: "./icons/grave.png",
        IconSize: 24,
        X: -347.4,
        Y: -565.4
    },
    // Chicken Sandwiches
    {
        Name: "Sandwich #1",
        Description: "On top of the servers.",
        RelatedImages: ["./images/sandwich1_1.png"],
        Category: "Chicken Sandwiches",
        Icon: "./icons/chickensandwich.png",
        IconSize: 24,
        X: -8.73,
        Y: 27.75
    },
    {
        Name: "Sandwich #2",
        Description: "Inside the oven.",
        RelatedImages: ["./images/sandwich2_1.png"],
        Category: "Chicken Sandwiches",
        Icon: "./icons/chickensandwich.png",
        IconSize: 24,
        X: -14.6,
        Y: 8.75
    },
    {
        Name: "Sandwich #3",
        Description: "On top of the toilet in the corner.",
        RelatedImages: ["./images/sandwich3_1.png"],
        Category: "Chicken Sandwiches",
        Icon: "./icons/chickensandwich.png",
        IconSize: 24,
        X: -9.45,
        Y: -0.12
    },
    {
        Name: "Sandwich #4",
        Description: "On the radio tower of top of one of the antennas. You can climb the pole with a hook to reach it.<br>Note that the light mounted on top doesn't have a hitbox, so the sandwich and you can fall right through it.",
        RelatedImages: ["./images/sandwich4_1.png"],
        Category: "Chicken Sandwiches",
        Icon: "./icons/chickensandwich.png",
        IconSize: 24,
        X: 22.8,
        Y: -28.4
    },
    {
        Name: "Sandwich #5",
        Description: "Under the basement stairs.",
        RelatedImages: ["./images/sandwich5_1.png"],
        Category: "Chicken Sandwiches",
        Icon: "./icons/chickensandwich.png",
        IconSize: 24,
        X: -20.4,
        Y: 27.2
    },
    {
        Name: "Sandwich #6",
        Description: "On the roof, on top of the air conditioning system and under the small radio tower",
        RelatedImages: ["./images/sandwich6_1.png"],
        Category: "Chicken Sandwiches",
        Icon: "./icons/chickensandwich.png",
        IconSize: 24,
        X: -2.5,
        Y: 27.98
    },
    {
        Name: "Sandwich #7",
        Description: "On top of the Radome.",
        RelatedImages: ["./images/sandwich7_1.png"],
        Category: "Chicken Sandwiches",
        Icon: "./icons/chickensandwich.png",
        IconSize: 24,
        X: -17.04,
        Y: 14.58
    },
    {
        Name: "Sandwich #8",
        Description: "On the roof of the garage.",
        RelatedImages: ["./images/sandwich8_1.png", "./images/sandwich8_2.png"],
        Category: "Chicken Sandwiches",
        Icon: "./icons/chickensandwich.png",
        IconSize: 24,
        X: -19.58,
        Y: 7.39
    },
    {
        Name: "Sandwich #9",
        Description: "On top of one of the stone arches.",
        RelatedImages: ["./images/sandwich9_1.png"],
        Category: "Chicken Sandwiches",
        Icon: "./icons/chickensandwich.png",
        IconSize: 24,
        X: 216,
        Y: 541.1
    },
    {
        Name: "Sandwich #10",
        Description: "Under the bridge near the base.",
        RelatedImages: ["./images/sandwich10_1.png"],
        Category: "Chicken Sandwiches",
        Icon: "./icons/chickensandwich.png",
        IconSize: 24,
        X: -65.16,
        Y: -12.78
    },
    {
        Name: "Sandwich #11",
        Description: "Inside the large log under a bunch of rocks.",
        RelatedImages: ["./images/sandwich11_1.png"],
        Category: "Chicken Sandwiches",
        Icon: "./icons/chickensandwich.png",
        IconSize: 24,
        X: 349.5,
        Y: -344.6
    },
    {
        Name: "Sandwich #12",
        Description: "Under a supply crate in the poly testing area.",
        RelatedImages: ["./images/sandwich12_1.png"],
        Category: "Chicken Sandwiches",
        Icon: "./icons/chickensandwich.png",
        IconSize: 24,
        X: 518,
        Y: -211.65
    },
    {
        Name: "Sandwich #13",
        Description: "Inside the old shack, in a corner under a table.",
        RelatedImages: ["./images/sandwich13_1.png"],
        Category: "Chicken Sandwiches",
        Icon: "./icons/chickensandwich.png",
        IconSize: 24,
        X: 409,
        Y: 24.1
    },
    {
        Name: "Sandwich #14",
        Description: "Behind transformer 2 on the roof. Crammed between the wall and some machinery.",
        RelatedImages: ["./images/sandwich14_1.png"],
        Category: "Chicken Sandwiches",
        Icon: "./icons/chickensandwich.png",
        IconSize: 24,
        X: -549.8,
        Y: 234.58
    },
    {
        Name: "Sandwich #15",
        Description: "Located on the metal walkways that go around Juliett.",
        RelatedImages: ["./images/sandwich15_1.png"],
        Category: "Chicken Sandwiches",
        Icon: "./icons/chickensandwich.png",
        IconSize: 24,
        X: -99.97,
        Y: 203.2
    },
    {
        Name: "Sandwich #16",
        Description: "On the ground under the generator.",
        RelatedImages: ["./images/sandwich16_1.png"],
        Category: "Chicken Sandwiches",
        Icon: "./icons/chickensandwich.png",
        IconSize: 24,
        X: -623.1,
        Y: -25.8
    },
    {
        Name: "Sandwich #17",
        Description: "On the ground outside of the cave.",
        RelatedImages: ["./images/sandwich17_1.png"],
        Category: "Chicken Sandwiches",
        Icon: "./icons/chickensandwich.png",
        IconSize: 24,
        X: -651.1,
        Y: -587.6
    },
    {
        Name: "Sandwich #18",
        Description: "Inside the cave, in the middle of a pile of mushrooms.",
        RelatedImages: ["./images/sandwich18_1.png"],
        Category: "Chicken Sandwiches",
        Icon: "./icons/chickensandwich.png",
        IconSize: 24,
        X: -683.8,
        Y: -582
    },
    {
        Name: "Sandwich #19",
        Description: "On the ground next to the <i>Unknown Rozital Technology</i>.",
        RelatedImages: ["./images/sandwich19_1.png"],
        Category: "Chicken Sandwiches",
        Icon: "./icons/chickensandwich.png",
        IconSize: 24,
        X: 639.2,
        Y: 44
    },
    {
        Name: "Sandwich #20",
        Description: "Needs to be dug up with a shovel. A metal detector can help in finding it.",
        RelatedImages: ["./images/sandwich20_1.png"],
        Category: "Chicken Sandwiches",
        Icon: "./icons/chickensandwich.png",
        IconSize: 24,
        X: 157.1,
        Y: -583.95
    },
    {
        Name: "Sandwich #21",
        Description: "In a group of rocks behind Wiskey.",
        RelatedImages: ["./images/sandwich21_1.png"],
        Category: "Chicken Sandwiches",
        Icon: "./icons/chickensandwich.png",
        IconSize: 24,
        X: 18.07,
        Y: 529.25
    },
    // Skulls
    {
        Name: "Skull",
        Description: "Behind the boxes in the corner of the basement.",
        RelatedImages: ["./images/skull1_1.png"],
        Category: "Skulls",
        Icon: "./icons/skull.png",
        IconSize: 24,
        X: -7.25,
        Y: 19.74
    },
    {
        Name: "Skull",
        Description: "Dug up from under the Unknown Rozital Technology.<br>It can also be dug up while the Technology is still there if you shovel a specific point",
        RelatedImages: ["./images/skull2_1.png", "./images/skull2_2.png"],
        Category: "Skulls",
        Icon: "./icons/skull.png",
        IconSize: 24,
        X: 637.54,
        Y: 44.2
    },
    {
        Name: "Skull",
        Description: "At Stonehenge.",
        RelatedImages: ["./images/skull3_1.png"],
        Category: "Skulls",
        Icon: "./icons/skull.png",
        IconSize: 24,
        X: 212.27,
        Y: 541.1
    },
    {
        Name: "Skull",
        Description: "Inside the gravel circle.",
        RelatedImages: ["./images/skull4_1.png"],
        Category: "Skulls",
        Icon: "./icons/skull.png",
        IconSize: 24,
        X: -352,
        Y: 47.4
    },
    {
        Name: "Skull",
        Description: "Inside the Box of Bones.",
        RelatedImages: ["./images/boneBox1_3.png"],
        Category: "Skulls",
        Icon: "./icons/skull.png",
        IconSize: 24,
        X: 263.6,
        Y: -7.3
    },
    {
        Name: "Skull",
        Description: "Near the radioactive capsule.",
        RelatedImages: ["./images/skull5_1.png"],
        Category: "Skulls",
        Icon: "./icons/skull.png",
        IconSize: 24,
        X: -570,
        Y: 302.76
    },
    {
        Name: "Skull",
        Description: "Inside the cave entrance.",
        RelatedImages: ["./images/skull6_1.png"],
        Category: "Skulls",
        Icon: "./icons/skull.png",
        IconSize: 24,
        X: -655.93,
        Y: -600.3
    },
    // Halloween Pumpkins
    {
        Name: "Pumpkin",
        Description: "Exclusive to the Halloween gamemode.<br><br>On top of the incinerator.",
        RelatedImages: ["./images/pumpkin1_1.png"],
        Category: "Halloween Pumpkins",
        Icon: "./icons/pumpkin.png",
        IconSize: 24,
        X: -21.53,
        Y: 22.07
    },
    {
        Name: "Pumpkin",
        Description: "Exclusive to the Halloween gamemode.<br><br>In front of the cave entrance.",
        RelatedImages: ["./images/pumpkin2_1.png"],
        Category: "Halloween Pumpkins",
        Icon: "./icons/pumpkin.png",
        IconSize: 24,
        X: -651.53,
        Y: -588.92
    },
    {
        Name: "Pumpkin",
        Description: "Exclusive to the Halloween gamemode.<br><br>At the top of the ladder, inside the wind turbine's nacelle.",
        RelatedImages: ["./images/pumpkin3_1.png"],
        Category: "Halloween Pumpkins",
        Icon: "./icons/pumpkin.png",
        IconSize: 24,
        X: 118.4,
        Y: -420.7
    },
    {
        Name: "Pumpkin",
        Description: "Exclusive to the Halloween gamemode.<br><br>On top of the drain leading into the river.",
        RelatedImages: ["./images/pumpkin4_1.png"],
        Category: "Halloween Pumpkins",
        Icon: "./icons/pumpkin.png",
        IconSize: 24,
        X: 671.74,
        Y: -280.42
    },
    {
        Name: "Pumpkin",
        Description: "Exclusive to the Halloween gamemode.<br><br>At the bottom of the smaller lake. Having scuba gear or a hook is recommended to reach it.",
        Category: "Halloween Pumpkins",
        Icon: "./icons/pumpkin.png",
        IconSize: 24,
        X: 394.22,
        Y: -496
    },
    {
        Name: "Pumpkin",
        Description: "Exclusive to the Halloween gamemode.<br><br>On the barrier going over the river.",
        RelatedImages: ["./images/pumpkin6_1.png"],
        Category: "Halloween Pumpkins",
        Icon: "./icons/pumpkin.png",
        IconSize: 24,
        X: 543.1,
        Y: -699.4
    },
    {
        Name: "Pumpkin",
        Description: "Exclusive to the Halloween gamemode.<br><br>Inside the large log under some rocks.",
        RelatedImages: ["./images/pumpkin7_1.png"],
        Category: "Halloween Pumpkins",
        Icon: "./icons/pumpkin.png",
        IconSize: 24,
        X: 349.45,
        Y: -344.64
    },
    {
        Name: "Pumpkin",
        Description: "Exclusive to the Halloween gamemode.<br><br>On the roof of TR_3.",
        RelatedImages: ["./images/pumpkin8_1.png"],
        Category: "Halloween Pumpkins",
        Icon: "./icons/pumpkin.png",
        IconSize: 24,
        X: -400.8,
        Y: -481.9
    },
    {
        Name: "Pumpkin",
        Description: "Exclusive to the Halloween gamemode.<br><br>On top of Stonehenge.",
        RelatedImages: ["./images/pumpkin9_1.png"],
        Category: "Halloween Pumpkins",
        Icon: "./icons/pumpkin.png",
        IconSize: 24,
        X: 210.44,
        Y: 542.5
    },
    {
        Name: "Pumpkin",
        Description: "Exclusive to the Halloween gamemode.<br><br>At the bottom of the well.",
        RelatedImages: ["./images/pumpkin10_1.png"],
        Category: "Halloween Pumpkins",
        Icon: "./icons/pumpkin.png",
        IconSize: 24,
        X: 564.35,
        Y: 265.7
    },
    {
        Name: "Pumpkin",
        Description: "Exclusive to the Halloween gamemode.<br><br>Under the William Statue.",
        RelatedImages: ["./images/pumpkin11_1.png"],
        Category: "Halloween Pumpkins",
        Icon: "./icons/pumpkin.png",
        IconSize: 24,
        X: 12.63,
        Y: 580.9
    },
    {
        Name: "Pumpkin",
        Description: "Exclusive to the Halloween gamemode.<br><br>Outside the construction site cabins.",
        RelatedImages: ["./images/pumpkin12_1.png"],
        Category: "Halloween Pumpkins",
        Icon: "./icons/pumpkin.png",
        IconSize: 24,
        X: -547,
        Y: -56.6
    },
    {
        Name: "Pumpkin",
        Description: "Exclusive to the Halloween gamemode.<br><br>On top of the utility pole's light.",
        RelatedImages: ["./images/pumpkin13_1.png"],
        Category: "Halloween Pumpkins",
        Icon: "./icons/pumpkin.png",
        IconSize: 24,
        X: 173.9,
        Y: 51.96
    },
    // Easter Eggs
    {
        Name: "Easter Egg #1",
        Description: "Exclusive to the Easter holiday.<br><blockquote>\"A cosmic egg, hidden away atop the tower that maps the Star of William\"</blockquote><br>On the top of coordinate radar 1.<br><br>Art the arirals flying amongst the cosmos.",
        RelatedImages: ["./images/easterEgg1_1.png", "./images/easterEgg1_2.png"],
        Category: "Easter Eggs",
        Icon: "./icons/easter_egg1.png",
        IconSize: 24,
        X: 104.36,
        Y: 444.4
    },
    {
        Name: "Easter Egg #2",
        Description: "Exclusive to the Easter holiday.<br><blockquote>\"The egg by friends beyond the stars, found near their home amongst the trees\"</blockquote><br>At the base of a tree close to the Arirals.<br><b>WARNING: Due to a bug, the egg usually gets deleted when the arirals build their treehouse.</b><br><br>Features art of the ariral ships.",
        RelatedImages: ["./images/easterEgg2_1.png", "./images/easterEgg2_2.png"],
        Category: "Easter Eggs",
        Icon: "./icons/easter_egg2.png",
        IconSize: 24,
        X: 358.66,
        Y: 418.47
    },
    {
        Name: "Easter Egg #3",
        Description: "Exclusive to the Easter holiday.<br><blockquote>\"A very funny egg, nestled close to the cave where the Bladehand sleeps\"</blockquote><br>Located to the left of the cave entrance at the foot of a plant.<br><br>Features art of the walking mushroom creature.",
        RelatedImages: ["./images/easterEgg3_1.png", "./images/easterEgg3_2.png"],
        Category: "Easter Eggs",
        Icon: "./icons/easter_egg3.png",
        IconSize: 24,
        X: -667.58,
        Y: -577.89
    },
    {
        Name: "Easter Egg #4",
        Description: "Exclusive to the Easter holiday.<br><blockquote>\"This egg is marked with the rune of the Prince, found within the ancient disaster near His monument\"</blockquote><br>Tucked behind the statue.<br><br>A blue-striped egg, featuring a simple lineup of planets drawn around it.",
        RelatedImages: ["./images/easterEgg4_1.png"],
        Category: "Easter Eggs",
        Icon: "./icons/easter_egg4.png",
        IconSize: 24,
        X: 655,
        Y: -588.22
    },
    {
        Name: "Easter Egg #5",
        Description: "Exclusive to the Easter holiday.<br><blockquote>\"The egg of the nostalgic Early Watcher, under where the Dreaming World is entered\"</blockquote><br>Under the bed in the base.<br><br>A pink-striped egg, with some cute faces on it.",
        RelatedImages: ["./images/easterEgg5_1.png"],
        Category: "Easter Eggs",
        Icon: "./icons/easter_egg5.png",
        IconSize: 24,
        X: -5.92,
        Y: 1.57
    },
    {
        Name: "Easter Egg #6",
        Description: "Exclusive to the Easter holiday.<br><blockquote>\"A fiery egg marked of the Prince, found at the Gateway where this Journey began\"</blockquote><br>Located on the driveway of the checkpoint.<br><br>Features art of orange flowers and a particular bird.",
        RelatedImages: ["./images/easterEgg6_1.png"],
        Category: "Easter Eggs",
        Icon: "./icons/easter_egg6.png",
        IconSize: 24,
        X: -376.93,
        Y: 696.86
    },
    {
        Name: "Easter Egg #7",
        Description: "Exclusive to the Easter holiday.<br><blockquote>\"This wondrous egg, plucked from the Garden, was laid to rest atop the Third Engine of Light\"</blockquote><br>On the roof of transformer 3, sitting atop some machinery.<br><br>A green and white-striped egg.",
        RelatedImages: ["./images/easterEgg7_1.png", "./images/easterEgg7_2.png"],
        Category: "Easter Eggs",
        Icon: "./icons/easter_egg7.png",
        IconSize: 24,
        X: -400.46,
        Y: -478.75
    },
    {
        Name: "Easter Egg #8",
        Description: "Exclusive to the Easter holiday.<br><blockquote>\"An egg marked of the Prince, flesh red with Dreams, stowed where the Construction has commenced\"</blockquote><br>On top of the broken-down excavator near the hole.<br><br>A red and white-striped egg, featuring the Stolas logo.",
        RelatedImages: ["./images/easterEgg8_1.png"],
        Category: "Easter Eggs",
        Icon: "./icons/easter_egg8.png",
        IconSize: 24,
        X: -558.36,
        Y: -41.28
    },
    {
        Name: "Easter Egg #9",
        Description: "Exclusive to the Easter holiday.<br><blockquote>\"An egg born of the Void itself, placed upon the tallest Metallic Flower of the Winds\"</blockquote><br>Inside the wind turbine's nacelle. Note that the egg does not rotate along with the room, so its location may be very slightly different than pictured (just look anywhere around the ladder).<br><br>Features art of space, with the Sun on the bottom and the Earth on the top.",
        RelatedImages: ["./images/easterEgg9_1.png"],
        Category: "Easter Eggs",
        Icon: "./icons/easter_egg9.png",
        IconSize: 24,
        X: 5.85,
        Y: -340.47
    },
    {
        Name: "Easter Egg #10",
        Description: "Exclusive to the Easter holiday.<br><blockquote>\"A rare egg attuned to the Queen of Cheeses, located near where She is buried\"</blockquote><br>Next to a rock uphill of Sierra.<br><br>Features art of Erie in a bunny outfit.",
        RelatedImages: ["./images/easterEgg10_1.png"],
        Category: "Easter Eggs",
        Icon: "./icons/easter_egg10.png",
        IconSize: 24,
        X: 0.33,
        Y: -470.12
    },
    {
        Name: "Easter Egg #11",
        Description: "Exclusive to the Easter holiday.<br><blockquote>\"Egg of the Builders, found near a strange device from another realm\"</blockquote><br>Sitting among a line of rocks.<br><br>Features the classic gray alien face.",
        RelatedImages: ["./images/easterEgg11_1.png", "./images/easterEgg11_2.png"],
        Category: "Easter Eggs",
        Icon: "./icons/easter_egg11.png",
        IconSize: 24,
        X: 651.62,
        Y: 71.67
    },
    {
        Name: "Easter Egg #12",
        Description: "Exclusive to the Easter holiday.<br><blockquote>\"A curious number-adoring egg, hidden at the metallic corners at the edge of the World where South and West meet\"</blockquote><br>In the southwest corner of the fenceline.<br><br>A purple egg with the face of Nubby from the game <i>Nubby's Number Factory</i>.",
        RelatedImages: ["./images/easterEgg12_1.png"],
        Category: "Easter Eggs",
        Icon: "./icons/easter_egg12.png",
        IconSize: 24,
        X: -699.63,
        Y: 699.58
    },
    // Items of Interest
    {
        Name: "Shovel",
        Description: "Found leaning on 3 supply boxes next to stonehenge.",
        RelatedImages: ["./images/shovel1_1.png"],
        Category: "Tools",
        Icon: "./icons/shovel.png",
        IconSize: 24,
        X: 209.2,
        Y: 535.2
    },
    {
        Name: "Shovel",
        Description: "Leaning against the wall, next to the red tree.",
        Category: "Tools",
        Icon: "./icons/shovel.png",
        IconSize: 24,
        X: 408.36,
        Y: 20.95
    },
    {
        Name: "Shovel",
        Description: "Inside the building. You can break the door by hitting it with a crowbar, shovel, etc.",
        RelatedImages: ["./images/shovel3_1.png"],
        Category: "Tools",
        Icon: "./icons/shovel.png",
        IconSize: 24,
        X: -369.12,
        Y: 702.32
    },
    {
        Name: "Shovel",
        Description: "Found up in TR_2.",
        RelatedImages: ["./images/shovel4_1.png"],
        Category: "Tools",
        Icon: "./icons/shovel.png",
        IconSize: 24,
        X: -543.53,
        Y: 237.09
    },
    {
        Name: "Watering Can",
        Description: "Found on a shelf in TR_1.",
        RelatedImages: ["./images/wateringCan1_1.png"],
        Category: "Tools",
        Icon: "./icons/watering_can.png",
        IconSize: 24,
        X: 398.72,
        Y: 197.67
    },
    {
        Name: "Watering Can",
        Description: "Found up in TR_2.",
        RelatedImages: ["./images/wateringCan2_1.png"],
        Category: "Tools",
        Icon: "./icons/watering_can.png",
        IconSize: 24,
        X: -549.13,
        Y: 236.71
    },
    {
        Name: "Watering Can",
        Description: "Found in the corner of TR_3.",
        RelatedImages: ["./images/wateringCan3_1.png"],
        Category: "Tools",
        Icon: "./icons/watering_can.png",
        IconSize: 24,
        X: -402.26,
        Y: -477.54
    },
    {
        Name: "Axe",
        Description: "Inside the abandoned shack under the bed.",
        RelatedImages: ["./images/axe1_1.png"],
        Category: "Tools",
        Icon: "./icons/axe.png",
        IconSize: 24,
        X: 406.5,
        Y: 22.5
    },
    {
        Name: "Cacti",
        Description: "Dug up next to the light post",
        RelatedImages: ["./images/cacti1_1.png"],
        Category: "",
        Icon: "./icons/cacti.png",
        IconSize: 24,
        X: 149.2,
        Y: -10.5
    },
    {
        Name: "Box of Drives",
        Description: "A box containing 8 drives with level 3 signals can be dug up near the pole in the middle of the grassy circle. You won't get any points for selling them, but make sure to check them out on your console at some point :)",
        RelatedImages: ["./images/driveBox1_1.png"],
        Category: "",
        Icon: "./icons/drive_box.png",
        IconSize: 24,
        X: -118.8,
        Y: -42.1
    },
    // { // Inaccessible, again
    //     name: "Drive",
    //     description: "Can be dug up on the gravel between the bunker and the parking lot.",
    //     related_images: [],
    //     category: "",
    //     icon: "./icons/drive.png",
    //     xPos: 16.5,
    //     yPos: 22.4
    // },
    {
        Name: "Box of bones",
        Description: "Can be dug up next to the boulder in the middle of the grassy circle. An old wooden box containing a some bones and a skull. The box is breakable.",
        RelatedImages: ["./images/boneBox1_1.png", "./images/boneBox1_2.png", "./images/boneBox1_3.png"],
        Category: "",
        Icon: "./icons/old_wooden_box.png",
        IconSize: 24,
        X: 263.6,
        Y: -7.3
    },
    {
        Name: "Radioactive Capsule",
        Description: "Located in the middle of a dirt patch with a skeleton reaching out placed next to it. Needs a shovel to get it out of the ground",
        RelatedImages: ["./images/radioactiveCapsule1_1.png", "./images/radioactiveCapsule1_2.png", "./images/radioactiveCapsule1_3.png"],
        Category: "",
        Icon: "./icons/radioactive_canister.png",
        IconSize: 24,
        X: -569.5,
        Y: 303.3
    },
    {
        Name: "EMF Detector",
        Description: "Buried close to a floodlight. Toggle on with right click while holding. 5 lights on it indicate how strong the emf is. Example locations for strong EMF is the basement, stonehenge, and the old shack.",
        RelatedImages: ["./images/emfDetector1_1.png"],
        Category: "Tools",
        Icon: "./icons/emf_detector.png",
        IconSize: 24,
        X: -623,
        Y: -33.8
    },
    {
        Name: "Pickaxe",
        Description: "Stuck in the ground next to a underwater root. You may need scuba gear to reach it.",
        Category: "Tools",
        Icon: "./icons/pickaxe.png",
        IconSize: 24,
        X: 391.6,
        Y: -384.3
    },
    {
        Name: "Geiger Counter",
        Description: "A tool for detecting radiation.",
        Category: "Tools",
        Icon: "./icons/geiger_counter.png",
        IconSize: 24,
        X: 62.9,
        Y: 627.77
    },
    {
        Name: "Gravity Gun",
        Description: "Spawns once you catch a certain signal.",
        Category: "Tools",
        Icon: "./icons/gravgun.png",
        IconSize: 24,
        X: -651.9,
        Y: -236.7
    },
    {
        Name: "Candle Holder",
        Description: "An old style candle holder you can dig up from inside a log. It is a Youtuber easter egg created in reference to the Youtuber <a href=\"https://www.youtube.com/channel/UCnCmb1vpv90EeSX5g7K4UYQ\" target=\"_blank\" rel=\"noopener noreferrer\">The Librarian</a>. You can light it with a lighter!",
        Category: "",
        Icon: "./icons/candle.png",
        IconSize: 24,
        X: 378.5,
        Y: -461
    },
    {
        Name: "Argemia Mug",
        Description: "Located on top of the utility pole, a basic white mug with a portrait of Argemia Armuntela on the side. The item is fixed so only player interaction can move it. You can use a hook to climb the pole.",
        RelatedImages: ["./images/argemug1_1.png"],
        Category: "",
        Icon: "./icons/argemug.png",
        IconSize: 24,
        X: -62.2,
        Y: -304.58
    },
    {
        Name: "Fishing Supplies",
        Description: "Needs to be dug up with a shovel.<br>Located to the right of the wind turbine, an old box containing some fishing rod parts and some bait. Put all the fishing rod parts together on a workbench to create a fishing rod.<br>Note that this digging spot requires more precision compared to other buried objects.",
        RelatedImages: ["./images/fishingSupplies1_1.png"],
        Category: "Tools",
        Icon: "./icons/fishermans_box.png",
        IconSize: 24,
        X: 176,
        Y: -460.46
    },
    {
        Name: "Bike Helmet",
        Description: "The bike helmet protects your head, which can decrease your damage taken from impacts. You can reach it by climbing up or grappling down the cliff using a hook, or by very carefully sliding down.",
        RelatedImages: ["./images/helmet1_1.png", "./images/helmet1_2.png", "./images/helmet1_3.png"],
        Category: "Tools",
        Icon: "./icons/helmet.png",
        IconSize: 24,
        X: -50.6,
        Y: 630
    },
    {
        Name: "Hiking Boots",
        Description: "Found in the corner of TR_3.<br>Wearing them allows you to walk up steeper surfaces without slipping and allows you to fall farther distances without collapsing or taking damage.",
        RelatedImages: ["./images/hikingBoots1_1.png"],
        Category: "Tools",
        Icon: "./icons/hiking_boots.png",
        IconSize: 24,
        X: -402.4,
        Y: -478.67
    },
    {
        Name: "MRE Barrel",
        Description: "Inside an upright log in the river. Has 38 MREs in it.",
        Category: "",
        Icon: "./icons/barrel.png",
        IconSize: 24,
        X: 233.36,
        Y: -329.2
    },
    {
        Name: "Jackets",
        Description: "Two jackets, equippable on Omega Kerfur.",
        Category: "KerfurO Accessories",
        Icon: "./icons/jacket.png",
        IconSize: 24,
        X: -622.3,
        Y: -30
    },
    {
        Name: "Bowties",
        Description: "Two bowties, equippable on Omega Kerfur.",
        Category: "KerfurO Accessories",
        Icon: "./icons/bowtie.png",
        IconSize: 24,
        X: 518.7,
        Y: -212.8
    },
    {
        Name: "Large Glasses",
        Description: "Two large pairs of glasses, equippable on Omega Kerfur.",
        Category: "KerfurO Accessories",
        Icon: "./icons/kerf_glasses.png",
        IconSize: 24,
        X: 61.39,
        Y: 625.86
    },
    {
        Name: "Badge",
        Description: "Two badges, equippable on Omega Kerfur.",
        Category: "KerfurO Accessories",
        Icon: "./icons/badge.png",
        IconSize: 24,
        X: -621.15,
        Y: -28.2
    },
    {
        Name: "Maid Outfit",
        Description: "It's a maid outfit. Located in a safe that can be dug up near the lightpost. Omega Kerfur can wear it, or you can.<br>Be careful to not stand on where the safe is while you are digging it up, or you might get stuck in it.",
        RelatedImages: ["./images/maidOutfit1_1.png", "./images/maidOutfit1_2.png"],
        Category: "KerfurO Accessories",
        Icon: "./icons/maid_outfit.png",
        IconSize: 24,
        X: -357.4,
        Y: -488.95
    },
    {
        Name: "Jar of honey",
        Description: "A jar of honey. On top of the utility pole, restores 10 food and 100 health on consumption.",
        Category: "",
        Icon: "./icons/jar_of_honey.png",
        IconSize: 24,
        X: -352.5,
        Y: -438.7
    },
    {
        Name: "Massive Limestone Cube",
        Description: "A diggable Massive Limestone Cube",
        Category: "",
        Icon: "./icons/limestone_block.png",
        IconSize: 24,
        X: 566.74,
        Y: 236.66
    },
    {
        Name: "Wasp Nest",
        Description: "A diggable Wasp Nest",
        Category: "",
        Icon: "./icons/wasp_nest.png",
        IconSize: 24,
        X: 420.7,
        Y: 266.3
    },
    {
        Name: "Thingy Seeds",
        Description: "Seeds for growing a special type of plant.",
        RelatedImages: ["./images/thingySeeds1_1.png", "./images/thingySeeds1_2.png"],
        Category: "",
        Icon: "./icons/thingy_seeds.png",
        IconSize: 24,
        X: 411.9,
        Y: 25.6
    },
    {
        Name: "Car Battery Charger",
        Description: "Found on top of the workbench in the side room.<br><br>To use it, plug it into a nearby outlet, and then grab a car battery (you can extract it from your ATV with a wrench).<br>When you bring a car battery close, the charger will automatically connect to it and start charging it. Make sure the correct color clamps are connected to the correct color contacts, otherwise it'll spark and eventually explode. (Rotate the battery to change what contacts the battery charger connects to)",
        Category: "Tools",
        Icon: "./icons/carbatterycharger.png",
        IconSize: 24,
        X: -550.11,
        Y: 235.97
    },
    // Blueprints
    {
        Name: "Radioactive Capsule Blueprint",
        Description: "A blueprint for making radioactive capsules. Including it on the bench along with 4 Compressed radioactive material, 4 Metal Scrap, and a gas welder allows you to craft a radioactive capsule.",
        Category: "",
        Icon: "./icons/blueprint.png",
        IconSize: 24,
        X: 62.45,
        Y: 627.27
    },
    // KerfurO parts
    {
        Name: "Limb Joints",
        Description: "Found in TR_1. In the office, inside a bucket.",
        RelatedImages: ["./images/limbJoints1_1.png"],
        Category: "KerfurO Parts",
        Icon: "./icons/limb_joint.png",
        IconSize: 24,
        X: 390.47,
        Y: 198.27
    },
    {
        Name: "Limb Joints",
        Description: "Found in TR_2. In the office, on a box under a workbench.",
        RelatedImages: ["./images/limbJoints2_1.png"],
        Category: "KerfurO Parts",
        Icon: "./icons/limb_joint.png",
        IconSize: 24,
        X: -550.22,
        Y: 235.5
    },
    {
        Name: "Limb Joints",
        Description: "Found in TR_3. In the office corner on the shelf.",
        RelatedImages: ["./images/limbJoints3_1.png"],
        Category: "KerfurO Parts",
        Icon: "./icons/limb_joint.png",
        IconSize: 24,
        X: -400.55,
        Y: -477.15
    },
    {
        Name: "Buried Kerfur Parts",
        Description: "Contains two ball joints.",
        Category: "KerfurO Parts",
        Icon: "./icons/old_wooden_box.png",
        IconSize: 24,
        X: -541.07,
        Y: -475.35
    },
    {
        Name: "Buried Kerfur Parts",
        Description: "Contains two ball joints.",
        Category: "KerfurO Parts",
        Icon: "./icons/old_wooden_box.png",
        IconSize: 24,
        X: -529.78,
        Y: -462.75
    },
    {
        Name: "Buried Kerfur Parts",
        Description: "Contains two ball joints.",
        Category: "KerfurO Parts",
        Icon: "./icons/old_wooden_box.png",
        IconSize: 24,
        X: -532.58,
        Y: -481.11
    },
    {
        Name: "Buried Kerfur Parts",
        Description: "Contains two ball joints.",
        Category: "KerfurO Parts",
        Icon: "./icons/old_wooden_box.png",
        IconSize: 24,
        X: -524.08,
        Y: -471.09
    },
    {
        Name: "Buried Kerfur Parts",
        Description: "Contains two ball joints.",
        Category: "KerfurO Parts",
        Icon: "./icons/old_wooden_box.png",
        IconSize: 24,
        X: -531.98,
        Y: -472.44
    },
    {
        Name: "Buried Kerfur Parts",
        Description: "Contains two ball joints.",
        Category: "KerfurO Parts",
        Icon: "./icons/old_wooden_box.png",
        IconSize: 24,
        X: -524.14,
        Y: -479.11
    },
    {
        Name: "Omega AI Module",
        Description: "Located in a safe found at the bottom of the lake, it's quite hard to get it out of the water.<br><br>Cracking the safe is easy.<br>First, grab onto the safe's door and start turning your scroll wheel in a direction. Go slowly as your mouse wheel can go. As you spin the dial, you will hear clicking. Once you hear a click that is very slightly different, reverse the direction you are scrolling and start spinning in the opposite direction. Continue going back and forth, reversing your scrolling until the safe unlocks.",
        Category: "KerfurO Parts",
        Icon: "./icons/omega_ai_module.png",
        IconSize: 24,
        X: 404.8,
        Y: -406
    },
    // Notes
    {
        Name: "Note",
        Description: "<blockquote>\"password: 1111\"</blockquote>",
        Category: "Notes",
        Icon: "./icons/paperBrown.png",
        IconSize: 24,
        X: 1.43,
        Y: 5.49
    },
    {
        Name: "Note",
        Description: "<blockquote>\"1234 pass\"</blockquote>The password for the admin room.",
        Category: "Notes",
        Icon: "./icons/paperBrown.png",
        IconSize: 24,
        X: -15.28,
        Y: 11.9
    },
    {
        Name: "Note",
        Description: "<blockquote>\"Do not enter\"</blockquote>",
        Category: "Notes",
        Icon: "./icons/paperBrown.png",
        IconSize: 24,
        X: 20.35,
        Y: 23.32
    },
    {
        Name: "Note",
        Description: "Inside a basement locker with some rocks.<blockquote>\"tools to break the boxes with\"</blockquote>",
        Category: "Notes",
        Icon: "./icons/paperBrown.png",
        IconSize: 24,
        X: -14.94,
        Y: 19.38
    },
    {
        Name: "Note",
        Description: "Attached to the face of the drive eraser.<blockquote>\"This machine erases the data from the drive.<br>Insert the drive into the drive slot, press the button, wait a few minutes, then take the empty drive.\"</blockquote>",
        Category: "Notes",
        Icon: "./icons/paperBrown.png",
        IconSize: 24,
        X: 1.27,
        Y: 11.76
    },
    {
        Name: "Note",
        Description: "<blockquote>\"ATV maintenance:<br><br>You must keep the ATV at the maximum efficiancy, this is the quick recap of what you should and should not to do.<br><br>1) The Fuel<br>You must refuel your ATV if you don't want to get stuck in the middle of nowhere.<br><br>2) The Battery<br>The battry drains whenever you use the functions of the atv such as turbo of lights, do not forget to turn them off if youre not using them.<br><br>3) Wheels<br>Keep an eye on the wheels and keep them in the good state, otherwise they will break apart and need a replacement. Use the wrench to detach the wheels and fix them by using the tools you can find.<br><br>4) Cleaning<br>Keep your ATV clean and nice. Use the sponge or any other cleaning tools and scrub the dirt away. To clean the wheels they should be detached first.\"</blockquote>",
        Category: "Notes",
        Icon: "./icons/paperBrown.png",
        IconSize: 24,
        X: -23.1,
        Y: 9.8
    },
    {
        Name: "Note",
        Description: "Attached to the face of the tape machine.<blockquote>\"Tapes are a cruicial part of the daily task! You must send a both tapes every day to complete the daily task.<br>Make sure they are both full of data!\"</blockquote>",
        Category: "Notes",
        Icon: "./icons/paperBrown.png",
        IconSize: 24,
        X: 0,
        Y: 23.76
    },
    {
        Name: "Note",
        Description: "Attached to the wall next to the drone panel.<blockquote>Drone can be used to send off the daily task items and sell items for points.<br><br>Open the Delivery Drone Access Panel, then use the keyboard to call or send the drone.<br>Put items in the drone sack, then use the keyboard again to send off the drone.<br><br>To put items in the sack - you can use it as a normal container, for big items like the drive box - hold Shift and LMB on the sack to put the item into the container.</blockquote>",
        Category: "Notes",
        Icon: "./icons/paperBrown.png",
        IconSize: 24,
        X: -24,
        Y: 2.47
    },
    {
        Name: "Note",
        Description: "Attached to the face of the console.<blockquote>You can do sv.target with different types of objects such as:<br>ATV - atv, car, vehicle<br>Coordinate radars - cr1, cr2, cr3<br>Alpha Base - base, home<br>Different satellites by their name<br>Misc objects</blockquote>",
        Category: "Notes",
        Icon: "./icons/paperBrown.png",
        IconSize: 24,
        X: 1.13,
        Y: 25.57
    },
    {
        Name: "Note",
        Description: "<blockquote>\"23:11<br>Taking a note for whoever reading this, saw that one figure standing next to the concrete pole. Could not get a good look, my eyes were blurry from the lack of sleep, maybe hallucination who knows. Keep your eye on this.<br><br>Update 8:40<br>Came out investigating the place, saw footprints at the exact same place where the figure was last night.<br><br>Update 17:09<br>i do not feel safe here i want to leave\"</blockquote>",
        Category: "Notes",
        Icon: "./icons/paperBrown.png",
        IconSize: 24,
        X: -1.9,
        Y: 27.06
    },
    {
        Name: "Note",
        Description: "<blockquote>\"...do-it-yourself kinda thing...<br><br>...green crystals, a couple of them...<br><br>...your hands on welding apparatus...\"</blockquote>",
        Category: "Notes",
        Icon: "./icons/paperWhite.png",
        IconSize: 24,
        X: 61.56,
        Y: 623.33
    },
    {
        Name: "Note",
        Description: "<blockquote>\"Ich habe keine Familie oder Freunde, also niemanden, der bereit wäre, an einem solchen Leben teilzunehmen, also wer auch immer das ist. Ich übertrage Ihnen das Eigentum an meiner wertvollen Ausrüstung. Sie finden es möglicherweise bei 175:-460. Viel Glück.<br><br>Ludwig Handschuch.\"</blockquote>This note describes the fishing box at x: 176, y: -460.46.",
        Category: "Notes",
        Icon: "./icons/paperBrown.png",
        IconSize: 24,
        X: 58.36,
        Y: 627.51
    },
    {
        Name: "Note",
        Description: "<blockquote>\"Day 41<br><br>We finally got more financial support for out mission<br>We can get deeper this time.<br><br>But today i noticed something interesting, the hole made one deep bassy sound.<br>Couldnt record it and i dont know if it was naturally made sound, but it sounds like really deep metal squeek<br><br>This hole is pretty weird\"</blockquote>",
        Category: "Notes",
        Icon: "./icons/paperBrown.png",
        IconSize: 24,
        X: -622.15,
        Y: -30.43
    },
    {
        Name: "Note",
        Description: "<blockquote>\"Day 14<br><br>Is this thing infinite? I dont know! It keeps going down and down and down we have no rope already!<br>At least these yellow metal walls have ridges on them so we dont have to climb on dry ass concrete walls.<br><br>We dont give up, we are going down for answers.\"</blockquote>",
        Category: "Notes",
        Icon: "./icons/paperBrown.png",
        IconSize: 24,
        X: -351.5,
        Y: 46.9
    },
    {
        Name: "Note",
        Description: "<blockquote>\"...and do NOT forget the coolers! They are quite expensive so i found a way how to assemble them by yourself...<br><br>...and you will need: 2 accumulators, 4 metal parts and 4 sets of electronics...<br><br>...scrap of metal, you can find some for gpus...<br><br>...you will figure out how to assemble...<br><br>...metal scrap as slot...\"</blockquote>",
        Category: "Notes",
        Icon: "./icons/paperBrown.png",
        IconSize: 24,
        X: -394.4,
        Y: -482.27
    },
    {
        Name: "Note",
        Description: "<blockquote>\"Diaboli campestribus<br><br>Redi ad unde venistis<br><br>Noli redire, et huius loci obliviscere<br><br>Non hic es receptus<br><br>Diaboli campestribus\"</blockquote>",
        Category: "Notes",
        Icon: "./icons/paperBrown.png",
        IconSize: 24,
        X: 213.44,
        Y: 541.83
    },
    {
        Name: "Note",
        Description: "There are 3 pieces of paper here, stacked on top of eachother:<blockquote>\"...pour gasoline in an empty bottle, 2 pieces of paper...<br><br>...craft...<br><br>...enough damage...<br><br>...collapsed into pieces...<br><br>...more this night, they keep...\"</blockquote><br>Paper 2:<blockquote>\"...from the ground, like an undead!<br><br>It was chasing me all the way up to the booth, tried to lock...<br><br>...bones, glowing eye, making weird ungodly sounds...\"</blockquote><br>Paper 3:<blockquote>\"...hammer, this thing does not care! The bite felt like a hydraulic press, kicked its leg...<br><br>...and they keep the money, this is a cursed place, no wonder they drop less and less people...<br><br>...the fence, i do not care if they shoot me from these towers, the forest is dense enough...\"</blockquote>",
        Category: "Notes",
        Icon: "./icons/paperBrown.png",
        IconSize: 24,
        X: 390.5,
        Y: 201.7
    },
    {
        Name: "Note",
        Description: "<blockquote>\"WIP<br>New trees test polygon<br>Take some food\"</blockquote>",
        Category: "Notes",
        Icon: "./icons/paperBrown.png",
        IconSize: 24,
        X: 517.5,
        Y: -212.6
    },
    {
        Name: "Notebook",
        Description: "<blockquote>IT\"S RAINING FLESH<br>IT\"S RAINING FLESH<br>IT\"S RAINING FLESH<br>IT\"S RAINING FLESH<br>IT\"S RAINING FLESH<br>IT\"S RAINING FLESH<br>IT\"S RAINING FLESH<br>IT\"S RAINING FLESH<br>IT\"S RAINING FLESH<br>IT\"S RAINING FLESH<br>IT\"S RAINING FLESH<br>IT\"S RAINING FLESH<br>IT\"S RAINING FLESH<br>IT\"S RAINING FLESH<br>IT\"S RAINING FLESH<br>IT\"S RAINING FLESH<br>IT\"S RAINING FLESH<br>IT\"S RAINING FLESH<br>IT\"S RAINING FLESH<br>IT\"S RAINING FLESH<br>IT\"S RAINING FLESH<br>IT\"S RAINING FLESH<br>IT\"S RAINING FLESH</blockquote>",
        Category: "Notes",
        Icon: "./icons/notebook.png",
        IconSize: 24,
        X: 774.79,
        Y: -478.15
    },
    {
        Name: "Note",
        Description: "<blockquote>if you hear music in a forest - run</blockquote>",
        Category: "Notes",
        Icon: "./icons/paperBrown.png",
        IconSize: 24,
        X: 388.44,
        Y: 531.22
    },
    {
        Name: "Notebook",
        Description: "<blockquote>...this shit is ridiculous, we told you pack everything and leave ASAP, but you would not do...<br><br>..and buy as much [gas] as possible, you got it? It is easier to get and we do not have much time, use [bottles] to pour the right amount. After all it is...</blockquote><br><blockquote>...metal pipe, look in the [metal] pile under my workstation, you should find something as a tube substitute, and make...</blockquote><br><blockquote>..seal with [plastic], look at the scrap pile again, right next to my table in the workshop...<br><br>...improve, by [gluing] together an [electronic] part to the tube, fix it with [plastic], and strap it to the tube...</blockquote><br><blockquote>...NOT a joke alright? I hope this piece will reach your destination, best of...</blockquote>",
        Category: "Notes",
        Icon: "./icons/notebook.png",
        IconSize: 24,
        X: 526.93,
        Y: -699.31
    },
    {
        Name: "Note",
        Description: "<blockquote>68454731694g766s6o74306i46334764686649776t75437b6q704932695n49306e4x437b504s73326o446536504j4761504w47324675726f68454731694t766r684j737s504g59646p44646r68454731694j766w6c74306s4644397n6f4s49776c75437o6p704932695e49306s4g437o504r73326f446536504x4761504f6t676n6649776f75437s6d704932695o49306n4j437s504f73326p446536504s4761504i55326s4f7o6r68454731694j766w6c74306s6o4j4931694s49776c75437o6p704932695e49746t745135504f73326p446536504r6j35694s49306b4t437n504i73326t446536504g4761504s4q63694j586w68454731694g766s6o74306i6t4g4931694o49776o75437e6u704932695b49766o33546r68454731694j766w6c74306s6o4j4931694s49776c75437o6p704932695e49716t754979504f73326p446536504s4761504j59646t44646f68454731694t766r6f74306w477547706d5o49776o75437e6u7049766d44646s6o4j4931694s49776c75437o6p704932695e496x69326530504f73326p446536504s4761504j59646t44646f68454731694t766r6f74306w684g5567504s73326o446536504j4761504x59646c44646s68454731694s766i6t74306f46334764686649776p75437n6g704932695s49306b4t437n504i73326t446536504g4761504s47324675726r68454731694j766w684g737o504s59646f44646w68454731694g766s6o74306i4644397s6c4o49776o75437e6u704932695b49306o4s437e504w73326c446536504t4761504r6j676s6649776c75437o6p704932695e49306s4g437o504r73326f446536504x4761504f55326o4r7e6w68454731694g766s6o74306i6t4g4931694o49776o75437e6u704932695b49746p745135504r73326f446536504w6g35694o49306n4j437s504f73326p446536504s4761504i4v63694g586s68454731694s766i6t74306f6p4s4931694e49776t75437b6q704932695n49766e33546w68454731694g766s6o74306i6t4g4931694o49776o75437e6u704932695b49716p754979504r73326f446536504x4761504g59646p44646r68454731694j766w6c74306s477547706p5e49776t75437b6q7049766p44646i6t4g4931694o49776o75437e6u704932695b496t69326530504r73326f446536504x4761504g59646p44646r68454731694j766w6c74306s684s5567504i73326t446536504g4761504t59646o44646i68454731694x766f6p74306r46334764686649776f75437s6d704932695o49306n4j437s504f73326p446536504s4761504i47324675726w68454731694g766s684s737e504x59646c44646s68454731694s766i6t74306f4644397o6o4e49776t75437b6q704932695n49306e4x437b504s73326o446536504j4761504w6g676o6649776o75437e6u704932695b49306o4s437e504w73326c446536504t4761504r55326e4w7b6s68454731694s766i6t74306f6p4s4931694e49776t75437b6q704932695n49746f745135504w73326c446536504s6s35694e49306s4g437o504r73326f446536504x4761504f4r63694s586i68454731694x766f6p74306r6f4x4931694b49776p75437n6g704932695s49766b33546s68454731694s766i6t74306f6p4s4931694e49776t75437b6q704932695n49716f754979504w73326c446536504t4761504s59646f44646w68454731694g766s6o74306i477547706u5b49776p75437n6g7049766u44646f6p4s4931694e49776t75437b6q704932695n496j69326530504w73326c446536504t4761504s59646f44646w68454731694g766s6o74306i684x5567504f73326p446536504s4761504j59646t44646f68454731694t766r6f74306w46334764686649776c75437o6p704932695e49306s4g437o504r73326f446536504x4761504f47324675726s68454731694s766i684x737b504t59646o44646i68454731694x766f6p74306r4644397e6t4b49776p75437n6g704932695s49306b4t437n504i73326t446536504g4761504s6s676e6649776t75437b6q704932695n49306e4x437b504s73326o446536504j4761504w55326b4s7n6i68454731694x766f6p74306r6f4x4931694b49776p75437n6g704932695s49746c745135504s73326o446536504i6x35694b49306o4s437e504w73326c446536504t4761504r4h63694x586f68454731694t766r6f74306w6c4t4931694n49776f75437s6d704932695o49766n33546i68454731694x766f6p74306r6f4x4931694b49776p75437n6g704932695s49716c754979504s73326o446536504j4761504x59646c44646s68454731694s766i6t74306f477547706q5n49776f75437s6d7049766q44646r6f4x4931694b49776p75437n6g704932695s496g69326530504s73326o446536504j4761504x59646c44646s68454731694s766i6t74306f684t5567504r73326f446536504x4761504g59646p44646r68454731694j766w6c74306s46334764686649776o75437e6u704932695b49306o4s437e504w73326c446536504t4761504r47324675726i68454731694x766f684t737n504j59646t44646f68454731694t766r6f74306w4644397b6p4n49776f75437s6d704932695o49306n4j437s504f73326p446536504s4761504i6x676b6649776p75437n6g704932695s49306b4t437n5048</blockquote>",
        Category: "Notes",
        Icon: "./icons/paperWhite.png",
        IconSize: 24,
        X: -1908.67,
        Y: 1731.12
    },
    {
        Name: "Notebook",
        Description: "<blockquote>DO NOT OPEN<br>BEES INSIDE</blockquote>",
        Category: "Notes",
        Icon: "./icons/paperBrown.png",
        IconSize: 24,
        X: 539.03,
        Y: -329.13
    },
    {
        Name: "Notebook",
        Description: "<blockquote>Electrical engineering | Vol2<br>139. =======================<br><br><br>...fixed, or in case of the emergency - assembled using whatever is available.<br><br><br>==============<br>- Copper wire<br>- Metal scrap<br>- Glass scrap<br>- Electric scrap<br>==============<br><br><br>Must be noted that....</blockquote>",
        Category: "Notes",
        Icon: "./icons/paperBrown.png",
        IconSize: 24,
        X: 538.1,
        Y: -329.02
    },
];
