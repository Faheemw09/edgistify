const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const Product = require("../models/productsModel");

exports.placeOrder = async (req, res) => {
  try {
    const { shippingAddress } = req.body;
    const userId = req.body.autherID;

    console.log("User ID from token:", userId);

    if (!userId) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let totalPrice = 0;
    let orderItems = [];

    for (const item of cart.items) {
      const product = await Product.findById(item.productId);
      if (!product || product.stock < item.quantity) {
        return res.status(400).json({
          message: `Product ${product?.name || "unknown"} is out of stock`,
        });
      }

      orderItems.push({
        productId: product._id,
        quantity: item.quantity,
        price: product.price * item.quantity,
      });

      totalPrice += product.price * item.quantity;

      product.stock -= item.quantity;
      await product.save();
    }

    const newOrder = new Order({
      userId,
      items: orderItems,
      totalPrice,
      shippingAddress,
      paymentStatus: "Pending",
      orderStatus: "Pending",
    });

    await newOrder.save();

    await Cart.findOneAndDelete({ userId });

    return res.status(201).json({
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error in placeOrder:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
