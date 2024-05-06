const express = require('express');
const TimeInAndOut = require("../model/time_in_out.model");

const app = express();

app.post("/time_in", async (req, res) =>{
    const { user_Id } = req.body;

    if(!user_Id){
        return res.status(400).json({ error: 'No User ID' });
    }

    try{
        const timeIn = await TimeInAndOut.create({
            user_Id,
            time_in: new Date()
        });

        return res.status(201).json(timeIn);
    }catch(err){
        console.error(err);
        return res.status(500).json({ error: 'An error occurred while trying to time in'});
    }
});

app.post("/time_out", async(req, res) =>{
    
})

module.exports = app;