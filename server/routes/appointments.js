
const router = require("express").Router();
const { Appointment, validateAppointment } = require("../models/appointment");
const Doctor = require("../models/Doctor");
const { User } = require("../models/user");
const mongoose = require("mongoose");


const updateTimeSlot = async (doctor, slotDate, slotTime, status) => {
  const formattedSlotDate = new Date(slotDate).toISOString().split("T")[0];

  console.log(
    "formattedSlotDate, slotTime, status: ",
    formattedSlotDate,
    slotTime,
    status
  );
  const slot = doctor.slots.find((slot) => slot.date === formattedSlotDate);
  console.log("slot: ", slot);

  if (slot) {
    const timeSlot = slot.times.find((t) => t.time === slotTime);
    console.log("timeSlot: ", timeSlot);
    if (timeSlot) {
      timeSlot.status = status;
      await doctor.save();
      return true;
    }
  }

  return false;
};

// Book an appointment
router.post("/", async (req, res) => {
  const { error } = validateAppointment(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { doctorId, patientId, slotDate, slotTime, status } = req.body;

  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).send("Doctor not found");

    const patient = await User.findById(patientId);
    if (!patient) return res.status(404).send("Patient not found");

    const existingAppointment = await Appointment.findOne({
      doctorId,
      slotDate,
      slotTime,
    });
    if (existingAppointment) {
      return res.status(400).send("The selected time slot is already booked.");
    }

    const isSlotUpdated = await updateTimeSlot(
      doctor,
      slotDate,
      slotTime,
      "booked"
    );
    if (!isSlotUpdated) {
      return res.status(400).send("Time slot not available or invalid");
    }

    // Create and save the appointment
    const appointment = new Appointment({
      doctorId,
      patientId,
      slotDate,
      slotTime,
      status: status || "booked",
    });

    await appointment.save();
    res
      .status(201)
      .send({ message: "Appointment booked successfully", appointment });
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong while booking the appointment");
  }
});

// Get appointment by ID
router.get("/:id", async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).send("Appointment not found");
    res.send(appointment);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send("Something went wrong while retrieving the appointment");
  }
});

router.get("/", async (req, res) => {
  const { doctorId, slotDate, slotTime, patientId } = req.query;
  console.log(
    "patientId: " +
      patientId +
      ", doctorId: " +
      doctorId +
      ", slotDate: " +
      slotDate +
      ", slotTime: " +
      slotTime
  );

  let filter = {};

  if (doctorId) filter.doctorId = doctorId;
  if (slotDate) filter.slotDate = slotDate;
  if (slotTime) filter.slotTime = slotTime;
  if (patientId) {
    filter.patientId = new mongoose.Types.ObjectId(patientId);
  }
  try {
    console.log("filter: " + JSON.stringify(filter, null, 2));
    const appointments = await Appointment.find(filter);
    console.log(
      "appointments: " +
        appointments +
        " : " +
        JSON.stringify(appointments, null, 2)
    );
    res.send(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong while retrieving appointments");
  }
});

// Update an appointment
router.put("/:id", async (req, res) => {
  const { error } = validateAppointment(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!appointment) return res.status(404).send("Appointment not found");
    res.send({ message: "Appointment updated successfully", appointment });
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong while updating the appointment");
  }
});

// Delete an appointment
router.delete("/:id", async (req, res) => {
  try {
    console.log("Deleting appointment: " + req.params.id);
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    console.log("Deleted appointment: " + appointment);
    if (!appointment) return res.status(404).send("Appointment not found");

    const doctor = await Doctor.findById(appointment.doctorId);
    console.log("Doctor: " + doctor);
    if (!doctor) return res.status(404).send("Doctor not found");

    // Update the doctor's time slot to 'available'
    console.log("appointment.slotDate: " + appointment.slotDate);
    const isSlotUpdated = await updateTimeSlot(
      doctor,
      appointment.slotDate,
      appointment.slotTime,
      "available"
    );
    console.log("Updated doctor's time slot: " + isSlotUpdated);
    if (!isSlotUpdated) {
      return res.status(400).send("Time slot not available or invalid");
    }

    res.send({ message: "Appointment deleted successfully", appointment });
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong while deleting the appointment");
  }
});

module.exports = router;
