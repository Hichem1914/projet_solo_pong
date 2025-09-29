
const canvas = document.getElementById('monCanva');
const ctx = canvas.getContext('2d');

const startButton = document.getElementById('startButton');
const scoreEl = document.getElementById('score');
const gamePerdu = document.getElementById('gamePerdu');

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

// Raquette
const raquette = {
  width: 60,
  height: 8,
  radius: 4,
  x: WIDTH / 2 - 40,
  y: HEIGHT - 20,
  speed: 7,
  dx: 0,
  color: "blue"
};

// Balle
const balle = {
  x: WIDTH / 2,
  y: HEIGHT - 30,
  radius: 4,
  speedX: 3,
  speedY: -3,
  color: "rgb(255, 0, 43)",
  enJeu: false, 
  vitesseInitiale: 3, 
  vitesseMax: 15, 
  acceleration: 1.05
};

// Score
let score = 0;
let jeuEnCours = false;
let startTime = 0;

// fonction pour dessiner la raquette
function dessinerRaquette() {
  ctx.fillStyle = raquette.color;
  ctx.fillRect(raquette.x, raquette.y, raquette.width, raquette.height);
}

// fonction pour dessiner la balle
function dessinerBalle() {
  ctx.beginPath();
  ctx.arc(balle.x, balle.y, balle.radius, 0, Math.PI * 2);
  ctx.fillStyle = balle.color;
  ctx.fill();
  ctx.closePath();
}

// fonction pour nettoyer et redessiner le plateau
function dessinerScene() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  dessinerRaquette();
  dessinerBalle();
}

// fonction pour déplacer la raquette
function bougerRaquette() {
  raquette.x += raquette.dx;

  if (raquette.x < 0) raquette.x = 0;
  if (raquette.x + raquette.width > WIDTH) {
    raquette.x = WIDTH - raquette.width;
  }
}


function augmenterVitesseBalle() {
  balle.speedX = Math.max(Math.min(balle.speedX * balle.acceleration, balle.vitesseMax), -balle.vitesseMax);
  balle.speedY = Math.max(Math.min(balle.speedY * balle.acceleration, balle.vitesseMax), -balle.vitesseMax);
}

// fonction pour déplacer la balle
function bougerBalle() {
  balle.x += balle.speedX;
  balle.y += balle.speedY;

  // Rebonds sur le murs gauche/droite
  if (balle.x - balle.radius < 0 || balle.x + balle.radius > WIDTH) {
    balle.speedX *= -1;
    augmenterVitesseBalle();
  }

  // Rebond mur en haut
  if (balle.y - balle.radius < 0) {
    balle.speedY *= -1;
    augmenterVitesseBalle();
  }

  // Rebond sur la raquette
  if (
    balle.y + balle.radius >= raquette.y &&
    balle.x >= raquette.x &&
    balle.x <= raquette.x + raquette.width &&
    balle.speedY > 0
  ) {
    balle.speedY *= -1;

    const centre = raquette.x + raquette.width / 2;
    const distance = balle.x - centre;
    balle.speedX = distance * 0.15;
    augmenterVitesseBalle();
  }

  // Si la balle tombe en bas c'est a dire c'est la fin de la partie 
  if (balle.y - balle.radius > HEIGHT) {
    finDePartie();
  }
}

// fonction pour mettre à jour le score
function majScore() {
  score = Math.floor((Date.now() - startTime) / 1000);
  scoreEl.textContent = "Score : " + score + " s";
}

// fonction principale de mise à jour
function update() {
  if (!jeuEnCours) return;

  bougerRaquette();
  bougerBalle();
  majScore();
  dessinerScene();

  requestAnimationFrame(update);
}

// fonction pour faire une nouvelle partie
function nouvellePartie() {
  raquette.x = WIDTH / 2 - raquette.width / 2;
  raquette.dx = 0;

  balle.x = raquette.x + raquette.width / 2;
  balle.y = raquette.y - balle.radius - 2;
  balle.speedX = (Math.random() < 0.5 ? -1 : 1) * 3;
  balle.speedY = -3;
  balle.enJeu = true;

  score = 0;
  startTime = Date.now();
  scoreEl.textContent = "Score : 0 s";

  gamePerdu.style.display = "none";

  jeuEnCours = true;

  update();
}

// fonction pour gérer la fin de partie
function finDePartie() {
  jeuEnCours = false;
  balle.enJeu = false;
  gamePerdu.style.display = "block";
}

// bouton nouvelle partie
startButton.addEventListener('click', nouvellePartie);

// controle raquette clavier
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
