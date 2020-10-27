const express = require("express");
const mysql = require("mysql");
const inquirer = require("inquirer");
// const questions = require ("./questions");
// const viewFunction = require("./viewFunction");

// Create express app instance.
const app = express();
// const PORT = process.env.PORT || 8080;

// MySQL DB Connection Information (remember to change this with our specific credentials)
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "@nsel64@dams",
  database: "tracker_seed_db"
});

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

//inquirer functions
function addQuestions(){
    inquirer.prompt(addType).then(function(response){
        console.log(response)
    })
};

function viewQuestions(){
    inquirer.prompt(viewType).then(function(response){
        let choice = response.viewChoice[0];
        console.log(choice)
        if(choice === "department"){
            viewDepartment()
        };
        if(choice === "role"){
            viewRole()
        };
        if(choice === "employee"){
            viewEmployee()
        };
        
        
    })
};

function updateQuestions(){
    inquirer.prompt(updateType).then(function(response){
        console.log(response)
    })
};

//view functions
function viewDepartment(){
    connection.query("SELECT * FROM department", function(err, res){
        if(err) throw err;
        console.table(res);
        connection.end();
    })
};

function viewRole(){
    connection.query("SELECT * FROM role", function(err, res){
        if(err) throw err;
        console.table(res);
        connection.end();
    })
};

function viewEmployee(){
    connection.query("SELECT * FROM employee", function(err, res){
        if(err) throw err;
        console.table(res);
        connection.end();
    })
};

//begin menu prompt
function menuPrompts(){
    inquirer.prompt(actionType).then(function(response){
        let choice = response.actionChoice[0];
        console.log(choice);
        if (choice === "add"){
            console.log("add");
            addQuestions();
        }
        if (choice === "view"){
            console.log("view");
            viewQuestions();
        }
        if (choice === "update"){
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





// app.listen(PORT, function() {
//     // Log (server-side) when our server has started
//     console.log("Server listening on: http://localhost:" + PORT);
//   });
  