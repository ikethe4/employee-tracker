const express = require("express");
const mysql = require("mysql");
const inquirer = require("inquirer");
// const questions = require ("./questions");

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

function actionSelect(){
    inquirer.prompt(actionType).then(function(response){
        console.log(response)
    })
};
actionSelect()


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
  