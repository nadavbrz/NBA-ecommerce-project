const express = require("express");
const Shorts = require("../schemas/shortsModal");
const { checkAuth } = require("../utils/auth");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const shorts = await Shorts.find();
    res
      .status(201)
      .json({ response: true, data: shorts, message: "shorts found" });
  } catch (error) {
    next(error);
  }
});
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const foundShort = await Shorts.findById(id);
    res
      .status(201)
      .json({ response: true, data: foundShort, message: "short found" });
  } catch (error) {
    next(error);
  }
});
router.use(checkAuth);

router.post("/", async (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  const {productName, team, description, imgSrc, price } = req.body;
  const newShort = new Shorts({
    productName,
    team,
    description,
    imgSrc,
    price,
  });

  try {
    await newShort.save();
    res.status(201).json({
      response: true,
      data: newShort,
      message: "short created successfully",
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  const id = req.params.id;
  try {
    const shortDeleted = await Shorts.findByIdAndDelete(id);
    res.status(201).json({
      response: true,
      data: shortDeleted,
      message: "short deleted successfully",
    });
  } catch (error) {
    next(error);
  }
});
router.put("/:id", async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  const id = req.params.id;
  const {productName, team, description, imgSrc, price } = req.body;
  try {
    const shortUpdated = await Shorts.findByIdAndUpdate(id, {
      productName,
      team,
      description,
      imgSrc,
      price,
    });
    res.status(201).json({
      response: true,
      data: shortUpdated,
      message: "short updated successfully",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
