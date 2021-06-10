const mongoose = require("mongoose");


/* Creating a Database Schema....schema should be the same format as req.body */
const staffdashboardcustomerregisterSchema = new mongoose.Schema({
  drugname: String,
  drugquantity: Number,
  total: Number,
  receivables: Number,
  creditors: Number,
  wholeretail: String
});


module.exports = mongoose.model(
  "Staffdashboardcustomer",
  staffdashboardcustomerregisterSchema
);
