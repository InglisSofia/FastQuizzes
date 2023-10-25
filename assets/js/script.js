const nzquiz = [
    {
        question: 'New Zealanders are also called... what?',
        options: ['Rurus', 'Kiwis', 'Tuis'],
        answer: 'Kiwis',
    },
    {
        question: 'Wellington is the capital, but not the largest city. Which one is?',
        options: ['Auckland', 'Christchurch', 'Queenstown'],
        answer: 'Auckland',
    },
    {
        question: 'Maori culture is said to be one of the youngest in the world. How old is it estimated to be?',
        options: ['1100 years', '900 years', '700 years'],
        answer: '700 years',
    },
    {
        question: 'What is the official currency in New Zealand?',
        options: ['New Zealand dollar', 'New Zealand pound', 'British pound'],
        answer: 'New Zealand dollar',
    },
    {
        question: 'Which of these movies was not filmed in New Zealand?',
        options: [
            'The Piano',
            'The Last Samurai',
            'The Long Walk Home',
        ],
        answer: 'The Long Walk Home',
    },
    {
        question: 'Which is the national sport of New Zealand?',
        options: ['Soccer', 'Rugby', 'Cricket'],
        answer: 'Rugby',
    },
    {
        question: 'The clearest lake in the world is, of course, located in New Zealand. The visibility can be up to 70-80 meters underwater. What is the name of this lake?',
        options: [
            'Lake Dunedin',
            'Cockatoos eye',
            'Nelsons Blue Lake'
        ],
        answer: 'Nelsons Blue Lake',
    },
    {
        question: 'How much of the land in New Zealand is considered a protected national reserve?',
        options: ['30%', '40%', '50%'],
        answer: '30%',
    },
    {
        question: 'New Zealand was the first country in the world to approve the vote for women. What years did this historical event take place?',
        options: [
            '1876',
            '1893',
            '1901',
        ],
        answer: '1893',
    },
    {
        question: 'What is New Zealand called in the Maori language?',
        options: ['Te Ika', 'Aotearoa', 'Waipounamu'],
        answer: 'Aotearoa',
    },
];

const quizForm = document.getElementById('quiz');
const quizResult = document.getElementById('result');
const nextButton = document.getElementById('next');
const againButton = document.getElementById('again');
const rightAnswerButton = document.getElementById('rightAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function displayQuestion() {
    const questionData = nzquiz[currentQuestion];

    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;

    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';

    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);

    for (let i = 0; i < shuffledOptions.length; i++) {
        const option = document.createElement('label');
        option.className = 'option';

        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'quiz';
        radio.value = shuffledOptions[i];

        const optionText = document.createTextNode(shuffledOptions[i]);

        option.appendChild(radio);
        option.appendChild(optionText);
        optionsElement.appendChild(option);
    }

    quizForm.innerHTML = '';
    quizForm.appendChild(questionElement);
    quizForm.appendChild(optionsElement);
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
        const answer = selectedOption.value;
        if (answer === nzquiz[currentQuestion].answer) {
            score++;
        } else {
            incorrectAnswers.push({
                question: nzquiz[currentQuestion].question,
                incorrectAnswer: answer,
                correctAnswer: nzquiz[currentQuestion].answer,
            });
        }
        currentQuestion++;
        selectedOption.checked = false;
        if (currentQuestion < nzquiz.length) {
            displayQuestion();
        } else {
            displayResult();
        }
    }
}

function displayResult() {
    quizForm.style.display = 'none';
    nextButton.style.display = 'none';
    againButton.style.display = 'inline-block';
    rightAnswerButton.style.display = 'inline-block';
    quizResult.innerHTML = `Score: ${score} out of ${nzquiz.length}!`;
}

function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizForm.style.display = 'block';
    nextButton.style.display = 'inline-block';
    againButton.style.display = 'none';
    rightAnswerButton.style.display = 'none';
    quizResult.innerHTML = '';
    displayQuestion();
}

function showAnswer() {
    quizForm.style.display = 'none';
    nextButton.style.display = 'none';
    againButton.style.display = 'inline-block';
    rightAnswerButton.style.display = 'none';

    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
        incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
      </p>
    `;
    }

    quizResult.innerHTML = `
    <p>You scored ${score} out of ${nzquiz.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
}

nextButton.addEventListener('click', checkAnswer);
againButton.addEventListener('click', retryQuiz);
rightAnswerButton.addEventListener('click', showAnswer);

displayQuestion();