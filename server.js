const express = require("express");
const app = express();
require("dotenv").config();

const { userRouter } = require("./routes/route.user");
const { flightRouter } = require("./routes/route.flight");
const { bookingRouter }= require("./routes/route.booking");

app.use(express.json());


app.get("/", (req, res) =>
  res.send(
    `<h1 style="text-align:Center;color:blue">Welcome in Dent Care API</h1>`
  )
);


app.use("/api", userRouter);
app.use("/api", flightRouter);
app.use("/api", bookingRouter);


const {dbconnetion}= require('./configs/db')
app.listen(8080, async () => {
  try {
    await dbconnetion;
    console.log(`Connected to Database`);
    console.log(`Server listening on 8080`);
  } catch (error) {
    console.log(`Error while connecting to ${error.message}`);
  }
});
