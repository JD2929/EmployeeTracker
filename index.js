
import * as prompts from './prompts.js';
import mysql from 'mysql2';

//connect to db 

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'pass',
    database: 'myCompany_db'
},
    console.log('myCompany_db is connected')
);

//run main question from prompts
//listen for the answer from prompts
let shouldExit = false;

async function init() {
    let answers = await prompts.mainQuestions();

    //if finished just exited
    if (answers.mainChoice === 'Finished') {
        console.log('Goodbye!')
    } else
        //if look at department table select department table
        if (answers.mainChoice === 'View all departments') {

            db.query('SELECT * FROM department', function (err, results) {
                if (err) throw err;
                console.table(results);

                init();
            });

        } else

            //if look at role table select role table
            if (answers.mainChoice === 'View all roles') {

                db.query('SELECT * FROM role', function (err, results) {
                    if (err) throw err;
                    console.table(results);
                    init();
                });
            } else

                //if look at employee table select employee table 
                if (answers.mainChoice === 'View all employees') {
                    db.query('SELECT * FROM employee', function (err, results) {
                        if (err) throw err;
                        console.table(results);
                        init();

                    });
                } else

                    //if add  department call function addDeparment from prompts
                    //get the name and id entered and put into the table
                    if (answers.mainChoice === 'View all employees') {
                        db.query('SELECT * FROM employee', function (err, results) {
                            if (err) throw err;
                            console.table(results);
                            init();

                        });
                    } else
                        if (answers.mainChoice === 'Add a department') {

                            let departmentAnswers = await prompts.addDepartment();

                            console.log("department answers are here")
                            const queryToRun = `INSERT INTO department (id, name) VALUES 
                            (${parseInt(departmentAnswers.departId)},'${(departmentAnswers.departName)}')`;
                            console.log("about to run:");
                            console.log(queryToRun);
                            db.query(queryToRun, function (err, results) {
                                console.log('table should be here')
                                if (err) throw err;
                                console.table(results);
                                db.query ('SELECT * FROM department', function (err,results) {
                                if (err) throw err;
                                console.table(results);
                                return;})
                            });
                        };


    //if add role call function addRole from prompts
    //get the name salary department from prompts and put into the table

    //if add employee call function addEmployee from prompts
    //get the firstname, lastname, role, manager from answers and put in the table

    //if update employee call function updateEmployee from prompts
    //use the first and last name to fine appropriate employee
    //then get the new role and update in the table

    // Access the user's responses through the 'answers' object
    //const { questions } = answers;
};

init();