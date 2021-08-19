// Route files
const routes = require("express").Router();

const UserController = require("./controller/UserController");
const LoginController = require("./controller/LoginController");
const BusinessController = require("./controller/BusinessController");
const Auth = require("./middleware/Auth");

// User Routes:

routes.get("/get-users", UserController.index);
routes.post("/create-users", UserController.create);
routes.put("/update-users/:id", UserController.update);
routes.delete("/delete-users/:id", UserController.update);

// Login Route:

routes.post("/login", LoginController.login);

// Session route:

routes.get("/user/business/index", Auth.verifyToken, BusinessController.listBusiness);
routes.post("/user/business/register", Auth.verifyToken, BusinessController.registerBusiness);
routes.put("/user/business/update/:businessId", Auth.verifyToken, BusinessController.editBusiness);
routes.delete("/user/business/delete/:businessId", Auth.verifyToken, BusinessController.listBusiness);

module.exports = routes;