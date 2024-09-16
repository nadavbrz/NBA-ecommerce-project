const express = require("express");
const Jersey = require("../schemas/currentJerseysModal");
const { checkAuth } = require("../utils/auth");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const jerseys = await Jersey.find();
    res
      .status(201)
      .json({ response: true, data: jerseys, message: "jerseys found" });
  } catch (error) {
next(error)
  }
});
router.get("/:id", async (req, res,next) => {
  const id = req.params.id;
  try {
    const foundJersey = await Jersey.findById(id);
    res
      .status(201)
      .json({ response: true, data: foundJersey, message: "Jersey found" });
  } catch (error) {
    res
      .status(500)
      .json({ response: false, data: "", message: "getting Jersey failed" });
    console.error(`getting jerseys failed!`, error);
    next(error);
  }
});
router.use(checkAuth);

router.post("/", async (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied." });
  }
  const { productName,player, number, team, description, imgSrc, price } = req.body;
  const newJersey = new Jersey({
    productName,
    player,
    number,
    team,
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
    return res.status(403).json({ message: "Access denied." });
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
router.put("/:id", async (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied." });
  }
  const id = req.params.id;
  const {productName, player, number, team, description, imgSrc, price } = req.body;
  try {
    const jerseyUpdated = await Jersey.findByIdAndUpdate(id, {
      productName,
      player,
      number,
      team,
      description,
      imgSrc,
      price,
    },{new: true});
    if(!jerseyUpdated){
      return res.status(404).json({response:false , message: "Jersey not found."})
    }
    res.status(201).json({
      response: true,
      data: jerseyUpdated,
      message: "jersey updated successfully",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
