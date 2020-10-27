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

module.exports= viewDepartment, viewEmployee, viewRole;