/**
 * @typedef ProjectileData
 * @prop {number} distance
 * @prop {number} damage
 * @prop {number} width
 * @prop {number} height
 * @prop {(user: Ship, tarjet: Ship) => void} effect
 * @prop {string} sprite
 * @prop {number} countdown
 * @prop {number} speed
 * @prop {number} quantity
 */

/**
 * @typedef ShipData
 * @prop {number} width
 * @prop {number} height
 * @prop {number} shield
 * @prop {number} vel
 * @prop {ProjectileData} projectile
 */

/**
 * @type {Object<string, ShipData>}
 */
const shipsData = {
    alpha1: {
        width: 100,
        height: 100,
        shield: 100,
        vel: 5,
        projectile: {
            distance: 35,
            damage: 10,
            width: 50,
            height: 50,
            effect: () => { },
            sprite: "alpha1_projectile",
            countdown: 100
        }
    },

    trombo40: {
        width: 80,
        height: 70,
        shield: 10,
        vel: 5,
        projectile: {
            distance: 40,
            damage: 10,
            width: 20,
            height: 50,
            effect: () => { },
            sprite: "alpha1_projectile",
            countdown: 1000
        }
    }
}

class ParamVariable {
    constructor(value) { 
        this.value = value;
    }


    set(value) {
        if (typeof value == "number" || typeof value == "string") {
            this.value = value;            
        }
    }

    add(value) {
        if (typeof value === "number" || typeof value === "string") {
            this.value += value;
        }
    }

    push (item) {
        if (Array.isArray(this.value)) {
            this.value.push(item);
        }
    }

    remove (item) {
        if (Array.isArray(this.value)) {
            const index = this.value.indexOf(item);
            if (index > -1) {
                this.value.splice(index, 1);
            }
        }
    }

    setItem (key, item) {
        if (typeof this.value === "object" && !Array.isArray(this.value)) {
            this.value[key] = item;
        }
    }

    getItem (key) {
        if (typeof this.value === "object" && !Array.isArray(this.value)) {
            return this.value[key];
        }
        return undefined;
    }

    removeItem (key) {
        if (typeof this.value === "object" && !Array.isArray(this.value)) {
            delete this.value[key];
        }
    }
}
/**
 * @typedef EnemyData
 * @prop {string} ship
 * @prop {(ship: Ship, projectiles: Projectile[], params: Object<string, ParamVariable>) => void} ia
 * @prop {Object<string, {type: string, min?: number, max?: number, value?: number}>} require
 */

/**
 * @type {EnemyData[]}
 */
const enemys = [
    {
        ship: "trombo40",
        ia: (ship, projectiles, {destiny, dir}) => {
            const projectile = projectiles[ship.currentProjectile];
            if (destiny.value > 0) {
                ship.addX(dir.value * ship.vel)
                destiny.add(-1);
                
            } else {
                dir.set(aleatorio(1, 11) > 5 ? 1 : -1);
                destiny.set(aleatorio(20, 50));
                if (ship.posX < 0) {
                    dir.set(1);
                }
                if (ship.posX >= pantalla.clientWidth - 10) {
                    dir.set(-1);
                }
            }
            if (!projectile.shooting) {
                projectile.shot(ship.posX + projectile.width / 2, ship.posY, 1);
                ship.currentProjectile++;
                if (ship.currentProjectile >= projectiles.length) {
                    ship.currentProjectile = 0;
                }
            }
        },
        require: {
            destiny: {
                type: "random",
                min: 20,
                max: 50
            },
            dir: {
                type: "randomDir"
            }
        }
    }
]
