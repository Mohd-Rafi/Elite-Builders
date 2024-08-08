import mongoose from 'mongoose';

// // const uri = 'mongodb://elite:sample123@localhost:27017/sampleDB';
// import dotenv from 'dotenv';
// dotenv.config();

mongoose
  .connect('mongodb://localhost:27017/elite')
  .then(() => {
    console.log('DB Connected');
  })
  .catch(e => {
    console.log(e);
  });

export default mongoose;
