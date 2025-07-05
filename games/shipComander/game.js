/**
 * @typedef User
 * @prop {string} sprite
 * @prop {string[]} ships
 * @prop {number} level
 * @prop {number} money
 * @prop {number} energy
 * @prop {number} date
 * 
 */

const pantalla = document.getElementById("pantalla");
const gui = document.getElementById("gui");

const milisecondDay = 86400000;

const money = document.getElementById("money");
const energy = document.getElementById("energy");
const shipShower = document.getElementById("shipShower");
const shop = document.getElementById("shop");
const start = document.getElementById("start");
let hoy = Date.now();
function startGame() {

    /**
     * @type {User}
     */
    const user = JSON.parse(localStorage.getItem("games/shipComander") || "null") || {
        sprite: "alpha1",
        level: 1,
        money: 0,
        ships: ["alpha1"],
        energy: 5,
        date: Date.now()
    };
    if (hoy < user.date) {
        user.energy = 5;
    }


    const shipPlayer = new Ship(200, 400, user.sprite);
    shipPlayer.isFriend = true;

    start.onclick = () => {
        if (user.energy > 0) {
            pantalla.style.display = "block";
            gui.style.display = "none";
            const level = new Level(shipPlayer, user);
            level.onPlayerDefeat = () => {
                user.energy--;
                pantalla.style.display = "none";
                gui.style.display = "";
                shipPlayer.restoreShield();
                guardarPartida();
            }

            level.onLevelFinished = () => {
                pantalla.style.display = "none";
                gui.style.display = "";
                user.money += 30 + (5 * Math.round(user.level / 10));
                user.level++;
                guardarPartida();
            }
            level.start();
        } else {
            user.energy = 5;
            guardarPartida();
        }
    }

    setInterval(() => {
        hoy += 1000;
        // 86,400,000 ms = 24 * 60 * 60 * 1000 (milisegundos en un día)
        if (hoy - user.date > milisecondDay) {
            user.energy = 5;
            user.date = hoy;
            guardarPartida();
        }
    }, 1000);

    money.innerHTML = user.money;
    energy.innerHTML = user.energy;
    shipShower.innerHTML = `<div style='background-image: url("resourses/ships/${user.sprite}.png")'></div>`;


    function guardarPartida() {
        localStorage.setItem("games/shipComander", JSON.stringify(user));
        money.innerHTML = user.money;
        energy.innerHTML = user.energy;
    }
}