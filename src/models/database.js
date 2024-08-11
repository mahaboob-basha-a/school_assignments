const sqlite3 = require('sqlite3').verbose();
const path = require('path')
// db file path
const dbpath = path.join(__dirname,'../../db/schoolasses.db')
//connect db
const db = new sqlite3.Database(dbpath,(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log('db connected')
    }
})

module.exports = db; 

 /* creating tables
    {name,username,password}
 db.serialize(function(){
    db.run(`CREATE TABLE teachers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`)
console.log('teacher table created')
{name,username,password}
db.run(`CREATE TABLE students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`)
console.log('student table created')
{title,description,due_date,status,teacher_id}
db.run(`CREATE TABLE assignments (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    title VARCHAR(255) NOT NULL,
    description TEXT,
    due_date DATE,
    status VARCHAR(50),
    teacher_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (teacher_id) REFERENCES teachers(id)
);`)
console.log('assesment table created')
{assignment_id,student_id,submitted_file}
db.run(`CREATE TABLE submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    assignment_id INT,
    student_id INT,
    submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    submitted_file VARCHAR(255),
    FOREIGN KEY (assignment_id) REFERENCES assignments(id),
    FOREIGN KEY (student_id) REFERENCES students(id)
);`)
console.log('submission table created')
{submission_id,grade,feedbacK}
db.run(`CREATE TABLE grades (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    submission_id INT,
    grade DECIMAL(5, 2),
    feedback TEXT,
    FOREIGN KEY (submission_id) REFERENCES submissions(id)
);`)
console.log('grades table created')
 })
 db.close() */