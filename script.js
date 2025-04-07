function createLightning() {
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.getElementById('lightning').appendChild(canvas);
    const ctx = canvas.getContext('2d');
  
    function lightning() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (Math.random() < 0.08) {
        const bolts = Math.floor(Math.random() * 3) + 1;
        
        for(let i = 0; i < bolts; i++) {
          const x = Math.random() * canvas.width;
          const y = 0;
          
          ctx.beginPath();
          ctx.strokeStyle = `rgba(138, 43, 226, ${Math.random() * 0.7 + 0.3})`;
          ctx.lineWidth = Math.random() * 3 + 2;
          ctx.moveTo(x, y);
          
          let currentX = x;
          let currentY = y;
          
          while (currentY < canvas.height) {
            currentX += (Math.random() - 0.5) * 100;
            currentY += Math.random() * 30 + 20;
            ctx.lineTo(currentX, currentY);
            
            if(Math.random() < 0.2) {
              const branchX = currentX + (Math.random() - 0.5) * 50;
              const branchY = currentY + Math.random() * 30;
              ctx.moveTo(currentX, currentY);
              ctx.lineTo(branchX, branchY);
              ctx.moveTo(currentX, currentY);
            }
          }
          
          ctx.stroke();
        }
        
        setTimeout(() => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }, 100);
      }
    }
  
    setInterval(lightning, 50);
  }
  
  createLightning();
  
  window.addEventListener('resize', () => {
    const lightning = document.getElementById('lightning');
    lightning.innerHTML = '';
    createLightning();
  });
  
  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
  
  // Navigation dots
  const sections = document.querySelectorAll('.section');
  const navDots = document.querySelectorAll('.sections-nav a');
  
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (scrollY >= sectionTop - 300) {
        current = section.getAttribute('id');
      }
    });

    navDots.forEach(dot => {
      dot.classList.remove('active');
      if (dot.getAttribute('href') === `#${current}`) {
        dot.classList.add('active');
      }
    });
  });

  const track = document.querySelector('.carousel-track');
  const prevButton = document.querySelector('.carousel-button.prev');
  const nextButton = document.querySelector('.carousel-button.next');
  const cards = Array.from(track.children);
  const buttonHaut = document.querySelector('.button-carousel-vertical.haut');
  const buttonBas = document.querySelector('.button-carousel-vertical.bas');
  
  
  // Calculer la largeur exacte d'une carte
  let cardWidth = cards[0].getBoundingClientRect().width;
  
  let currentIndex = 0; // Index de la carte visible
  window.addEventListener('resize', () => {
    cardWidth = cards[0].getBoundingClientRect().width;
    console.log(cardWidth);
  });
  
  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % cards.length;
    track.style.transform = `translateX(-${cardWidth * currentIndex}px)`;
  });
  
  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    track.style.transform = `translateX(-${cardWidth * currentIndex}px)`;
  });
  
  const cartes = Array.from(document.querySelectorAll('.project-card'));
  let verticalIndex = 0;
  
  function showCard(index) {
    cartes.forEach((card, i) => {
      if (i === index) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });
  }
  
  // Init au chargement
  showCard(verticalIndex);
  
  buttonBas.addEventListener('click', () => {
    verticalIndex = (verticalIndex + 1) % cartes.length;
    showCard(verticalIndex);
  });
  
  buttonHaut.addEventListener('click', () => {
    verticalIndex = (verticalIndex - 1 + cartes.length) % cartes.length;
    showCard(verticalIndex);
  });