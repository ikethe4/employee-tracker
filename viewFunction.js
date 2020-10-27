function viewQuestions(){
    inquirer.prompt(updateType).then(function(response){
        console.log(response)
    })
};


module.exports = viewFunction