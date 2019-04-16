var heroSrc = [
    "./assets/bulbasaur.png",
    "./assets/charmander.png",
    "./assets/eevee.png",
    "./assets/pikachu.png",
    "./assets/squirtle.png",
];

var Hero = function (src, id) {
    this.src = src;
    this.health = heroHealth;
    this.numOfBullets = heroBullets;
    this.step = heroStep;
    this.x = startX;
    this.y = startY;
    this.angle = 0;
    this.id = id;
    this.width = heroWidth;
    this.height = heroHeight;
    this.moving = false;
    this.type = "hero"
    this.lastFire = 0;

    this.move = function () {
        this.moving = true
        if (arrow_top && arrow_right) this.angle = 315;
        else if (arrow_top && arrow_left) this.angle = 225
        else if (arrow_bottom && arrow_right) this.angle = 45
        else if (arrow_bottom && arrow_left) this.angle = 135
        else if (arrow_top) this.angle = 270
        else if (arrow_bottom) this.angle = 90
        else if (arrow_right) this.angle = 0
        else if (arrow_left) this.angle = 180
        else this.moving = false

        var newX = this.x + this.step * Math.cos(Math.PI * this.angle / 180)
        var newY = this.y + this.step * Math.sin(Math.PI * this.angle / 180)
        if (!this.moving || newX < 0 || newY < 0 || newX + this.width > width || newY + this.height > height) {
            return;
        }
        this.x = newX;
        this.y = newY;
    }
    this.render = function () {
        var temp = document.getElementById(this.id);
        if (temp == null) {
            temp = document.createElement("img");
            temp.setAttribute("src", this.src);
            temp.setAttribute("id", this.id);
            temp.setAttribute("width", this.width);
            temp.setAttribute("height", this.height);
            document.getElementById(container).appendChild(temp);
        }
        temp.style.position = "absolute";
        temp.style.left = this.x;
        temp.style.top = this.y;
        temp.style.zIndex = "1";

        document.getElementById("health").innerHTML = this.health
    }
    this.fire = function () {
        var tempDate = new Date()
        if (!window.fire || tempDate - this.lastFire < 500)
            return
        this.lastFire = tempDate
        var tempNumOfBullets = this.numOfBullets
        if (tempNumOfBullets % 2 != 0) {
            bullets.push(new Bullet("./assets/Pokeball.png", window.id++, this.x + this.width / 2, this.y + this.height / 2, this.angle, this.type));
            tempNumOfBullets--;
        }
        if (tempNumOfBullets == 0)
            return
        for (var i = this.angle - 30; i <= this.angle + 30; i += 60 / (tempNumOfBullets - 1)) {
            bullets.push(new Bullet("./assets/Pokeball.png", window.id++, this.x + this.width / 2, this.y + this.height / 2, i, this.type));
        }
    }
};