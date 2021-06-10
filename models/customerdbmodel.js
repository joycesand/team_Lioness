const mongoose = require("mongoose");


/* Creating a Database Schema....schema should be the same format as req.body */
const customerdbregisterSchema = new mongoose.Schema({

  drugname: String,
  drugprescription: String,

  
});


module.exports = mongoose.model("Customerdb", customerdbregisterSchema);
