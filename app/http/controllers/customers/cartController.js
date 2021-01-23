module.exports.viewCartController = (req, res) => {
  res.render("cutomers/cart");
};

module.exports.updateCartController = (req, res) => {
  if (!req.session.cart) {
    req.session.cart = {
      items: {},
      totalQty: 0,
      totalPrice: 0,
    };
  }

  cart = req.session.cart;

  if (!cart.items[req.body._id]) {
    cart.items[req.body._id] = {
      item: req.body,
      qty: 1,
    };
    cart.totalQty++;
    cart.totalPrice += req.body.price;
  } else {
    cart.items[req.body._id].qty++;
    cart.totalQty++;
    cart.totalPrice += req.body.price;
  }

  res.json({ totalQty: req.session.cart.totalQty });
};
