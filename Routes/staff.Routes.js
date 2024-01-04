const express = require('express');
const router = express.Router();
const { authenticateToken, checkStaffRole} = require('../middleware/auth');
const stffController = require("../controller/staff.Controller");

//add Student
router.post('/student',authenticateToken, checkStaffRole, stffController.addStudent)

//delete student
router.delete('/students/delete/:id',authenticateToken, checkStaffRole, stffController.deleteStudent);

module.exports = router