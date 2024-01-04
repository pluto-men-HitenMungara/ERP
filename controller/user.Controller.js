const express = require('express');
const router = express.Router();
const Users = require('../models/User.model');

const addUser = async(req,res) => {
    let user = new Users(req.body);
    try{
        const token = await user.generateAuthToken();  //Genrating Auhtentication token;
        res.status(201).send(user);  //Sending response with user id and 
    }catch(e){
        res.status(400).send(e)
    }
}

module.exports = {addUser}