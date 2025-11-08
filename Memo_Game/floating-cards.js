document.addEventListener('DOMContentLoaded', function() {
  const container = document.createElement('div');
  container.className = 'floating-cards';
  container.id = 'floatingCards';
  document.body.insertBefore(container, document.body.firstChild);

  const colors = [
    'rgba(255, 99, 132, 0.6)',
    'rgba(54, 162, 235, 0.6)',
    'rgba(255, 206, 86, 0.6)',
    'rgba(75, 192, 192, 0.6)',
    'rgba(153, 102, 255, 0.6)',
    'rgba(255, 159, 64, 0.6)'
  ];
  
  // Create floating cards
  for (let i = 0; i < 20; i++) {
    createFloatingCard();
  }
  
  function createFloatingCard() {
    const card = document.createElement('div');
    card.className = 'floating-card';
    
    // Random position
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    
    // Random size
    const size = 80 + Math.random() * 60;
    
    // Random rotation
    const rotation = Math.random() * 360;
    
    // Random animation duration and delay
    const duration = 15 + Math.random() * 15;
    const delay = Math.random() * -20;
    
    // Random color
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Apply styles
    card.style.left = `${posX}%`;
    card.style.top = `${posY}%`;
    card.style.width = `${size}px`;
    card.style.height = `${size * 1.3}px`;
    card.style.background = color;
    card.style.animation = `float ${duration}s ${delay}s infinite ease-in-out`;
    card.style.transform = `rotate(${rotation}deg)`;
    
    container.appendChild(card);
  }
  
  // Resize handler to keep cards within view
  window.addEventListener('resize', function() {
    const cards = document.querySelectorAll('.floating-card');
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      if (rect.right > window.innerWidth) {
        card.style.left = `${window.innerWidth - rect.width}px`;
      }
      if (rect.bottom > window.innerHeight) {
        card.style.top = `${window.innerHeight - rect.height}px`;
      }
    });
  });
});
