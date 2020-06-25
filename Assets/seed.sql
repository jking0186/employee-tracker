USE employee_DB;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Robert", "Kelso", 1, 001),
("John", "Dorian", 2, 002),
("Elliot", "Reid", 3,003);

INSERT INTO department (name)
VALUES ("Medical"),
("Surgical"),
("Oncology");

INSERT INTO role (title, salary, department_id)
VALUES ("Chief of Medicine", 180000, 001),
("Resident", 90000, 002),
("Attending", 130000, 003);