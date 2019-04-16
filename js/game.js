// Get Selected Character & Level from URL
var queryString = decodeURIComponent(window.location.search);
queryString = queryString.substring(1);
var queries = queryString.split("&");

// Hero ID and Level ID
var heroIndex = queries[0];
var userInput = queries[1];


// predefined
var container = "game-body"

// Render Each 10 mSec
var renderInterval = 5;
// Change Position Each 15 mSec
var moveInterval = 15;
// 
var fireInterval = 10;

var width = window.innerWidth;
var height = window.innerHeight - 70;   // 70px the Size of Nav Bar

var heroWidth = 80;
var heroHeight = 80;
var heroStep = 7;
var heroHealth = 100;
var heroBullets = 1;

var enemyWidth = 80;
var enemyHeight = 80;
var enemyStep = 5;
var enemyHealth = 100;
var beforeNewRandomDirection = 50;  // Timing Between Two Change of Direction

var bulletStep = 8;
var bulletWidth = 30;
var bulletHeight = 30;


// Centering the Hero in the Play Area
var startX = width / 2 - heroWidth / 2;
var startY = height / 2 - heroHeight / 2;

// initialization
// Each Level Has a Map
var map = [ "url(assets/back2.png)",
            "url(assets/image.png)",
            "url(assets/Pikachu-And-Raichu-Backgrounds.jpg)",
            "url(assets/Pokemon-Logo.png)",
            "url(assets/red-white-wallpapers-25296-4844794.jpg)"
        ];
var enemies = [];
var bullets = [];
var hero;
var id = 0;
var arrow_top = false;
var arrow_bottom = false;
var arrow_right = false;
var arrow_left = false;
var fire = false;


init(heroIndex, userInput);
// Interval For Render
var interval_id_1 = setInterval(render, renderInterval);
// Interval For Move
var interval_id_2 = setInterval(move, moveInterval);
// Interval to limit Hero Firing    (!!)
var interval_id_3 = setInterval(hero.fire.bind(hero), fireInterval);

function init(heroIndex, userInput) {
    var level = parseInt(userInput / 3);    // levels from 0>14 Each level has 3 difficulties 
    var difficulty = userInput % 3;         // difficulty 0-2 -> numOfBullets 1-3
    // Initialize Play Area
    document.getElementById("game-body").style.width = width
    document.getElementById("game-body").style.height = height
    document.getElementById("game-body").style.backgroundImage = map[level];
    // Create New Hero With ID Selected by User
    hero = new Hero(heroSrc[heroIndex], id++);
    document.getElementById("hero_img").src = hero.src;
    addEnemies(level, difficulty + 1);
    addListeners();
}

// Create Enemies on User Input
function addEnemies(numOfEnemies, numOfBullets) {
    for (let i = 0; i <= numOfEnemies; i++) {
        enemies.push(new Enemy(enemySrc[numOfEnemies], numOfBullets, id++));
    }
}
// Add Listiners For User Keys
function addListeners() {
    window.onkeydown = function (e) {
        var key = e.keyCode ? e.keyCode : e.which;
        if (key == 87) {
            arrow_top = true;
        } else if (key == 83) {
            arrow_bottom = true;
        } else if (key == 65) {
            arrow_left = true;
        } else if (key == 68) {
            arrow_right = true;
        } else if (key == 13 || key == 32) {
            fire = true
        }
    }
    window.onkeyup = async function (e) {
        var key = e.keyCode ? e.keyCode : e.which;
        if (key == 87) {
            arrow_top = false;
        } else if (key == 83) {
            arrow_bottom = false;
        } else if (key == 65) {
            arrow_left = false;
        } else if (key == 68) {
            arrow_right = false;
        } else if (key == 13 || key == 32) {
            fire = false
        }
    }
}
// Render Objects in Play Area
function render() {
    hero.render();
    for (var i = 0; i < enemies.length; i++) {
        enemies[i].render();
    }
    for (var i = 0; i < bullets.length; i++) {
        bullets[i].render();
    }
}
// Change Position of Objects in Play Area
function move() {
    hero.move();
    for (var i = 0; i < enemies.length; i++) {
        enemies[i].move();
    }
    for (var i = 0; i < bullets.length; i++) {
        bullets[i].move();
    }
}