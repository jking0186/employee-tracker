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
        .then()
}

function addRole() {
    inquirer
        .prompt({
            name: "title",
            type: "input",
            message: "What role would you like to add?"
        })
        .then()
}

function addEmployee() {
    inquirer
    .prompt({
        name: "employeeFirst",
        type: "input",
        message: "What is the empoyee's first name?"
    },
    {
        name: "employeeLast",
        type: "input",
        message: "What is the employee's last name?"
    })
}


//   .then(function(answer) {
    //     var query = "SELECT position, song, year FROM top5000 WHERE ?";
    //     connection.query(query, { artist: answer.artist }, function(err, res) {
    //       for (var i = 0; i < res.length; i++) {
    //         console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
    //       }
    //       start();
    //     });
    //   });
