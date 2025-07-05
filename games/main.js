/**
 * @typedef Game
 * @prop {string} url
 * @prop {string} name
 */

document.addEventListener("DOMContentLoaded", ()=> {
    const gamesContainer = document.getElementById("games");
    /**
     * @type {Game[]}
     */
    const gamesData = [
        {
            url: "shipComander/",
            name: "Ship Comander"
        }
    ];

    verifyUser();
    
    for (let i = 0; i < gamesData.length; i++) {
        const game = gamesData[i];
        const gameElement = document.createElement("div");
        const gameImage = document.createElement("img");
        const gameTitle = document.createElement("p");
        gameElement.classList.add("game");
        gameImage.src = game.url + "preview.png";
        gameTitle.innerHTML = game.name;

        gameElement.append(gameImage, gameTitle);
        gameElement.addEventListener("click", ()=> {
            // TODO: Realizar la logica para mostrar juegos
            location.assign(game.url+"main.html");
        })

        gamesContainer.appendChild(gameElement);

    }

})