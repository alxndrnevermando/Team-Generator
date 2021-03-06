const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const questions = [];
const managerarray = [
    {
        type: "input",
        message: "Name: ",
        name: "name"
    },
    {
        type: "input",
        message: "Email: ",
        name: "email"
    },
    {
        type: "input",
        message: "ID: ",
        name: "id"
    },
    {
        type: "input",
        message: "Office Number: ",
        name: "officeNumber"
    }
];
const engineerarray = [
    {
        type: "input",
        message: "Name: ",
        name: "name"
    },
    {
        type: "input",
        message: "Email: ",
        name: "email"
    },
    {
        type: "input",
        message: "ID: ",
        name: "id"
    },
    {
        type: "input",
        message: "Github: ",
        name: "github"
    }
];
const internsarray = [
    {
        type: "input",
        message: "Name: ",
        name: "name"
    },
    {
        type: "input",
        message: "Email: ",
        name: "email"
    },
    {
        type: "input",
        message: "ID: ",
        name: "id"
    },
    {
        type: "input",
        message: "School: ",
        name: "school"
    }
];


function askUser() {
    inquirer.prompt([
        {
            type: "confirm",
            message: "Add an employee?",
            name: "continue",
            default: true,
        },
        {
            type: "list",
            message: "What employee type are you? ",
            choices: ["Manager", "Engineer", "Intern"],
            name: "organization"
        }
    ]).then(function (response) {
        if (response.continue === true && response.organization === "Manager") {
            managerInquirer();
        }
        else if (response.continue === true && response.organization === "Engineer") {
            engineerInquirer();
        }
        else if (response.continue === true && response.organization === "Intern") {
            internInquirer();
        }
        else {
            init();
        }

    });
};

function managerInquirer() {
    inquirer.prompt(managerarray).then(function(response) {
        const managerList = new Manager(response.name, response.id, response.email, response.officeNumber);
        questions.push(managerList);
        askUser();
    })
};

function engineerInquirer() {
    inquirer.prompt(engineerarray).then(function(response) {
        const engineerList = new Engineer(response.name, response.id, response.email, response.githu);
        questions.push(engineerList);
        askUser();
    })
};

function internInquirer() {
    inquirer.prompt(internsarray).then(function(response) {
        const internList = new Intern(response.name, response.id, response.email, response.school);
        questions.push(internList);
        askUser();
    })
};

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.

function init() {
    // Use user feedback for... whatever!!
    const outputHTML = render(questions);
    fs.writeFile(outputPath, outputHTML, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("SUCCESS!")
        }
    });
}

// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

askUser();

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
