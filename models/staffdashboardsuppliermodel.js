const mongoose = require("mongoose");


/* Creating a Database Schema....schema should be the same format as req.body */
const staffdashboardsupplierregisterSchema = new mongoose.Schema({
  drugname: String,
  drugquantity: Number,
  total: Number,
  payables: Number,
  debtors: Number
});


module.exports = mongoose.model(
  "Staffdashboardsupplier",
  staffdashboardsupplierregisterSchema
);
