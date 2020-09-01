const router = require('express').Router();
const Score = require('../db/models/score');
const Condition = require('../db/models/condition');
const Doctor = require('../db/models/doctor');
const Appointment = require('../db/models/appointment');
const Medication = require('../db/models/medication');
const DailyMed = require('../db/models/dailyMed');
module.exports = router;

// router.get('/score', async (req, res, next) => {
//   try {
//     const conditions = await Condition.findAll({
//       where: {
//         userId: req.user.id,
//       }
//     });
//     if (conditions) res.status(200).json(conditions);
//   } catch (error) {
//     next(error);
//   }
// });
router.post('/score', async (req, res, next) => {
  try {
    const userId = req.user.id;
    const rate = req.body.rate.rate;
    const date = req.body.rate.date;
    const notes = req.body.rate.notes;
    const conditionId = req.body.rate.conditionId;
    const condition = await Condition.findOne({
      where: {
        id: conditionId
      }
    });
    const name = condition.name;
    const newScore = await Score.create({rate, date, notes, conditionId, userId, name});
    res.status(201).json(newScore);
  } catch (error) {
    next(error);
  }
});

router.get('/dcscore', async (req, res, next) => {
  try {
    const date = new Date();
    const conditions = await Score.findAll({
      where: {
        userId: req.user.id,
        date
      }
    });
    if (conditions) res.status(200).json(conditions);
  } catch (error) {
    next(error);
  }
});

// router.get('/appointment', async (req, res, next) => {
//   try {
//     const appointments = await Appointment.findAll({
//       where: {
//         userId: req.user.id,
//       }
//     });
//     if (appointments) res.status(200).json(appointments);
//   } catch (error) {
//     next(error);
//   }
// });
router.post('/appointment', async (req, res, next) => {
  try {
    const userId = req.user.id;
    const time = req.body.appointmentDate.time;
    const doctorId = req.body.appointmentDate.doctorId;
    const doctor = await Doctor.findOne({
      where: {
        id: doctorId
      }
    })
    const firstName = doctor.firstName;
    const lastName = doctor.lastName;
    const newAppointment = await Appointment.create({time, doctorId, userId, firstName, lastName});
    res.status(201).json(newAppointment);
  } catch (error) {
    next(error);
  }
});

router.get('/dcappointment', async (req, res, next) => {
  try {
    const date = new Date();
    const appointments = await Appointment.findAll({
      where: {
        userId: req.user.id,
        appointmentDate: date
      }
    });
    if (appointments) res.status(200).json(appointments);
  } catch (error) {
    next(error);
  }
});

// router.get('/meds', async (req, res, next) => {
//   try {
//     const medications = await Medication.findAll({
//       where: {
//         userId: req.user.id,
//       }
//     });
//     if (medications) res.status(200).json(medications);
//   } catch (error) {
//     next(error);
//   }
// });
router.post('/meds', async (req, res, next) => {
  try {
    const userId = req.user.id;
    const notes = req.body.notes.notes;
    const medicationId = req.body.notes.medicationId;
    const medication = await Medication.findOne({
      where: {
        id: medicationId
      }
    });
    const name = medication.name;
    const newDailyMed = await DailyMed.create({notes, medicationId, userId, name});
    res.status(201).json(newDailyMed);
  } catch (error) {
    next(error);
  }
});

router.get('/dcmeds', async (req, res, next) => {
  try {
    const date = new Date();
    const medications = await DailyMed.findAll({
      where: {
        userId: req.user.id,
        date
      }
    });
    if (medications) res.status(200).json(medications);
  } catch (error) {
    next(error);
  }
});
