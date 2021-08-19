const knex = require("../config/connection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

module.exports = {
    async login(req, res, next) {
        try {
            
            const { email, password } = req.body;

            const userObj = await knex("users").select("password","id").where({ email }).first();
 
            if(!userObj) {
                res.status(404);
                res.json({
                    status: 404,
                    message: "Error when try login at application: email cannot be found!"
                });

                console.log("Error when try login at application: email cannot be found!");
            }
            
            const result = bcrypt.compareSync(password, userObj.password);

            if(!result) {
                res.status(404);
                res.json({
                    status: 404,
                    message: "Error when try login at application: password cannot be found!"
                });
            }

            res.json({
                status: 200,
                id: userObj.id,
                email,
                auth: true,
                token: jwt.sign({ userId: userObj.id }, process.env.JWT_SECRET, { expiresIn: 300 })
            });
            
        } catch (error) {
            next(error);
        }
    }
}