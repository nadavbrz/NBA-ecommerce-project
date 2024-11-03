const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT;
const mongoConnect = require("./authDB");
const { sendEmail } = require("./utils/sendEmail");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// const rateLimit = require("express-rate-limit")

const jerseysRouter = require("./routes/jerseys");
const shortsRouter = require("./routes/shorts");
const usersRouter = require("./routes/users");
const classicJerseysRouter = require("./routes/classicJerseys");
const ordersRouter = require("./routes/order");
mongoConnect.connectToMongo();

// const limiter = rateLimit({
//   windowMs: 35 * 60 * 1000,
//   max: 300,
//   message : "too  many requests from this IP try again in 15 minutes",
//   standardHeaders: true,
//   legacyHeaders: false,
// })

<<<<<<< HEAD
const corsOption = {
  origin: "*",
=======
const corsOption ={
  origin: "https://nba-e-commerce-project.brzcode.site",
>>>>>>> 7cb3df84cf967e5f032ed89043610627afc4892b
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: "Content-Type, Authorization",
};

app.use(cors(corsOption));
app.use(express.json());
// app.use(limiter);
app.use("/jerseys", jerseysRouter);
app.use("/classicJerseys", classicJerseysRouter);
app.use("/shorts", shortsRouter);
app.use("/users", usersRouter);
app.use("/orders", ordersRouter);

// app.get("/api", (req, res) => {
//   res.send("API is working");
// });

app.post("/send-email", async (req, res) => {
  const { recipient, name, subject, text } = req.body;

  try {
    const emailResponse = await sendEmail({ recipient, name, subject, text });

    if (emailResponse.response) {
      return res.status(200).json({ message: emailResponse.message });
    } else {
      return res
        .status(500)
        .json({ message: emailResponse.message, error: emailResponse.error });
    }
  } catch (error) {
    console.error("Error in /send-email route:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";
  res.status(status).json({ message });
});
app.post("/api/create-payment-intent", async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent", error);
    res.status(500).json({ error: error.message });
  }
});

app.use("/", (req, res) => {
  res.send("404 - page not found");
});

app.listen(port, () => console.log(`app is running on port ${port}`));
