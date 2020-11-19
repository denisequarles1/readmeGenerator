// Packagaes
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

// Internal modules
const api = require('./utility/api.js');
const generateMarkdown = require('./utility/generateMarkdown.js');

// Array of questions for userto answer
const questions = [
    {
       //Gets the user's GitHub username
       type: 'input',
       message: "What is your GitHub username?",
       name:'username',
    },
    
    //Gets the project title
    {
        type: 'input',
        message: "What is the project title?",
        name: 'title',
    },

    //Gets the project description
    {
        type: 'input',
        message: "What is the project description?",
        name: 'description',  
    },

    //Gets installation steps
    {
        type: 'input',
        message: "If applicable, describe the steps required to install your project for the Installation section.",
        name: 'installation'
    },

    //Gets usage information
    {
        type: 'input',
        message: "Provide instructions and examples of your project in use for the Usage section.",
        name: 'usage'
    },

    //Gets license information
    {
        type: 'list',
        message: "Choose a license for your project.",
        choices: ['GNU AGPLv3', 'GNU GPLv3', 'GNU LGPLv3', 'Mozilla Public License 2.0', 'Apache License 2.0', 'MIT License', 'Boost Software License 1.0', 'The Unlicense'],
        name: 'license'
    },

    //Gets instructions how to contribute to the project
    {
        type: 'input',
        message: "Provide instructions how developers can contribute to your project.",
        name: 'contributing'
    },

    //Gets test information
    {
        type: 'input',
        message: "Provide information regarding tests you conducted.",
        name: 'tests'
    },
    
    //Gets user's email
    {
        type: 'input',
        message: "Enter your email address where you can be reached for additional questions.",
        name: 'email'
    },
];

// Function to write README file
function writeToFile(fileName, data) 
{
    fs.writeFile(fileName, data, err => 
        {
            if (err) 
            {
                return console.log(err);
            }
      
        console.log("The README.md file has been generated")
    });
}

const writeFileAsync = util.promisify(writeToFile);

// Function to initialize program
async function init() {
    try {

        // Prompts for user questions
        const userResponses = await inquirer.prompt(questions);
        console.log("Your responses: ", userResponses);
        console.log("Thank you for your responses.");
    
        // Call GitHub api for user info
        const userInfo = await api.getUser(userResponses);
        
    
        // Pass Inquirer userResponses and GitHub userInfo to generateMarkdown
        const markdown = generateMarkdown(userResponses, userInfo);
    
        // Write markdown to file
        await writeFileAsync('GeneratedREADME.md', markdown);

    } catch (error) {
        console.log(error);
    }

}

// Function call to initialize program
init();
