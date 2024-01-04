const express = require('express');
const router = express.Router();
const { authenticateToken} = require('../middleware/auth');
const attendanceController = require('../controller/attendance.Controoler');

// Add Attendance
router.post('/',authenticateToken,attendanceController.addAttendance)

//Update Attendance
router.put('/update/:id',authenticateToken,attendanceController.updateAttendance)

module.exports = router