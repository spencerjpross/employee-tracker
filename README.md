# employee-tracker

** Table of Contents **
- Description
- Usage
- Installation
- Features
- Learnings
- Challenges


** Description **
This is a Node.js command-line application that utilizes inquirer, mysql2, and console table.  This application is used to manage a company's employee database through inquirer prompts that will then add or update information from the user into sql tables.  

** Usage **
![screenshot](./images/Screen%20Shot%202022-10-25%20at%204.43.43%20PM.png)
Video - ()

** Installation **
- Run npm i
- Start mysql, SOURCE db/schema.sql, exit mysql
- node db/seeds.sql
- node index.js

** Credits **
- Had help with some tutors from the bootcamp and TA's during office hours

** Features **

GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database


** Things I learned in this project **
- creating functions that invoke the inquirer prompt
- creating sql statements within the inquirer prompts


** Challenges **
- getting the right SQL syntax within the functions, especially when creating new roles, departments, or employees.


