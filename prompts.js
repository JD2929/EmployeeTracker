import inquirer from 'inquirer';

export async function mainQuestions(){
try {
    const mainAnswers = await inquirer.prompt([
        {
            type: 'list',
            message: 'Which of the following choices would you like to do?',
            name: 'mainChoice',
            choices: ['Finished', 'View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
        },

    ])


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
            message: 'Please type the name of the new department.'
        },
       
    ])
    return departmentAnswers;
}

catch (error) {
    console.error('An error occurred:', error);
}};

export async function addRole(departments){
try { 
    
    const choices = departments.map ((department) =>{
        return {name: department.name, value: department.id}

    })
    const roleAnswers = await inquirer.prompt([
          
        {
            type: 'input',
            name: 'roleTitle',
            message: 'Please enter the title of the new role.'
        },

        {
            type: 'input',
            name: 'roleSalary',
            message: 'Please enter the salary for the new role.'
        },

        {
            type: 'list',
            name: 'roleDepartmentId',
            message: 'Please choose the department for the new role.',
            choices: choices
        }
    ])
    return roleAnswers;
}

catch (error) {
    console.error('An error occurred:', error);
}}

export async function addEmployee(roles){
try {
    const choices = roles.map ((role) =>{
        return {name: role.title, value: role.id}

    })
    const employeeAnswers = await inquirer.prompt([
       
       
        {
            type: 'input',
            name: 'firstName',
            message: 'Please enter the first name of the new employee.'
        },

        {
            type: 'input',
            name: 'lastName',
            message: 'Please enter the last name of the new employee.'
        },

        {
            type: 'list',
            name: 'employeeRoleId',
            message: 'Please choose the role for the new employee.',
            choices: choices
        },
        {
            type: 'input',
            name: 'employeeManagerId',
            message: 'Please enter the manager id code for the new employee.'
        }
    ])
    return employeeAnswers;
}



catch (error) {
    console.error('An error occurred:', error);
}}

export async function updateEmployee(employees,roles){
try {
    const employeeChoices = employees.map ((employee) =>{
        return {name: `${employee.first_name} ${employee.last_name}`, value:employee.id}
    });
    const roleChoices = roles.map ((role) =>{
        return {name: role.title, value:role.id}
    });

    const updateAnswers = await inquirer.prompt([
        {
            type: 'list',
            name: 'employeeId',
            message: 'Please choose the employee you want to update.',
            choices: employeeChoices
        },

       

        {
            type: 'list',
            name: 'employeeNewRoleId',
            message: 'Please choose the  new role for the employee.',
            choices: roleChoices
        },
        
    ])
    return updateAnswers;
}

catch (error) {
    console.error('An error occurred:', error);
}}
;





