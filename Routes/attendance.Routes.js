const express = require('express');
const router = express.Router();
const { authenticateToken} = require('../middleware/auth');
const {addAttendance, updateAttendance} = require('../controller/attendance.Controoler');

// Add Attendance
router.post('/',authenticateToken,addAttendance)

//Update Attendance
router.put('/update/:id',authenticateToken,updateAttendance)

module.exports = router