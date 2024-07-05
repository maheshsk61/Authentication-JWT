const mongoose=require('mongoose')
const connectDB=()=>{
  mongoose.connect('mongodb://localhost:27017/auth',)
  .then(()=>{
    console.log('DB connected');
  })
  .catch((e)=>{
    console.error(e.message);
    console.log('DB connection failed');
  })
}
module.exports=connectDB