const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

console.log("Starting test...");
console.log("MongoDB URI:", process.env.MONGO_URI);

const connectDB = async () => {
  try {
    console.log("Attempting to connect to MongoDB...");
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Test creating a simple document
    const testSchema = new mongoose.Schema({ name: String });
    const TestModel = mongoose.model("Test", testSchema);

    const testDoc = new TestModel({ name: "test" });
    await testDoc.save();
    console.log("Test document created successfully");

    await TestModel.deleteMany();
    console.log("Test document deleted");

    process.exit(0);
  } catch (error) {
    console.error("Error:", error.message);
    console.error("Stack:", error.stack);
    process.exit(1);
  }
};

connectDB();
