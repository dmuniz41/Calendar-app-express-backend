const {response} = require('express')
const Event = require('../models/Events')

const getEvents = async(req, res = response)=>{
    
    const eventList = await Event.find()
                                 .populate('user', 'name')
    
    
    res.status(200).json({
        ok: true,
        eventList
    })
}

const createEvent = async(req, res = response)=>{
 
    const event  = new Event(req.body)

    try {

        event.user = req.uid
        const savedEvent = await event.save()

        res.status(200).json({
            ok: true,
            event: savedEvent
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al crear el evento"
        })
    }
}

const updateEvent = async(req, res = response)=>{
    
    const eventID = req.params.id
    const uid = req.uid
    
    try {
        const event = await Event.findById(eventID)

        if(!event){
            return res.status(404).json({
                ok: false,
                msg: "No existe un evento con ese ID"
            })
        }

        if(event.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: "No esta autorizado para editar este evento"
            })
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const updatedEvent = await Event.findByIdAndUpdate(eventID,newEvent, {new: true})

        res.status(200).json({
            ok: true,
            updatedEvent
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Error al actualizar el evento"
        })
    }
}

const deleteEvent = async(req, res = response)=>{
    const eventID = req.params.id
    const uid = req.uid
    
    try {
        const event = await Event.findById(eventID)

        if(!event){
            return res.status(404).json({
                ok: false,
                msg: "No existe un evento con ese ID"
            })
        }

        if(event.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: "No esta autorizado para eliminar este evento"
            })
        }

        const deletedEvent = await Event.findByIdAndRemove(eventID)

        res.status(200).json({
            ok: true,
            msg:"Evento eliminado",
            deletedEvent
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Error al eliminar el evento"
        })
    }
}

module.exports = {
    createEvent,
    deleteEvent,
    updateEvent,
    getEvents
}