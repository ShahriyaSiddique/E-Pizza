import Noty from "noty";
import axios from "axios";

let addToCart = document.querySelectorAll(".add-to-cart");
let cartCounter = document.querySelector("#cart-counter");

let updateCart = (pizza) => {
  axios
    .post("/update-cart", pizza)
    .then((res) => {
      cartCounter.innerText = res.data.totalQty;
      new Noty({
        theme: "mint",
        type: "success",
        timeout: 1000,
        progressBar: false,
        layout: "topRight",
        text: "🍕 Pizza Added to cart 😋 ",
      }).show();
    })
    .catch((err) => {
      new Noty({
        type: "error",
        timeout: 1000,
        progressBar: false,
        layout: "topRight",
        text: "Something went wrong 😥 ",
      }).show();
    });
};

addToCart.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    let pizza = JSON.parse(btn.dataset.pizza);
    updateCart(pizza);
  })
);
