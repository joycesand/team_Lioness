const express = require("express");
const router = express.Router();
const Register = require("../models/adminmodel");

const mongoose = require("mongoose");


/* mongoose db connection */
mongoose.Promise = global.Promise;



router.get("/", (req, res) => {
    res.render("adminlogin");
});

router.post("/", async(req, res) => {
    try {
        const user = await Register.authenticate(
            req.body.adminemailaddress,
            req.body.adminpassword
        );
        req.session.user = user;
        console.log(user);
        // res.redirect("/officialregistration/search");
        res.redirect("/admindashboard")
    } catch {
        res.send("Login Failed");
    }
});

module.exports = router;