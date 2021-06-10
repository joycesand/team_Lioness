const express = require("express");
const router = express.Router();
const Register = require("../models/customermodel");

const mongoose = require("mongoose");

router.get("/", (req, res) => {
  res.render("customerlogin");
});

router.post("/", async (req, res) => {
  try {
    const user = await Register.authenticate(
      req.body.customeremailaddress,
      req.body.customerpassword
    );
    req.session.user = user;
    console.log(user);
    // res.redirect("/customerregistration/search"); 
    res.redirect("/customerdashboard");
  } catch {
    res.send("Login Failed");
  }
});




module.exports = router;
