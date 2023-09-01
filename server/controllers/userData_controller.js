const express = require("express");
const userDataController = express.Router();
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

userDataController.get("/", async (req, res) => {
  console.log(req.body)
  try {
    const allUsers = await prisma.userdata.findMany({
      orderBy:{user_id:'asc'},
    });
    res.status(200).json(allUsers);
    await prisma.$disconnect()
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
    await prisma.$disconnect()
    process.exit(1)
  }
});

//check username and password(pw) are in the database
//try to fetch like https:localhost:3001/user/login
//have to use post method because get don't take any data from front end
userDataController.post('/login',async (req,res) => {
  const { username } = req.body
  const { password } = req.body
    try {
        const founduser = await prisma.userdata.findMany({
          where: {
            username: username,
            pw:password
          }
        })
        if(founduser.length){
          console.log(founduser)
          res.status(200).json(founduser[0].user_id)
        }else{
          console.log('not found')
          res.status(404).json({
            message: 'User not found'
          })
        }
        await prisma.$disconnect()
    } catch (error) {
        res.states(500).json(error)
        await prisma.$disconnect()
        process.exit(1)
    }
})


//Create new data
//post username and pw in the data object {data:{username:something,pw:something}}
userDataController.post("/", async (req, res) => {
  console.log(req.body)
  const { username } = req.body.data
  const { pw } = req.body.data
  try {
    const allUsers = await prisma.userdata.create({
      data:{
        username:username,
        pw:pw
      }
    });
    res.status(200).json({
      message:'success',
      data: allUsers
    });
    await prisma.$disconnect()
  } catch (error) {
    if (error.code === "P2002") {
      res.status(500).json({
        message:'Please try different User ID'
      });
    }else{
      res.status(500).json(error);
    }
    await prisma.$disconnect()
  }
});

//Edit existing Data
//update username and pw in the data object 
// SET THE user_id in the URL 
// {
//   data:{username:something,pw:something}
//}
userDataController.put("/:user_id", async (req, res) => {
  console.log(req.body)
  try {
    const allUsers = await prisma.userdata.update({
      where:{user_id:req.params.user_id},
      data:req.body.data
    });
    console.log(allUsers);
    res.status(200).json({
      message:'success',
      data: allUsers
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
//delete user and all the gamedata
// SET THE user_id in the URL 
// {
//   data:{username:something,pw:something}
//}
userDataController.delete("/:user_id", async (req, res) => {
  try {
    const deletegame = await prisma.gamedata.deleteMany({
      where:{user_id: req.params.user_id}
    })
      const deleteGameData = await prisma.userdata.delete({
          where:{user_id: req.params.user_id}
      })
      res.status(200).json({
          message: 'success',
          delete: deleteGameData,
          data:deletegame
      });
      await prisma.$disconnect()
  } catch (error) {
      console.log(error);
      res.status(500).json(error);
      await prisma.$disconnect()
      process.exit(1)
  }
})

module.exports = userDataController;