const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

/* Creating a Database Schema....schema should be the same format as req.body */
const admindbregisterSchema = new mongoose.Schema({
  receivables: String
});


//create a model
module.exports = mongoose.model("Admindb", admindbregisterSchema);
