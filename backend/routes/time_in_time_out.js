const express = require('express');
const TimeInAndOut = require("../model/time_in_out.model");

const app = express();

app.post("/time_in", async (req, res) =>{
    const { user_Id, time_in } = req.body;

    if(!user_Id){
        return res.status(400).json({ error: 'No User ID' });
    }

    try{
        const timeIn = await TimeInAndOut.create({
            user_Id,
            time_in: time_in
        });

        return res.status(201).json(timeIn);
    }catch(err){
        console.error(err);
        return res.status(500).json({ error: 'An error occurred while trying to time in'});
    }
});

app.put('/time_out/:id', async(req, res) =>{
    try{
        const time_out_Id = req.params.id;
        // const time_out = new Date();
        const {time_out} = req.body;

        const updated_data = await TimeInAndOut.update({time_out: time_out}, {
            where: {                                                                                        
                Id: time_out_Id
            }
        });

        if(updated_data[0] === 0){
            res.status(404).json({ message: 'Update failed. Record not found.'});
        }else{
            res.status(200).json({ message: 'Record updated successfully.'});
        }

    }catch(err){
        res.status(500).json({message: 'An error occured' + err});
    }
})

module.exports = app;