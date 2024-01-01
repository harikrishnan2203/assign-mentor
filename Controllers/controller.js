const { Student } = require('../Models/model');
const { Mentor } = require('../Models/model');

// API Endpoint for create a Student 
const createStudent = async (req, res) => {
    try {
        const { Name } = req.body;

        if (!Name) {
            return res.status(400).json({
                error: "Name is mandatory",
            });
        }

        const studentExists = await Student.findOne({ Name });

        if (studentExists) {
            return res.status(400).json({
                message: "Student with the same name already exists",
            });
        }

        const student = await Student.create(req.body);

        const allStudents = await Student.find()

        res.status(201).json({
            message: "Student created successfully",
            student,
            All_Students : allStudents
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

// API Endpoint for get All students in DB

const getAllStudents = async (req, res) => {
    try {
        const allStudents = await Student.find();

        if (allStudents.length === 0) {
            return res.status(404).json({
                message: "No students found",
            });
        }

        res.status(200).json({
            message: "Students fetched successfully",
            Count: allStudents.length,
            All_Students : allStudents
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};


// API Endpoint for create a Mentor

const createMentor = async (req, res) => {
    try {
        const { Name } = req.body;
        if (!Name) {
            return res.status(400).json({
                message:"Name is mandatory"
            })
        }

        const mentorExists = await Mentor.findOne({ Name })
        if (mentorExists) {
            return res.status(400).json({
                message:"Mentor with the same name already exists"
            })
        }

        const mentor = await Mentor.create(req.body);
        const allMentors = await Mentor.find()
        res.status(201).json({
            message: "Mentor created successfully",
            mentor,
            All_Mentors : allMentors
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
}


// API End point for get All mentors in DB

const getAllMentor = async (req, res) => {
    try {
        const allMentors = await Mentor.find()

        res.status(200).json({
            message: "Mentors fetched Successfully",
            Count: allMentors.length,
            All_Mentors : allMentors
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
}


// API End point for Assign Mentor for a student

const assignMentor = async (req, res) => {
    try {
        const { studentId, mentorId } = req.params;
        // console.log(studentId, mentorId)

        // Check if the student exists
        const studentExists = await Student.findById(studentId)
        // console.log(studentExists)
        if (!studentExists) {
            return res.status(404).json({
                message: "Student not found",
            })
        }
        if (studentExists.currentMentor != null) {
            return res.status(400).json({
                message: "The student already has a mentor. Please follow the Change Mentor Process."
            })
        }

        // Check if the Mentor exists
        const mentorExists = await Mentor.findById(mentorId)
        // console.log(mentorExists)
        if (!mentorExists) {
            return res.status(404).json({
                message: "Mentor not found",
            })
        }

        // Update student document
        const updateStudent = await Student.findByIdAndUpdate(
            studentId,
            {currentMentor : mentorId},
            {new: true}
        )
        
        // Update mentor document
        const updateMentor = await Mentor.findByIdAndUpdate(
            mentorId,
            {$addToSet : {Students : studentId}},
            {new : true}
        )

        const studentsWithoutMentor = await Student.find({ currentMentor: { $in: [null, undefined] } })

        res.status(200).json({
            message: "Mentor Assigned Successfully",
            Student : updateStudent,
            AssignedMentor : updateMentor,
            studentsWithoutMentor : studentsWithoutMentor
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }   
}


// API End point for Change Mentor

const changeMentor = async (req, res) => {
    try {
      const { studentId, newMentorId } = req.params;
      console.log(studentId, newMentorId);
  
      const studentExists = await Student.findById(studentId);
      if (!studentExists) {
        return res.status(404).json({
          message: "Student not Found",
        });
      }

      if (newMentorId.toString() === studentExists.currentMentor.toString()) {
        console.log(true) // Debuging
        return res.status(400).json({
          message:
            "The selected mentor is already the student's current mentor.",
        });
      }

  
      const mentorExists = await Mentor.findById(newMentorId);
      if (!mentorExists) {
        return res.status(404).json({
          message: "Mentor not found",
        });
      }
      
      // Remove student in mentor collection
      if (studentExists.currentMentor) {
        await Mentor.findByIdAndUpdate(
          studentExists.currentMentor,
          { $pull: { Students: studentId } },
          { new: true }
        );
      }
        
      // Check if newMentorId is in previousMentors, and remove it
      const indexInPreviousMentors = studentExists.previousMentors.indexOf(newMentorId);
      if (indexInPreviousMentors !== -1) {
        studentExists.previousMentors.splice(indexInPreviousMentors, 1);
      }
  
      // Add the current mentor to previousMentors
      if (studentExists.currentMentor) {
        studentExists.previousMentors.push(studentExists.currentMentor);
      }
  
      // Update the student's currentMentor field
      studentExists.currentMentor = newMentorId;
      await studentExists.save();
  
      // Add student to the new mentor's Students array
      const newMentor = await Mentor.findByIdAndUpdate(
        newMentorId,
        { $addToSet: { Students: studentId } },
        { new: true }
      );
  
      res.status(201).json({
        message: "Mentor Changed Successfully",
        Student : studentExists,
        Mentor_Info :newMentor,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  };
  
  // API Endpoint for show all students for a particular mentor
  
  const getAllStudent = async (req, res) => {
    try {
        const { mentorId } = req.params

        const mentorExists = await Mentor.findById(mentorId);
        if (!mentorExists) {
          return res.status(404).json({
            message: "Mentor not found",
          });
        }

        res.status(200).json({
            message : "All students in a particular Mentor",
            Name : mentorExists.Name,
            Students : mentorExists.Students
        })
    } catch (error) {
        res.status(500).json({
            message:"Internal server Error",
            error : error.message
        })
    }
  }


// API end point far show all Previous Mentors in a particular student

const getAllPreMentor = async (req, res) => {
    try {
        const { studentId } = req.params;

        const studentExists = await Student.findById(studentId)
        if (!studentExists) {
            return res.status(404).json({
                message: "Student not Found"
            })
        }

        res.status(200).json({
            message: "Successfully fetched Previous Mentors in Particular Student",
            Name : studentExists.Name,
            PreviousMentors : studentExists.previousMentors
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}
module.exports = {
    createStudent,
    getAllStudents,
    createMentor,
    getAllMentor,
    assignMentor,
    changeMentor,
    getAllStudent,
    getAllPreMentor
};
