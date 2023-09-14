import inquirer from 'inquirer';

export async function mainQuestions(){
try {
    const mainAnswers = await inquirer.prompt([
        {
            type: 'list',
            message: 'Which of the following choices would you like to do?',
            name: 'mainChoice',
            choices: ['Finished', 'View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update and employee role']
        },

    ])

    console.log (`Inside mainQuestions ${JSON.stringify(mainAnswers)}`);
    return mainAnswers;

}
catch (error) {
    console.error('An error occurred:', error);
}};

export async function addDepartment(){
try {
    const departmentAnswers = await inquirer.prompt([
        {
            type: 'input',
            name: 'departName',
            message: 'Please enter the name of the department.'
        },
        {
            type: 'input',
            name: 'departId',
            message: 'Please enter the third digit department id.'
        }
    ])
    return departmentAnswers;
}

catch (error) {
    console.error('An error occurred:', error);
}};

export async function addRole(){
try {
    const roleAnswers = await inquirer.prompt([
        {
            type: 'input',
            name: 'roleName',
            message: 'Please enter the name of the new role.'
        },

        {
            type: 'input',
            name: 'roleSalary',
            message: 'Please enter the salary for the new role.'
        },

        {
            type: 'input',
            name: 'roleDepartment',
            message: 'Please enter the name of the department for the new role.'
        }
    ])
}

catch (error) {
    console.error('An error occurred:', error);
}}

export async function addEmployee(){
try {
    const employeeAnswers = await inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'Please enter the first name of the new employee.'
        },

        {
            type: 'input',
            name: 'last Name',
            message: 'Please enter the last name of the new employee.'
        },

        {
            type: 'input',
            name: 'employeeRole',
            message: 'Please enter the role for the new employee.'
        },
        {
            type: 'input',
            name: 'employeeManager',
            message: 'Please enter the manager for the new employee.'
        }
    ])
}



catch (error) {
    console.error('An error occurred:', error);
}}

export async function updateEmployee(){
try {
    const updateAnswers = await inquirer.prompt([
        {
            type: 'input',
            name: 'updateFirstName',
            message: 'Please enter the first name of the employee you want to update.'
        },

        {
            type: 'input',
            name: 'updatteLastName',
            message: 'Please enter the last name of the employee you want to update.'
        },

        {
            type: 'input',
            name: 'employeeNewRole',
            message: 'Please enter the new role for the employee.'
        },
        
    ])
}

catch (error) {
    console.error('An error occurred:', error);
}};





