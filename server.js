var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employee_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    start();
});

// Opening question
function start() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "Add a department",
                "Add a role",
                "Add an employee",
                "View departments",
                "View roles",
                "View employees",
                "Update employee roles",
                "exit"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "Add a department":
                    addDepartment();
                    break;

                case "Add a role":
                    addRole();
                    break;

                case "Add an employee":
                    addEmployee();
                    break;

                case "View departments":
                    viewDepartment();
                    break;

                case "View roles":
                    viewRole();
                    break;

                case "View employees":
                    viewEmployee();
                    break;

                case "Update employee roles":
                    viewEmployee();
                    break;

                case 'Exit':
                    connection.end();
                    break;

                default:
                    break;
            }
        })
}

function addDepartment() {
    inquirer
        .prompt({
            name: "department",
            type: "input",
            message: "What department would you like to add?"
        })
        .then(res => {
            // query to add department into database
            var query = "INSERT INTO department SET ?";
            connection.query(query, { name: res.name }, (err, res) => {
                if (err) throw err;
                console.log("Department successfully added!");
                // return to main menu
                start();
            })
        })
}

function addRole() {
    inquirer
        .prompt([{
            name: "title",
            type: "input",
            message: "Ener the employee title"
        },
            {
                name: "salary",
                type: "input",
                message: "Ener the employee salary"
            },
            {
                name: "department_id",
                type: "input",
                message: "Ener the employee Department ID"
            }])
        .then(res => {
            var query = "INSERT INTO role SET ?";
            // query to add role into database
            connection.query(query, {
                title: res.title,
                salary: res.salary,
                department_id: res.department_id
            }, (err, res) => {
                if (err) throw err;
                console.log("Role successfully added!");
                // return to main menu
                start();
            })
        })
}

function addEmployee() {
    inquirer
        .prompt([{
            name: "employeeFirst",
            type: "input",
            message: "Enter empoyee's first name"
        },
            {
                name: "employeeLast",
                type: "input",
                message: "Enter employee's last name"
            },
            {
                type: "input",
                message: "Enter employee role_id",
                name: "role_id"
            },
            {
                type: "input",
                message: "Enter employee manager_id",
                name: "manager_id"
            }])
            .then(response => {
                if (response.first_name === '' || response.last_name === '' || response.role_id === '' || response.manager_id === '') {
                    console.log("Please enter a valid response");
                    start();
                } else {
                    var query = "INSERT INTO employee SET ?";
                    // query to add employee into database
                    connection.query(query, {
                        first_name: response.first_name,
                        last_name: response.last_name,
                        role_id: response.role_id
                    }, (err, res) => {
                        if (err) throw err;
                        console.log("Employee successfully added!");
                    });
                    // return to main menu
                    start();
                };
});
    
}

function viewDepartment() {
    // query to view departments in console
    var query = `SELECT first_name, last_name, department.name 
                FROM ((employee INNER JOIN role ON role_id = role.id) 
                INNER JOIN department ON department_id = department.id)`;
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log("\n View Departments \n");
        console.table(res);
    })
    start();
}
function viewRole() {
    // query to view roles in console
    var query = `SELECT first_name, last_name, role.title 
                FROM ((employee INNER JOIN role ON role_id = role.id) 
                INNER JOIN department ON department_id = department.id)`;
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log("\n View Roles \n");
        console.table(res);
    })
    start();
}
function viewEmployee() {
    // query to view departments in console
    var query = `SELECT first_name, last_name, role.title, role.salary 
                FROM ((employee INNER JOIN role ON role_id = role.id) 
                INNER JOIN department ON department_id = department.id)`;
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log("\n View Employees \n");
        console.table(res);
    })
    start();
}