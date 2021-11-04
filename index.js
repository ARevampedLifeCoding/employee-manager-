const express = require("express")
const inquirer = require("inquirer")
const mysql = require("mysql2")

const fs = require("fs")
const path = require("path")

const db = mysql.createConnection(
  {
       host: process.env.HOST,
       user: process.env.DB_USER,
       password: process.env.DB_PWD,
       database: process.env.DB_NAME
  } ,
  console.log('You are connected to the Employee_DB')
);

const employee_choice = [
  "Check all departments",
  "Check all employees",
  "Check all positions",
  "Quit"
]

async function choices(){
  
}