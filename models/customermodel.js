const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

/* Creating a Database Schema....schema should be the same format as req.body */
const customerregisterSchema = new mongoose.Schema({
  customerfirstname: {
    type: String,
    required: "Please Enter first name"
  },
  customerlastname: {
    type: String,
    required: "Please Enter last name"
  },

  customerusername: {
    type: String,
    unique: true,
    required: "Please Enter user name"
  },
  customerpassword: {
    type: String,
    required: "Please Enter your password"
  },
  customerpassword1: {
    type: String,
    required: "Please Confirm password"
  },

  customeremailaddress: {
    type: String,
    unique: true,
    required: "Please Enter email address"
  },
  customerphone: String,
  customerphysicaladdress: String,
  customergender: String
});


customerregisterSchema.pre("save", function(next) {
  this.customerpassword = bcryptjs.hashSync(this.customerpassword, 10);
  next();
});

customerregisterSchema.statics.authenticate = async function(
  customeremailaddress,
  customerpassword
) {
  const user = await this.findOne({
    customeremailaddress: customeremailaddress
  });
  if (!user) {
    throw new Error("User not found.");
  }
  const match = await bcryptjs.compare(customerpassword, user.customerpassword);
  if (match) {
    return user;
  }
};

//create a model
module.exports = mongoose.model("Customer", customerregisterSchema);
