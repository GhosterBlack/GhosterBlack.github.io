class Level {
    processList = [];
    /**
     * @param {Ship} shipPlayer 
     * @param {User} user 
     */
    constructor(shipPlayer, user) {
        /**
         * @type {Ship}
         */
        this.shipPlayer = shipPlayer;
        /**
         * @type {Projectile[]}
         */
        this.projectilesPlayer = [];

        /**
         * Index del siguiente proyectil
         */
        this.shotsPlayer = 0;
        this.enemyKilled = 0;
        const level =  user.level;
        this.enemyMission = 5 * level;


        const maxEnemy = piso(aleatorio(5, 11));
        const enemysType = [
            piso(aleatorio(0, enemys.length)),
            piso(aleatorio(0, enemys.length)),
            piso(aleatorio(0, enemys.length)),
            piso(aleatorio(0, enemys.length))
        ]
        let enemyCount = 0;

        /**
         * @type {Ship[]}
         */
        this.enemys = [];

        let invokeEnemy = () => {
            if (enemyCount < maxEnemy) {
                enemyCount++;
                const enemyData = enemys[enemysType[piso(aleatorio(0, enemysType.length))]];
                const shipData = shipsData[enemyData.ship]
                const ship = new Ship(aleatorio(0, pantalla.clientWidth - 100), aleatorio(0, 100), enemyData.ship);
                const quantity = shipData.projectile.quantity || 1
                ship.isFriend = false;
                ship.currentProjectile = 0;
                const projectiles = [];
                this.enemys.push(ship);
                
                for (let i = 0; i < quantity; i++) {
                    const projectile = new Projectile(shipData.projectile, 0, 0);
                    projectiles.push(projectile);
                }

                const params = {};

                if (enemyData.require) {
                    for (const key in enemyData.require) {
                        const require = enemyData.require[key];
                        if (require.type == "random") {
                            params[key] = new ParamVariable(aleatorio(require.min, require.max));
                        } else if (require.type == "constant") {
                            params[key] = new ParamVariable(require.value);
                        } else if (require.type == "randomBoolean") {
                            params[key] = new ParamVariable(aleatorio(0, 11) > 5);
                        } else if (require.type == "randomDir") {
                            params[key] = new ParamVariable(aleatorio(1, 11) > 5 ? 1 : -1);
                        } else if (require.type == "player") {
                            params[key] = new ParamVariable(this.shipPlayer);
                        } else if (require.type == "projectilePlayer") {
                            params[key] = new ParamVariable(this.projectilesPlayer);
                        }
                    }
                }

                let s = setInterval(() => {
                    if (shipPlayer.destroy || ship.destroy) {
                        clearInterval(s);
                        enemyCount--;
                        if (ship.destroy && !shipPlayer.destroy) {
                            this.enemyKilled++;
                            if (this.enemyKilled >= this.enemyMission) {
                                this.stop();
                                this.onLevelFinished();
                            }
                        }
                    } else {
                        enemyData.ia(ship, projectiles, params);
                    }
                }, 10);
                this.processList.push(s);


            }
        }

        const quantityProjectile = shipPlayer.projectile.quantity || 1;

        for (let i = 0; i < quantityProjectile; i++) {
            const projectile = new Projectile(shipPlayer.projectile, 0, 0);
            projectile.isFriend = true;
            this.projectilesPlayer.push(projectile);
        }

        while (enemyCount < maxEnemy) {
            invokeEnemy();
        }

        let s = setInterval(() => {
            if (shipPlayer.destroy) {
                clearInterval(s);
            } else {
                invokeEnemy();
            }
        }, 5000);
        this.processList.push(s);
    }

    onPlayerDefeat () {};

    onLevelFinished () {};

    start = () => {
        const movementIni = {
            left: false,
            right: false,
            top: false,
            bottom: false,
            shot: false
        }

        this.movement = setInterval(() => {
            let isMove = false;
            if (this.shipPlayer.destroy) {
                this.stop();
                this.onPlayerDefeat();
            }
            if (movementIni.left) {
                this.shipPlayer.addX(-1 * this.shipPlayer.vel);
                this.shipPlayer.setClass("toLeft");
                isMove = true;
            }
            if (movementIni.right) {
                this.shipPlayer.addX(this.shipPlayer.vel);
                this.shipPlayer.setClass("toRight");
                isMove = true;
            }
            if (movementIni.top) {
                this.shipPlayer.addY(this.shipPlayer.vel * -1);
                this.shipPlayer.setClass("toFront");
                isMove = true;
            }
            if (movementIni.bottom) {
                this.shipPlayer.addY(this.shipPlayer.vel);
                this.shipPlayer.setClass("toBack");
                isMove = true;
            }

            if (!isMove) {
                this.shipPlayer.setClass("");
            }

            const projectile = this.projectilesPlayer[this.shotsPlayer];
            if (movementIni.shot && !projectile.shooting) {
                projectile.shot(this.shipPlayer.posX + projectile.width / 2, this.shipPlayer.posY, -1);
                this.shotsPlayer++;
                if (this.shotsPlayer >= this.projectilesPlayer.length) {
                    this.shotsPlayer = 0;
                }
            }
        }, 10);

        window.addEventListener("keydown", (e) => {
            if (e.key == "a") {
                movementIni.left = true;
            }
            if (e.key == "d") {
                movementIni.right = true;
            }
            if (e.key == "w") {
                movementIni.top = true;
            }
            if (e.key == "s") {
                movementIni.bottom = true;
            }
            if (e.key == "p") {
                movementIni.shot = true
            }
        })

        window.addEventListener("keyup", (e) => {
            if (e.key == "a") {
                movementIni.left = false;
            }
            if (e.key == "d") {
                movementIni.right = false;
            }
            if (e.key == "w") {
                movementIni.top = false;
            }
            if (e.key == "s") {
                movementIni.bottom = false;
            }

            if (e.key == "p") {
                movementIni.shot = false;
            }
        })



    }

    stop = () => {
        if (this.movement) {
            clearInterval(this.movement);
            for (let i = 0; i < this.processList.length; i++) {
                const ia = this.processList[i];
                clearInterval(ia);
            }
            
            pantalla.innerHTML = "";

            pantalla.append(this.shipPlayer.element);
        }
    }
}

/**
 * 
 * @param {number} min 
 * @param {number} max 
 * @returns {number}
 */
function aleatorio(min, max) {
    return Math.random() * (max - min) + min;
}


/**
 * 
 * @param {number} num 
 */
function piso(num) {
    let string = num.toString();
    if (string.includes(".")) {
        string = string.substring(0, string.indexOf("."));
        return parseInt(string);
    }
    return num;
}
