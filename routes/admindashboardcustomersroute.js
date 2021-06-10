const express = require("express");
const router = express.Router();
const Register = require("../models/customermodel");



router.get("/", async (req, res) => {
  if (req.session.user) {
    
    let items = await Register.find();
   
    res.render("admindashboardcustomers", {
      users: items,
      currentUser: req.session.user
    });
  } else {
    res.redirect("/adminlogin");
  }
});

router.post("/", async (req, res) => {
  const register = new Register(req.body);
  try {
    await register.save();
    console.log("Item has been saved");
    const items = await Register.find();
    res.render("admindashboardfb");
  } catch (err) {
    res.status(500).send("unable to save to database");
  }
});

router.post("/delete", async (req, res) => {
  try {
    await Register.deleteOne({ _id: req.body.id });
    res.redirect("back");
    // res.render("admindashboardfb");
  } catch (err) {
    res.status(500).send("unable to delete from the database");
  }
});


module.exports = router;
