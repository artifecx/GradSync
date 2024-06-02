const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema(
    {
        application_id: { type: mongoose.Schema.Types.ObjectId, ref: "Application", required: true },
        appointment_date: { type: Date, required: true },
    },
    { timestamps: true }
);

const AppointmentModel = mongoose.model("Appointment", AppointmentSchema);
module.exports = AppointmentModel;
