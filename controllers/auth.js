const {response} = require('express')

const createUser = (req, res = response)=>{

    const {name, email, password} = req.body

    if(name.length < 5){
        return res.status(400).json({
            ok: false,
            msg: "El nonmbre debe ser de al menos 5 letras "
        })
    }

    return res.status(201).json({
        ok: true,
        msg: 'registro',
        name,
        email,
        password
    })
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