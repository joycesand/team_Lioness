const express = require("express");
const router = express.Router();
const Register = require("../models/suppliermodel");







router.get("/", async (req, res) => {
  if (req.session.user) {
    let items = await Register.find();

    res.render("supplierdashboarddb", {
      users: items,
      currentUser: req.session.user
    });
  } else {
    res.redirect("/supplierlogin");
  }
});


router.post("/delete", async (req, res) => {
  try {
    await Register.deleteOne({ _id: req.body.id });
    res.redirect("back");
  } catch (err) {
    res.status(500).send("unable to delete from the database");
  }
});



module.exports = router;
