/**
    Rutas de Usuarios / Auth
    host + /api/auth
 */
const {Router} = require('express')
const { createUser, loginUser, renewToken } = require('../controllers/auth')
const router  = Router()
const {check} = require('express-validator')

router.post(
        '/new',
         [ //Middelwares
            check('name', 'El name es obligatorio').not().isEmpty(),
            check('email', 'El email es obligatorio').isEmail(),
            check('password', 'El password debe ser de 6 caracteres').isLength({ min: 6 }),
         ],
         createUser)

router.post(
    '/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser de 6 caracteres').isLength({ min: 6 }),
    ],
     loginUser)

router.get('/renew', renewToken)

module.exports = router