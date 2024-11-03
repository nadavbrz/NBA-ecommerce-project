const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT;
const mongoConnect = require("./authDB");
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

const corsOption ={
  origin: "https://nba-e-commerce-project.brzcode.site",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: 'Content-Type, Authorization',
}

app.use(cors(corsOption));
app.use(express.json());
// app.use(limiter);
app.use("/jerseys", jerseysRouter);
app.use("/classicJerseys", classicJerseysRouter);
app.use("/shorts", shortsRouter);
app.use("/users", usersRouter);
app.use("/orders", ordersRouter);

app.use((error,req,res,next)=>{
  const status =error.status || 500
  const message = error.message || "Something went wrong"
  res.status(status).json({message})
})

app.use("/", (req, res) => {
  res.send("404 - page not found");
});

app.listen(port, () => console.log(`app is running on port ${port}`));
