const inquirer = require("inquirer");

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

module.exports = questions;