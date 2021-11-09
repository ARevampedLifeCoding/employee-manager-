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

