const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
 try{
    const { userId, password, role } = req.body;

    const existing = await User.findOne({ userId });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        userId,
        password: hashedPassword,
        role
    });

    return res.status(201).json({ message: 'User registered successfully', userId: user.userId, role: user.role });
}
  catch(error){
    console.log("Internal server error",error);
    return res.json({error:"Internal server error"})
  }
};

const loginUser = async (req, res) => {
 try{
     const { userId, password } = req.body;

  const user = await User.findOne({ userId });
  if (!user) return res.status(400).json({ message: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign(
    { id: user._id, userId: user.userId, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  return res.json({ token, user: { userId: user.userId, role: user.role } });
}
catch(err){

}
};

const getLoggedUser = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
};

const getDummyRecords = async (req, res) => {
  const { delay = 0 } = req.query;
  const records = [
    { id: 1, info: "Record A" },
    { id: 2, info: "Record B" },
    { id: 3, info: "Record C" }
  ];

  setTimeout(() => {
    res.json({ role: req.user.role, records });
  }, parseInt(delay));
};

const adminGetAllUsers = async (req, res) => {
  if (req.user.role !== 'Admin') return res.status(403).json({ message: 'Access denied' });

  const users = await User.find().select('-password');
  res.json(users);
};

module.exports = {
  registerUser,
  loginUser,
  getLoggedUser,
  getDummyRecords,
  adminGetAllUsers
};
