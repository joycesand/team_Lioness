const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

/* Creating a Database Schema....schema should be the same format as req.body */
const adminregisterSchema = new mongoose.Schema({
  adminfirstname: {
    type: String,
    required: "Please Enter first name"
  },
  adminlastname: {
    type: String,
    required: "Please Enter last name"
  },

  adminusername: {
    type: String,
    unique: true,
    required: "Please Enter User name"
  },
  adminpassword: {
    type: String,
    required: "Please Enter password"
  },

  adminpassword1: {
    type: String,
    required: "Please Confirm password"
  },

  adminemailaddress: {
    type: String,
    unique: true,
    required: "Please Enter emailaddress"
  },

  adminphysicaladdress: String,
  admingender: String
});

adminregisterSchema.pre("save", function(next) {
  this.adminpassword = bcryptjs.hashSync(this.adminpassword, 10);
  next();
});

adminregisterSchema.statics.authenticate = async function(
  adminemailaddress,
  adminpassword
) {
  const user = await this.findOne({
    adminemailaddress: adminemailaddress
  });
  if (!user) {
    throw new Error("User not found.");
  }
  const match = await bcryptjs.compare(adminpassword, user.adminpassword);
  if (match) {
    return user;
  }
};

//create a model
module.exports = mongoose.model("Admin", adminregisterSchema);
