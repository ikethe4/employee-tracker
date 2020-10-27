const express = require("express");
const mysql = require("mysql");
const inquirer = require("inquirer");
// const questions = require ("./questions");
// const viewFunction = require("./viewFunction");
const util = require("util");
//employee bank
const employees = [];
//manager bank
// const managers = ["Finch", "Wright", "Loman"];

// const roles = ["machinist", "lawyer", "salesman"];

// const departments = ["sales", "manufacturing", "legal"];

// Create express app instance.
const app = express();

// MySQL DB Connection Information (remember to change this with our specific credentials)
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "@nsel64@dams",
    database: "tracker_seed_db"
});
connection.connect();
connection.query = util.promisify(connection.query);

//inquirer prompts
const actionType = [{
    type: "checkbox",
    message: "What action would you like to take?",
    choices: ["add", "view", "update", "quit"],
    name: "actionChoice"
}];

const addType = [{
    type: "checkbox",
    message: "What would you like to add?",
    choices: ["employee", "role", "quit"],
    name: "addChoice"
}];

const viewType = [{
    type: "checkbox",
    message: "What would you like to view?",
    choices: ["department", "role", "employee", "quit"],
    name: "viewChoice"
}];

const updateType = [{
    type: "checkbox",
    message: "Which employee's role would you like to update?",
    choices: ["I'll", "need", "to", "pass", "all", "employees", "here", "quit"],
    name: "updateChoice"
}];



const newRole = [{
    type: "input",
    message: "What is the new role?",
    name: "roleName"
},
{
    type: "input",
    message: "What is the new role's salary (numbers only.  No commas)?",
    name: "salary"
},
{
    // type: "checkbox",
    // message: "What is this role's department?",
    // choices: departments,
    // name: "roleDepartment"
}]

//inquirer functions
function addQuestions() {
    inquirer.prompt(addType).then(function (response) {
        let choice = response.addChoice[0];
        console.log(choice);
        if (choice === "employee") {
            addEmployee();
        }
        if (choice === "role") {
            addRole();
        }
    })
};

function viewQuestions() {
    inquirer.prompt(viewType).then(function (response) {
        let choice = response.viewChoice[0];
        console.log(choice);
        if (choice === "department") {
            viewDepartment()
        };
        if (choice === "role") {
            viewRole()
        };
        if (choice === "employee") {
            viewEmployee()
        };


    })
};

function updateQuestions() {
    inquirer.prompt(updateType).then(function (response) {
        console.log(response)
    })
};

//view functions
function viewDepartment() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        console.table(res);
        connection.end();
    })
};

async function viewRole() {
    let roles = await connection.query("SELECT * FROM role")
    console.table(roles);

};

function viewEmployee() {
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        console.table(res);
        connection.end();
    })
};

//add functions
function addRole() {
    inquirer.prompt(newRole).then(function (response) {
        let roleName = response.roleName
        let salary = response.salary
        connection.query("INSERT INTO role(name, salary, department_id) VALUES (?)", [[roleName, salary, 1]], function (err, res) {
            if (err) throw err;
            console.log(`${roleName} was added`)
            connection.end()
        })
    })
};
async function addEmployee() {
    let roles = await connection.query("SELECT * FROM role");
    let manager = await connection.query("SELECT last_name FROM employee WHERE manager_id is null");
    console.table(manager);

    console.log(roles);
    const newEmployee = [{
        type: "input",
        message: "What is the employee's first name?",
        name: "firstName",
    },
    {
        type: "Input",
        message: "What is the employee's last name?",
        name: "lastName"
    },
    {
        type: "checkbox",
        message: "What is the employee's role?",
        choices: roles.map(function (role) {
            return {
                name: role.name,
                value: role.id
            };
        }),
        name: "roleName"
    },
    {
        type: "checkbox",
        message: "Who is the employees manager?",
        choices: manager.map(function (employee) {
            return {
                name: employee.last_name,
                value: employee.id
            };
        }),
        name: "hasManager"
    }
    ];
    inquirer.prompt(newEmployee).then(function (response) {
        let firstName = response.firstName;
        let lastName = response.lastName;
        let roleID = response.roleName
        connection.query("INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?)", [[firstName, lastName, roleID, 1]], function (err, res) {
            if (err) throw err;
            console.log(`${firstName} was added`);
            console.log(response);
            connection.end()
        })
    })
};


//begin menu prompt
function menuPrompts() {
    inquirer.prompt(actionType).then(function (response) {
        let choice = response.actionChoice[0];
        console.log(choice);
        if (choice === "add") {
            console.log("add");
            addQuestions();
        }
        if (choice === "view") {
            console.log("view");
            viewQuestions();
        }
        if (choice === "update") {
            console.log("update");
            updateQuestions();
        }

        else {
            console.log("Goodbye!");
        }
    })
};
menuPrompts()


// add department

//add role

//add employee

//view department

//view role

//view employee

//update employee roles


