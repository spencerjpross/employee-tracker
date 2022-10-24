USE employee_db;

INSERT INTO department (department_name)
VALUES ("HR"), ("Sales"), ("Engineering");

INSERT INTO role (title, salary, department_id)
VALUES ("Recruiter", 50000, 1), ("Account Executive", 100000, 2), ("Software Engineer", 100000, 3), ("Software Engineer Manager", 150000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, NULL), ("Meg", "Richards", 3, 1), ("Spencer", "Ross", 2, NULL), ("David", "Park", 4, NULL);