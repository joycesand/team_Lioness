const express = require("express");
const router = express.Router();
const Register = require("../models/supplierdbmodel");
const multer = require("multer");
const fs = require("fs"); 
const mongodb = require("mongodb");




router.get("/", async (req, res) => {
  try {
    const items = await Register.find();
    console.log(items);
    res.render("supplierdashboard", { users: items });
  } catch (err) {
    res.status(500).send("unable to save to database");
  }
});


router.post("/", async (req, res) => {
  const register = new Register(req.body);
  try {
    await register.save();
    console.log("Item has been saved");
    const items = await Register.find();
    res.render("supplierfb");
  } catch (err) {
    res.status(500).send("unable to save to database");
  }
});



module.exports = router;
