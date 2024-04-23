const express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 12;
const User = require('./')

const app = express();

app.post('/register', async(req, res) =>{
    try{
        const { first_name, last_name, email, position,  password } = req.body;
        
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await User.create({
            first_name: first_name,
            last_name: last_name,
            email: email,
            position: position,
            password: hashedPassword
        });

        res.json({ message: 'User registered successfully', user: newUser });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'An error occurred' });
    }
})

module.exports = app;