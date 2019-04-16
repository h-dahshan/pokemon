var enemySrc = [
    "./assets/mankey.png",
    "./assets/rattata.png",
    "./assets/venonat.png",
    "./assets/zubat.png",
    "./assets/meowth.png",
];

var Enemy = function (src, numOfBullets, id) {
    this.src = src;
    this.health = enemyHealth;
    this.numOfBullets = numOfBullets;
    this.step = enemyStep;
    this.angle = Math.floor(Math.random() * 360);
    this.id = id;
    this.width = enemyWidth;
    this.height = enemyHeight;
    this.x = Math.floor(Math.random() * (width - this.width));
    this.y = Math.floor(Math.random() * (height - this.height));
    this.beforeNewRandomDirection = beforeNewRandomDirection
    this.type = "enemy"

    this.move = function () {
        this.beforeNewRandomDirection--;
        if (this.beforeNewRandomDirection <= 0) {
            this.beforeNewRandomDirection = beforeNewRandomDirection
            this.angle = Math.floor(Math.random() * 360);
        }
        var newX = this.x + this.step * Math.cos(Math.PI * this.angle / 180)
        var newY = this.y + this.step * Math.sin(Math.PI * this.angle / 180)
        while (newX < 0 || newY < 0 || newX + this.width > width || newY + this.height > height) {
            this.angle = Math.floor(Math.random() * 360);
            newX = this.x + this.step * Math.cos(Math.PI * this.angle / 180)
            newY = this.y + this.step * Math.sin(Math.PI * this.angle / 180)
        }
        this.x = newX
        this.y = newY
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
    }
    this.fire = function () {
        if (this.health <= 0)
            return;
        setTimeout(() => { this.fire() }, 2000);
        var tempNumOfBullets = this.numOfBullets
        if (tempNumOfBullets % 2 != 0) {
            bullets.push(new Bullet("./assets/Pokeball.png", window.id++, this.x + this.width / 2, this.y + this.height / 2, this.angle, this.type));
            tempNumOfBullets--;
        }
        if (tempNumOfBullets <= 1)
            return
        for (var i = this.angle - 30; i <= this.angle + 30; i += 60 / (tempNumOfBullets - 1)) {
            bullets.push(new Bullet("./assets/Pokeball.png", window.id++, this.x + this.width / 2, this.y + this.height / 2, i, this.type));
        }
    }
    setTimeout(this.fire.bind(this), Math.floor(Math.random() * 2000));
};