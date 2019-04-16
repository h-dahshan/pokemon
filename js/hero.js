// Array of Heros' Src of Images
var heroSrc = [
    "./assets/bulbasaur.png",
    "./assets/charmander.png",
    "./assets/eevee.png",
    "./assets/pikachu.png",
    "./assets/squirtle.png",
];


// Hero Object Definition
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
        // Assume A Move Key is Pressed
        this.moving = true
        // Angle is ClockWise
        if (arrow_top && arrow_right) this.angle = 315;             // North East
        else if (arrow_top && arrow_left) this.angle = 225;         // North West
        else if (arrow_bottom && arrow_right) this.angle = 45;      // South East
        else if (arrow_bottom && arrow_left) this.angle = 135;      // South West
        else if (arrow_top) this.angle = 270;                       // North
        else if (arrow_bottom) this.angle = 90;                     // South
        else if (arrow_right) this.angle = 0;                       // East
        else if (arrow_left) this.angle = 180;                      // West
        else this.moving = false;                    // No Key Pressed No Move No Angle 

        // New X,Y Positions with Respect to angle X>COS, Y>SIN
        var newX = this.x + this.step * Math.cos(Math.PI * this.angle / 180);
        var newY = this.y + this.step * Math.sin(Math.PI * this.angle / 180);

        // If No Moving or X or Y Exceeds its Border from any Direction 
        if (!this.moving || newX < 0 || newY < 0 || newX + this.width > width || newY + this.height > height) {
            return;
        }

        // Then this Object new Position is the Calculated before
        this.x = newX;
        this.y = newY;
    };


    this.render = function () {
        var temp = document.getElementById(this.id);
        // If Hero Doesn't Exist Create A New One
        if (temp == null) {
            temp = document.createElement("img");
            temp.setAttribute("src", this.src);
            temp.setAttribute("id", this.id);
            temp.setAttribute("width", this.width);
            temp.setAttribute("height", this.height);
            document.getElementById(container).appendChild(temp);
        }
        // Else Change its Position
        temp.style.position = "absolute";
        temp.style.left = this.x;
        temp.style.top = this.y;
        temp.style.zIndex = "1";

        // Inject Health (BAD)
        document.getElementById("health").innerHTML = this.health
    };


    this.fire = function () {
        var tempDate = new Date()
        // If No Fire or the Last Fire didn't Complete Half a Second then Return
        if (!window.fire || tempDate - this.lastFire < 300) return;

        // Else Set last Fire to Now
        this.lastFire = tempDate;
        
        // Set Number of Bullets Fired By Hero
        var tempNumOfBullets = this.numOfBullets;

        // If it is Odd then there'll be a Bullet in Center
        if (tempNumOfBullets % 2 != 0) {
            bullets.push(new Bullet("./assets/Pokeball.png", window.id++, this.x + this.width / 2, this.y + this.height / 2, this.angle, this.type));
            tempNumOfBullets--;
        }
        // If the Hero Fires Only One Bullet then You're Done
        if (tempNumOfBullets == 0) return;
        // If Not Distribute Bullets Over 60 Degrees
        for (var i = this.angle - 30; i <= this.angle + 30; i += 60 / (tempNumOfBullets - 1)) {
            bullets.push(new Bullet("./assets/Pokeball.png", window.id++, this.x + this.width / 2, this.y + this.height / 2, i, this.type));
        }
    };
};
/* A Bullet Takes its Position in Center of Firing Object
** AND Firing Object type to Affect Damage on its enemy
** AND The Angle it will Move at
*/
