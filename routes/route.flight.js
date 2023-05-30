const express = require ("express");

const { FlightModel } = require ("../models/model.flight");


const flightRouter = express.Router();


flightRouter.post("/flights", async (req, res) => {
    try {
        const { airline,flightNo,departure,arrival,departureTime,arrivalTime,seats,price } = req.body;
      
                    const newFlight = new FlightModel({
                        airline,flightNo,departure,arrival,departureTime,arrivalTime,seats,price
                    });
                    await newFlight.save();
                    res.status(200).json({
                        success: "Flight Added successfully",
                    });
       
        }
     catch{
        res.status(500).json({ error: error.message });
     }
    
});

flightRouter.get("/flights", async (req, res) => {
    try {
       
            const flightData = await FlightModel.find();
            res.status(200).json({ flightData });
       
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

flightRouter.get("/flights/:id", async (req, res) => {
    const _id = req.params.id;
    try {
            const flightData = await FlightModel.findOne({ _id });
            res.status(200).json({ flightData });
        
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

flightRouter.patch("/flights/:id", async (req, res) => {
    const ID = req.params.id;
    const payload = req.body
    console.log(ID,payload)
    try {
        await FlightModel.findByIdAndUpdate({ _id: ID }, payload)
        res.status(200).send({
            Message: "Flight successfully Updated",
        });
    }
    catch (error) {
        res.status(404).send({
            Message: "Bad request 404",
        });
    }
});


flightRouter.delete("/flights/:id", async (req, res) => {
    const ID = req.params.id;
    try {
        await FlightModel.findByIdAndDelete({ _id: ID })
        res.status(200).send({
            Message: "Flight successfully deleted",
        });
    }
    catch (error) {
        res.status(404).send({
            Message: "Bad request 404",
        });
    }
});


module.exports = { flightRouter }  

