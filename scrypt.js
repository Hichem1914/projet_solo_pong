

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startButton');
const score = document.getElementById('score');
const gamePerdu = document.getElementById('gameOver');
const boutonGauche = document.getElementById('bouton-gauche');
const boutonDroite = document.getElementById('bouton-droite');

let raquette; 
let balle;
let scoreValeur = 0;

// Raquette (objet)
  const paddle = {
    width: 80,
    height: 12,
    x: WIDTH / 2 - 40,
    y: HEIGHT - 20,
    speed: 7
  };