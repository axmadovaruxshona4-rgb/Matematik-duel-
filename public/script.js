const socket = io();

// Detect Role
const isHost = document.body.classList.contains('host-page');
const isStudent = document.body.classList.contains('student-page');

// Host Elements
const lobbyPanel = document.getElementById('lobby');
const gamePanel = document.getElementById('game');
const scoreboardPanel = document.getElementById('scoreboard');
const resultPanel = document.getElementById('result');

// Student Elements
const joinScreen = document.getElementById('join-screen');
const waitingScreen = document.getElementById('waiting-screen');
const playScreen = document.getElementById('play-screen');
const studentScoreboard = document.getElementById('student-scoreboard');
const studentResult = document.getElementById('student-result');

// Shared State
let currentGroup = '';
let myName = '';

// --- COMMON SOCKET HANDLERS ---

socket.on('init', (state) => {
    updateUI(state);
});

socket.on('student-joined', (state) => {
    updateUI(state);
});

socket.on('student-left', (state) => {
    updateUI(state);
});

socket.on('new-question', ({ question, index, total }) => {
    if (isHost) {
        lobbyPanel.classList.add('hidden');
        scoreboardPanel.classList.add('hidden');
        gamePanel.classList.remove('hidden');
        
        document.getElementById('question-text').innerText = question.q;
        document.getElementById('opt0').innerText = question.options[0];
        document.getElementById('opt1').innerText = question.options[1];
        document.getElementById('opt2').innerText = question.options[2];
        document.getElementById('opt3').innerText = question.options[3];
        document.getElementById('q-index').innerText = index;
        
        // Reset stats
        resetStats();
    }
    
    if (isStudent) {
        waitingScreen.classList.add('hidden');
        studentScoreboard.classList.add('hidden');
        playScreen.classList.remove('hidden');
        
        document.getElementById('student-question').innerText = question.q;
        document.getElementById('q-progress').innerText = `Savol ${index}/${total}`;
        
        // Reset buttons
        const btns = document.querySelectorAll('.answer-btn');
        btns.forEach(btn => {
            btn.classList.remove('selected');
            btn.disabled = false;
        });
        document.getElementById('feedback').classList.add('hidden');
    }
});

socket.on('timer-update', (time) => {
    if (isHost) document.getElementById('timer').innerText = time;
    if (isStudent) document.getElementById('student-timer').innerText = time;
});

socket.on('stats-update', (stats) => {
    if (isHost) {
        document.getElementById('statA').innerText = stats.A;
        document.getElementById('statB').innerText = stats.B;
        document.getElementById('statC').innerText = stats.C;
        document.getElementById('statD').innerText = stats.D;
    }
});

socket.on('show-scoreboard', (state) => {
    if (isHost) {
        gamePanel.classList.add('hidden');
        scoreboardPanel.classList.remove('hidden');
        
        document.getElementById('sb-score1').innerText = state.group1.score;
        document.getElementById('sb-score2').innerText = state.group2.score;
    }
    
    if (isStudent) {
        playScreen.classList.add('hidden');
        studentScoreboard.classList.remove('hidden');
        
        document.getElementById('s-g1-score').innerText = state.group1.score;
        document.getElementById('s-g2-score').innerText = state.group2.score;
    }
});

socket.on('game-over', (state) => {
    if (isHost) {
        gamePanel.classList.add('hidden');
        scoreboardPanel.classList.add('hidden');
        resultPanel.classList.remove('hidden');
        
        const g1 = state.group1;
        const g2 = state.group2;
        
        let winner = null;
        if (g1.score > g2.score) winner = g1;
        else if (g2.score > g1.score) winner = g2;
        
        if (winner) {
            document.getElementById('winner-name').innerText = `${winner.name} G‘olib!`;
            document.getElementById('winner-score').innerText = `${winner.score} BALL`;
            document.getElementById('crown').classList.remove('hidden');
        } else {
            document.getElementById('winner-name').innerText = "Durang!";
            document.getElementById('winner-score').innerText = `${g1.score} BALL`;
            document.getElementById('crown').classList.add('hidden');
        }
    }
    
    if (isStudent) {
        playScreen.classList.add('hidden');
        studentScoreboard.classList.add('hidden');
        studentResult.classList.remove('hidden');
        
        const g1 = state.group1;
        const g2 = state.group2;
        
        let statusText = "";
        let myGroup = (currentGroup === g1.name) ? g1 : g2;
        let otherGroup = (currentGroup === g1.name) ? g2 : g1;
        
        if (myGroup.score > otherGroup.score) {
            statusText = "Tabriklaymiz! Sizning guruhingiz g‘alaba qozondi! 👑";
        } else if (myGroup.score < otherGroup.score) {
            statusText = "Bugun omad kulib boqmadi 😄";
        } else {
            statusText = "Durang! Do‘stlik g‘alaba qozondi! 🤝";
        }
        document.getElementById('final-status').innerText = statusText;
    }
});

