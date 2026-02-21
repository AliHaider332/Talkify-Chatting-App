import mongoose from 'mongoose';
async function ConnectMongoDB(params) {
  await mongoose.connect(process.env.MONGODB);
  console.log('DB connected Successfully');
}
export default ConnectMongoDB;
