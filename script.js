document.addEventListener('DOMContentLoaded', () => {
  const characters = [
    { char: 'あ', choices: ['A', 'I', 'U'], correct: 'A' },
    { char: 'い', choices: ['E', 'I', 'A'], correct: 'I' },
    { char: 'う', choices: ['U', 'O', 'E'], correct: 'U' },
    { char: 'え', choices: ['A', 'I', 'E'], correct: 'E' },
    { char: 'お', choices: ['O', 'U', 'A'], correct: 'O' },
    { char: 'か', choices: ['GA', 'KA', 'HA'], correct: 'KA' },
    { char: 'き', choices: ['KI', 'SHI', 'CHI'], correct: 'KI' },
    { char: 'く', choices: ['KU', 'GU', 'SU'], correct: 'KU' },
    { char: 'け', choices: ['KE', 'SE', 'TE'], correct: 'KE' },
    { char: 'こ', choices: ['KO', 'SO', 'TO'], correct: 'KO' },
    { char: 'さ', choices: ['ZA', 'SA', 'TA'], correct: 'SA' },
    { char: 'し', choices: ['JI', 'RI', 'SHI'], correct: 'SHI' },
    { char: 'す', choices: ['SU', 'TSU', 'NU'], correct: 'SU' },
    { char: 'せ', choices: ['ZE', 'SE', 'CE'], correct: 'SE' },
    { char: 'そ', choices: ['ZO', 'SO', 'DO'], correct: 'SO' },
    { char: 'た', choices: ['TA', 'DA', 'NA'], correct: 'TA' },
    { char: 'ち', choices: ['CHI', 'JI', 'RI'], correct: 'CHI' },
    { char: 'つ', choices: ['TSU', 'SU', 'NU'], correct: 'TSU' },
    { char: 'て', choices: ['TE', 'DE', 'NE'], correct: 'TE' },
    { char: 'と', choices: ['TO', 'DO', 'NO'], correct: 'TO' },
    { char: 'な', choices: ['NA', 'MA', 'RA'], correct: 'NA' },
    { char: 'に', choices: ['NI', 'MI', 'RI'], correct: 'NI' },
    { char: 'ぬ', choices: ['NU', 'MU', 'RU'], correct: 'NU' },
    { char: 'ね', choices: ['NE', 'ME', 'RE'], correct: 'NE' },
    { char: 'の', choices: ['NO', 'MO', 'RO'], correct: 'NO' },
    { char: 'は', choices: ['BA', 'PA', 'HA'], correct: 'HA' },
    { char: 'ひ', choices: ['BI', 'PI', 'HI'], correct: 'HI' },
    { char: 'ふ', choices: ['BU', 'PU', 'FU'], correct: 'FU' },
    { char: 'へ', choices: ['BE', 'PE', 'HE'], correct: 'HE' },
    { char: 'ほ', choices: ['BO', 'PO', 'HO'], correct: 'HO' },
    { char: 'ま', choices: ['MA', 'NA', 'RA'], correct: 'MA' },
    { char: 'み', choices: ['MI', 'NI', 'RI'], correct: 'MI' },
    { char: 'む', choices: ['MU', 'NU', 'RU'], correct: 'MU' },
    { char: 'め', choices: ['ME', 'NE', 'RE'], correct: 'ME' },
    { char: 'も', choices: ['MO', 'NO', 'RO'], correct: 'MO' },
    { char: 'や', choices: ['YA', 'YU', 'YO'], correct: 'YA' },
    { char: 'ゆ', choices: ['YA', 'YU', 'YO'], correct: 'YU' },
    { char: 'よ', choices: ['YA', 'YU', 'YO'], correct: 'YO' },
    { char: 'ら', choices: ['RA', 'WA', 'YA'], correct: 'RA' },
  ];

  // Current character index and timer initialization
  let currentCharacterIndex = 0;
  let timer;
  const maxTime = 5000; // Time allowed to answer in milliseconds
  const updateTime = 100; // Timer update interval in milliseconds

  // DOM element references
  const progressBar = document.getElementById('progress-bar');
  const characterDisplay = document.getElementById('character-display');
  const choicesDiv = document.getElementById('choices');
  const choiceButtons = document.querySelectorAll('.choice-button');

  // Function to set the progress bar width
  function setProgressBarWidth(width) {
    progressBar.style.width = width + '%';
  }

  // Function to display a new character and set up choices
  function displayCharacter() {
    const character = characters[currentCharacterIndex];
    characterDisplay.textContent = character.char;
    character.choices.forEach((choice, index) => {
      choiceButtons[index].textContent = choice;
      choiceButtons[index].dataset.choice = choice;
      choiceButtons[index].classList.remove('correct', 'wrong'); // Reset classes
    });
    setProgressBarWidth(100); // Reset the progress bar width
    startTimer(); // Start the countdown for the new character
  }

  // Function to proceed to the next character or loop back to start
  function nextCharacter() {
    stopTimer(); // Stop the current timer
    if (currentCharacterIndex < characters.length - 1) {
      currentCharacterIndex++;
    } else {
      currentCharacterIndex = 0; // Loop back to the start
    }
    displayCharacter(); // Display the next character
  }

  // Function to start the timer
  function startTimer() {
    let timeLeft = maxTime;
    timer = setInterval(() => {
      timeLeft -= updateTime;
      setProgressBarWidth((timeLeft / maxTime) * 100);
      if (timeLeft <= 0) {
        stopTimer(); // Stop the timer if time runs out
        nextCharacter(); // Move to the next character
      }
    }, updateTime);
  }

  // Function to stop the timer
  function stopTimer() {
    clearInterval(timer);
  }

  // Event listener for choice button clicks
  choicesDiv.addEventListener('click', e => {
    if (e.target && e.target.nodeName === 'BUTTON') {
      const selectedChoice = e.target.dataset.choice;
      const correctChoice = characters[currentCharacterIndex].correct;
      choiceButtons.forEach(button =>
        button.classList.remove('correct', 'wrong')
      ); // Remove classes from all buttons

      if (selectedChoice === correctChoice) {
        e.target.classList.add('correct'); // Add 'correct' class
        setTimeout(nextCharacter, 100); // Delay before moving to the next character
      } else {
        e.target.classList.add('wrong'); // Add 'wrong' class
        setTimeout(() => e.target.classList.remove('wrong'), 1000); // Remove 'wrong' class after a delay
      }
    }
  });
  document
    .getElementById('dark-mode-switch')
    .addEventListener('change', function () {
      document.body.classList.toggle('dark-mode');
    });

  // Display the first character when the DOM is ready
  displayCharacter();
});
