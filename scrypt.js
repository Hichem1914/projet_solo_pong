
const canvas = document.getElementById('monCanva');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startButton');
const score = document.getElementById('score');
const gamePerdu = document.getElementById('gamePerdu');
const boutonGauche = document.getElementById('bouton-gauche');
const boutonDroite = document.getElementById('bouton-droite');

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

// Raquette
  const raquette = {
    width: 80,
    height: 12,
    x: WIDTH / 2 - 40,
    y: HEIGHT - 20,
    speed: 3,
    color: "blue"
  };

// Balle
  const balle = {
    x: WIDTH / 2,
    y: HEIGHT / 2,
    radius: 10,
    speedX: 3,
    speedY: 3,
    color: "rgb(255, 0, 43)", 
    enjeu: false // Indique si la balle est en jeu ou non pour le moment au depart
  };

  // Fonction pour dessiner la raquette
function dessinerRaquette() {
  ctx.fillStyle = raquette.color;
  ctx.fillRect(raquette.x, raquette.y, raquette.width, raquette.height);
}

// Fonction pour dessiner la balle
function dessinerBalle() {
  ctx.beginPath();
  ctx.arc(balle.x, balle.y, balle.radius, 0, Math.PI * 2);
  ctx.fillStyle = balle.color;
  ctx.fill();
  ctx.closePath();
}

// Fonction principale de dessin
function dessinerScene() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT); // Efface le canvas
  dessinerRaquette();
  dessinerBalle();
}

function faireBougerRaquette(direction) {
  if(raquette.x < 0) {
    raquette.x = 0;
  }
  if (raquette.x + raquette.width > WIDTH) {
    raquette.x = WIDTH - raquette.width;
  }
} 

function faireBougerBalle() {
  balle.x += balle.speedX;
  balle.y += balle.speedY;

  if(balle.x - balle.radius < 0 || balle.x + balle.radius > WIDTH) {
    balle.speedX = -balle.speedX; // Inverse la direction horizontale
  }
  if(balle.y - balle.radius < 0 || balle.y + balle.radius > HEIGHT) {
    balle.speedY = -balle.speedY; // Inverse la direction verticale
  }
}


// Fonction de mise à jour du jeu
function update() {
  faireBougerRaquette();
  faireBougerBalle();
  dessinerScene();
  requestAnimationFrame(update); // Appelle update à chaque frame
}

// Démarrer le jeu
startButton.addEventListener('click', () => {
  update();
});


// Contrôles clavier
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    raquette.dx = raquette.speed;
  } else if (e.key === "ArrowLeft") {
    raquette.dx = -raquette.speed;
  }
});
document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
    raquette.dx = 0;
  }
});

// Lancer le jeu
update();