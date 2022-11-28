/**
    Rutas de Eventos / Events
    host + /api/events
 */

const { Router } = require('express')
const { validateJWT } = require('../middlewares/validate_JWT')
const {  createEvent,getEvents,deleteEvent,updateEvent} = require("../controllers/events")


const router  = Router()


// Obtener eventos
router.get('/',validateJWT, getEvents)
// Crear nuevo evento
router.post('/',validateJWT, createEvent)
// Actualizar evento
router.put('/',validateJWT, updateEvent)
// Borrar evento
router.delete('/:id',validateJWT, deleteEvent)

module.exports = router