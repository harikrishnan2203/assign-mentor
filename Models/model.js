const mongoose = require("mongoose");

// Define the schema for the "student" collection
const createStudentSchema = new mongoose.Schema(
  {
    Name: { type: String, required: true },
    currentMentor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mentor", // Reference to the "Mentor" model
      default: null,
    },
    previousMentors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mentor",
      },
    ],
  },
  {
    collection: "Student", // Specify the collection name
    versionKey: false, // Disable versioning (e.g., __v field)
  }
);

// Create the "student" model based on the schema
const Student = mongoose.model("Student", createStudentSchema);



// Define the schema for the "student" collection
const createMentorSchema = new mongoose.Schema(
  {
    Name: { type: String, required: true },
    Students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
  },
  {
    collection: "Mentor", // Specify the collection name
    versionKey: false, // Disable versioning (e.g., __v field)
  }
);

// Create the "Mentor" model based on the schema
const Mentor = mongoose.model("Mentor", createMentorSchema);

// Export the model for use in other parts of your application
module.exports = {
  Student,
  Mentor,
};
