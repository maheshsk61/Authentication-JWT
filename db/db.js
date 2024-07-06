const mongoose = require('mongoose')
const connectDB = async () => {
  try {
    mongoose.connect('mongodb://localhost:27017/UserDB')
    console.log('DB connected');
  }
  catch (e) {
    console.error(e.message);
    console.log('DB connection failed');
  }
}
module.exports = connectDB
