USE employee_DB;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Robert", "Kelso", 1, 001),
("Chris", "Turk", 2, 002),
("Carla", "Espinosa", 3,003);

INSERT INTO department (name)
VALUES ("Medical"),
("Surgical"),
("Nursing");

INSERT INTO role (title, salary, department_id)
VALUES ("Chief of Medicine", 200000, 001),
("Resident", 90000, 002),
("Nurse", 75000, 003);