/**
     * @type {Ship[]}
     */
const ships = [];

class Ship {
    width = 100;
    height = 100;
    shield = 100;
    shieldRemain = 100;
    vel = 5;
    isFriend = false;
    destroy = false;
    currentProjectile = 0;
    /**
     * @type {ProjectileData}
     */
    projectile = {
        distance: 10,
        damage: 10,
        effect: () => { },
        width: 10,
        heigth: 30,
        sprite: ""
    };
    constructor(posX, posY, sprite) {
        this.element = document.createElement("div");
        this.barra = document.createElement("div");
        this.vida = document.createElement("div");
        this.spriteElement = document.createElement("div");
        this.spriteElement.classList.add("sprite");
        this.element.classList.add("ship");
        this.posX = posX;
        this.posY = posY;
        this.sprite = sprite;

        this.element.appendChild(this.spriteElement);

        this.barra.classList.add("barra")

        this.element.appendChild(this.barra);
        this.barra.appendChild(this.vida)
        this.element.style.top = posY + "px";
        this.element.style.left = posX + "px";
        this.spriteElement.style.backgroundImage = "url('resourses/ships/" + sprite + ".png')";

        const data = shipsData[sprite];
        this.width = data.width;
        this.height = data.height;
        this.shield = data.shield;
        this.shieldRemain = data.shield;
        this.vel = data.vel;
        this.projectile = data.projectile;
        pantalla.appendChild(this.element);
        this.element.style.width = this.width + "px";
        this.element.style.height = this.height + "px";
        ships.push(this)
    }

    setClass(className) {
        this.spriteElement.className = "sprite " + className;
    }

    hurt(damage) {
        this.shieldRemain -= damage;
        if (this.shieldRemain <= 0) {
            this.element.remove();
            this.destroy = true;
        }

        this.vida.style.width = ((this.shieldRemain * 100) / this.shield) + "%"
    }

    restoreShield () {
        this.shieldRemain = this.shield;
        this.destroy = false;
        pantalla.appendChild(this.element);
        this.vida.style.width = "100%";
    }

    remove() {
        this.element.remove();
        this.destroy = true;
    }

    addX(x) {
        this.posX += x;
        this.element.style.left = this.posX + "px";
    }

    addY(y) {
        this.posY += y;
        this.element.style.top = this.posY + "px";
    }

    setSprite(sprite) {
        this.sprite = sprite;
        this.element.style.backgroundImage = "url('resourses/" + sprite + ".png')";
        const data = shipsData[sprite];
        this.width = data.width;
        this.height = data.heigth;
        this.shield = data.shield;
        this.shieldRemain = data.shieldRemain;
        this.vel = data.vel;
        this.projectile = data.projectile;
    }
}

class Projectile {
    width = 10;
    heigth = 30;
    maxDistance = 30;
    posX = 0;
    posY = 0;
    damage = 10;
    shooting = false;
    countdown = 0;
    isFriend = false

    /**
     * 
     * @param {ProjectileData} projectileData
     * @param {number} x
     * @param {number} y 
     */
    constructor(projectileData, x = 0, y = 0) {
        this.width = projectileData.width || 10;
        this.heigth = projectileData.height || 30;
        this.maxDistance = projectileData.distance || 10;
        this.damage = projectileData.damage || 10;
        this.posX = x;
        this.posY = y;
        this.element = document.createElement("div");
        this.element.classList.add("projectile");
        this.element.style.width = this.width + "px";
        this.element.style.height = this.heigth + "px";
        this.countdown = projectileData.countdown || 0;
        this.element.style.backgroundImage = "url('resourses/projectiles/" + projectileData.sprite + ".png')";
    }

    shot(x, y, dir) {
        this.posX = x;
        this.posY = y;
        let distance = 0;

        this.element.style.top = this.posY + "px";
        this.element.style.left = this.posX + "px";

        pantalla.appendChild(this.element);
        this.shooting = true;

        let s = setInterval(() => {
            if (distance < this.maxDistance) {
                this.addY(10 * dir);

                for (let i = 0; i < ships.length; i++) {
                    const ship = ships[i];
                    if (ship.isFriend != this.isFriend && !ship.destroy) {
                        // Verifica colisión entre el proyectil y la nave
                        if (
                            this.posX < ship.posX + ship.width &&
                            this.posX + this.width > ship.posX &&
                            this.posY < ship.posY + ship.height &&
                            this.posY + this.heigth > ship.posY
                        ) {
                            // Colisión detectada
                            ship.hurt(this.damage);
                            this.element.remove();
                            removeShooting();
                            clearInterval(s);
                            break;
                        }
                    }
                }

                distance += 1;
            } else {
                this.element.remove();
                removeShooting();
                clearInterval(s);
            }
        }, 10);

        let removeShooting = () => {
            if (this.countdown == 0) {
                this.shooting = false;
            } else {
                let d = setTimeout(() => {
                    this.shooting = false;
                    clearTimeout(d);
                }, this.countdown);
            }
        }
    }

    addY(y) {
        this.posY += y;
        this.element.style.top = this.posY + "px";
    }



}
