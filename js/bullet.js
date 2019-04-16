var Bullet = function (src, id, x, y, angle, bulletSrc) {
    this.src = src;
    this.step = bulletStep;
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.id = id;
    this.width = bulletWidth;
    this.height = bulletHeight;
    this.bulletSrc = bulletSrc
    this.move = function () {
        var removeBullet = false;
        var newX = this.x + this.step * Math.cos(Math.PI * this.angle / 180)
        var newY = this.y + this.step * Math.sin(Math.PI * this.angle / 180)
        if (newX < 0 || newY < 0 || newX + this.width > width || newY + this.height > height) {
            removeBullet = true
        }
        // check collision
        if (this.bulletSrc == "hero")
            for (var i = 0; i < enemies.length; i++) {
                if ((this.x > enemies[i].x && this.x < enemies[i].x + enemies[i].width && this.y > enemies[i].y && this.y < enemies[i].y + enemies[i].height) ||
                    (this.x + this.width > enemies[i].x && this.x + this.width < enemies[i].x + enemies[i].width && this.y > enemies[i].y && this.y < enemies[i].y + enemies[i].height) ||
                    (this.x > enemies[i].x && this.x < enemies[i].x + enemies[i].width && this.y + this.height > enemies[i].y && this.y + this.height < enemies[i].y + enemies[i].height) ||
                    (this.x + this.width > enemies[i].x && this.x + this.width < enemies[i].x + enemies[i].width && this.y + this.height > enemies[i].y && this.y + this.height < enemies[i].y + enemies[i].height)) {
                    removeBullet = true
                    enemies[i].health -= 10
                    if (enemies[i].health <= 0) {
                        document.getElementById(enemies[i].id).remove()
                        enemies.splice(i, 1);
                        if (enemies.length == 0) {
                            clearInterval(interval_id_1)
                            clearInterval(interval_id_2)
                            clearInterval(interval_id_3)
                            document.getElementById("won").style.display = "block"
                            setTimeout(() => {
                                window.open("level.html" + "?" + heroIndex, "_self");
                            }, 5000);
                        }
                    }
                }
            }
        else if (this.bulletSrc == "enemy") {
            if ((this.x > hero.x && this.x < hero.x + hero.width && this.y > hero.y && this.y < hero.y + hero.height) ||
                (this.x + this.width > hero.x && this.x + this.width < hero.x + hero.width && this.y > hero.y && this.y < hero.y + hero.height) ||
                (this.x > hero.x && this.x < hero.x + hero.width && this.y + this.height > hero.y && this.y + this.height < hero.y + hero.height) ||
                (this.x + this.width > hero.x && this.x + this.width < hero.x + hero.width && this.y + this.height > hero.y && this.y + this.height < hero.y + hero.height)) {
                removeBullet = true
                hero.health -= 10
                if (hero.health <= 0) {
                    clearInterval(interval_id_1)
                    clearInterval(interval_id_2)
                    clearInterval(interval_id_3)
                    document.getElementById("lost").style.display = "block"
                    setTimeout(() => {
                        window.open("hero.html", "_self");
                    }, 5000);
                }
            }
        }
        if (removeBullet) {
            document.getElementById(this.id).remove()
            for (var i = 0; i < bullets.length; i++) {
                if (bullets[i].id == this.id) {
                    bullets.splice(i, 1);
                    return;
                }
            }
        }
        this.x = newX
        this.y = newY
    }
    this.render = function () {
        var temp = document.getElementById(this.id)
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