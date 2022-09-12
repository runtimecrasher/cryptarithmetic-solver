// cryptarithmetic solver in TYPESCRIPT
var readline = require('readline');

// clear the terminal and request three words and save them in variables
process.stdout.write('\033c'); 
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// request three words in a green terminal and save them in variables
rl.question('Enter the first word: ', (firstWord:string) => {
    process.stdout.write('\033c');
    rl.question("Enter the second word: ", (secondWord:string) => {
        process.stdout.write('\033c');
        rl.question("Enter the result word: ", (resultWord:string) => {
            process.stdout.write('\033c');
            //  print thinking ... in blue
            console.log('\x1b[34m%s\x1b[0m', 'Solving 🧠 ...');
            // using cryptarithmetic get all posible solutions
            var solutions = cryptarithmetic(firstWord, secondWord, resultWord);
            //  if no solutions found print no solutions found
            //  clear the terminal
            //  if solutions found print all solutions
            process.stdout.write('\033c');

            console.log(
                solutions.length ? "\x1b[32m" : "\x1b[31m",
                `Total solutions found: ${solutions.length} ${solutions.length ? '!' : '🥺'}`
            )

            if (solutions.length) {
                //  press "S"a to show all solutions or press any key to exit
                rl.question("Press S to show all solutions or press any key to exit: ", key => {
                    if (key === 's' || key === 'S') {
                        process.stdout.write('\033c');
                        console.log('\x1b[32m%s\x1b[0m', 'Solutions:');
                        solutions.forEach((solution, index) => {
                            console.log(`Solution ${index + 1}:`);
                            console.log(solution);
                        });
                    }
                    rl.close();
                    // terminate the program
                    process.exit(0);
                });
            }else {
                rl.close();
                // terminate the program
                process.exit(0);
            }   
        });
    });
});

// cryptarithmetic function
const cryptarithmetic = (firstWord: string, secondWord: string, resultWord: string) =>  {
    //  get all unique letters in the words
    var letters = getLetters(firstWord, secondWord, resultWord);
    //  get all posible numbers for the letters
    var numbers = getNumbers(letters);
    //  get all posible solutions
    var solutions = getSolutions(firstWord, secondWord, resultWord, letters, numbers);
    return solutions;
}

// get all unique letters in the words

const getLetters = (firstWord: string, secondWord: string, resultWord: string) => {
    let letters:string[][] = [];
    var words = [firstWord, secondWord, resultWord];
    for (var i = 0; i < words.length; i++) {
        for (var j = 0; j < words[i].length; j++) {
            if (letters.indexOf(words[i][j] as unknown as string[]) == -1) {
                letters.push(words[i][j]  as unknown as string[]);
            }
        }
    }
    return letters;
}

// get all posible numbers for the letters

const getNumbers = (letters:string[][]) => {
    var numbers:number[] = [];
    for (var i = 0; i < 10; i++) {
        numbers.push(i);
    }
    return permute(numbers, letters.length);
}

// get all posible solutions

const getSolutions = (firstWord:string, secondWord:string, resultWord:string, letters:string[][], numbers:number[][]) => {
    var solutions:{}[] = [];
    for (var i = 0; i < numbers.length; i++) {
        var solution = {};
        for (var j = 0; j < letters.length; j++) {
            solution[letters[j] as unknown as number] = numbers[i][j];
        }
        if (checkSolution(firstWord, secondWord, resultWord, solution)) {
            solutions.push(solution);
        }
    }
    return solutions;
}

//  define permute

const permute = (input:number[], length: number) => {
    var result:number[][] = [];
    for (var i = 0; i < input.length; i++) {
        if (length == 1) {
            result.push([input[i]]);
        } else {
            var remaining = input.slice(0, i).concat(input.slice(i + 1));
            var innerPermutations = permute(remaining, length - 1);
            for (var j = 0; j < innerPermutations.length; j++) {
                result.push([input[i]].concat(innerPermutations[j]));
            }
        }
    }
    return result;
}

// check if the solution is correct

const checkSolution = (firstWord, secondWord, resultWord, solution) => {
    var firstNumber = getNumber(firstWord, solution);
    var secondNumber = getNumber(secondWord, solution);
    var resultNumber = getNumber(resultWord, solution);
    return firstNumber + secondNumber == resultNumber;
}

// get the number for a word

const getNumber = (word, solution) => {
    var number = "";
    for (var i = 0; i < word.length; i++) {
        number += solution[word[i]];
    }
    return parseInt(number);
}

// Execute this program in the terminal using the command: node index.ts







