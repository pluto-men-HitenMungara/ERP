const express = require("express");
const router = express.Router();
const { authenticateToken, checkAdminRole } = require("../middleware/auth");
const {
  addStaff,
  deleteStaff,
  addStudent,
  updateStaff,
  updateStudent,
  deleteStudent,
  deleteDepartment,
  addDepartment,
  queryAnlytics,
  vacantSeat,
  absentStudent
} = require("../controller/admin.Controller");

//Add Staff
router.post("/Staff", authenticateToken, checkAdminRole, addStaff);

//Delete User
router.delete(
  "/staff/delete/:id",
  authenticateToken,
  checkAdminRole,
  deleteStaff
);

// Update Staff
router.put("/Staff/update/:id", authenticateToken, checkAdminRole, updateStaff);

//Add Student
router.post("/student", authenticateToken, checkAdminRole, addStudent);

// update student
router.put("/student/:id", authenticateToken, checkAdminRole, updateStudent);

// Delete student
router.delete("/student/delete/:id", authenticateToken, checkAdminRole, deleteStudent);

//Add Department
router.post("/departments", authenticateToken, checkAdminRole, addDepartment);

//Delete Department
router.delete(
  "/department/delete/:id",
  authenticateToken,
  checkAdminRole,
  deleteDepartment
);

//analytics
router.get(
  "/student-analytics",
  authenticateToken,
  checkAdminRole,
  queryAnlytics
);

router.get('/absent-students',authenticateToken , checkAdminRole ,absentStudent );

router.get('/vacant-seats',authenticateToken , checkAdminRole ,vacantSeat);

module.exports = router;
