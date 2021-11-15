const mysql = require('mysql2');




const connect = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'ARevampedLife',
      database: 'employee_db'
      },
      console.log(`Connected to the employee_db database.`)
  ); 
  
  connect.connect(function (err){
      if (err)throw err;
  });

  class DB {
    constructor(connect) {
        this.connect = connect;
    }
    
    findAllDepartments() {
         return this.connect.promise().query('SELECT * FROM departments');
    }
   
    findAllRoles() {
        return this.connect.promise().query('SELECT * FROM roles');
    }
    
    findAllEmployees() {
        return this.connect.promise().query('SELECT * FROM employees');
    }
    
    createDepartment(department) {
        return this.connect.promise().query('INSERT INTO departments SET ?', department);
    }
    
    createRole(role) {
        return this.connect.promise().query('INSERT INTO roles SET ?', role);
    }
    
    createEmployee(employee) {
        return this.connect.promise().query('INSERT INTO employees SET ?', employee);
    }
    
    findAllManagers() {
        return this.connect.promise().query('SELECT id, first_name, last_name FROM employees WHERE role_id = 1')
    }
  }
  
module.exports = new DB(connect);