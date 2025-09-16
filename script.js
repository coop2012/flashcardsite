function newCard() {
    document.getElementById('newCardData').classList.toggle('none');
}

function addCard() {
    const question = document.getElementById('questionInput').value;
    const answer = document.getElementById('answerInput').value;

    if (question && answer) {
        createCard(question, answer);
        saveCards(); // save after adding
    }
}

function saveCards() {
    const cards = [];
    document.querySelectorAll('.flashcard').forEach(card => {
        cards.push({
            question: card.dataset.question,
            answer: card.dataset.answer
        });
    });
    localStorage.setItem('flashcards', JSON.stringify(cards));
}

function loadCards() {
    const saved = JSON.parse(localStorage.getItem('flashcards')) || [];
    saved.forEach(data => {
        createCard(data.question, data.answer);
    });
}

function createCard(question, answer) {
    const card = document.createElement('div');
    card.className = 'flashcard';
    card.dataset.question = question;
    card.dataset.answer = answer;
    card.dataset.flipped = "false";

    // content container so we can swap Q/A text
    const content = document.createElement('div');
    content.className = 'question';
    content.textContent = `Question: ${question}`;

    // delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'deleteBtn';
    deleteBtn.innerText = 'Delete';
    deleteBtn.addEventListener('click', function (e) {
        e.stopPropagation(); // stop click from also flipping
        card.remove();
        saveCards();
    });

    card.appendChild(content);
    card.appendChild(deleteBtn);

    // flip card on click
    card.addEventListener('click', function () {
        if (card.dataset.flipped === "false") {
            content.textContent = `Answer: ${card.dataset.answer}`;
            content.className = 'answer';
            card.dataset.flipped = "true";
        } else {
            content.textContent = `Question: ${card.dataset.question}`;
            content.className = 'question';
            card.dataset.flipped = "false";
        }
    });

    document.getElementById('flashcardContainer').appendChild(card);
}

function x() {
    const input = document.getElementById('questionInput');
    const input2 = document.getElementById('answerInput');
    input.value = '';
    input2.value = '';
    document.getElementById('newCardData').classList.toggle('none');
}