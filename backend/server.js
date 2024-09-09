import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './db.js';
import NewUser from './models/user_models.js';


dotenv.config();

const app = express();

app.use(express.json());

app.post("/api/register", async (req, res) => {
    const user = req.body;

    if (!user.firstName || !user.lastName || !user.email || !user.dob || !user.password){
        res.status(400).json({success: false, message: "Please provide all fields"})
    }

    const newUser = new NewUser(user);

    try {
        await newUser.save();
        res.status(200).json({success: true, data: newUser});
    } catch (error) {
        console.error(`Error in creating user ${error.message}`);
        res.status(500).json({success: false, message: "Server Error"})
    }
});

app.delete("/api/delete/:id", async (req, res) => {
    const {id} = req.params
    try {
        await NewUser.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "User deleted successfully"})
    } catch (error) {
        res.status(404).json({success: false, message: 'User with Id not found'})
    }
});


app.listen(3000, () => {
    connectDB();
    console.log('Server started at http://localhost:3000')
})

