const inquirer = require(inquirer);

async function mainQuestion()
try {
    const mainAnswers = await inquirer.prompt([
        {
            type: 'list',
            message: 'Which of the following choices would you like to do?',
            name: 'questions',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update and employee role']
        },

    ])
}
catch (error) {
    console.error('An error occurred:', error);
}

async function addDepartment()
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
}

catch (error) {
    console.error('An error occurred:', error);
}

async function addRole()
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
}

async function addEmployee()
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
}












// Access the user's responses through the 'answers' object
const { questions } = answers;