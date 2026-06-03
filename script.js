const startParty = document.querySelector('#startParty');
const secretBtn = document.querySelector('#secretBtn');
const modal = document.querySelector('#modal');
const closeModal = document.querySelector('#closeModal');
const randomBtn = document.querySelector('#randomBtn');
const randomPhrase = document.querySelector('#randomPhrase');
const galleryImage = document.querySelector('#galleryImage');
const galleryCaption = document.querySelector('#galleryCaption');
const galleryButtons = document.querySelectorAll('.gallery-btn');
const flipCards = document.querySelectorAll('.flip-card');

const phrases = [
  'Luke, nosso amigo que sempre nos ajuda com nossas OCs.',
  'Luke, o primeiro a ter um relacionamento saudável e duradouro(Goat).',
  'Um abacaxi é enigmático quando dança de biquíni.',
  'Hoje o caos tem nome, bolo e parabéns: Luke.',
  'Todo grupo precisa de um amigo que transforma qualquer print em história. Esse amigo é o Luke.',
  'Que venham mais anos de OCs, frases duvidosas e momentos lendários.'
];

const gallery = [
  {
    src: 'assets/momento-luke-1.jpeg',
    caption: 'Momento 1: os bolos de maconha.'
  },
  {
    src: 'assets/momento-luke-2.jpeg',
    caption: 'Momento 2: biscoito, bolacha e debates de alto nível.'
  }
];

let currentImage = 0;

function launchConfetti(duration = 1800) {
  const canvas = document.querySelector('#confetti');
  const ctx = canvas.getContext('2d');
  const pieces = [];
  const colors = ['#facc15', '#fb923c', '#a855f7', '#22d3ee', '#ffffff'];
  let animationFrame;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resize();

  for (let i = 0; i < 180; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * canvas.height,
      size: 5 + Math.random() * 8,
      speed: 2 + Math.random() * 5,
      rotation: Math.random() * 360,
      rotationSpeed: -6 + Math.random() * 12,
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(piece => {
      piece.y += piece.speed;
      piece.x += Math.sin(piece.y * 0.02);
      piece.rotation += piece.rotationSpeed;
      ctx.save();
      ctx.translate(piece.x, piece.y);
      ctx.rotate(piece.rotation * Math.PI / 180);
      ctx.fillStyle = piece.color;
      ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size * 0.55);
      ctx.restore();
    });
    animationFrame = requestAnimationFrame(draw);
  }

  draw();

  setTimeout(() => {
    cancelAnimationFrame(animationFrame);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, duration);
}

startParty.addEventListener('click', () => {
  launchConfetti(2400);
  document.querySelector('#momentos').scrollIntoView({ behavior: 'smooth' });
});

secretBtn.addEventListener('click', () => {
  modal.classList.add('show');
  launchConfetti(2200);
});

closeModal.addEventListener('click', () => modal.classList.remove('show'));
modal.addEventListener('click', event => {
  if (event.target === modal) modal.classList.remove('show');
});

randomBtn.addEventListener('click', () => {
  const phrase = phrases[Math.floor(Math.random() * phrases.length)];
  randomPhrase.textContent = phrase;
  randomPhrase.animate([
    { transform: 'translateY(8px)', opacity: 0 },
    { transform: 'translateY(0)', opacity: 1 }
  ], { duration: 250, easing: 'ease-out' });
});

galleryButtons.forEach(button => {
  button.addEventListener('click', () => {
    const direction = button.classList.contains('right') ? 1 : -1;
    currentImage = (currentImage + direction + gallery.length) % gallery.length;
    galleryImage.classList.add('changing');

    setTimeout(() => {
      galleryImage.src = gallery[currentImage].src;
      galleryCaption.textContent = gallery[currentImage].caption;
      galleryImage.classList.remove('changing');
    }, 220);
  });
});

flipCards.forEach(card => {
  card.addEventListener('click', () => card.classList.toggle('active'));
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: .15 });

document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

document.addEventListener('mousemove', event => {
  const card = document.querySelector('.tilt-card');
  const rect = card.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const rotateX = ((y / rect.height) - .5) * -10;
  const rotateY = ((x / rect.width) - .5) * 10;
  card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});
