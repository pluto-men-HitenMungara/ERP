const express = require('express');
const router = express.Router();
const Attendance = require('../models/attendance.model');
const Student = require('../models/student.model');

const addAttendance = async(req,res) => {
    try{
        const { studentId, isPresent } = req.body;
 
        //check if student exist
        const student = await Student.findById(studentId);
        if (!student) {
          return res.status(400).send("Student Not Found")
        }

        //Mark attendance
        const attendance = new Attendance({ studentId, isPresent });
        await attendance.save();
        res.json(attendance);
    }catch(e){
        res.status(400).send("Internal Server Error :",e);
    }
}

const updateAttendance = async(req,res) => {
    try {
        const attendance = await Attendance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
        if (!attendance) {
          return res.status(404).send("Attendance record not found!"); // if attendance record does not exist
        }
    
        res.send(attendance);
      } catch (err) {
        res.status(500).send(err); // Use 500 for internal server error
      }
}

module.exports = {addAttendance, updateAttendance}