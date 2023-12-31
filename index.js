
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


                        const queryToRun = `INSERT INTO department (name) VALUES 
                            ('${(departmentAnswers.departName)}')`;


                        db.query(queryToRun, function (err, results) {

                            if (err) throw err;

                            db.query('SELECT * FROM department', async function (err, results) {
                                if (err) throw err;
                                console.table(results);
                                init();
                                return;
                            })
                            
                        });

                    } else


                        //if add role call function addRole from prompts
                        //get the name salary department from prompts and put into the table

                        if (answers.mainChoice === 'Add a role') {


                            db.query('SELECT *FROM department', async function (err, departments) {
                                if (err) throw err;

                                let roleAnswers = await prompts.addRole(departments);
                                db.query('SELECT * FROM role', function (err, results) {
                                    if (err) throw err;

                                    return;
                                })
                                const queryToRun = `INSERT INTO role (title, salary, department_id) VALUES 
                                ('${(roleAnswers.roleTitle)}', ${parseInt(roleAnswers.roleSalary)}, ${parseInt(roleAnswers.roleDepartmentId)})`;


                                db.query(queryToRun, function (err, results) {

                                    if (err) throw err;

                                    db.query('SELECT * FROM role', function (err, results) {
                                        if (err) throw err;
                                        console.table(results);
                                        init();
                                        return;
                                    })

                                 
                                });

                            })





                        } else
                            //if add employee call function addEmployee from prompts
                            //get the firstname, lastname, role, manager from answers and put in the table
                            if (answers.mainChoice === 'Add an employee') {
                                db.query('SELECT *FROM role', async function (err, roles) {
                                    if (err) throw err;

                                    let employeeAnswers = await prompts.addEmployee(roles);


                                    const queryToRun = `INSERT INTO employee ( first_name, last_name, role_id, manager_id) VALUES 
('${(employeeAnswers.firstName)}', '${(employeeAnswers.lastName)}', ${parseInt(employeeAnswers.employeeRoleId)}, ${parseInt(employeeAnswers.employeeManagerId)})`;


                                    db.query(queryToRun, function (err, results) {

                                        if (err) throw err;

                                        db.query('SELECT * FROM employee', function (err, results) {
                                            if (err) throw err;
                                            console.table(results);
                                            init();
                                            return;
                                        })
                                       
                                    })
                                });
                            } else
                                //if update employee call function updateEmployee from prompts
                                //use the first and last name to find appropriate employee
                                //then get the new role and update in the table
                                if (answers.mainChoice === 'Update an employee role') {

                                    await updateEmployee();
                                    console.table()
                                  
                                };

};

init();


function handleEmployeeUpdateQuery(err, results) {

    if (err) throw err;
    db.query('SELECT * FROM employee', function (err, employees) {
        if (err) throw err;   
        console.table(employees)
        init();
        return;
    });
    
}

async function updateEmployee() {

    db.query('SELECT * FROM employee', async function (err, employees) {
        if (err) throw err;
        db.query('SELECT * FROM role', async function (err, roles) {
            if (err) throw err;

            let updateAnswers = await prompts.updateEmployee(employees, roles);

            const queryToRun = `UPDATE employee SET role_id = ${parseInt(updateAnswers.employeeNewRoleId)} WHERE id = ${updateAnswers.employeeId}`;
            db.query(queryToRun, handleEmployeeUpdateQuery);
        })
    })


};
