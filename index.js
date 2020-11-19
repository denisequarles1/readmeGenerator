// Packagaes
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

// Internal modules
const api = require('./utility/api.js');
const generateMarkdown = require('./utility/generateMarkdown.js');

// Array of questions for user
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

    //Gets contributing information
    {
        type: 'input',
        message: "Provide instructions how developers can contribute to your project.",
        name: 'contributing'
    },

    //Gets tests information
    {
        type: 'input',
        message: "Provide information regarding tests you conducted.",
        name: 'tests'
    },
    
    //Gets email
    {
        type: 'input',
        message: "Enter your email address where you can be reached for additional questions.",
        name: 'email'
    },
];

// function to write README file
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

// function to initialize program
async function init() {
    try {

        // Prompt user questions
        const userResponses = await inquirer.prompt(questions);
        console.log("Your responses: ", userResponses);
        console.log("Thank you for your responses! Fetching your GitHub data next...");
    
        // Call GitHub api for user info
        const userInfo = await api.getUser(userResponses);
        console.log("Your GitHub user info: ", userInfo);
    
        // Pass Inquirer userResponses and GitHub userInfo to generateMarkdown
        console.log("Generating your README next...")
        const markdown = generateMarkdown(userResponses, userInfo);
        console.log(markdown);
    
        // Write markdown to file
        await writeFileAsync('GeneratedREADME.md', markdown);

    } catch (error) {
        console.log(error);
    }

}

// function call to initialize program
init();
