# Assignment Management API Documentation

This API allows teachers and students to manage assignments, submissions, and grades. It includes features for assignment creation, submission, grading.

## Installation

```bash
git clone https://github.com/mahaboob-basha-a/school_assignments.git
npm install
```

## Base URL

```http
http://yourdomain.com/api
```
---
## Authentication
### Register
- **Endpoint:** `POST/api/register`
### Example Request
```json
{
     "name":"Joe",
     "username":"joe123",
     "password":"1234@a",
     "role":"teacher" or "student"
}
```
### Login
- **Endpoint:** `POST/api/login`
### Example Request
```json
{
     "username":"joe123",
     "password":"1234@a",
     "role":"your role"
}
```
### Example Response
```json
{
     "token":"dlsakjoeiq2kwjfjslafdjjsfoieujflsfdjjewhffjl"
}
```

All endpoints are secured and require authentication via JWT tokens. Include the token in the Authorization header with the format:
```text
Authorization: Bearer <token>
```
## Endpoints
## 1. Assignments
### Read Assignments
- **Endpoint:** `GET/api/assignment/${teacherID)`
- **Description:** Allows a teacher to create a new assignment.
- **Authorization:** Teacher only
- **Response:**
     - **'201 Created'** on success
     - **'400 Bad Request'** if validation fails
#### Create Assignment
- **Endpoint:** `POST/api/assignment/create/${teacherID)`
- **Description:** Allows a teacher to create a new assignment.
- **Authorization:** Teacher only
- **Body Parameters:**
     - **title (string, required):** The title of the assignment.
     - **description (string, required):** A brief description of the assignment.
     - **due_date (date, required):** The due date for the assignment.
     - **status (string, required):** The current status of the assignment.
     - **teacher_id (int, required):** The current teacher id.
- **Response:**
     - **'201 Created'** on success
     - **'400 Bad Request'** if validation fails
### Example Request:

```json
{
  "title": "Math Homework",
  "description": "Complete the exercises in chapter 3",
  "due_date": "2024-08-20",
  "status": "open",
  "teacher_id":293
}
```
### Update Assignment
- **Endpoint:** `PUT api/assignment/update/${teacherId}`
- **Description:** Allows a teacher to update an assignment they created.
- **Authorization:** Teacher (who created the assignment) only
- **Body Parameters:**
     - **assignment_id (int, required):** The id of the assignment.
     - **title (string, required):** The title of the assignment.
     - **description (string, required):** A brief description of the assignment.
     - **due_date (date, required):** The due date for the assignment.
     - **status (string, required):** The current status of the assignment.
     - **teacher_id (int, required):** Who created the assignment.
- **Response:**
     - **'200 OK'** on success
     - **'403 Forbidden'** if the teacher is not authorized to update the assignment
### Example Request:

```json
{
  "assignment_id":349,
  "title": "Updated Math Homework",
  "description": "Complete the revised exercises in chapter 3",
  "due_date": "2024-08-22",
  "status": "in-progress",
  "teacher_id": 39
}
```
### Delete Assignment
- **Endpoint:** `DELETE /assignments/delete/${teacherId}`
- **Description:** Allows a teacher to delete an assignment they created.
- **Authorization:** Teacher (who created the assignment) only
- **Response:**
     - **'200 OK'** on success
     - **'403 Forbidden'** if the teacher is not authorized to delete the assignment
### Example Request:
```json
{
     "assignment_id":349
}
```
## 2. Submissions
#### Submit Assignment
- **Endpoint:** `POST api/assignment/submission/${studentId}`
- **Description:** Allows a student to submit their completed assignment.
- **Authorization:** Student only
- **Body Parameters:**
     - **assignment_id (integer, required):** The ID of the assignment being submitted.
     - **submitted_file (string, required):** The path or identifier for the submitted file.
- **Response:**
     - **'201 Created'** on success
     - **'400 Bad Request'** if validation fails
### Example Request:
```json
{
  "assignment_id": 1,
  "submitted_file": "path/to/assignment.pdf"
}
```
## 3. Grades
### Grade Assignment
- **Endpoint:** `POST api/assignment/grades/${teacherId}`
- **Description:** Allows a teacher to grade a student’s submission.
- **Authorization:** Teacher only
- **Body Parameters:**
     - **submission_id (integer, required):** The ID of the submission being graded.
     - **grade (decimal, required):** The grade assigned to the submission.
     - **feedback (string, required):** Feedback provided to the student.
- **Response:**
     - **'201 Created'** on success
     - **'400 Bad Request'** if validation fails
### Example Request:
```json
{
  "submission_id": 1,
  "grade": 95.5,
  "feedback": "Great job! Keep up the good work."
}
```
### View Student Report
- **Endpoint:** `GET api/assignment/reports/${teacher_id}`
- **Description:** Allows a teacher to view a report of a student’s submissions and grades.
- **Authorization:** Teacher only
- **Response:**
     - **'200 OK'** with a list of submissions and grades for the student
     - **'404 Not Found'** if the student does not exist
### Example Request:
```json
{
     "student_id":165
}
```
### Example Response:
```json
[
  {
    "student_name":"Joe",
    "assignment_title": "Math Homework",
    "submission_date": "2024-08-19",
    "grade": 95.5,
    "feedback": "Great job! Keep up the good work."
  },
  {
    "student_name":"Dher",
    "assignment_title": "Science Project",
    "submission_date": "2024-08-18",
    "grade": 89.0,
    "feedback": "Well done, but needs improvement."
  },
  ...
]
```
## Notes
- **Authorization:** Ensure that the JWT token is valid and that the user has the correct role before accessing endpoints.
- **Input Validation:** Make sure to validate the input data to prevent SQL injection and other security vulnerabilities.
#### Developed by:
*Aluru Mahaboob Basha*
 
