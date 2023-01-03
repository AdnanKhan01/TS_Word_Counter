#!/usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
import chalkAnimation from 'chalk-animation';
// var count: number = 0;
const menuOptions = [
    'Count words without spaces',
    'Count characters without spaces',
    'Quit'
];
const sleep = () => {
    return new Promise((r) => setTimeout(r, 4250));
};
async function welcome() {
    const style = chalkAnimation.karaoke('Welcome to this word counter program \n');
    await sleep(); //waiting for sleep to over
    style.stop();
}
await welcome();
function wordCount(input) {
    let count = 0;
    for (let i = 0; i < (input.length); i++) {
        if (input[i] === ' ') {
            count++;
        }
    }
    return count;
}
function charCount(input) {
    let char_count = 0;
    for (let i = 0; i < input.length; i++) {
        if (input[i] !== ' ') {
            char_count++;
        }
    }
    return char_count;
}
async function askQuestions() {
    var ans = await inquirer.prompt([{
            type: 'list',
            name: 'option',
            message: 'What do you want to do?',
            choices: menuOptions
        },
        {
            type: 'input',
            name: 'word_count',
            message: 'Enter your text to count the words for:  ',
            when(ans) {
                return ans.option == 'Count words without spaces';
            }
        },
        {
            type: 'input',
            name: 'char_count',
            message: 'Enter your text to count the characters for:  ',
            when(ans) {
                return ans.option == 'Count characters without spaces';
            }
        }]).then(answers => {
        switch (answers.option) {
            case 'Count words without spaces':
                let wc = wordCount(answers.word_count);
                console.log("The number of words in your text are :", wc + 1);
                break;
            case 'Count characters without spaces':
                let cc = charCount(answers.char_count);
                console.log("The number of characters in your text are: ", cc);
                break;
            case 'Quit':
                console.log("Bye!!");
                process.exit(0);
        }
    });
}
async function startAgain() {
    do {
        await askQuestions();
        var again = await inquirer
            .prompt({
            type: "input",
            name: "doAgain",
            message: chalk.blueBright("Do you want to count further? Type 'y' for yes and 'n' for No ")
        });
    } while (again.doAgain == "y" || again.doAgain == "Y");
}
startAgain();
