require("dotenv").config();
const db = require("./db");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const database = require("./db/connections");


const config = require("./package.json");

const prompt = () => {
  inquirer
    .prompt({
      name: "choices",
      type: "list",
      message: "Choose an option",
      options: [
        "View employee",
        "View department",
        "View position",
        "Add employee",
        "Add department",
        "Add position",
        "Delete employee",
        "Delete department",
        "Delete position",
        "Quit",
      ],
    })
    .then((select) => {
      switch (select.options) {
        case "View employee":
          viewEmployee();
          break;
        case "View department":
          viewDepartment();
          break;
        case "View position":
          viewPosition();
        case "Add employee":
          addEmployee();
          break;
        case "Add department":
          addDepartment();
          break;
        case "Add position":
          addPosition();
          break;
        case "Delete employee":
          deleteEmployee();
          break;
        case "Delete department":
          deleteDepartment();
          break;
        case "Delete position":
          break;
          default: "Quit"
      }
    });
};

prompt()


const viewAllEmployees = function () {
  db.viewAllEmployees().then((data) => console.table("\n", data, "\n"));
  initialPrompt();
};

const viewByDepartment = () => {
  db.viewByDepartment().then((data) => console.table("\n", data, "\n"));
  initialPrompt();
};

const viewByManager = function () {
  db.viewByManager(2).then((data) => console.table("\n", data, "\n"));
  initialPrompt();
};

const viewAllPosition = function () {
  db.viewAllPositions().then((data) => console.table("\n", data, "\n"));
  initialPrompt();
};

const viewAllDepartments = function () {
  db.viewAllDepartments().then((data) => console.table("\n", data, "\n"));
  initialPrompt();
};

const viewDepartmentSalaries = function () {
  db.viewDepartmentSalaries().then((data) => console.table("\n", data, "\n"));
  initialPrompt();
};

const addEmployee = function () {
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is their first name?",
      },
      {
        name: "lastName",
        type: "input",
        message: "What is their last name?",
      },
      {
        name: "occupationId",
        type: "input",
        message: "What is their occupation?",
      },
      {
        name: "managerId",
        type: "list",
        message: "Select their manager.",
        choices: ["1", "2", "3"],
      },
    ])
    .then((employee) => {
      db.addEmployee(employee);
      console.log(
        `${employee.firstName} ${employee.lastName} was added to the database.\n`
      );
      initialPrompt();
    });
};

const addDepartment = function () {
  inquirer
    .prompt({
      name: "departmentName",
      type: "input",
      message: "What is the department name?",
    })
    .then((answer) => {
      db.addDepartment(answer);
      console.log(`${answer.departmentName} was added to the database.\n`);
      initialPrompt();
    });
};

const addPosition = function () {
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "What`s the title of this position?",
      },
      {
        name: "salary",
        type: "number",
        message: "What is the salary for this position?",
      },
      {
        name: "department_id",
        type: "list",
        message: "Choose a department to add the position to.",
        choices: ["IT", "Finance", "Sales"],
      },
    ])
    .then((answer) => {
      db.addPosition(answer);
      console.log(`${answer.title} was added to the database.\n`);
      initialPrompt();
    });
};

const removeEmployee = function () {
  db.selectAllEmployees().then((employees) => {
    const employeeChoicesForDelete = employees.map((employee) => ({
      value: employee.id,
      name: `${employee.first_name} ${employee.last_name}`,
    }));

    inquirer
      .prompt([
        {
          name: "employeeId",
          type: "list",
          message: "Who would you like to remove from the roster?",
          choices: employeeChoicesForDelete,
        },
      ])
      .then((answer) => {
        db.deleteEmployee(answer);
        console.log("Employee was removed from the database...\n");
        initialPrompt();
      });
  });
};

const changeEmployeePosition = async () => {
  let employeeList = [];
  let positionList = [];
  await database.promise().query(`SELECT concat(first_name, " ", last_name) FROM employee`)
          .then( ([result]) => {
            result.forEach(element => {
            employeeList.push(element[0]);
            });
          });
  await database.promise().query(`SELECT title FROM occupation`)
    .then( ([rows]) => {
      rows.forEach(element => {
        positionList.push(element[0]);
      });
    })
  
  await inquirer.prompt(
        [
          {
            type: 'list',
            name: 'employee',
            choices: employeeList,
            message: "Which employee's position do you want to update?"
          },
          {
            type: 'list',
            name: 'newposition',
            choices: positionList,
            message: "Which position to you want to assign the selected employee?"
          }
        ]
      ).then( (response) => {
        database.promise().query(`UPDATE employee
                  SET occupation_id = (SELECT id FROM occupation WHERE title = '${response.newposition}')
                  WHERE concat(first_name, " ", last_name) = '${response.employee}'`)
        console.log(`Updated employee's position`)           
    });
};