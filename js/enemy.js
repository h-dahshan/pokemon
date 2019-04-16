// Array of Enemies' Src of Images
var enemySrc = [
    "./assets/mankey.png",
    "./assets/rattata.png",
    "./assets/venonat.png",
    "./assets/zubat.png",
    "./assets/meowth.png",
];

// Enemy Object Definintion
var Enemy = function (src, numOfBullets, id) {
    this.src = src;
    this.health = enemyHealth;
    this.numOfBullets = numOfBullets;
    this.step = enemyStep;
    this.angle = Math.floor(Math.random() * 360);
    this.id = id;
    this.width = enemyWidth;
    this.height = enemyHeight;
    // Hero's Position is Generated Random
    this.x = Math.floor(Math.random() * (width - this.width));
    this.y = Math.floor(Math.random() * (height - this.height));
    // Time Interval Between Changing the Angle
    this.beforeNewRandomDirection = beforeNewRandomDirection;
    this.type = "enemy";

    this.move = function () {
        // Decrease Time Interval
        this.beforeNewRandomDirection--;
        // If Time Ended the its Time to Change Angle And Direction of Move
        if (this.beforeNewRandomDirection <= 0) {
            // Reset the Timer
            this.beforeNewRandomDirection = beforeNewRandomDirection;
            // Create New Random Angle to Move at
            this.angle = Math.floor(Math.random() * 360);
        }
        // Calculate The New Position of the Enemy
        var newX = this.x + this.step * Math.cos(Math.PI * this.angle / 180)
        var newY = this.y + this.step * Math.sin(Math.PI * this.angle / 180)
        // While the Angle Led to a Position Outside Play Area the Rechange Angle
        while (newX < 0 || newY < 0 || newX + this.width > width || newY + this.height > height) {
            this.angle = Math.floor(Math.random() * 360);
            newX = this.x + this.step * Math.cos(Math.PI * this.angle / 180);
            newY = this.y + this.step * Math.sin(Math.PI * this.angle / 180);
        }
        // Set New Position of Enemy 
        this.x = newX;
        this.y = newY;
    }


    this.render = function () {
        var temp = document.getElementById(this.id);
        // If Enemy Doesn't Exist Create New One
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
    };


    this.fire = function () {
        // Don't Fire If Enemy's Health is Zero
        if (this.health <= 0) return;
        // Recursion for Contineous Firing Every 2 Seconds
        setTimeout(() => { this.fire() }, 2000);
        var tempNumOfBullets = this.numOfBullets;
        // If number of Bullets is Odd Then a Bullet will Fire in Center
        if (tempNumOfBullets % 2 != 0) {
            bullets.push(new Bullet("./assets/Pokeball.png", window.id++, this.x + this.width / 2, this.y + this.height / 2, this.angle, this.type));
            tempNumOfBullets--;
        }
        // If Enemy has Only One Bullet to Fire You're Done
        if (tempNumOfBullets <= 1) return;
        // If it has More Then Distribute them Over 60 Degrees
        for (var i = this.angle - 30; i <= this.angle + 30; i += 60 / (tempNumOfBullets - 1)) {
            bullets.push(new Bullet("./assets/Pokeball.png", window.id++, this.x + this.width / 2, this.y + this.height / 2, i, this.type));
        }
    };
    // After Creating the Element Give it Some time to Fire
    setTimeout(this.fire.bind(this), Math.floor(Math.random() * 2000));
};
/* A Bullet Takes its Position in Center of Firing Object
** AND Firing Object type to Affect Damage on its enemy
** AND The Angle it will Move at
*/
