const cTable = require('console.table');
const inquirer = require('inquirer');
const mysql = require("mysql2");

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);

inquirer
    .prompt([
        {
            type: "list",
            name: "selection",
            choices: [
                "view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"
            ]
        }
    ]).then((answers) => {
        console.log(answers)
    })