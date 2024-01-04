const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  department: {
    type: String,
    required: true,
    trim: true,
  },
  token: {
      type: String,
      required: true
  },
  userRoles: [{ type: String, enum: ['admin', 'staff'], required: true }]
})
 
  userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() },'thismynewtokenforauthentication')

  user.token = token
  await user.save()

  return token
  }; 

const Users = mongoose.model('User',userSchema);

module.exports = Users;
