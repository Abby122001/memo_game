// Audio elements
const backgroundMusic = new Audio('./sounds/background-music.mp3');
// const buttonSound = new Audio('https://www.soundjay.com/buttons/sounds/button-09a.mp3');
const buttonSound = new Audio('./sounds/flip-sound.mp3');

// Game state
const gameState = {
  settings: {
    music: true,
    sound: true,
    language: 'en'
  },
  isMusicPlaying: false
};

document.addEventListener('DOMContentLoaded', () => {
  // UI elements
  const quickButton = document.querySelector('.quick');
  const questButton = document.querySelector('.quest');
  const settingsIcon = document.querySelector('.settings-icon');
  const settingsPanel = document.querySelector('.settings-panel');
  const closeSettings = document.querySelector('.close-settings');
  const musicToggle = document.getElementById('music-toggle');
  const soundToggle = document.getElementById('sound-toggle');
  const languageSelect = document.getElementById('language');

  // Load settings from localStorage
  function loadSettings() {
    const savedSettings = localStorage.getItem('gameSettings');
    if (savedSettings) {
      gameState.settings = JSON.parse(savedSettings);
    }

    // Apply settings to UI
    musicToggle.checked = gameState.settings.music;
    soundToggle.checked = gameState.settings.sound;
    languageSelect.value = gameState.settings.language;

    // ✅ Automatically play background music if saved as true
    if (gameState.settings.music) {
      startBackgroundMusic();
    }
  }

  // Save settings to localStorage
  function saveSettings() {
    gameState.settings.music = musicToggle.checked;
    gameState.settings.sound = soundToggle.checked;
    gameState.settings.language = languageSelect.value;

    localStorage.setItem('gameSettings', JSON.stringify(gameState.settings));

    // Update background music immediately
    if (gameState.settings.music && !gameState.isMusicPlaying) {
      startBackgroundMusic();
    } else if (!gameState.settings.music) {
      stopBackgroundMusic();
    }
  }

  // Background music functions
  function startBackgroundMusic() {
    if (!gameState.isMusicPlaying) {
      backgroundMusic.loop = true;
      backgroundMusic.volume = 0.5;
      const playPromise = backgroundMusic.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          console.log('Autoplay prevented. Will resume on user interaction.');
        });
      }
      gameState.isMusicPlaying = true;
    }
  }

  function stopBackgroundMusic() {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
    gameState.isMusicPlaying = false;
  }

  // Button sound
  function playSound() {
    if (gameState.settings.sound) {
      buttonSound.currentTime = 0;
      buttonSound.volume = 0.5;
      buttonSound.play().catch(() => {});
    }
  }

  // Settings toggle
  function toggleSettings() {
    settingsPanel.classList.toggle('show');
    document.body.style.overflow = settingsPanel.classList.contains('show') ? 'hidden' : '';
    playSound();
  }

  // Event listeners
  if (settingsIcon) settingsIcon.addEventListener('click', e => { e.stopPropagation(); toggleSettings(); });
  if (closeSettings) closeSettings.addEventListener('click', toggleSettings);
  if (quickButton) quickButton.addEventListener('click', () => { playSound(); window.location.href = 'quick_game.html'; });
  if (questButton) questButton.addEventListener('click', () => { playSound(); window.location.href = 'quest.html'; });

  musicToggle.addEventListener('change', saveSettings);
  soundToggle.addEventListener('change', saveSettings);
  languageSelect.addEventListener('change', saveSettings);

  // Initialize
  loadSettings();

  // Fallback: Start music after user clicks anywhere (if autoplay is blocked)
  document.addEventListener('pointerdown', () => {
    if (gameState.settings.music && !gameState.isMusicPlaying) {
      startBackgroundMusic();
    }
  }, { once: true });
});
