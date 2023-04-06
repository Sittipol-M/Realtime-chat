import mongoose from "mongoose";

const connectMongoDB = () => {
  mongoose.connect(process.env.MONGO_URL);
};

export { connectMongoDB };
