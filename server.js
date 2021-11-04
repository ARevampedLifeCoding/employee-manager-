// const inquirer = require('inquirer');
const express = require('express');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2');
// const cTable = require('console.table');

// const dotenv = require('dorenv');
// dotenv.use();

//require('dotenv')//.config();

const app = express();

PORT = process.env.PORT || 5001

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));

const db = mysql.createConnection(
   {
        host: process.env.HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PWD,
        database: process.env.DB_NAME
   } ,
   console.log('Connected to the Employee Database')
);

app.get('/api/departments', (req,res)=>{
    db.query('Select * from department', (err, results)=> {
        res.json(results);
    })
});

app.post('/api/departments/new', (req,res)=>{
    console.log(req.body.dept);
    db.query(`Insert into department (dept_name) values (?)`, req.body.dept, (err,results)=>{
        if (err) {
            res.status(400).json({error:err.message});
            return;
        }
        
        res.status(200).json(req.body.dept);
    });
});

app.get('/api/roles', (req,res)=>{
    db.query('Select * from employee_role', (err, results)=> {
        res.json(results);
    })
});

app.post('/api/roles/new', (req,res)=>{
    console.log(req.body.title, req.body.salary, req.body.dept_id);
    const params =[req.body.title, req.body.salary, req.body.dept_id];
    const sql = `Insert into employee_role (title,salary, dept_id) values (?,?,?)`;
    db.query(sql, params, (err,results)=>{
        if (err) {
            res.status(400).json({error:err.message});
            return;
        }
        
        res.status(200).json(req.body);
    });
});

app.get('/api/employees', (req,res)=>{
    db.query('Select id AS "Employee ID", first_name, last_name from employee', (err, results)=> {
        res.json(results);
    })
});

app.post('/api/employees/new', (req,res)=>{
    
    const params =[req.body.first_name, req.body.last_name, req.body.role_id, req.body.manager_id];
    const sql = `Insert into employee (first_name,last_name, role_id, manager_id) values (?,?,?,?)`;
    db.query(sql, params, (err,results)=>{
        if (err) {
            res.status(400).json({error:err.message});
            return;
        }
        
        res.status(200).json(req.body);
    });
});

app.put('/api/employees/:id', (req,res)=>{
    
    const params =[req.body.role_id, req.params.id];
    const sql = `Update employee Set role_id = (?) where employee.id = (?)`;
    db.query(sql, params, (err,results)=>{
        if (err) {
            res.status(400).json({error:err.message});
            return;
        }
        
        res.status(200).json(req.body);
    });
});


app.listen(PORT, ()=> console.log(`Server is listening on PORT http://localhost${PORT}`));