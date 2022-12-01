const express = require("express");
const router = express.Router();
const Admin = require("../../models/Admin");
const jwt = require("jsonwebtoken");
const jwtsecret = "mysecrettoken";
const bcrypt = require("bcrypt");

/*
Admin Pre-Defined Credentials
name : admin
password : supernova ( all in small letters ;) )
*/

const { check, validationResult } = require("express-validator");
router.post(
  "/",
  [
    check("name", "Enter a name for login").not().isEmpty(),
    check("password", "Enter a password").exists(), //returns a Boolean
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, password } = req.body;
    console.log(name, password);
    try {
      let admin = await Admin.findOne({ name });
      console.log(admin);
      if (!admin)
        return res
          .status(400)
          .json({ errors: [{ msg: "Admin credentials doesnt exist" }] });
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res
          .status(404)
          .json({ errors: [{ msg: "Password incorrect" }] });
      }

      const payload = {
        admin: {
          id: admin.id,
        },
      };
      jwt.sign(
        payload,
        jwtsecret,
        {
          expiresIn: 3600,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
