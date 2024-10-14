const mongoose = require('mongoose');
const Joi = require('joi');

const appointmentSchema = new mongoose.Schema({
    doctorId: { type: String, ref: 'Doctor', required: true },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true }, 
    slotDate: { type: Date, required: true },
    slotTime: { type: String, required: true }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

const validateAppointment = (data) => {
    console.log(data);

    const schema = Joi.object({
        doctorId: Joi.string().required().label('Doctor ID'),
        patientId: Joi.string().required().label('Patient ID'), 
        slotDate: Joi.date().required().label('Slot Date'),
        slotTime: Joi.string().required().label('Slot Time'),
    });

    return schema.validate(data);
};

module.exports = { Appointment, validateAppointment};

