const express = require("express");
const router = express.Router();
const Student = require("../models/student.model");
const Users = require("../models/User.model");
const Department = require("../models/department.model");
const Attendance = require("../models/attendance.model");

const addStaff = async (req, res) => {
  try {
    let user = new Users({
      ...req.body,
      userRoles: "staff",
    });
    const token = await user.generateAuthToken();
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

const deleteStaff = async (req, res) => {
  try {
    let user = await Users.findByIdAndDelete(req.params.id);

    if (!user) return res.status(400).send("User not found!"); // if User exist

    await user.save(); // Delete User
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

const updateStaff = async (req, res) => {
  try {
    const user = await Users.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) return res.status(400).send("User not found!"); //If User exist
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
};

const addStudent = async (req, res) => {
  let student = new Student(req.body);
  try {
    await student.save(); //save student
    res.status(201).send(student);
  } catch (err) {
    res.status(400).send(err);
  }
};

const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!student) return res.status(400).send("Student not Found!"); // If student exist
    res.send(student);
  } catch (err) {
    res.status(500).send(err);
  }
};

const deleteStudent = async (req, res) => {
  const studentId = req.params.id;
  try {
    const student = await Student.findByIdAndDelete(studentId);
    if (!student) {
      return res.status(404).send({ error: "Student not found" });
    }
    await Attendance.deleteMany({ studentId });
    res.send(student);
  } catch (e) {
    res.status(500).send(e);
  }
};

const addDepartment = async (req, res) => {
  let department = new Department(req.body);
  try {
    await department.save();
    res.status(201).send(department);
  } catch (err) {
    res.status(400).send(err);
  }
};

const deleteDepartment = async (req, res) => {
  try {
    let department = await Department.findByIdAndDelete(req.params.id);

    if (!department) return res.status(400).send("Department not found!"); // if department exist

    await department.save(); // Delete department
    res.send(department);
  } catch (err) {
    res.status(400).send(err);
  }
};

const queryAnlytics = async (req, res) => {
  try {
    const result = await Student.aggregate([
      {
        $group: {
          _id: { year: "$batch", department: "$department" },
          totalStudents: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: "$_id.year",
          maxTotalStudents: { $max: "$totalStudents" },
          branches: {
            $push: {
              department: "$_id.department",
              totalStudents: "$totalStudents",
            },
          },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const vacantSeat = async (req, res) => {
  try {
    const { batch, branch } = req.query;

    const matchConditions = {};

    if (batch) {
      matchConditions.batch = batch;
    }

    if (branch) {
      matchConditions.department = branch;
    }

    const students = await Student.find(matchConditions);

    const totalStudents = students.length;
    const totalStudentsIntake = 2000; // Adjust this based on your actual total intake

    const availableIntake = totalStudentsIntake - totalStudents;

    const branches = {};

    // Assuming you have a 'department' field in your StudentModel
    const departments = [
      ...new Set(students.map((student) => student.department)),
    ];

    for (const department of departments) {
      const departmentStudents = students.filter(
        (student) => student.department === department
      );
      const departmentTotalStudents = departmentStudents.length;
      const departmentTotalStudentsIntake = 1000; // Adjust this based on your actual department intake

      const departmentAvailableIntake =
        departmentTotalStudentsIntake - departmentTotalStudents;

      branches[department] = {
        totalStudents: departmentTotalStudents,
        totalStudentsIntake: departmentTotalStudentsIntake,
        availableIntake: departmentAvailableIntake,
      };
    }

    const result = {
      batch: parseInt(batch),
      totalStudents,
      totalStudentsIntake,
      availableIntake,
      branches,
    };

    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const absentStudent = async (req, res) => {
  try {
    const { batch, branch, semester, date } = req.query;

    // Validate that all required parameters are present
    // if (!batch || !branch || !semester || !date) {
    //   return res.status(400).json({ error: "Missing required parameters" });
    // }

    // Find absent students for the specific date
    const absentStudents = await Attendance.find({
      date: new Date(date),
      isPresent: false,
    }).populate({
      path: "studentId",
      match: {
        batch,
        department: branch,
        currentSemester: semester,
      },
      select: "name phoneNumber department batch currentSemester",
    });

    res.json(absentStudents);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  addStaff,
  deleteStaff,
  updateStaff,
  addStudent,
  updateStudent,
  deleteStudent,
  addDepartment,
  deleteDepartment,
  queryAnlytics,
  vacantSeat,
  absentStudent,
};
