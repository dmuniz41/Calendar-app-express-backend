const {response} = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const  { generarJWT } = require('../helpers/jwt')

const createUser = async(req, res = response)=>{

    const {email, password} = req.body

    try {

        let user = await User.findOne({email})

        if(user){
            return res.status(400).json({
                ok: false, 
                msg: 'Ya existe un usuario con este correo'
            })
        }

        user = new User(req.body)
        //Ecriptar contrasenna
        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync(password,salt)

        await user.save();
        //Generar JWT
        const token = await generarJWT(user.id, user.name)

        return res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token,
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Problemas al grabar en BD'
        })
    }
}

const loginUser = async(req, res = response)=>{

    const { email, password} = req.body

    try {
        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({
                ok: false, 
                msg: 'El usuario no existe con ese email'
            })
        }

        // Confirmar contrasennas
        const validPassword = bcrypt.compareSync(password,user.password)
        if(!validPassword){
            res.status(400).json({
                ok: false,
                msg: 'Contrasenna incorrecta'
            })
        }
        
        // Generar JWT
        const token = await generarJWT(user.id, user.name)


        res.status(200).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token,
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Problemas al grabar en BD'
        })
    }
}

const renewToken = async(req, res = response)=>{

    const uid  = req.uid
    const name =  req.name

    const token  = await generarJWT(uid, name)

    return res.json({
        ok: true,
        uid,
        name,
        token,
    })
}

module.exports = {
    createUser,
    loginUser,
    renewToken,
}