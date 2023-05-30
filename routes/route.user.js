const express = require ("express");

const { UserModel } = require ("../models/model.user");


const userRouter = express.Router();


userRouter.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
      
                    const newUser = new UserModel({
                        name,
                        email,
                        password
                    });
                    await newUser.save();
                    res.status(200).json({
                        success: "user registered successfully",
                    });
       
        }
     catch{
        res.status(500).json({ error: error.message });
     }
    
});

userRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const UserData = await UserModel.findOne({ email });

        if (!UserData) {
            return res.status(404).json({ error: "User not found" });
        }
     if(UserData.password==password){
        res.status(200).json({
            message: "Login successfully"
     })
     }
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});



module.exports = { userRouter }  

