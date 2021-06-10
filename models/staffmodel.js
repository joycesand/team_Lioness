const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

/* Creating a Database Schema....schema should be the same format as req.body */
const staffregisterSchema = new mongoose.Schema({
  stafffirstname: {
    type: String,
    required: "Please Enter first name"
  },
  stafflastname: {
    type: String,
    required: "Please Enter last name"
  },

  staffusername: {
    type: String,
    unique: true,
    required: "Please Enter User name"
  },
  staffpassword: {
    type: String,
    required: "Please Enter password"
  },
  staffpassword1: {
    type: String,
    required: "Please Confirm password"
  },
  staffemailaddress: {
    type: String,
    unique: true,
    required: "Please Enter emailaddress"
  },

  staffphysicaladdress: String,
  staffgender: String
});


staffregisterSchema.pre("save", function(next) {
  this.staffpassword = bcryptjs.hashSync(this.staffpassword, 10);
  next();
});

staffregisterSchema.statics.authenticate = async function(
  staffemailaddress,
  staffpassword
) {
  const user = await this.findOne({
    staffemailaddress: staffemailaddress
  });
  if (!user) {
    throw new Error("User not found.");
  }
  const match = await bcryptjs.compare(staffpassword, user.staffpassword);
  if (match) {
    return user;
  }
};

//create a model
module.exports = mongoose.model("Staff", staffregisterSchema);

