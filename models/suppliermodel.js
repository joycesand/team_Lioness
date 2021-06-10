const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

/* Creating a Database Schema....schema should be the same format as req.body */
const supplierregisterSchema = new mongoose.Schema({
  supplierusername: {
    type: String,
    unique: true,
    required: "Please Enter user name"
  },
  supplierpassword: {
    type: String,
    required: "Please Enter password"
  },
  supplierpassword1: {
    type: String,
    required: "Please Confirm password"
  },

  supplieremailaddress: {
    type: String,
    unique: true,
    required: "Please Enter email address"
  },
  supplierphysicaladdress: String,
  supplierphone: String
});


supplierregisterSchema.pre("save", function(next) {
  this.supplierpassword = bcryptjs.hashSync(this.supplierpassword, 10);
  next();
});

supplierregisterSchema.statics.authenticate = async function(
  supplieremailaddress,
  supplierpassword
) {
  const user = await this.findOne({
    supplieremailaddress: supplieremailaddress
  });
  if (!user) {
    throw new Error("User not found.");
  }
  const match = await bcryptjs.compare(supplierpassword, user.supplierpassword);
  if (match) {
    return user;
  }
};

//create a model
module.exports = mongoose.model("Supplier", supplierregisterSchema);
