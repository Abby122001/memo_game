// Audio elements
const backgroundMusic = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
const buttonSound = new Audio('https://www.soundjay.com/buttons/sounds/button-09a.mp3');

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
  // Game navigation
  const quickButton = document.querySelector('.quick');
  const questButton = document.querySelector('.quest');
  
  // Settings elements
  const settingsIcon = document.querySelector('.settings-icon');
  const settingsPanel = document.querySelector('.settings-panel');
  const closeSettings = document.querySelector('.close-settings');
  const musicToggle = document.getElementById('music-toggle');
  const soundToggle = document.getElementById('sound-toggle');
  const languageSelect = document.getElementById('language');
  
  // Load settings
  function loadSettings() {
    const savedSettings = localStorage.getItem('gameSettings');
    if (savedSettings) {
      gameState.settings = JSON.parse(savedSettings);
    }
    
    // Apply settings to UI
    musicToggle.checked = gameState.settings.music;
    soundToggle.checked = gameState.settings.sound;
    languageSelect.value = gameState.settings.language;
    
    // Initialize audio
    if (gameState.settings.music) {
      startBackgroundMusic();
    }
  }

  // Save settings
  function saveSettings() {
    gameState.settings.music = musicToggle.checked;
    gameState.settings.sound = soundToggle.checked;
    gameState.settings.language = languageSelect.value;
    
    localStorage.setItem('gameSettings', JSON.stringify(gameState.settings));
    
    // Update audio state if needed
    if (gameState.settings.music && !gameState.isMusicPlaying) {
      startBackgroundMusic();
    } else if (!gameState.settings.music) {
      stopBackgroundMusic();
    }
  }
  
  // Background music control
  function startBackgroundMusic() {
    if (!gameState.isMusicPlaying) {
      backgroundMusic.loop = true;
      backgroundMusic.volume = 0.5;
      const playPromise = backgroundMusic.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log('Autoplay prevented:', error);
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
  
  // Play sound effect
  function playSound() {
    if (gameState.settings.sound) {
      buttonSound.currentTime = 0;
      buttonSound.volume = 0.5;
      buttonSound.play().catch(error => {
        console.log('Sound play failed:', error);
      });
    }
  }

  // Toggle settings panel
  function toggleSettings() {
    settingsPanel.classList.toggle('show');
    
    if (settingsPanel.classList.contains('show')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    playSound();
  }

  // Event listeners
  if (settingsIcon) {
    settingsIcon.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleSettings();
    });
  }

  if (closeSettings) {
    closeSettings.addEventListener('click', toggleSettings);
  }
  
  // Navigation buttons
  if (quickButton) {
    quickButton.addEventListener('click', () => {
      playSound();
      window.location.href = 'quick_game.html';
    });
  }

  if (questButton) {
    questButton.addEventListener('click', () => {
      playSound();
      window.location.href = 'quest.html';
    });
  }

  // Settings change handlers
  musicToggle.addEventListener('change', saveSettings);
  soundToggle.addEventListener('change', saveSettings);
  languageSelect.addEventListener('change', saveSettings);

  // Initialize
  loadSettings();
});
