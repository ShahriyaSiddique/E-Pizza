const { login, register } = require("../app/http/controllers/authController");
const {
  viewCartController,
  updateCartController,
} = require("../app/http/controllers/customers/cartController");
const homeController = require("../app/http/controllers/homeController");

function initRoutes(app) {
  app.get("/", homeController);

  app.get("/login", login);
  app.get("/register", register);

  app.get("/cart", viewCartController);
  app.post("/update-cart", updateCartController);
}

module.exports = initRoutes;
