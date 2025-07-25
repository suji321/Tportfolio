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

  // Enable interactive 3D card rotation.  The amount of rotation is computed
  // based on pointer position within the card wrapper.  When the pointer
  // leaves the wrapper, the card smoothly returns to its resting state.
  const cardWrapper = document.querySelector('.card-wrapper');
  const card = document.getElementById('idCard');
  if (cardWrapper && card) {
    cardWrapper.addEventListener('mousemove', function (e) {
      const rect = cardWrapper.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      // Scale the rotation to a gentle range (±15 degrees).
      const rotateX = (y / rect.height) * -15;
      const rotateY = (x / rect.width) * 15;
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      card.style.transition = 'transform 0.1s ease';
    });
    cardWrapper.addEventListener('mouseleave', function () {
      card.style.transform = 'rotateX(0deg) rotateY(0deg)';
      card.style.transition = 'transform 0.5s ease';
    });
  }
});