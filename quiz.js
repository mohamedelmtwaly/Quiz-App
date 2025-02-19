// Sample quiz data array with questions and answers
const data = [
  {
    id: 1,
    question: "Which of these fish is actually a fish?",
    answers: [
      { answer: "swordfish", isCorrect: true },
      { answer: "jellyfish", isCorrect: false },
      { answer: "starfish", isCorrect: false },
      { answer: "crayfish", isCorrect: false },
    ],
  },
  {
    id: 2,
    question: "A flutter is a group of:",
    answers: [
      { answer: "bees", isCorrect: false },
      { answer: "penguins", isCorrect: false },
      { answer: "butterflies", isCorrect: true },
      { answer: "camels", isCorrect: false },
    ],
  },
  {
    id: 1,
    question: "A group of which animals is referred to as a wake?",
    answers: [
      { answer: "bats", isCorrect: false },
      { answer: "vultures", isCorrect: true },
      { answer: "ants", isCorrect: false },
    ],
  },
];

// Select DOM elements used in the quiz
const gameScreen = document.querySelector(".game");      // Quiz game container
const resultScreen = document.querySelector(".result");  // Result screen container
const question = document.querySelector(".question");    // Element to display question text
const answersContainer = document.querySelector(".answers"); // Container for answer options
const submit = document.querySelector(".submit");        // Submit button
const play = document.querySelector(".play");            // Play Again button

// Variables to track quiz state
let qIndex = 0;         // Current question index
let correctCount = 0;   // Count of correct answers
let wrongCount = 0;     // Count of wrong answers
let total = 0;          // Total score or count (not used in current code)
let selectedAnswer;     // Store the value of the currently selected answer

// Function to reset quiz and start over
const playAgain = () => {
  qIndex = 0;
  correctCount = 0;
  wrongCount = 0;
  selectedAnswer = undefined;  // Reset the selected answer
  showQuestion(qIndex);        // Display the first question
};

// Event listener for the "Play Again" button to restart the quiz
play.addEventListener("click", () => {
  resultScreen.style.display = "none"; // Hide result screen
  gameScreen.style.display = "block";    // Show game screen
  playAgain();                           // Restart quiz
});

// Function to display the result screen after all questions are answered
const showResult = () => {
  resultScreen.style.display = "block"; // Show result screen
  gameScreen.style.display = "none";    // Hide game screen
  
  // Update the result screen with the correct and wrong counts, and calculate score
  resultScreen.querySelector(".correct").textContent = `Correct Answers: ${correctCount}`;
  resultScreen.querySelector(".wrong").textContent = `Wrong Answers: ${wrongCount}`;
  resultScreen.querySelector(".score").textContent = `Score: ${(correctCount - wrongCount) * 10}`;
};

// Function to display a question and its answer options based on index
const showQuestion = (qNumber) => {
  // If we've reached the end of the questions, show the result screen
  if (qIndex === data.length) {
    showResult();
    return;
  }
  // Update the question text
  question.textContent = data[qNumber].question;
  
  // Reset selected answer
  selectedAnswer = null;
  
  // Dynamically create answer options using map
  answersContainer.innerHTML = data[qNumber].answers
    .map((item, index) => `
      <div class="answer">
        <input type="radio" id="${index}" name="answer" value="${item.isCorrect}" />
        <label for="${index}">${item.answer}</label>
      </div>
    `)
    .join("");
  
  // Attach event listeners to answer options
  selectAnswer();
};

// Function to attach click events to all answer radio buttons
const selectAnswer = () => {
  // For each radio input in the answers container
  answersContainer.querySelectorAll("input").forEach((el) => {
    el.addEventListener("click", (e) => {
      // Set the selectedAnswer variable to the value of the clicked radio button
      selectedAnswer = e.target.value;
    });
  });
};

// Function to handle the submit button click and evaluate the answer
const submitAnswer = () => {
  submit.addEventListener("click", () => {
    // Check if an answer was selected
    if (selectedAnswer !== null) {
      // If the selected answer value is "true", increment correctCount, otherwise increment wrongCount
      selectedAnswer === "true" ? correctCount++ : wrongCount++;
      qIndex++;  // Move to the next question
      showQuestion(qIndex); // Display the next question
    } else {
      // If no answer is selected, alert the user
      alert("Select an answer!");
    }
  });
};

// Initialize the quiz by displaying the first question and setting up the submit button listener
showQuestion(qIndex);
submitAnswer();
