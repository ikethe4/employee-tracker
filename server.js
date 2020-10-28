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
    choices: ["employee", "role", "department", "quit"],
    name: "addChoice"
}];

const viewType = [{
    type: "checkbox",
    message: "What would you like to view?",
    choices: ["department", "role", "employee", "quit"],
    name: "viewChoice"
}];

const newDepartment = [{
    type: "input",
    message: "What is this department's name?",
    name: "departmentName"
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
        if (choice === "department"){
            addDepartment()
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
//update functions
async function updateQuestions() {
    let roles = await connection.query("SELECT * FROM role");
    let employees = await connection.query("SELECT * FROM employee");
    const updateType = [{
        type: "checkbox",
        message: "Which employee's role would you like to update?",
        choices: employees.map(function (employee) {
            return {
                name: employee.last_name,
                value: employee.id
            };
        }),
        name: "updateEmp"
    },
    {
        type: "checkbox",
        message: "What would you like the employee's new role to be?",
        choices: roles.map(function (role) {
            return {
                name: role.name,
                value: role.id
            };
        }),
        name: "newRole"
    }

];
    inquirer.prompt(updateType).then(function (response) {
        let updateEmp = response.updateEmp;
        let newRole= response.newRole;
        console.log(updateEmp);
        console.log(newRole)
        connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [[newRole], [updateEmp]], function (err, res) {
            if (err) throw err;
            console.log(`role was added`)
            menuPrompts()
        })
        
    })
};  

//view functions
function viewDepartment() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        console.table(res);
        menuPrompts();
    })
};

async function viewRole() {
    let roles = await connection.query("SELECT * FROM role")
    console.table(roles);
    menuPrompts()

};

function viewEmployee() {
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        console.table(res);
        menuPrompts();
    })
};

//add functions
async function addRole() {
    let department = await connection.query("SELECT * FROM department");
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
        type: "checkbox",
        message: "What is this role's department?",
        choices: department.map(function(department) {
            return {
                name: department.name,
                value: department.id
            };
        }),
        name: "roleDepartment"
    }]
    inquirer.prompt(newRole).then(function (response) {
        let roleName = response.roleName
        let salary = response.salary
        let roleDepartment = response.roleDepartment;
        connection.query("INSERT INTO role(name, salary, department_id) VALUES (?)", [[roleName, salary, roleDepartment]], function (err, res) {
            if (err) throw err;
            console.log(`${roleName} was added`)
            menuPrompts()
        })
    })
};
async function addEmployee() {
    let roles = await connection.query("SELECT * FROM role");
    let manager = await connection.query("SELECT * FROM employee WHERE manager_id is null");
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
        let managerID = response.hasManager
        connection.query("INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?)", [[firstName, lastName, roleID, managerID]], function (err, res) {
            if (err) throw err;
            // console.log(`${firstName} was added`);
            // console.log(response);
            menuPrompts()
        })
    })
};

function addDepartment() {
    inquirer.prompt(newDepartment).then(function (response) {
        let departmentName = response.departmentName
        connection.query("INSERT INTO department(name) VALUES (?)", [[departmentName]], function (err, res) {
            if (err) throw err;
            console.log(`${departmentName} was added`)
            menuPrompts()
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


