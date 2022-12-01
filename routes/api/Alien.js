const express = require("express");
const router = express.Router();
const Alien = require("../../models/Alien");/*Alien Schema*/
const Auth = require("../../auth_middleware/auth");

/*
All the API have beenn provided by the middlewares and a JWT Authentication is used
As the alien doesnt know what JWT is 

Here's the documentation link
https://jwt.io/
*/

/*
METHOD : POST
API ENDPOINT : /api/alien/
DESCRIPTION : This API endpoint helps us in the profile building for the alien
*/

router.post("/", Auth, async (req, res) => {
  try {
    const { Name, Age, nativePlanet, Weight, Height, Language } = req.body;
    const alien = new Alien({
      Name,
      Age,
      nativePlanet,
      Weight,
      Height,
      Language,
    });
    await alien.save();
    res.json({ alien });
  } catch (error) {
    console.log(error);
  }
});

/*
METHOD : PATCH
API ENDPOINT : /api/alien/update/:id
DESCRIPTION : This API will help us to perform the update on a specific profile by id.
*/

router.patch("/update/:id", Auth, async (req, res) => {
  try {
    const id = req.params.id;
    const updatedProfileData = req.body;
    const options = { new: true };

    const updatedAlien = await Alien.findOneAndUpdate(
      id,
      updatedProfileData,
      options
    );
    res.send(updatedAlien);
  } catch (error) {
    console.log(error);
  }
});

/*
METHOD : DELETE
ENDPOINT : /api/alien/delete_profile/:id
DESCRIPTION : This API endpoint will help us in deleting the profile of an alien by id.
*/

router.delete("/delete_profile/:id", Auth, async (req, res) => {
  try {
    const alienId = req.params.id;
    const alien = await Alien.findByIdAndDelete(alienId);
    res.json(alien);
  } catch (error) {
    console.log(error);
  }
});

/*
METHOD : GET
ENDPOINT : /api/alien/getAliens
DESCRIPTION : This API endpoint will help you in fetching all the profiles
*/

router.get("/", Auth, async (req, res) => {
  try {
    const alien = await Alien.find();
    res.json(alien);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
