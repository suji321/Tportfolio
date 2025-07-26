// Interactive terminal for Sujith Sasikumar's portfolio
// This script captures user input, prints commands, and types out
// corresponding responses extracted from his resume.  It draws
// inspiration from terminal‑themed portfolios like gateremark.me.

const terminal = document.getElementById('terminal');
const input = document.getElementById('commandInput');
const promptStr = document.getElementById('prompt').textContent;

// Command dictionary with multi‑line strings.  Note the escaped
// newline characters (\n) which will be preserved when typed.
const commands = {
  help:
    "Available commands:\n" +
    "  about      – learn about me\n" +
    "  projects   – view my projects\n" +
    "  skills     – see my technical skills\n" +
    "  experience – my work experience\n" +
    "  education  – my educational background\n" +
    "  contact    – how to reach me\n" +
    "  clear      – clear the terminal",
  about:
    "Hello, I'm Sujith Sasikumar! I'm currently pursuing an M.Tech in Artificial" +
    " Intelligence and Data Analytics at the National Institute of Technology" +
    " Calicut. With a B.Tech in Computer Science from CUSAT, I enjoy building" +
    " intelligent systems and applying machine learning to solve challenging" +
    " problems.",
  projects:
    "GenAI for Precision Medicine:\n" +
    "  • Built CVAE and GAN‑based models to generate privacy‑preserving synthetic\n" +
    "    electronic health records for autoimmune disease prediction.\n" +
    "Drug Repurposing:\n" +
    "  • Developed a graph neural network framework that models heterogeneous\n" +
    "    biological networks to predict novel drug–disease associations via link\n" +
    "    prediction.\n" +
    "Demand Forecasting in Financial Markets:\n" +
    "  • Created an explainable AI model combining dual‑attention GRU and TRNN\n" +
    "    to forecast stock prices using financial news sentiment and time‑series\n" +
    "    analysis.\n" +
    "Crowd Density Estimation:\n" +
    "  • Engineered an ensemble of MCNN‑APOCS, CDEMAMNet and MRCNet\n" +
    "    architectures, achieving superior MAE/MSE for crowd counting using\n" +
    "    stacking.\n" +
    "Web Sentry:\n" +
    "  • Implemented a phishing URL detection system leveraging DistilBERT\n" +
    "    embeddings with logistic regression and deployed a Flask web app for\n" +
    "    real‑time analysis.\n" +
    "Alzheimer’s Disease Detection:\n" +
    "  • Built a web application to classify MRI images, achieving 90.82%\n" +
    "    accuracy, with an interactive quiz for users to track results.\n" +
    "Student Management System:\n" +
    "  • Designed a portal to manage student profiles, courses, exams, logins\n" +
    "    and fees, automating administrative tasks.",
  skills:
    "My skills include Python, C++, C and a solid foundation in machine learning" +
    " and deep learning methodologies.",
  experience:
    "Associate Engineer, L&T Technology Services (2023–2024) – Based in Mysore,\n" +
    "I contributed to engineering solutions and honed my software development\n" +
    "skills.",
  education:
    "M.Tech in Artificial Intelligence and Data Analytics, NIT Calicut (2024–present) – GPA 8.4\n" +
    "B.Tech in Computer Science, School of Engineering, CUSAT (2019–2023) – CGPA 8.71",
  contact:
    "Email: sujisasi4@gmail.com\n" +
    "Phone: +91 73563 81178\n" +
    "Address: Kanjiparambil House, Porkalengad P.O, Kanippayur VIA, Thrissur,\n" +
    "Kerala 680517",
  clear: ""
};

/**
 * Appends a line immediately to the terminal.  Used for printing the
 * command that the user typed before the asynchronous response begins.
 *
 * @param {string} text – the text to append
 * @param {string} className – CSS class to apply
 */
