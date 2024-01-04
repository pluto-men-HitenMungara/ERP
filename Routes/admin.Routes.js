const express = require("express");
const router = express.Router();
const { authenticateToken, checkAdminRole } = require("../middleware/auth");
const adminController = require("../controller/admin.Controller");

//Add Staff
router.post("/Staff", authenticateToken, checkAdminRole, adminController.addStaff);

//Delete User
router.delete(
  "/staff/delete/:id",
  authenticateToken,
  checkAdminRole,
  adminController.deleteStaff
);

// Update Staff
router.put("/Staff/update/:id", authenticateToken, checkAdminRole, adminController.updateStaff);

//Add Student
router.post("/student", authenticateToken, checkAdminRole, adminController.addStudent);

// update student
router.put("/student/:id", authenticateToken, checkAdminRole, adminController.updateStudent);

// Delete student
router.delete("/student/delete/:id", authenticateToken, checkAdminRole, adminController.deleteStudent);

//Add Department
router.post("/departments", authenticateToken, checkAdminRole, adminController.addDepartment);

//Delete Department
router.delete(
  "/department/delete/:id",
  authenticateToken,
  checkAdminRole,
  adminController.deleteDepartment
);

//analytics
router.get(
  "/student-analytics",
  authenticateToken,
  checkAdminRole,
  adminController.queryAnlytics
);

router.get('/absent-students',authenticateToken , checkAdminRole ,adminController.absentStudent );

router.get('/vacant-seats',authenticateToken , checkAdminRole ,adminController.vacantSeat);

module.exports = router;
