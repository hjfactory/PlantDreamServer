"use strict";

const router = require('express').Router();
const Sequelize = require('sequelize');
const { sequelize } = require('../models');
const User = require('../models/user')(sequelize, Sequelize.DataTypes);

router.get('/login', (req, res) => {
    // res.send(
    //     {
    //         request: "json format: require email, password(e.g. {email: ~~~, password: ~~~})", 
    //         response: {
    //             success: "status: 200, msg: 'success'", 
    //             failed: "status: 404, msg: 'failed'"
    //         }
    //     }
    // );
    console.log(User === sequelize.models.User)
    const users = User.findAll();
    res.json(users);
});

router.post('/login', (req, res) => {
    // res.header("Access-Control-Allow-Origin", "*");
    const {email, password} = req.body;
    console.log(req.body);
    if(email == "jeffondev@gmail.com"){
        res.send({msg: "success"});
    }
    else {
        // res.status(404).send({msg: "failed"});
        res.status(404).send({msg: "failed"});
    }
});

module.exports = router;