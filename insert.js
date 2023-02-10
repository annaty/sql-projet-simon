let mysql = require('mysql');  
let con = mysql.createConnection({  
    host: "localhost",  
    user: "root",  
    password: "mynewpassword",  
    database: "test"  
});  

con.connect(function(err) {  
    if (err) throw err;  
    console.log("Connected!");  
    var sql = "INSERT INTO students (student_name, student_age, grade, firstname, school_id) VALUES ('name', 23, 1, 'name', 23)";  
    con.query(sql, function (err, result) {  
        if (err) throw err;  
        console.log("1 record inserted");
    })
});