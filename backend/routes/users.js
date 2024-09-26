const express = require("express");
const User = require("../schemas/userModal");
const router = express.Router();
const bcrypt = require("bcrypt");
const {
  createJSONToken,
  checkAuth,
  isValidPassword,
} = require("../utils/auth");
const { sendEmail } = require("../utils/sendEmail");
const {
  isValidEmail,
  isValidAge,
  isValidText,
} = require("../utils/validation");

router.post("/signup", async (req, res, next) => {
  const data = req.body;
  let errors = {};
  if (!isValidEmail(data.email)) {
    errors.email = "Invalid email";
  } else {
    try {
      const existingUser = await User.findOne({ email: data.email });
      if (existingUser) {
        errors.email = "Email already exists";
      }
    } catch (error) {
      return next(error);
    }
  }
  const users = await User.find();
  if (!users.length > 0) {
    data.role = "admin";
  } else {
    data.role = "user";
  }
  if (
    !isValidText(data.password) ||
    !/[A-Z]/.test(data.password) ||
    !/[a-z]/.test(data.password) ||
    !/[0-9]/.test(data.password)
  ) {
    errors.password =
      "Password must be at least 8 characters long,and must include at least one number, upper case and lower case letter";
  }
  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "user signup failed to validation errors",
      errors,
    });
  }
  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const createdUser = new User({ ...data, password: hashedPassword });
    await createdUser.save();
    // sent email to user....
    sendEmail({
      recipient: createdUser.email,
      name: createdUser.username,
      subject: "Welcome to Baller Shop!",
      text: "Enjoy buying an amazing NBA jerseys and shorts!",
    });
    const authToken = createJSONToken(createdUser.email);
    res
      .status(201)
      .json({ message: "User created", user: createdUser, token: authToken });
  } catch (error) {
    return next(error);
  }
});

router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  let user;
  try {
    user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password!" });
    }
  } catch (error) {
    return res.status(401).json({ message: "Invalid email or password!" });
  }
  const pwIsValid = await isValidPassword(password, user.password);
  if (!pwIsValid) {
    return res.status(401).json({
      message: "Invalid email or password!",
    });
  }
  const token = createJSONToken(email);
  res.json({ message: "User logged in", token, role: user.role });
});

router.get("/me", checkAuth, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Fetching user details failed" });
  }
});
// Update current user's profile


router.use(checkAuth);

router.get("/", async (req, res) => {
  if (req.user.role !== "admin") {
    console.log(req.user.role, req.isAdmin);
    return res.status(403).json({ message: "Access denied!!!" });
  }
  try {
    const users = await User.find();
    res
      .status(201)
      .json({ response: true, data: users, message: "Users found" });
  } catch (error) {
    res
      .status(500)
      .json({ response: false, data: "", message: "getting users failed" });
    console.error(`getting users failed!`, error);
  }
});
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const foundUser = await User.findById(id);
    res
      .status(201)
      .json({ response: true, data: foundUser, message: "User found" });
    if (!foundUser) {
      return res
        .status(404)
        .json({ response: false, message: "User not found" });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const data = req.body;
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied!" });
  }
  const { username, age, email, password } = req.body;
  let errors = {};
  if (!isValidAge(age)) {
    errors.age = "Age must be over 0!";
  }
  if (!isValidEmail(email)) {
    errors.email = "Email must be valid!";
  }
  if (!isValidText(username)) {
    errors.username = "Username must be valid!";
  } else {
    try {
      const existingUser = await User.findOne({ email: email });
      if (existingUser) {
        errors.email = "Email already exists!";
      }
    } catch (error) {
      return next(error);
    }
  }
  const users = await User.find();
  if (!users.length > 0) {
    data.role = "admin";
  } else {
    data.role = "user";
  }
  if (
    !isValidText(data.password) ||
    !/[A-Z]/.test(data.password) ||
    !/[a-z]/.test(data.password) ||
    !/[0-9]/.test(data.password)
  ) {
    errors.password =
      "Password must be at least 8 characters long,and must include at least one number, upper case and lower case letter";
  }
  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "user signup failed to validation errors",
      errors,
    });
  }
  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const createdUser = new User({ ...data, password: hashedPassword });
    await createdUser.save();
    // sent email to user....
    sendEmail({
      recipient: createdUser.email,
      name: createdUser.username,
      subject: "Welcome to Baller Shop!",
      text: "Enjoy buying an amazing NBA jerseys and shorts!",
    });
    const authToken = createJSONToken(createdUser.email);
    res
      .status(201)
      .json({ message: "User created", user: createdUser, token: authToken });
  } catch (error) {
    return next(error);
  }
});

router.delete("/:id", async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied!" });
  }
  const id = req.params.id;
  try {
    const userDeleted = await User.findByIdAndDelete(id);
    res.status(201).json({
      response: true,
      data: userDeleted,
      message: "User deleted successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ response: false, data: "", message: "User deletion failed" });
    console.error(`User deletion failed ${error}`);
  }
});
router.put("/:id", async (req, res, next) => {
  const data = req.body;
  const id = req.params.id;
  const { username, age, email } = req.body;
  const errors = {};
  if (!isValidAge(age)) {
    errors.age = "Age must be over 0!";
  }
  if (!isValidEmail(email)) {
    errors.email = "Email must be valid!";
  }
  if (!isValidText(username)) {
    errors.username = "Username must be valid!";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      message: "Updating the user failed due to validation errors.",
      errors,
    });
  }
  try {
    const userUpdated = await User.findByIdAndUpdate(
      id,
      { username, age, email },
      { new: true }
    );
    if (!userUpdated) {
      return res
        .status(404)
        .json({ response: false, message: "User not found" });
    }
    res
      .status(201)
      .json({ response: true, message: "user updated successfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
