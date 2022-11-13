const {response} = require('express')
const { validationResult } = require('express-validator')
const User = require('../models/User')

const createUser = async(req, res = response)=>{

    // const {name, email, password} = req.body

    try {

        const user = new User(req.body)
        await user.save();
    
        return res.status(201).json({
            ok: true,
            msg: 'registro',
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Problemas al grabar en BD'
        })
    }

}

const loginUser = (req, res = response)=>{

    const { email, password} = req.body

    return res.json({
        ok: true,
        msg: 'login',
        email, password
    })
}

const renewToken = (req, res = response)=>{

    return res.json({
        ok: true,
        msg: 'renew'
    })
}

module.exports = {
    createUser,
    loginUser,
    renewToken,
}