function appendLine(text, className = 'output') {
  const line = document.createElement('div');
  line.className = className;
  line.textContent = text;
  terminal.appendChild(line);
  terminal.scrollTop = terminal.scrollHeight;
}

/**
 * Types text character by character for a smooth terminal effect.
 *
 * @param {string} text – the full output to type
 * @param {string} className – CSS class to apply
 * @param {number} delay – delay in ms between characters
 * @param {function} callback – optional function to call when typing finishes
 */
function typeOutput(text, className = 'output', delay = 15, callback) {
  let i = 0;
  const line = document.createElement('div');
  line.className = className;
  terminal.appendChild(line);

  (function type() {
    if (i < text.length) {
      line.textContent += text.charAt(i);
      i++;
      terminal.scrollTop = terminal.scrollHeight;
      setTimeout(type, delay);
    } else if (typeof callback === 'function') {
      callback();
    }
  })();
}

/**
 * Executes a command by name.  Looks up the command in the dictionary
 * and types out the result.  If the command is 'clear', the terminal
 * contents are wiped immediately.
 *
 * @param {string} cmd – the command name
 */
function runCommand(cmd) {
  const key = cmd.toLowerCase();
  if (commands.hasOwnProperty(key)) {
    if (key === 'clear') {
      terminal.innerHTML = '';
      return;
    }
    const output = commands[key];
    // Use a shorter delay for very long outputs to improve perceived responsiveness.
    const delay = output.length > 300 ? 10 : 15;
    typeOutput(output, 'output', delay);
  } else if (key.trim() === '') {
    // do nothing on empty input
  } else {
    typeOutput(`command not found: ${cmd}`, 'error');
  }
}

// Handle input submission on Enter key
input.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    const value = input.value.trim();
    // Print the command line to the terminal
    const cmdLine = document.createElement('div');
    cmdLine.className = 'command';
    cmdLine.textContent = value ? `${promptStr} ${value}` : `${promptStr}`;
    terminal.appendChild(cmdLine);
    terminal.scrollTop = terminal.scrollHeight;
    input.value = '';
    runCommand(value);
  }
});

// Handle navigation clicks as commands
document.querySelectorAll('#nav a').forEach(function (link) {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const command = this.getAttribute('data-command');
    // Print the clicked command to the terminal
    const cmdLine = document.createElement('div');
    cmdLine.className = 'command';
    cmdLine.textContent = `${promptStr} ${command}`;
    terminal.appendChild(cmdLine);
    terminal.scrollTop = terminal.scrollHeight;
    runCommand(command);
  });
});

