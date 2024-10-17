const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  _id: String,
  name: String,
  image: String,
  speciality: String,
  degree: String,
  experience: String,
  about: String,
  fees: String,
  address: {
    line1: String,
    line2: String,
  },
  slots: [
    {
      date: String,
      day: String,
      times: [
        {
          time: String,
          status: String,
        },
      ],
    },
  ],
});

const Doctor = mongoose.model("doctor", doctorSchema);

module.exports = Doctor;
