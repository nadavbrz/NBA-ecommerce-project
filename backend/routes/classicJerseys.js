const express = require("express");
const Jersey = require("../schemas/classicJerseysModal");
const router = express.Router();
const { checkAuth } = require("../utils/auth");

router.get("/", async (req, res, next) => {
  try {
    const jerseys = await Jersey.find();
    res
      .status(201)
      .json({ response: true, data: jerseys, message: "jerseys found" });
  } catch (error) {
    next(error);
  }
});
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const foundJersey = await Jersey.findById(id);
    res
      .status(201)
      .json({ response: true, data: foundJersey, message: "Jersey found" });
  } catch (error) {
    next(error);
  }
});

router.use(checkAuth);


router.post("/", async (req, res, next) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "You are not authorized to perform this action" });
  }
  const {productName, player, number, team, year, description, imgSrc, price } = req.body;
  const newJersey = new Jersey({
    productName,
    player,
    number,
    team,
    year,
    description,
    imgSrc,
    price,
  });

  try {
    await newJersey.save();
    res.status(201).json({
      response: true,
      data: newJersey,
      message: "Jersey created successfully",
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "You are not authorized to perform this action" });
  }
  const id = req.params.id;
  try {
    const jerseyDeleted = await Jersey.findByIdAndDelete(id);
    res.status(201).json({
      response: true,
      data: jerseyDeleted,
      message: "jersey deleted successfully",
    });
  } catch (error) {
    next(error);
  }
});
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const {productName, player, number, team, year, description, imgSrc, price } = req.body;
  try {
    const jerseyUpdated = await Jersey.findByIdAndUpdate(id, {
      productName,
      player,
      number,
      team,
      year,
      description,
      imgSrc,
      price,
    },{ new: true });
    res.status(201).json({
      response: true,
      data: jerseyUpdated,
      message: "jersey updated successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ response: false, data: "", message: "Jersey failed to update" });
    console.error("Jersey failed to update", error);
  }
});

module.exports = router;
