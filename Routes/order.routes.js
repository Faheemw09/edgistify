const express = require("express");
const router = express.Router();
const controller = require("../Controllers/order.controller");
const auth = require("../Middleware/authMiddleware");
router.post("/order", auth, controller.placeOrder);
// router.get("/get-all-orders", controller.getAllOrders);
module.exports = router;
