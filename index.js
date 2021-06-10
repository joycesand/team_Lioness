/* require is a keyword used to use a package and below are the packages */
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const mongodb = require("mongodb");
const session = require("express-session");



const app = express(); // now we have our express app

/* mongoose db connection */
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/barry");

app.use(express.static(path.join(__dirname, 'public')));


// middleware
app.set("view engine", "pug"); //setting the view engine as pug
app.set("views", path.join(__dirname, "views")); //there's a folder called views and this is how to get it


app.use(
    session({
        secret: "thesecret",
        resave: true,
        saveUninitialized: false
    })
);



//import routes
const landingpageRoute = require("./routes/landingpageroute");
app.use("/", landingpageRoute);


const adminregistrationRoute = require("./routes/adminregistrationroute");
app.use("/adminregistration", adminregistrationRoute);

const adminloginRoute = require("./routes/adminloginroute");
app.use("/adminlogin", adminloginRoute);

const admindashboardRoute = require("./routes/admindashboardroute");
app.use("/admindashboard", admindashboardRoute);

const admindashboardcustomersRoute = require("./routes/admindashboardcustomersroute");
app.use("/admindashboardcustomers", admindashboardcustomersRoute);

const admindashboardsuppliersRoute = require("./routes/admindashboardsuppliersroute");
app.use("/admindashboardsuppliers", admindashboardsuppliersRoute);

const customerregistrationRoute = require("./routes/customerregistrationroute");
app.use("/customerregistration", customerregistrationRoute);

const customerloginRoute = require("./routes/customerloginroute");
app.use("/customerlogin", customerloginRoute);

const customerdashboardRoute = require("./routes/customerdashboardroute");
app.use("/customerdashboard", customerdashboardRoute);



//configuring mongodb and connecting to mongo campus
var MongoClient = mongodb.MongoClient;

const url = "mongodb://localhost:27017/barry";

MongoClient.connect(
    url, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    },
    (err, client) => {
        // call back
        if (err) return console.log(err); // checking for error
        db = client.db("barryadmin");
        app.listen(3002, () => {
            console.log("Mongodb server Listening at 3002");
        });
    }
);