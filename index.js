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

function runProgram() {
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
            if (response.selection === "view all departments") {
                viewDept();
            } else if (response.selection === "view all roles") {
                viewRoles();
            } else if (response.selection === "view all employees") {
                viewEmployees();
            } else if (response.selection === "add a department") {
                addDept();
            } else if (response.selection === "add a role") {
                addRole();
            } else if (response.selection === "add an employee") {
                addEmployee();
            } else {
                updateEmployee()
            };
        });
};

function viewDept() {
    db.query("SELECT * FROM department", (err, data) => {
        if (err) console.log(err)
        console.table(data);
        runProgram();
    });
};

function viewRoles() {
    db.query("SELECT * FROM role", (err, data) => {
        if (err) console.log(err)
        console.table(data);
        runProgram();
    });
};


function viewEmployees() {
    db.query("SELECT * FROM employee", (err, data) => {
        if (err) console.log(err)
        console.table(data);
        runProgram();
    });
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
            db.query(`INSERT INTO department (id, department_name) VALUES ('${response.id}', '${response.department}')`, (err, data) => {
                if (err) console.log(err);
                else {
                    console.log("Successfully added to the Department table");
                    viewDept();
                };
            });
        });
};

function addRole() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "title",
                message: "What is the title of the Role you'd like to add?",
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
            console.log(response)
            db.query(`INSERT INTO role (title, salary, department_id) VALUES ('${response.title}', '${response.salary}', '${response.departmentID}')`, (err, data) => {
                if (err) console.log(err);
                else {
                    console.log("Successfully added to the Roles table");
                    viewRoles();
                };
            });
        });
};

function addEmployee() {
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
            console.log(response)
            db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${response.firstName}', '${response.lastName}', '${response.role}', '${response.manager}')`, (err, data) => {
                if (err) console.log(err);
                else {
                    console.log("Successfully added to the Employee table");
                    viewEmployees();
                };
            });
        });
};

function updateEmployee() {
    db.query("SELECT * FROM employee", (err, data) => {
        if (err) console.log(err);
        else {
            const employeeArr = data.map(employee => {
                return {
                    name: `${employee.first_name} ${employee.last_name}`,
                    value: employee.id,
                };
            });
            console.log(employeeArr)
            inquirer
                .prompt([
                    {
                        type: "list",
                        name: "id",
                        message: "Which employee would you like to update?",
                        choices: employeeArr,
                    },
                ])
                .then(response => {
                    console.log(response)
                    db.query("SELECT * FROM role", (err, data) => {
                        if (err) console.log(err);
                        else {
                            const roleArr = data.map(role => {
                                return {
                                    name: role.title,
                                    value: role.id,
                                };
                            });
                            inquirer
                                .prompt([
                                    {
                                        type: "list",
                                        name: "id",
                                        message: "Which role would you like to update?",
                                        choices: roleArr,
                                    },
                                ])
                                .then(newRole => {
                                    db.query(`UPDATE employee SET role_id = ${newRole.id} WHERE id = ${response.id}`, (err, data) => {
                                        if (err) console.log(err);
                                        else {
                                            console.log("Successfully updated the Employee");
                                            viewEmployees();
                                        };
                                    });
                                })
                        };

                    });
                });

        };
    }
    )
};


runProgram();