const router = require('express').Router();
const { Appointment, validateAppointment } = require('../models/appointment'); 


router.post('/', async (req, res) => {
    const { error } = validateAppointment(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { doctorId, patientId, slotDate, slotTime } = req.body;

    const appointment = new Appointment({
        doctorId,
        patientId,
        slotDate,
        slotTime
    });

    try {
        await appointment.save();
        res.status(201).send({ message: 'Appointment booked successfully', appointment });
    } catch (err) {
        console.error(err);
        res.status(500).send('Something went wrong while booking the appointment');
    }
});


router.get('/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) return res.status(404).send('Appointment not found');
        res.send(appointment);
    } catch (err) {
        console.error(err);
        res.status(500).send('Something went wrong while retrieving the appointment');
    }
});


router.get('/', async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.send(appointments);
    } catch (err) {
        console.error(err);
        res.status(500).send('Something went wrong while retrieving appointments');
    }
});


router.put('/:id', async (req, res) => {
    const { error } = validateAppointment(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!appointment) return res.status(404).send('Appointment not found');
        res.send({ message: 'Appointment updated successfully', appointment });
    } catch (err) {
        console.error(err);
        res.status(500).send('Something went wrong while updating the appointment');
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndRemove(req.params.id);
        if (!appointment) return res.status(404).send('Appointment not found');
        res.send({ message: 'Appointment deleted successfully', appointment });
    } catch (err) {
        console.error(err);
        res.status(500).send('Something went wrong while deleting the appointment');
    }
});

module.exports = router;
