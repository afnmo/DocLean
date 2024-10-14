const router = require('express').Router();
const { User } = require('../models/user');
const Joi = require('joi');
const bcrypt = require('bcrypt');

router.post("/", async (req, res) => {
    try {
        console.log("Request received with body:", req.body);

        const { error } = validate(req.body);
        if (error) {
            console.log("Validation error:", error.details[0].message);
            return res.status(400).send({ message: error.details[0].message });
        }

        console.log("Validation passed"); // 

        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            console.log("User not found for email:", req.body.email);
            return res.status(401).send({ message: "Invalid Email or Password" });
        }

        console.log("User found:", user.email); //

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            console.log("Invalid password for email:", req.body.email);
            return res.status(401).send({ message: "Invalid Email or Password" });
        }

        console.log("Password is valid"); //

        const token = user.generateAuthToken();

        console.log("Generated token:", token); //

        res
            .cookie("access_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production", 
                maxAge: 3600000 // 1 hour
            })
            .status(200)
            .json({ message: "Logged in successfully" });

        console.log("Login successful, response sent");

    } catch (error) {
        console.log("Error occurred:", error);  
        res.status(500).send({ message: "auth.js Internal Server Error" });
    }
});

const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password")
    });
    return schema.validate(data);
};

module.exports = router;
