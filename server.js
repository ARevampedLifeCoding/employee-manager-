require("dotenv").config()
const db = require("./db")
const inquirer = require("inquirer")
const consoleTable = require("console.table")
const database = require("./db/connections")

const config = require("./package.json")

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
      "Quit"
    ]
  })
}