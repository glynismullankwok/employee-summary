const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


const teamMembers=[]

function createTeam() {
  inquirer.prompt([
    {
      type: "list",
      name: "memberChoice",
      message: "Which type of team member would you like to add?",
      choices: [
        "Manager",
        "Engineer",
        "Intern",
        "I don't want to add any more team members"
      ]
    }
  ]).then(userChoice => {
    switch (userChoice.memberChoice) {
      case "Manager":
        teamQuestions();
      case "Engineer":
        engineerQuestions();
        break;
      case "Intern":
        internQuestions();
        break;
      default:
        buildTeam();
    }
  });
}
function  teamQuestions() {inquirer 
.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the manager's name?"
    },
    {
      type: "input",
      message: "What the manager's employee id?",
      name: "id",
    },
    {
      type: "input",
      message: "What is the manager's email?",
      name: "email", 
    },
    {
      type: "input",
      message: "What is the manager's office number?",
      name: "officeNumber", 
    },
    {
      type: "checkbox",
      message: "What type of team member would you like to add?",
      name: "member", 
      choices: ["engineer","intern"]
    }
  ]) .then (function(answers){
    const manager = new Manager (answers.name, answers.id, answers.email, answers.officeNumber)
    console.log(manager)
    teamMembers.push(manager)
    engineerQuestions()
    internQuestions()

  })
}
  function engineerQuestions () { 
    inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the employee's name?"
    },
    {
      type: "input",
      message: "What is the employee id?",
      name: "id",
    },
    {
      type: "input",
      message: "What is the employee's email?",
      name: "email", 
    },
    {
      type: "input",
      message: "What is the employee's github username?",
      name: "github", 
    }
  ]) .then(function(answers){
    const engineer = new Engineer (answers.name, answers.id, answers.email, answers.github)
    console.log(engineer)
    teamMembers.push(engineer)
    createTeam()
}) }


  function internQuestions () {
    inquirer.prompt([

    {
      type: "input",
      name: "name",
      message: "What is the employee's name?"
    },
    {
      type: "input",
      message: "What is the employee id?",
      name: "id",
    },
    {
      type: "input",
      message: "What is the employee's email?",
      name: "email", 
    },
    {
      type: "input",
      message: "What school is the employee going to?",
      name: "school", 
    }
  ]) .then(function(answers){
    const intern = new Intern (answers.name, answers.id, answers.email, answers.school)
    console.log(intern)
    teamMembers.push(intern)
    createTeam()
})
  }
  

  function buildTeam() {
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
  }

  createTeam()
