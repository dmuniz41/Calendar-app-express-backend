/**
    Rutas de Usuarios / Auth
    host + /api/auth
 */
const {Router} = require('express')
const { createUser, loginUser, renewToken } = require('../controllers/auth')
const {check} = require('express-validator')
const { fieldValidator } = require('../middlewares/field-validator')

const router  = Router()

router.post(
        '/new',
         [ //Middelwares
            check('name', 'El name es obligatorio').not().isEmpty(),
            check('email', 'El email es obligatorio').isEmail(),
            check('password', 'El password debe ser de 6 caracteres').isLength({ min: 6 }),
            fieldValidator,
         ],
         createUser)

router.post(
    '/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser de 6 caracteres').isLength({ min: 6 }),
        fieldValidator,
    ],
     loginUser)

router.get('/renew', renewToken)

module.exports = router