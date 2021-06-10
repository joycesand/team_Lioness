const mongoose = require("mongoose");


/* Creating a Database Schema....schema should be the same format as req.body */
const supplierdbregisterSchema = new mongoose.Schema({
  drugimage: String,
  drugprice: String,
  drugdescription: String,
  drugname: String
});


module.exports = mongoose.model("Supplierdb", supplierdbregisterSchema);
