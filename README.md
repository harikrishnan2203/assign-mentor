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
 - Deployed URL -  
 
## Create Mentor
 - Endpoint: /mentor/create
 - Description: Create a new mentor by providing the mentor's name.
 - Request Body: JSON object representing the Mentor
 - Example: { "Name": "Mentor Name" }
 - Deployed URL - 

## PUT
## Assign a student to Mentor
 - Endpoint: /mentor/assign-mentor/:studentId/:mentorId
 - Description: Assign a mentor to a specific student.
 - Deployed URL - 

## Change Mentor for particular Student
 - Endpoint: /mentor/change-mentor/:studentId/:newMentorId
 - Description: Change the mentor of a specific student.
 - Deployed URL - 

## GET
## Get All Students
 - Endpoint: /students/all
 - Description: Retrieve information about all students.
 - Deployed URL - 

## Get All Mentors
 - Endpoint: /mentors/all
 - Description: Retrieve information about all mentors.
 - Deployed URL - 

## Get All Students for a Particular Mentor
 - Endpoint: /mentors/:mentorId
 - Description: Retrieve information about all students assigned to a particular mentor.
 - URL - 

## Get All Previous Mentors for a Particular Student
 - Endpoint: /students/:studentId
 - Description: Retrieve information about all previous mentors of a particular student.

 ## Postman Documentation Link
 