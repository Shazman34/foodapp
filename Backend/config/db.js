import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // 👇 This now uses the variable from your .env file
    await mongoose.connect(process.env.MONGODB_URI);

    // ... inside the try block after await mongoose.connect ...
    
    console.log(`MongoDB Connected Successfully to: ${mongoose.connection.host}`);
    
    // ...
  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;