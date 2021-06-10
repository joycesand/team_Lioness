const express = require("express");
const router = express.Router();
const Register = require("../models/adminmodel");

// const Register = require("../models/staffdashboardcustomermodel");






// router.get("/", async (req, res) => {
//   try {
//     const register = await Register.aggregate([
//       { $group: { _id: "$drugname", receivables: { $sum: 1 } } },
//       {
//         $group: { _id: "$drugname", receivables: { $sum: "$receivables" } }
//       }
//     ]);
//     console.log(register);
//   } catch (err) {
//     res.status(500).send("unable to get from database....");
//   }
// });

router.get("/", async (req, res) => {
  if (req.session.user) {
    let items = await Register.find();

    res.render("admindashboard", {
      users: items,
      currentUser: req.session.user
    });
  } else {
    res.redirect("/adminlogin");
  }
});



module.exports = router;
