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
    ]).then((response) => {
        console.log(response)
        if (response.selection === "view all departments"){
            viewDept();
        } else if (response.selection === "view all roles"){
            viewRoles();
        } else if (response.selection === "view all employees"){
            viewEmployees();
        } else if (response.selection === "add a department"){
            addDept();
        } else if (response.selection === "add a role"){
            addRole();
        } else if (response.selection === "add an employee"){
            addEmployee();
        } else {
            updateEmployee()
        };
    });

    function viewDept() {
        db.query("SELECT table FROM employee_db");
    };

    function viewRoles() {
        db.query("SELECT role FROM employee_db");
    };

    function viewEmployees() {
        db.query("SELECT employee FROM employee_db");
    };

    function addDept() {
        inquirer
        .prompt([
            {
                type: "input",
                name: "department",
                message: "What is the name of the department you'd like to add?",
            },
            {
                type: "input",
                name: "id",
                message: "What is the ID of the department you'd like to add?",
            },
        ])
        .then(response => {
            db.query(`INSERT INTO department VALUES (${response.department}, ${response.id})`);
        });
    };

    function addRole(){
        inquirer
        .prompt([
            {
                type: "input",
                name: "title",
                message: "What is the title of the Role you'd like to add?",
            },
            {
                type: "input",
                name: "id",
                message: "What is the ID of the Role you'd like to add?",
            },
            {
                type: "input",
                name: "departmentID",
                message: "What is the department ID of the Role you'd like to add?",
            },
            {
                type: "input",
                name: "salary",
                message: "What is the salary of the Role you'd like to add?",
            },
        ])
        .then(response => {
            db.query(`INSERT INTO role VALUES (${response.title}, ${response.id},${response.departmentID}, ${response.salary}`);
        });
    };

    function addEmployee(){
        inquirer
        .prompt([
            {
                type: "input",
                name: "firstName",
                message: "What is the first name of the Employee you'd like to add?",
            },
            {
                type: "input",
                name: "lastName",
                message: "What is the last name of the Employee you'd like to add?",
            },
            {
                type: "input",
                name: "role",
                message: "What is the role ID of the Employee you'd like to add?",
            },
            {
                type: "input",
                name: "manager",
                message: "What is the manager ID of the Employee you'd like to add?",
            },
        ])
        .then(response => {
            db.query(`INSERT INTO employee VALUES (${response.firstName}, ${response.lastName},${response.role}, ${response.manager}`);
        });
    };

    function updateEmployee(){
        inquirer
        .prompt([
            {
                type: "input",
                name: "id",
                message: "What is the id of the Employee you'd like to update?",
            },
            {
                type: "input",
                name: "firstName",
                message: "What is the first name of the Employee you'd like to update?",
            },
            {
                type: "input",
                name: "lastName",
                message: "What is the last name of the Employee you'd like to update?",
            },
            {
                type: "input",
                name: "role",
                message: "What is the role ID of the Employee you'd like to update?",
            },
            {
                type: "input",
                name: "manager",
                message: "What is the manager ID of the Employee you'd like to update?",
            },
        ])
        .then(response => {
            db.query(`UPDATE employee SET first_name = ${response.firstName}, last_name = ${response.lastName}, role_id = ${response.role}, manager_id = ${response.manager} WHERE id = ${response.id}`);
        });
    };