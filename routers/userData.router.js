const express = require("express");
const { UserModel } = require("../models/userData.model");
const jwt = require("jsonwebtoken");


const UserRouter = express.Router();

// signup
UserRouter.post("/signup", async (req, res) => {
    try {
      const newItem = new UserModel({
        email: req.body.email,
        password: req.body.password,
      });

      await newItem.save();
      res.status(201).send(newItem);
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  });

// logim

  UserRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
    
        if (!user) {
          return res.status(404).send("User not found");
        }
        if (user.password !== password) {
          return res.status(401).send("Invalid password");
        }
        const payload = {
          user: {
            id: user.id,
          },
        };
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: 3600 }, // Token expires in 1 hour
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
      }
  });


module.exports = {
  UserRouter,
};