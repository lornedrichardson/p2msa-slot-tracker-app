const express = require("express");
const gameDataController = express.Router();
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


//send the user_id with query like https:localhost:3001/game?user_id=1
gameDataController.get("/", async (req, res) => {
    try {
        const allGameData = await prisma.gamedata.findMany({
            where: {user_id: req.query.user_id},
            orderBy:{session_start:'asc'},
        });
        res.status(200).json(allGameData);
        await prisma.$disconnect()
    } catch (error) {
        res.status(500).json(error);
        await prisma.$disconnect()
        process.exit(1)
    }
});

gameDataController.get("/filters", async (req, res) => {
    const { game_type = '' } = req.query
    console.log(game_type)
    try {
        const allGameData = await prisma.gamedata.findMany({
            where: {
                game_type:game_type
            },
            orderBy:{session_start:'asc'},
        });
        res.status(200).json(allGameData);
        await prisma.$disconnect()
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
        await prisma.$disconnect()
        process.exit(1)
    }
});

//Create new data
//post gamedata inside of the data object {data:{all the data}}
gameDataController.post("/", async (req, res) => {
    console.log(req.body.data)
    try {
        const gameData = await prisma.gamedata.create({
            data: req.body.data
        });
        res.status(200).json({
            message: 'success',
            data: gameData
        });
        await prisma.$disconnect()
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
        await prisma.$disconnect()
        process.exit(1)
    }
});

//Edit existing Data
//update game data inside of the data object
// SET THE session_id in the URL 
// {
//   data:{username:something,pw:something}
//}
gameDataController.put("/:session_id", async (req, res) => {
    try {
        const gameData = await prisma.gamedata.update({
            where: {session_id: req.params.session_id},
            data: req.body.data
        });
        res.status(200).json({
            message: 'success',
            data: gameData
        });
        await prisma.$disconnect()
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
        await prisma.$disconnect()
        process.exit(1)
    }
});

//delete existing Data
//update username and pw in the data object
// SET THE session_id in the URL 
// {
//   data:{username:something,pw:something}
//}
gameDataController.delete("/:session_id", async (req, res) => {
    try {
        const deleteGameData = await prisma.gamedata.delete({
            where:{session_id: req.params.session_id}
        })
        res.status(200).json({
            message: 'success',
            delete: deleteGameData
        });
        await prisma.$disconnect()
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
        await prisma.$disconnect()
        process.exit(1)
    }
})

module.exports = gameDataController