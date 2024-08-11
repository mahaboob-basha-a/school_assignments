const router = require('express').Router();
const db = require('../models/database');
const middleware = require('../middleware/authenticationToken')
const bcrypt = require('bcryptjs');
const jwt_token = require('jsonwebtoken')
require('dotenv').config()

// register logic for sutdent and teacher
const register = async (name, username, password, role) => {
    let hashPassword = await bcrypt.hash(password, 8);
    switch (role) {
        case 'student':
            const getStudent = `SELECT * FROM students WHERE username = ?;`;
            let studentRow = await new Promise((resolve,reject)=>{
                db.get(getStudent, [username],(err,data)=>{
                    if(err){
                        reject(err)
                    }else{
                        resolve(data)
                    }
                })
            });
            if(studentRow){
                return {msg:'Student already exists',status:400}
            }else{
                const insertStudent = `INSERT INTO students (name, username, password) VALUES (?, ?, ?);`;
                const dbresponse = await new Promise((resolve,reject)=>{
                    db.run(insertStudent,[name ,username, hashPassword],(err)=>{
                        if(err){
                            reject({msg:'Creating failed',status:400})
                        }else{
                            resolve({msg:'Student created successfully',status:201})
                        }
                    })
                });
                return dbresponse
            }
        case 'teacher':
            const getTeacher = `SELECT * FROM teachers WHERE username = ?;`;
            let teacherRow = await new Promise((resolve,reject)=>{
                db.get(getTeacher, [username],(err,data)=>{
                    if(err){
                        reject(err)
                    }else{
                        resolve(data)
                    }
                })
            });
            if(teacherRow){
                return {msg:'Teacher already exists',status:400}
            }else{
                const insertTeacher = `INSERT INTO teachers (name, username, password) VALUES (?, ?, ?);`;
                const dbresponse = await new Promise((resolve,reject)=>{
                    db.run(insertTeacher,[name,username,hashPassword],(err)=>{
                        if(err){
                            reject({msg:'Creating failed',status:400})
                        }else{
                            resolve({msg:'Teacher created successfully',status:201})
                        }
                    })
                });
                return dbresponse
            }
        default:
            return { msg: 'Invalid role',status:400};
    }
};
// login logic for student and teacher
const login = async (username,pass,role)=>{
    switch(role){
        case 'student':
            const getStudentQuery = `select * from students where username = ?;`
            const getStudent = await new Promise((resolve,reject)=>{
                db.get(getStudentQuery,[username],(err,data)=>{
                    (err) ? reject(err) : resolve(data);
                })
            })
            if(getStudent){
                const {id,password} = getStudent
                const checkPassword = await bcrypt.compare(pass,password)
                if(checkPassword){
                    const jwtToken = jwt_token.sign({id,role:'student'},process.env.secureToken,{ expiresIn: '12h' })
                    return {msg:{token:jwtToken},status:200}
                }else{
                    return {msg:'Invalid password',status:400}
                }
            }else{
                return {msg:'Invalid user register first',status:400}
            }
        case 'teacher':
            const getTeacherQuery = `select * from teachers where username = ?;`
            const getTeacher = await new Promise((resolve,reject)=>{
                db.get(getTeacherQuery,[username],(err,data)=>{
                    (err) ? reject(err) : resolve(data);
                })
            })
            if(getTeacher){
                const {id,password} = getTeacher
                const checkPassword = await bcrypt.compare(pass,password)
                if(checkPassword){
                    const jwtToken = jwt_token.sign({id,role:'teacher'},'mbsToken')
                    return {msg:{token:jwtToken},status:200}
                }else{
                    return {msg:'Invalid password',status:400}
                }
            }else{
                return {msg:'Invalid user register first',status:400}
            }
        default:
            return {msg:'Invalid role',status:400}
    }
}
// register route both student and teacher
router.post('/register', async (req, res) => {
    try {
        const { name, username, password, role = 'student' } = req.body;
        if (name && username && password && role) {
            const response = await register(name, username, password, role);
            res.status(response.status).json(response.msg);
        } else {
            res.status(400).json({ msg: 'Missing required fields' });
        }
    } catch (error) {
        res.status(500).json({ msg: 'Failed to register'});
    }
});
// login route for both student and teacher
router.post('/login',async(req,res)=>{
    try {
        const {username,password,role='student'} = req.body;
        if(username && password && role){
            const response = await login(username,password,role)
            res.status(response.status).json(response.msg)
        }else{
            res.status(400).json({msg:'Missing required fields'})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'Failed to login'})
    }
})

module.exports = router;