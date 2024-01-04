const express = require('express');
const router = express.Router();
const { authenticateToken, checkStaffRole} = require('../middleware/auth');
const {addStudent, deleteStudent} = require("../controller/staff.Controller");

//add Student
router.post('/student',authenticateToken, checkStaffRole, addStudent)

//delete student
router.delete('/students/delete/:id',authenticateToken, checkStaffRole, deleteStudent);

module.exports = router