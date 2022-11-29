/**
    Rutas de Eventos / Events
    host + /api/events
 */

const { Router } = require('express')
const { validateJWT } = require('../middlewares/validate_JWT')
const { fieldValidator } =require('../middlewares/field-validator')
const { isDate } = require('../helpers/isDate')
const { createEvent,getEvents,deleteEvent,updateEvent} = require("../controllers/events")
const { check } = require('express-validator')


const router  = Router()

router.use(validateJWT)

// Obtener eventos
router.get('/', getEvents)
// Crear nuevo evento
router.post('/',
    [
        // check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio obligatoria').custom(isDate),
        check('end', 'Fecha de finalizacion obligatoria').custom(isDate),
        fieldValidator,
    ],
    createEvent)
// Actualizar evento
router.put('/:id', updateEvent)
// Borrar evento
router.delete('/:id', deleteEvent)

module.exports = router