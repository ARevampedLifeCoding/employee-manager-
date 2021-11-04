const inquirer = require('inquirer');
const mysql = require('mysql2');
const express = require('express');

const fs = require('fs');
const path = require('path');
const { get } = require('https');

let quit_program = false;

require('dotenv').config();

const db = mysql.createConnection(
   {
        host: process.env.HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PWD,
        database: process.env.DB_NAME
   } ,
   console.log('Connected to the Database')
);



const employee_tracker_choices = ['View all departments',
                                'View all roles', 
                                'View all employees', 
                                'Add a department', 
                                'Add a role',
                                'Add an employee', 
                                'Update an employee role',
                                'Quit']

async function employee() {
 do {
    await inquirer
      .prompt({
        type: "list",
        message: "Which action would you like to take?",
        name: "select_type",
        choices: employee_tracker_choices,
      })

      .then(async (response) => {
        switch (response.select_type) {
          //view all departments
          case employee_tracker_choices[0]:
            await viewAllDepartments();
            break;

          //View all roles
          case employee_tracker_choices[1]:
            await viewAllRoles();
            break;

          //View all employees
          case employee_tracker_choices[2]:
            await viewAllEmployees();
            break;

          //Add a department',
          case employee_tracker_choices[3]:
            await addDepartment();
            break;

          //'Add a role',
          case employee_tracker_choices[4]:
            await addRole();
            break;

          //'Add an employee',
          case employee_tracker_choices[5]:
            await addEmployee();
            break;

          //'Update an employee role'
          case employee_tracker_choices[6]:
            await updateEmployeeRole();
            break;
            //quit
          case employee_tracker_choices[7]:
            quit_program = true;
        }
      });
  }
  while(quit_program==false)
}

async function viewAllDepartments() {
   
    // 
    db.query('Select * from department', (err, results)=> {
        
        console.table(' ', results);
        
    })
};

async function viewAllRoles() {
    console.log('View all Roles');
    db.query('Select * from employee_role', (err, results)=> {
        console.table(' ', results);
    })

};

async function viewAllEmployees() {
    console.log('View all Employees');
    db.query('Select id AS "Employee ID", first_name, last_name from employee', (err, results)=> {
        console.table(' ', results);
    })
};

async function addDepartment() {
    console.log('Add a department')
    await inquirer
      .prompt({
        type: "input",
        message: "What department would you like to add?",
        name: "dept_name",
        
      })
      .then(response =>{
        db.query(`Insert into department (dept_name) values (?)`, response.dept_name, (err,results)=>{
            
            
            console.log(`Department of ${response.dept_name} has been added`)
        });
      })
    
};

async function addRole() {    

var departmentChoices =  getDeptNames();
console.log(departmentChoices);

 await inquirer
    .prompt([
    {
    type: "input",
    message: "What role would you like to add?",
    name: "role_name",
    },
    
    {
    type: "input",
    message: "What is the salary of the role?",
    name: "role_salary",
    },
    
    {
    type: "list",
    message: "Which department does the role belong to?",
    name: "dept_name",
    choices: departmentChoices
    }
    ])
    
    


};

function getDeptNames() {
    try{  
        var deptNames =[];
        
        // const query = await db.query('Select dept_name from department', (err, results) => {
    
        db.query('Select dept_name from department', (err, results) => {
        for (let index = 0; index < results.length; index++) {
            deptNames.push(results[index].dept_name);
                    
        }
    
        return deptNames;
    });
    
    }
    catch (err){
        console.log(err.message);
    }
    }

async function addEmployee() {
    console.log('Add an Employee');
};

async function updateEmployeeRole() {
    console.log('Update Employee Role');
};



 employee();