const express = require("express");
const app = express();
const mongoose =  require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./routes").auth;
const imageRoute = require("./routes").image;
const shareRoute = require("./routes").share;
const passport = require("passport");
require("./config/passport")(passport);
const cors = require("cors");


mongoose.set("strictQuery", false);
mongoose
    .connect("mongodb://localhost:27017/imageAPI")
    // .connect("mongodb://mongo:27017/imageAPI")
    .then(() => {
        console.log("Connect to mongodb!");
    })
    .catch((e) => {
        console.log(e);
    });

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(cors());
app.use('/uploads', express.static('uploads'))

app.use("/api/user", authRoute);
app.use(
    "/api/image",
    passport.authenticate("jwt", { session: false }),
    imageRoute
);
app.use("/api/share", shareRoute);

app.listen(8080, () => {
    console.log("Sever run on port 8080.");
});
