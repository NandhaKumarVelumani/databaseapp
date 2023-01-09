const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const _ = require("lodash");

const app = express();

//app settings
app.set("view engine", "ejs");
app.use(express.static("public"));

//app resources
app.use(bodyParser.urlencoded({ extended: true }));

const url =
  "mongodb+srv://nandhakumarapp:nandhakumarapp@cluster0.ob2dytk.mongodb.net/userDB";

//mongoose settings
mongoose.set("strictQuery", false);
mongoose.connect(url, function () {
  console.log("Successfully connected to db");
});

const userSchema = {
  name: String,
};
const User = mongoose.model("User", userSchema);

const admin = new User({ name: "Admin" });
// admin.save()

app.get("/", function (req, res) {
  User.find({}, function (err, users) {
    if (users === null) {
      User.insertMany(admin);
      res.redirect("/");
    } else {
      res.render("index", {
        userName: _.capitalize(users[users.length - 1].name),
        users,
      });
    }
  });
});

app.post("/", function (req, res) {
  User.insertMany({ name: _.capitalize(req.body.name) });
  res.redirect("/");
});

app.listen(process.env.PORT || 3000);
