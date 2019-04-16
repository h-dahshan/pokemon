var Bullet = function (src, id, x, y, angle, bulletSrc) {
    this.src = src;
    this.step = bulletStep;
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.id = id;
    this.width = bulletWidth;
    this.height = bulletHeight;
    this.bulletSrc = bulletSrc;


    this.move = function () {
        var removeBullet = false;
        // Calculate New Bullet Position
        var newX = this.x + this.step * Math.cos(Math.PI * this.angle / 180);
        var newY = this.y + this.step * Math.sin(Math.PI * this.angle / 180);

        // If a Bullet Exceeds Playing Area the Remove it
        if (newX < 0 || newY < 0 || newX + this.width > width || newY + this.height > height) {
            removeBullet = true;
        }

        // Check Collision of Bullet with Opposites
        // If Bullet Source is From Hero
        if (this.bulletSrc == "hero"){
            // Check Collision with Enemies
            for (var i = 0; i < enemies.length; i++) {
                if ((this.x > enemies[i].x && this.x < enemies[i].x + enemies[i].width && this.y > enemies[i].y && this.y < enemies[i].y + enemies[i].height) ||
                    (this.x + this.width > enemies[i].x && this.x + this.width < enemies[i].x + enemies[i].width && this.y > enemies[i].y && this.y < enemies[i].y + enemies[i].height) ||
                    (this.x > enemies[i].x && this.x < enemies[i].x + enemies[i].width && this.y + this.height > enemies[i].y && this.y + this.height < enemies[i].y + enemies[i].height) ||
                    (this.x + this.width > enemies[i].x && this.x + this.width < enemies[i].x + enemies[i].width && this.y + this.height > enemies[i].y && this.y + this.height < enemies[i].y + enemies[i].height)) {
                    // If Collision Remove Bullet
                    removeBullet = true;
                    // Reduce Enemy Health with 10
                    enemies[i].health -= 10;
                    
                    // If Enemy's Health is Zero Remove Enemy
                    if (enemies[i].health <= 0) {
                        // Remove Enemy From HTML
                        document.getElementById(enemies[i].id).remove();
                        // Remove Enemy From Enemies Array
                        enemies.splice(i, 1);
                    }
                    // If There is No Enemies to Fight
                    if (enemies.length == 0) {
                        // Clear Intervals of Rendering, Moving, Firing
                        clearInterval(interval_id_1);
                        clearInterval(interval_id_2);
                        clearInterval(interval_id_3);
                        // Display Winner Msg
                        document.getElementById("won").style.display = "block";
                        // Redirect After 5 Seconds
                        setTimeout(() => {
                            window.open("level.html" + "?" + heroIndex, "_self");
                        }, 5000);
                    }
                }
            }
        }
        // If Bullet Source is From Enemy
        else if (this.bulletSrc == "enemy") {
            // Check Collision With Hero
            if ((this.x > hero.x && this.x < hero.x + hero.width && this.y > hero.y && this.y < hero.y + hero.height) ||
                (this.x + this.width > hero.x && this.x + this.width < hero.x + hero.width && this.y > hero.y && this.y < hero.y + hero.height) ||
                (this.x > hero.x && this.x < hero.x + hero.width && this.y + this.height > hero.y && this.y + this.height < hero.y + hero.height) ||
                (this.x + this.width > hero.x && this.x + this.width < hero.x + hero.width && this.y + this.height > hero.y && this.y + this.height < hero.y + hero.height)) {
                // If Collision Remove Bullet
                removeBullet = true;
                // Reduce Hero's Health with 10
                hero.health -= 10;
                // If Hero's Health is Zero
                if (hero.health <= 0) {
                    clearInterval(interval_id_1);
                    clearInterval(interval_id_2);
                    clearInterval(interval_id_3);
                    // Display Losing Msg
                    document.getElementById("lost").style.display = "block"
                    // Redirect After 5 Seconds
                    setTimeout(() => {
                        window.open("hero.html", "_self");
                    }, 5000);
                }
            }
        }
        // If Remove Bullet Was Set to Remove and Collision Happened
        if (removeBullet) {
            // Remove Bullet itself
            document.getElementById(this.id).remove();
            // Remove From Bullets Array
            for (var i = 0; i < bullets.length; i++) {
                // Remove From Enemies Array
                if (bullets[i].id == this.id) {
                    bullets.splice(i, 1);
                    return;
                }
            }
        }
        // If Bullet Didn't Remove the Set New Position 
        this.x = newX;
        this.y = newY;
    }


    this.render = function () {
        // If Bullet Doesn't Exist Create New
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
};