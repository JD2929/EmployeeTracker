
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

// if add a department is chosen
                        if (answers.mainChoice === 'Add a department') {

                            let departmentAnswers = await prompts.addDepartment();


                            const queryToRun = `INSERT INTO department (id, name) VALUES 
                            (${parseInt(departmentAnswers.departId)},'${(departmentAnswers.departName)}')`;


                            db.query(queryToRun, function (err, results) {

                                if (err) throw err;
                                console.table(results);
                                db.query('SELECT * FROM department', function (err, results) {
                                    if (err) throw err;
                                    console.table(results);
                                    return;
                                })
                                init();
                            });
                        } else


                            //if add role call function addRole from prompts
                            //get the name salary department from prompts and put into the table

                            if (answers.mainChoice === 'Add a role') {

                                let roleAnswers = await prompts.addRole();


                                const queryToRun = `INSERT INTO role (id, title, salary, department_id) VALUES 
        (${parseInt(roleAnswers.roleId)},'${(roleAnswers.roleTitle)}', ${parseInt(roleAnswers.roleSalary)}, ${parseInt(roleAnswers.roleDepartment)})`;


                                db.query(queryToRun, function (err, results) {

                                    if (err) throw err;
                                    console.table(results);
                                    db.query('SELECT * FROM role', function (err, results) {
                                        if (err) throw err;
                                        console.table(results);
                                        return;
                                    })

                                    init();
                                });
                            } else
                                //if add employee call function addEmployee from prompts
                                //get the firstname, lastname, role, manager from answers and put in the table
                                if (answers.mainChoice === 'Add an employee') {

                                    let employeeAnswers = await prompts.addEmployee();


                                    const queryToRun = `INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES 
(${parseInt(employeeAnswers.employeeId)},'${(employeeAnswers.firstName)}', '${(employeeAnswers.lastName)}', ${parseInt(employeeAnswers.employeeRoleId)}, ${parseInt(employeeAnswers.employeeManagerId)})`;


                                    db.query(queryToRun, function (err, results) {

                                        if (err) throw err;
                                        console.table(results);
                                        db.query('SELECT * FROM employee', function (err, results) {
                                            if (err) throw err;
                                            console.table(results);
                                            return;
                                        })
                                        init();
                                    });
                                } else
                                    //if update employee call function updateEmployee from prompts
                                    //use the first and last name to find appropriate employee
                                    //then get the new role and update in the table
                                    if (answers.mainChoice === 'Update an employee role') {

                                        let updateAnswers = await prompts.updateEmployee();


                                        const queryToRun = `UPDATE employee SET role_id = ${parseInt(updateAnswers.employeeNewRole)} WHERE first_name = '${(updateAnswers.firstName)}' AND last_name = '${(updateAnswers.lastName)}'`;

                                        db.query(queryToRun, function (err, results) {

                                            if (err) throw err;
                                            console.table(results);
                                            db.query('SELECT * FROM employee', function (err, results) {
                                                if (err) throw err;
                                                console.table(results);
                                                return;
                                            })
                                            init();
                                        });
                                    };

};

init();