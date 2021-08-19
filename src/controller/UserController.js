const connectionFile = require("../config/connection");
const bcrypt = require("bcryptjs");

module.exports = {
    async index(req, res, next) {
        try {
            const result = await connectionFile("users");
            res.json(result);
        } catch (error) {
            next(error)
        }
    },
    async create(req, res, next) {
        try {
            const { name, email, password } = req.body;

            const thereIsEmail = await connectionFile("users").select("email").where({ email }).first();
    
            if(thereIsEmail) {
                res.status(404);
                res.json({ status: 404, message: "User has been registred" })
            }
    
            await connectionFile("users").insert({
                name,
                email,
                password: bcrypt.hashSync(password, 10)
            });
    
            res.json({
                status: 200,
                message: "New user created into database",
                name,
                email
            });
    
            console.log("New user created into database 🤯")
        } catch (error) {
            next(error)
        }
    },
    async update(req, res, next) {
        try {
            const { name, email, password } = req.body;

            const { id } = req.params;
    
            await connectionFile.insert("users").update({
                name,
                email,
                password: bcrypt.hashSync(password, 10)
            }).where({ id });
    
            res.json({
                status: 200,
                message: `User ${name} has been its data information updated!`
            });
        } catch (error) {
            next(error)
        }

    },
    async delete(req, res, next) {
        try {
            const { id } = req.params;

            await knex("users").where({ id }).del();
    
            res.json({
                status: 200,
                message: "One user was deleted!",
                id
            });
        } catch (error) {
            next(error)
        }
    }
}