// On page load: print a welcome message in a typed fashion
window.addEventListener('load', function () {
  const welcomeCmd = document.createElement('div');
  welcomeCmd.className = 'command';
  welcomeCmd.textContent = `${promptStr} welcome`;
  terminal.appendChild(welcomeCmd);

  typeOutput(
    "Hi, I'm Sujith Sasikumar, a passionate engineer specialising in AI and Data Analytics.",
    'output',
    25,
    function () {
      typeOutput(
        'Welcome to my interactive portfolio terminal!',
        'output',
        25,
        function () {
          typeOutput("Type 'help' to see available commands.", 'output', 25);
        },
      );
    },
  );

  // Initialize the simple Dino game with pause and overlay capabilities
  const dino = document.getElementById('dino');
  const obstacle = document.getElementById('obstacle');
  const pauseButton = document.getElementById('pauseGameButton');
  const overlay = document.getElementById('gameOverOverlay');
  const restartButton = document.getElementById('restartButton');
  // Optional on-screen jump control (useful for mobile)
  const jumpButton = document.getElementById('jumpButton');
  const gameContainer = document.querySelector('.game-container');

  // Game state flags
  let isJumping = false;
  let isPaused = false;
  let isGameOver = false;
  let collisionInterval;

  /**
   * Starts or restarts the game by resetting animations and timers.
   */
  function startGame() {
    // Reset flags
    isJumping = false;
    isPaused = false;
    isGameOver = false;
    // Hide the game‑over overlay
    overlay.classList.add('hidden');
    // Reset obstacle animation
    obstacle.style.animation = 'none';
    // Force reflow to restart animation
    void obstacle.offsetWidth;
    obstacle.style.animation = 'obstacle-move 1.5s infinite linear';
    // Restart collision detection
    if (collisionInterval) clearInterval(collisionInterval);
    collisionInterval = setInterval(checkCollision, 10);
    // Update pause button text
    pauseButton.textContent = 'Pause Game';
  }

  /**
   * Handles the jump action when the player presses space or arrow up.
   */
  function jump() {
    // Prevent jumping if currently jumping, paused or game over
    if (isJumping || isPaused || isGameOver) return;
    isJumping = true;
    dino.classList.add('jump');
    setTimeout(() => {
      dino.classList.remove('jump');
      isJumping = false;
    }, 500);
  }

  /**
   * Checks for collisions between the dino and obstacle. If a collision
   * occurs while the dino is on the ground, it triggers game over.
   */
  function checkCollision() {
    const dinoBottom = parseInt(getComputedStyle(dino).getPropertyValue('bottom'));
    const obstacleRight = parseInt(getComputedStyle(obstacle).getPropertyValue('right'));
    const containerWidth = obstacle.parentElement.offsetWidth;
    // Collision region: when obstacle is near the dino horizontally and dino is on ground
    if (!isGameOver && !isPaused) {
      if (
        obstacleRight < (containerWidth - 70) &&
        obstacleRight > (containerWidth - 120) &&
        dinoBottom === 0
      ) {
        gameOver();
      }
    }
  }

  /**
   * Pauses the game, stopping obstacle animation and collision detection.
   */
  function pauseGame() {
    if (isGameOver || isPaused) return;
    isPaused = true;
    // Pause the obstacle animation
    obstacle.style.animationPlayState = 'paused';
    if (collisionInterval) clearInterval(collisionInterval);
    pauseButton.textContent = 'Resume Game';
  }

  /**
   * Resumes the game after being paused.
   */
  function resumeGame() {
    if (isGameOver || !isPaused) return;
    isPaused = false;
    obstacle.style.animationPlayState = 'running';
    collisionInterval = setInterval(checkCollision, 10);
    pauseButton.textContent = 'Pause Game';
  }

  /**
   * Ends the game, showing the overlay and stopping animations.
   */
  function gameOver() {
    isGameOver = true;
    // Stop obstacle animation and collision checks
    obstacle.style.animation = 'none';
    if (collisionInterval) clearInterval(collisionInterval);
    // Show game over overlay
    overlay.classList.remove('hidden');
  }

  // Event listeners for jump, pause/resume and restart actions
  document.addEventListener('keydown', function (e) {
    if (e.code === 'Space' || e.code === 'ArrowUp') {
      jump();
    }
  });

  // Allow tapping the on-screen jump button to trigger a jump
  if (jumpButton) {
    jumpButton.addEventListener('click', function () {
      jump();
    });
  }

  // Allow tapping anywhere inside the game container to jump on touch devices
  if (gameContainer) {
    gameContainer.addEventListener('click', function () {
      jump();
    });
    // Support touchstart separately to improve responsiveness on mobile
    gameContainer.addEventListener('touchstart', function () {
      jump();
    });
  }

  pauseButton.addEventListener('click', function () {
    if (isPaused) {
      resumeGame();
    } else {
      pauseGame();
    }
  });

  restartButton.addEventListener('click', function () {
    startGame();
    
  });
  
  // Start the game initially
  startGame();
});

async function askAssistant(question) {
  // Post the question to your own API route
  const res = await fetch('/api/gemini', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question }),
  });

  if (!res.ok) {
    throw new Error(`Server returned status ${res.status}`);
  }

  const data = await res.json();
  return data.answer || 'The assistant returned no response.';
}
