const router = require('express').Router()
const db = require('../models/database')
const assignmentMiddleware = require('../middleware/assignmentMiddleware')
// create assignment 
router.post('/assignment/create/:id',assignmentMiddleware('teacher'),async(req,res)=>{
    try {
        const {title,description,due_date,status,teacher_id} = req.body
        const createAssignment = `INSERT INTO assignments (title,description,due_date,status,teacher_id) VALUES (?,?,?,?,?);`
        if(title && description && due_date && status && teacher_id){
            const assesResponse = await new Promise((resolve,reject)=>{
                db.run(createAssignment,[title,description,due_date,status,teacher_id],(err)=>{
                    err ? reject({msg:"Assignment creation failed",status:400}) : resolve({msg:"Assignment created successfully",status:201})
                })
            })
            return res.status(assesResponse.status).json(assesResponse.msg)
        }else{
            return res.status(400).json('Invalid assesment details')
        }
    } catch (error) {
        res.status(500).json({msg:'assignment creation failed'})
    }
})
// get assignments 
router.get('/assignment/:id',assignmentMiddleware('teacher'),async(req,res)=>{
    try {
        const teacherId = req.params.id
        const getAssignments = `select * from assignments where teacher_id = ?;`
        const assignmentData = await new Promise((resolve,reject)=>{
            db.all(getAssignments,[teacherId],(err,data)=>{
                err ? reject({msg:'Fialed to get assesments',status:400}) : resolve({msg:data,status:200})
            })
        })
        res.status(assignmentData.status).json(assignmentData.msg)
    } catch (error) {
        res.status(500).json({msg:'retriving assignments failed'})
    }
})
// update assignment
router.put('/assignment/update/:id',assignmentMiddleware('teacher'),async(req,res)=>{
    try {
        const teacherId = req.params.id
        const {assignment_id,title,description,due_date,status,teacher_id} = req.body
        const createAssignment = `UPDATE assignments SET title = ?,description = ?,due_date = ?,status = ?,teacher_id = ? WHERE id = ? and teacher_id = ?;`
        if(title && description && due_date && status && teacher_id){
            const assesResponse = await new Promise((resolve,reject)=>{
                db.run(createAssignment,[title,description,due_date,status,teacher_id,assignment_id,teacherId],(err)=>{
                    err ? reject({msg:"Assignment updation failed",status:400}) : resolve({msg:"Assignment updated successfully",status:201})
                })
            })
            return res.status(assesResponse.status).json(assesResponse.msg)
        }else{
            return res.status(400).json('Invalid assignment details')
        }
    } catch (error) {
        res.status(500).json({msg:'assignment update failed'})
    }
})
// delete assignment 
router.delete('/assignment/delete/:id',assignmentMiddleware('teacher'),async(req,res)=>{
    try {
        const teacherId = req.params.id
        const {assignment_id} = req.body
        const deleteQuery = `DELETE FROM assignments where teacher_id = ? AND id = ?;`
        if(teacherId && assignment_id){
            const deleteResponse = await new Promise((resolve,reject)=>{
                db.run(deleteQuery,[teacherId,assignment_id],(err)=>{
                    err ? reject({msg:'Assignment delete failed',status:400}) : resolve({msg:'Assignment deleted successfully',status:200})
                })
            })
            return res.status(deleteResponse.status).json(deleteResponse.msg)
        }else{
            return res.status(400).json('Invalid delete fields')
        }
    } catch (error) {
        return res.status(500).json({msg:'retriving assignments failed'})
    }
})
// submit assignmet student
router.post('/assignment/submission/:id',assignmentMiddleware('student'),async(req,res)=>{
    try {
        const studentId = req.params.id
        const {assignment_id,submitted_file} = req.body
        if(assignment_id && studentId && submitted_file){
            const createSubmition = `INSERT INTO submissions (assignment_id,student_id,submitted_file) VALUES (?,?,?);`
            const createResponse = await new Promise((resolve,reject)=>{
                db.run(createSubmition,[assignment_id,studentId,submitted_file],(err)=>{
                    err ? reject({msg:'submission failed',status:400}) : resolve({msg:'Assignment submited successfully',status:201})
                })
            });
            return res.status(createResponse.status).json(createResponse.msg)
        }else{
            return res.status(400).json('Invalid assesment fields')
        }
    } catch (error) {
        return res.status(500).json({msg:'assignment submission failed'})
    }
})
// assignment grades teacher
router.post('/assignment/grades/:id',assignmentMiddleware('teacher'),async(req,res)=>{
    try {
        const {submission_id,grade,feedback} = req.body
        const createGrade = `INSERT INTO grades (submission_id,grade,feedbacK) VALUES (?,?,?);`
        if(submission_id && grade && feedback){
            const createResponse = await new Promise((resolve,reject)=>{
                db.run(createGrade,[submission_id,grade,feedback],(err)=>{
                    err ? reject({msg:'Grade assigning failed',status:400}) : resolve({msg:'Grade assigned successfully',status:201})
                })
            });
            return res.status(createResponse.status).json(createResponse.msg)
        }else{
            return res.status(400).json('Invalid grade fields')
        }
    } catch (error) {
        return res.status(5000).json({msg:'Grade assign failed'})
    }
})
// view report of students
router.get('/assignment/reports/:id',assignmentMiddleware('teacher'),async(req,res)=>{
    try {
        const {student_id} = req.body
        const reportQuery = `SELECT st.name AS student_name,a.title AS assignment_title,s.submission_date,COALESCE(g.grade, 'Not graded') AS grade,COALESCE(g.feedback, 'No feedback yet') AS feedback FROM submissions s JOIN assignments a ON s.assignment_id = a.id JOIN students st ON s.student_id = st.id LEFT JOIN grades g ON s.id = g.submission_id WHERE s.student_id = ?;`
        const reportData = await new Promise((resolve,reject)=>{
            db.all(reportQuery,[student_id],(err,data)=>{
                err ? reject({msg:"Failed to get report",status:400}) : resolve({msg:data,status:200})
            })
        })
        return res.status(reportData.status).json(reportData.msg)
    } catch (error) {
        return res.status(500).json({msg:'Grade assign failed'})
    }
})
module.exports = router