const quizQuestions = [
    {
        question: "Do you prefer action-packed stories or something more relaxed?",
        options: ["Action-packed", "Relaxed", "A mix of both"],
        answers: ["Shonen", "Slice of Life", "Adventure"]
    },
    {
        question: "Do you enjoy stories with supernatural or fantasy elements?",
        options: ["Yes, love fantasy!", "No, prefer realistic settings", "A bit of both"],
        answers: ["Fantasy", "Slice of Life", "Seinen"]
    },
    {
        question: "Do you like complex storylines or light-hearted plots?",
        options: ["Complex and thought-provoking", "Light-hearted and funny", "A mix of both"],
        answers: ["Psychological", "Comedy", "Adventure"]
    },
    {
        question: "Do you enjoy romance in your shows?",
        options: ["Yes, love it", "No, not really", "If it’s subtle"],
        answers: ["Romance", "Action", "Slice of Life"]
    }
];

let questionIndex = 0;
const genrePreferences = {};

function startQuiz() {
    document.getElementById("result").textContent = "";
    questionIndex = 0;
    genrePreferences = {};
    showQuestion();
}

function showQuestion() {
    if (questionIndex < quizQuestions.length) {
        const question = quizQuestions[questionIndex];
        document.getElementById("quiz-container").innerHTML = `
            <h2>${question.question}</h2>
            ${question.options.map((option, index) => `
                <button onclick="recordAnswer('${question.answers[index]}')">${option}</button>
            `).join('')}
        `;
    } else {
        generateResult();
    }
}

function recordAnswer(selectedGenre) {
    genrePreferences[selectedGenre] = (genrePreferences[selectedGenre] || 0) + 1;
    questionIndex++;
    showQuestion();
}

function generateResult() {
    let recommendedGenre = Object.keys(genrePreferences).reduce((a, b) => genrePreferences[a] > genrePreferences[b] ? a : b);
    const prompt = `Give me a list of beginner-friendly anime in the ${recommendedGenre} genre.`;
    document.getElementById("quiz-container").innerHTML = "";
    document.getElementById("result").innerHTML = `
        <p>You might enjoy anime in the <strong>${recommendedGenre}</strong> genre!</p>
        <p>Use this prompt in ChatGPT to find anime recommendations:</p>
        <p><code>${prompt}</code></p>
    `;
}

document.getElementById("start-quiz").addEventListener("click", startQuiz);
