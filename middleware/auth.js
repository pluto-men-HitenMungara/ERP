const jwt = require('jsonwebtoken');
const Users = require("../models/User.model");

const authenticateToken = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace("Bearer ", "");  // receive token from header

    if (!token) return res.status(401).send('Access Denied');

    const decoded = jwt.verify(token, 'thismynewtokenforauthentication');
    const user = await Users.findOne({ _id: decoded._id, 'token': token });
    const userRoles = await Users.findOne({ _id: decoded._id, 'token': token }, { userRoles: 1, _id: 0 });

    req.userRoles = userRoles ? userRoles.userRoles : [];
    console.log(req.userRoles)

    req.user = user;
    next();
  } catch (err) {
    res.status(500).send(err);
  }
};

const checkAdminRole = (req, res, next) => {
  if (req.userRoles.includes('admin')) {
    next();
  } else {
    res.status(403).send('Unauthorized. Admins only.');
  }
};

const checkStaffRole = (req, res, next) => {
  if (req.userRoles.includes('staff')) {
    next();
  } else {
    res.status(403).send('Unauthorized. Staff only.');
  }
};

module.exports = {
  authenticateToken,
  checkStaffRole,
  checkAdminRole
}
