const express = require("express");
const Order = require("../schemas/orderModal");
const ClassicJerseys = require("../schemas/classicJerseysModal");
const CurrentJerseys = require("../schemas/currentJerseysModal");
const Shorts = require("../schemas/shortsModal");
const { checkAuth } = require("../utils/auth");

const router = express.Router();

router.use(checkAuth);

router.post("/", async (req, res, next) => {
  const { products, totalAmount } = req.body;
  const user = req.user._id;
  const username = req.user.username;

  console.log(req.body);

  try {
    let total = 0;

    const populatedProducts = await Promise.all(
      products.map(async (item) => {
        let productDetails;

        productDetails =
          (await ClassicJerseys.findById(item.product)) ||
          (await CurrentJerseys.findById(item.product)) ||
          (await Shorts.findById(item.product));

        if (!productDetails) {
          throw new Error("Product not found");
        }

        const quantity = item.quantity || 1;
        total += productDetails.price * quantity; // Total should match totalAmount
        return {
          product: item.product,
          quantity,
          productName: productDetails.productName,
          imgSrc: productDetails.imgSrc,
        };
      })
    );

    const newOrder = new Order({
      user,
      username,
      products: populatedProducts,
      totalAmount: totalAmount || total, // Ensure totalAmount is used
    });

    await newOrder.save();

    res.status(201).json({
      response: true,
      data: newOrder,
      message: "Order created successfully",
    });
  } catch (error) {
    console.error("Error creating order:", error.message);
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    let orders;
    if (req.user.role === "admin") {
      orders = await Order.find().populate("user").populate("products.product");
    } else {
      orders = await Order.find({ user: req.user._id }).populate(
        "products.product"
      );
    }

    const transformedOrders = orders.map((order) => ({
      orderId: order._id,
      userId: order.user._id,
      username: order.username,
      products: order.products.map((product) => ({
        productId: product.product._id,
        productName: product.product.productName,
        imgSrc: product.product.imgSrc,
        quantity: product.quantity,
      })),
      totalAmount: order.totalAmount,
    }));

    res.status(200).json({
      response: true,
      data: transformedOrders,
      message: "Found orders",
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied!" });
  }
  const id = req.params.id;
  try {
    const orderDeleted = await Order.findByIdAndDelete(id);
    res.status(201).json({
      response: true,
      data: orderDeleted,
      message: "order deleted successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ response: false, data: "", message: "order deletion failed" });
    console.error(`order deletion failed ${error}`);
  }
});
router.get("/me", checkAuth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate(
      "products.product"
    );
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: "Fetching order details failed" });
  }
});

module.exports = router;
