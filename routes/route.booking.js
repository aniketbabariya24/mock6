const express = require ("express");

const { BookingModel } = require ("../models/model.booking");
// const { BookingModel } = require("../models/model.flight");


const bookingRouter = express.Router();


bookingRouter.post("/booking", async(req,res)=>{
    const {userID, flightID } = req.body;
    try {
     console.log(userID, flightID)
        const booking= new BookingModel({user: userID, flight: flightID});
        await booking.save();


        res.status(200).send({
            Message: "Flight Booked Succesfully",
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

bookingRouter.get("/dashboard", async (req, res) => {
    try {
        const data = await BookingModel.find().populate("user").populate("flight");
        res.status(200).send(data);
        console.log(data)
    } catch (error) {
        res.status(404).send({
            Message: "Bad request 404",
        });
    }
});




module.exports = { bookingRouter }  

