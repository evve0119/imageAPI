const router = require("express").Router();
const registerValidation = require("../validation").registerValidation;
const loginValidation = require("../validation").loginValidation;
const User = require("../models").user;
const jwt = require("jsonwebtoken");


router.use((req, res, next) => {
    console.log("Authorization request receiving...");
    next();
});

router.get("/testAPI", (req, res) => {
    return res.send("Authorization auth route success....");
});

router.post("/register", async (req, res) => {
    // Confirm the data is validated
    let { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const emailExist = await User.findOne({ email: req.body.email});
    if (emailExist) return res.status(400).send("Email already been registered");


    // Create New User
    let { email, username, password} = req.body;
    let newUser = new User({ email, username, password});
    try {
        let savedUser = await newUser.save();
        return res.send({
        msg: "Successfully save user",
        savedUser,
        });
    } catch (e) {
        return res.status(500).send("Can't save user");
    }

});


router.post("/login", async (req, res) => {
    // Confirm the data is validated
    let { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Whether the user exist
    const foundUser = await User.findOne({ email: req.body.email });
    if (!foundUser) {
      return res.status(401).send("Can't find user. Please confirm your information");
    }

    foundUser.comparePassword(req.body.password, (err, isMatch) => {
      if (err) return res.status(500).send(err);

      if (isMatch) {
        // Create json web token
        const tokenObject = { _id: foundUser._id, email: foundUser.email };
        const token = jwt.sign(tokenObject, process.env.PASSPORT_SECRET);
        return res.send({
          message: "Successfully login!",
          token: "JWT " + token,
          user: foundUser,
        });
      } else {
        return res.status(401).send("Wrong password.");
      }
    });
});

module.exports = router;
