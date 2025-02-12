const questions = [
    {
        question: '1.If you could have any superpower, which one would you choose?',
        answers: [
            { text: 'a) Invisibility', correct: false },
            { text: 'b) Time Travel', correct: false },
            { text: 'c) Telepathy', correct: true },
            { text: 'd) Super strength', correct: false }
        ]
    },
    {
        question: '2.Which of the following animals is known to use tools to catch food?',
        answers: [
            { text: 'a) Dolphins', correct: false },
            { text: 'b) Elephants', correct: false },
            { text: 'c) Crows', correct: false },
            { text: 'd) All of the above', correct: true }
        ]
    },
    {
        question: '3.What is the rarest blood type in humans?',
        answers: [
            { text: 'a) A+', correct: false },
            { text: 'b) AB-', correct: true },
            { text: 'c) B-', correct: false },
            { text: 'd) O+', correct: false }
        ]
    },
    {
        question: '4.Which ancient civilization is known for creating the first writing system?',
        answers: [
            { text: 'a) Egyptians', correct: false },
            { text: 'b) Sumerians', correct: true },
            { text: 'c) Greeks', correct: false },
            { text: 'd) Mayans', correct: false }
        ]
    },
    {
        question: '5.If you could live in any fictional universe, which one would it be?',
        answers: [
            { text: 'a) Middle-Earth (Lord of the Rings)', correct: false },
            { text: 'b) Hogwarts (Harry Potter)', correct: true },
            { text: 'c) Westeros (Game of Thrones)', correct: false },
            { text: 'd) The Star Wars Galaxy', correct: false }
        ]
    },
    {
        question: '6.When faced with a challenging situation, how do you typically respond?',
        answers:[
            { text: 'a) Take charge and lead the way', correct: false },
            { text: 'b) Stay calm and think through a plan', correct: true },
            { text: 'c) Seek advice and support from others', correct: false },
            { text: 'd) Avoid it and hope it resolves on its own', correct: false }
        ]
    },
    {
        question: '7.What is your ideal way to spend a weekend?',
        answers:[
            { text: 'a) Exploring nature and going on adventures', correct: false },
            { text: 'b) Relaxing at home with a good book or movie', correct: true },
            { text: 'c) Socializing with friends and family', correct: false },
            { text: 'd) Working on a personal project or hobby', correct: false }
        ]
    },
    {
        question: '8.How do you approach learning something new?',
        answers:[
            { text: 'a) Dive right in and learn through experience', correct: false },
            { text: 'b) Research and read extensively before starting', correct: true },
            { text: 'c) Take a structured course or class', correct: false },
            { text: 'd) Ask for guidance from someone knowledgeable', correct: false }
        ]
    },
    {
        question: '9.What type of environment do you thrive in the most?',
        answers:[
            { text: 'a) Fast-paced and dynamic', correct: false },
            { text: 'b) Calm and peaceful', correct: true },
            { text: 'c) Collaborative and social', correct: false },
            { text: 'd) Structured and organized', correct: false }
        ]
    },
    {
        question: '10.When making decisions, what influences you the most?',
        answers:[
            { text: 'a) Facts and data', correct: true },
            { text: 'b) Intuition and gut feelings', correct: false },
            { text: 'c) Opinions and experiences of others', correct: false },
            { text: 'd) Potential risks and consequences', correct: false }
        ]
    }
];

const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const scoreContainer = document.getElementById('score-container');
const scoreElement = document.getElementById('score');
const startContainer = document.getElementById('start-container');
const quizContainer = document.getElementById('quiz');
const usernameInput = document.getElementById('username');
const leaderboardContainer = document.getElementById('leaderboard-container');
const leaderboardElement = document.getElementById('leaderboard');

let currentQuestionIndex = 0;
let score = 0;
let wrongAttempts = 0;
let userName = '';

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

function startGame() {
    userName = usernameInput.value.trim();
    if (userName === '') {
        alert('Please enter your name to start the game.');
        return;
    }
    startContainer.classList.add('hide');
    quizContainer.classList.remove('hide');
    leaderboardContainer.classList.add('hide');
    currentQuestionIndex = 0;
    score = 0;
    wrongAttempts = 0;
    scoreContainer.classList.add('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    if (correct) {
        setStatusClass(selectedButton, true);
        score++;
        scoreElement.innerText = score;
        setTimeout(() => {
            if (questions.length > currentQuestionIndex + 1) {
                currentQuestionIndex++;
                setNextQuestion();
            } else {
                alert(`Quiz completed! 🎉 Your score: ${score}`);
                updateLeaderboard();
                returnToMainScreen();
            }
        }, 1000);
    } else {
        wrongAttempts++;
        if (wrongAttempts == 1) {
            setStatusClass(selectedButton, false);
        } else if (wrongAttempts >= 2) {
            setStatusClass(selectedButton, 'black-fade');
            setTimeout(() => {
                alert(`You have given 2 wrong answers. Returning to the main screen. Your score: ${score}`);
                updateLeaderboard();
                returnToMainScreen();
            }, 1000);
        }
    }
}

function setStatusClass(element, status) {
    clearStatusClass(element);
    if (status === true) {
        element.classList.add('correct');
    } else if (status === false) {
        element.classList.add('wrong');
    } else if (status === 'black-fade') {
        element.classList.add('black-fade');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
    element.classList.remove('black-fade');
}

function returnToMainScreen() {
    quizContainer.classList.add('hide');
    startContainer.classList.remove('hide');
    scoreContainer.classList.remove('hide');
    leaderboardContainer.classList.remove('hide');
}

function updateLeaderboard() {
    let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    leaderboard.push({ name: userName, score: score });
    leaderboard.sort((a, b) => b.score - a.score);
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));

    leaderboardElement.innerHTML = '';
    leaderboard.forEach(entry => {
        const li = document.createElement('li');
        li.textContent = `${entry.name}: ${entry.score}`;
        leaderboardElement.appendChild(li);
    });
}