socket.on('game-reset', (state) => {
    window.location.reload();
});

// --- HOST LOGIC ---

if (isHost) {
    document.getElementById('start-btn').addEventListener('click', () => {
        socket.emit('start-game');
    });

    document.getElementById('next-btn').addEventListener('click', () => {
        socket.emit('next-question');
    });

    document.getElementById('stop-btn').addEventListener('click', () => {
        if (confirm('O‘yinni to‘xtatmoqchimisiz?')) {
            socket.emit('stop-game');
        }
    });

    document.getElementById('restart-btn-lobby').addEventListener('click', () => {
        socket.emit('restart-game');
    });

    document.getElementById('final-restart-btn').addEventListener('click', () => {
        socket.emit('restart-game');
    });
}

// --- STUDENT LOGIC ---

if (isStudent) {
    const joinBtn = document.getElementById('join-btn');
    const nameInput = document.getElementById('student-name');
    const codeInput = document.getElementById('group-code');
    const errorMsg = document.getElementById('error-msg');

    joinBtn.addEventListener('click', () => {
        const name = nameInput.value.trim();
        const code = codeInput.value.trim();

        if (!name || !code) {
            errorMsg.innerText = "Iltimos, barcha maydonlarni to‘ldiring!";
            return;
        }

        socket.emit('join-game', { name, code });
    });

    socket.on('join-success', ({ groupName, studentName }) => {
        currentGroup = groupName;
        myName = studentName;
        joinScreen.classList.add('hidden');
        waitingScreen.classList.remove('hidden');
        document.getElementById('display-group').innerText = groupName;
        document.getElementById('display-name').innerText = studentName;
    });

    socket.on('join-error', (msg) => {
        errorMsg.innerText = msg;
    });

    const answerBtns = document.querySelectorAll('.answer-btn');
    answerBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.getAttribute('data-index'));
            
            // Visual feedback
            answerBtns.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            
            // Disable all buttons after selection
            answerBtns.forEach(b => b.disabled = true);
            
            socket.emit('submit-answer', index);
        });
    });

    socket.on('answer-received', ({ isCorrect }) => {
        const feedback = document.getElementById('feedback');
        feedback.classList.remove('hidden');
        if (isCorrect) {
            feedback.innerText = "To‘g‘ri! 🎉";
            feedback.className = "feedback correct";
        } else {
            feedback.innerText = "Noto‘g‘ri! ❌";
            feedback.className = "feedback wrong";
        }
    });
}

// --- HELPERS ---

function updateUI(state) {
    if (isHost) {
        document.getElementById('code1').innerText = state.group1.code;
        document.getElementById('code2').innerText = state.group2.code;
        
        document.getElementById('count1').innerText = state.group1.students.length;
        document.getElementById('count2').innerText = state.group2.students.length;
        
        renderList('list1', state.group1.students);
        renderList('list2', state.group2.students);
    }
}

function renderList(elementId, students) {
    const list = document.getElementById(elementId);
    list.innerHTML = '';
    students.forEach(s => {
        const li = document.createElement('li');
        li.innerText = s.name;
        list.appendChild(li);
    });
}

function resetStats() {
    if (isHost) {
        document.getElementById('statA').innerText = '0';
        document.getElementById('statB').innerText = '0';
        document.getElementById('statC').innerText = '0';
        document.getElementById('statD').innerText = '0';
    }
}
