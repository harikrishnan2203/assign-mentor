## Student-Mentor Management API

This API is built with Express and MongoDB, providing functionality for managing students, mentors, and mentor-student relationships.

## Features

 - Create Student
 - Create Mentor
 - Assign a student to Mentor
 - Change Mentor for particular Student
 - Get all students for a particular mentor 
 - Get all previously assigned mentor for a particular student.

## API ENDPOINTS

## POST
## Create Student
 - Endpoint: /students/create
 - Description: Create a new student by providing the student's name.
 - Request Body: JSON object representing the Student
 - Example: { "Name": "Harikrishnan" }
 - Deployed URL - https://assign-mentor-nlkd.onrender.com/student/create
 
## Create Mentor
 - Endpoint: /mentor/create
 - Description: Create a new mentor by providing the mentor's name.
 - Request Body: JSON object representing the Mentor
 - Example: { "Name": "Mentor Name" }
 - Deployed URL - https://assign-mentor-nlkd.onrender.com/mentor/create

## PUT
## Assign a student to Mentor
 - Endpoint: /mentor/assign-mentor/:studentId/:mentorId
 - Description: Assign a mentor to a specific student.
 - Deployed URL - https://assign-mentor-nlkd.onrender.com/mentor/assign-mentor/:studentId/:mentorId
 

## Change Mentor for particular Student
 - Endpoint: /mentor/change-mentor/:studentId/:newMentorId
 - Description: Change the mentor of a specific student.
 - Deployed URL - https://assign-mentor-nlkd.onrender.com/mentor/change-mentor/:studentId/:mentorId

## GET
## Get All Students
 - Endpoint: /students/all
 - Description: Retrieve information about all students.
 - Deployed URL - https://assign-mentor-nlkd.onrender.com/students/all

## Get All Mentors
 - Endpoint: /mentors/all
 - Description: Retrieve information about all mentors.
 - Deployed URL - https://assign-mentor-nlkd.onrender.com/mentors/all

## Get All Students for a Particular Mentor
 - Endpoint: /mentors/:mentorId
 - Description: Retrieve information about all students assigned to a particular mentor.
 - Deployed URL - https://assign-mentor-nlkd.onrender.com/mentors/:mentorId
 - Deployed URL - https://assign-mentor-nlkd.onrender.com/mentors/6592cf4e34192446e451aca0

## Get All Previous Mentors for a Particular Student
 - Endpoint: /students/:studentId
 - Description: Retrieve information about all previous mentors of a particular student.
 - Deployed URL - https://assign-mentor-nlkd.onrender.com/students/:studentId
 - Deployed URL - https://assign-mentor-nlkd.onrender.com/students/6592cc429b92b7646d24b8ea

 ## Postman Documentation Link
 - https://documenter.getpostman.com/view/31850761/2s9YsFDDfi
 
 