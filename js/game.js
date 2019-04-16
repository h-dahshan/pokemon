// get from select character & level
var queryString = decodeURIComponent(window.location.search);
queryString = queryString.substring(1);
var queries = queryString.split("&");

var heroIndex = queries[0]
var userInput = queries[1]


// predefined
var container = "game-body"

var renderInterval = 5;
var moveInterval = 15;
var fireInterval = 1;

var width = window.innerWidth;
var height = window.innerHeight - 70;

var heroWidth = 80
var heroHeight = 80
var heroStep = 7
var heroHealth = 100
var heroBullets = 1

var enemyWidth = 80
var enemyHeight = 80
var enemyStep = 5
var enemyHealth = 100
var beforeNewRandomDirection = 50

var bulletStep = 8
var bulletWidth = 30
var bulletHeight = 30


// calculated
var startX = width / 2 - heroWidth / 2
var startY = height / 2 - heroHeight / 2

// initialization
var map = ["url(assets/back2.png)", "url(assets/image.png)", "url(assets/Pikachu-And-Raichu-Backgrounds.jpg)", "url(assets/Pokemon-Logo.png)", "url(assets/red-white-wallpapers-25296-4844794.jpg)"];
var enemies = [];
var bullets = [];
var hero;
var id = 0;
var arrow_top = false
var arrow_bottom = false
var arrow_right = false
var arrow_left = false
var fire = false


init(heroIndex, userInput);
var interval_id_1 = setInterval(render, renderInterval);
var interval_id_2 = setInterval(move, moveInterval);
var interval_id_3 = setInterval(hero.fire.bind(hero), fireInterval);

function init(heroIndex, userInput) {
    var level = parseInt(userInput / 3); // level = numOfEnemies
    var difficulty = userInput % 3; // difficulty 0-2 -> numOfBullets 1-3
    document.getElementById("game-body").style.width = width
    document.getElementById("game-body").style.height = height
    document.getElementById("game-body").style.backgroundImage = map[level]
    hero = new Hero(heroSrc[heroIndex], id++);
    document.getElementById("hero_img").src = hero.src//.substring(0, hero.src.length - 4) + "full.png"
    addEnemies(level, difficulty + 1);
    addListeners();
}
function addEnemies(numOfEnemies, numOfBullets) {
    for (let i = 0; i <= numOfEnemies; i++) {
        enemies.push(new Enemy(enemySrc[numOfEnemies], numOfBullets, id++));
    }
}
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
function render() {
    hero.render();
    for (var i = 0; i < enemies.length; i++) {
        enemies[i].render();
    }
    for (var i = 0; i < bullets.length; i++) {
        bullets[i].render();
    }
}
function move() {
    hero.move();
    for (var i = 0; i < enemies.length; i++) {
        enemies[i].move();
    }
    for (var i = 0; i < bullets.length; i++) {
        bullets[i].move();
    }
}