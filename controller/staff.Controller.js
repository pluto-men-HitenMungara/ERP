const express = require('express');
const router = express.Router();
const Student = require('../models/student.model');
const Attendance = require('../models/attendance.model');

const addStudent = async(req,res) => {
    let student = new Student(req.body);
    try {
        await student.save()  //save student
        res.status(201).send(student)
    } catch (e) {
        res.status(400).send(e)
    }
}

const deleteStudent = async(req,res) => {
    const studentId = req.params.id;
    try {
        const student = await Student.findByIdAndDelete(studentId);
        console.log(studentId)
        if (!student) {
            return res.status(404).send({ error: 'Student not found' });
        }
        await Attendance.deleteMany({ studentId });
        res.send(student);
    } catch (e) {
        console.log(e)
        res.status(500).send(e);
    }
}

module.exports = {addStudent, deleteStudent};