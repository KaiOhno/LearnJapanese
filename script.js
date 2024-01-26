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
    { char: 'り', choices: ['RI', 'YI', 'WI'], correct: 'RI' },
    { char: 'る', choices: ['RU', 'YU', 'WU'], correct: 'RU' },
    { char: 'れ', choices: ['RE', 'YE', 'WE'], correct: 'RE' },
    { char: 'ろ', choices: ['RO', 'YO', 'WO'], correct: 'RO' },
    { char: 'わ', choices: ['WA', 'RA', 'YA'], correct: 'WA' },
    { char: 'を', choices: ['WO', 'RO', 'YO'], correct: 'WO' },
    { char: 'ん', choices: ['N', 'M', 'NG'], correct: 'N' },
  ];

  let currentCharacterIndex = 0;
  let timer;
  const maxTime = 5000; // Time allowed to answer in milliseconds
  const updateTime = 100; // Timer update interval in milliseconds

  const progressBar = document.getElementById('progress-bar');
  const characterDisplay = document.getElementById('character-display');
  const choicesDiv = document.getElementById('choices');
  const choiceButtons = document.querySelectorAll('.choice-button');

  function setProgressBarWidth(width) {
    progressBar.style.width = width + '%';
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
  }

  function displayCharacter() {
    choiceButtons.forEach(button =>
      button.classList.remove('correct', 'wrong')
    );

    const character = characters[currentCharacterIndex];
    characterDisplay.textContent = character.char;

    let shuffledChoices = [...character.choices];
    shuffleArray(shuffledChoices);

    shuffledChoices.forEach((choice, index) => {
      choiceButtons[index].textContent = choice;
    });

    setProgressBarWidth(100); // Reset progress bar for new character
    startTimer(); // Start the timer for the new character
  }
  function nextCharacter() {
    stopTimer(); // Stop the current timer
    if (currentCharacterIndex < characters.length - 1) {
      currentCharacterIndex++;
    } else {
      currentCharacterIndex = 0; // Loop back to the start
    }
    displayCharacter(); // Display the next character
  }

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

  function stopTimer() {
    clearInterval(timer);
  }

  choicesDiv.addEventListener('click', e => {
    if (e.target && e.target.nodeName === 'BUTTON') {
      const selectedChoice = e.target.textContent;
      const correctChoice = characters[currentCharacterIndex].correct;
      choiceButtons.forEach(button =>
        button.classList.remove('correct', 'wrong')
      );

      if (selectedChoice === correctChoice) {
        e.target.classList.add('correct');
        setTimeout(nextCharacter, 100);
      } else {
        e.target.classList.add('wrong');
        setTimeout(() => e.target.classList.remove('wrong'), 1000);
      }
    }
  });

  document
    .getElementById('dark-mode-switch')
    .addEventListener('change', function () {
      document.body.classList.toggle('dark-mode');
    });

  displayCharacter();
});
