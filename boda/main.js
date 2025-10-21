let buscar = () => { }
document.addEventListener('DOMContentLoaded', () => {
    const invitados = [
        "Anita", "Olguita", "Alba y Robert", "David, Yurany y Valeria", "Josue y Eloina",
        "Augusto", "Yimmy, Maribel y Juan Esteban", "Familia Garboza", "Teresita", "Adriana",
        "Maria Helena.", "Naryis", "Miguel y Pilar", "Victor y Fidelia", "Ronald",
        "Lucho", "Fercho", "Flor", "Mauro y Mariluz", "Cristian y Angie", "Hector y Judith",
        "Zully", "Fanny", "Claudia", "Henry, Claudia y Esteban",
        "Marco", "Miguel y Gladiz", "Jhon y Yazmin", "Maye y Nahomi", "Jose y Yulieth",
        "Diannys", "Familia Piñeros", "Guillermo y Magda", "Emiro y Esperanza", "Daniel y Patricia", "Lien y Euledis",
        "Sofia", "Gustavo", "Amparo y Eugenio", "Sara", "Jesus", "Pilar",
        "Hanny", "Jorge", "Ivan y Mariela", "Familia Casadessus", "Luna", "Samuel",
        "Yeissimar", "Nicolas", "Familia Amador", "Papo y Karen", "Juan Pablo", "Manuel", "Cesar", "Aurora", "Lupe",
        "Simon, Juliet y Jael", "Eduardo", "Maria", "Franklin", "Tere y Alvaro", "Juan Cobos", "Never y Leti",
        "Jaime, Monica e Isabella", "Pedro y Clara", "Lucho y Pilar", "Esteban y Valentina",
        "Ynes y Marielys", "Deyanira", "Rosalba", "Marisol", "Marina", "Hilda"
    ];

    const masDeUnoInvitados = {
        2: ["Alba y Robert", "Josue y Eloina", "Miguel y Pilar", "Victor y Fidelia", "Mauro y Mariluz",
            "Cristian y Angie", "Hector y Judith", "Miguel y Gladiz", "Jhon y Yasmin", "Maye y Nahomi",
            "Jose y Yulieth", "Guillermo y Magda", "Emiro y Esperanza", "Daniel y Patricia", "Lien y Euledis",
            "Amparo y Eugenio", "Ivan y Mariela", "Tere y Alvaro", "Never y Leti"
        ],
        3: ["David, Yurany y Valeria", "Yimmy, Maribel y Juan Esteban", "Simon, Juliet y Jael",
            "Jaime, Monica e Isabella", "Henry, Claudia y Esteban"
        ],
        4: ["Familia Garboza", "Familia Piñeros", "Familia Casadessus"],
        zoom: [
            "Pedro y Clara", "Lucho y Pilar", "Esteban y Valentina",
            "Ynes y Marielys", "Deyanira", "Rosalba", "Marisol", "Marina", "Hilda", "Familia Amador", "Jorge y Nubia",
            "Franklin"
        ]
    }

    buscar = (nombre) => {
        const lowerNombre = nombre.toLowerCase();
        return invitados.findIndex(invitado => invitado.toLowerCase().includes(lowerNombre));
    }
    const play = document.getElementById("play");
    const pause = document.getElementById("pause");
    const href = location.search.substring(1);
    let isZoom = false;

    if (href.includes("invitado")) {
        const invitado = parseFloat(decodeURIComponent(href.split('=')[1].replace(/\+/g, ' ')));
        let invitadoNombre = invitados[invitado];
        if (invitado >= 0 && invitado < invitados.length) {
            const cantidadSpan = document.getElementById("cantidad");
            if (invitadoNombre.includes(" y ") || invitadoNombre.includes("Familia") || invitadoNombre.includes(" e ")) {
                document.getElementById("ver").textContent = "verlos";
            }
            if (masDeUnoInvitados[2].includes(invitadoNombre)) {
                cantidadSpan.innerHTML = "2";
            }
            if (masDeUnoInvitados[3].includes(invitadoNombre)) {
                cantidadSpan.innerHTML = "3";
            }
            if (masDeUnoInvitados[4].includes(invitadoNombre)) {
                cantidadSpan.innerHTML = "4";
            }
            if (masDeUnoInvitados.zoom.includes(invitadoNombre)) {
                document.getElementById("validez").style.display = "none";
                isZoom = true;
            }
            document.getElementById("invitado").textContent = `, ${invitadoNombre}!`;
        }
    }
    /**
     * @type {HTMLAudioElement}
     */
    const audio = document.getElementById("audio");
    const containers = document.querySelectorAll('.container');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.3 // ajusta según cuándo quieres que se active
    });

    containers.forEach(container => {
        observer.observe(container);
    });

    const countdown = () => {
        const targetDate = new Date("2025-12-07T00:00:00"); // ajusta la fecha
        const now = new Date();
        const diff = targetDate - now;

        if (diff <= 0) {
            document.getElementById("countdown").innerHTML = "¡Ya llegó el gran día!";
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        document.getElementById("days").textContent = days;
        document.getElementById("hours").textContent = hours;
        document.getElementById("minutes").textContent = minutes;
        document.getElementById("seconds").textContent = seconds;
    };

    play.onclick = () => {
        pause.classList.remove("hidden");
        play.classList.add("hidden");
        audio.play();
    }

    pause.onclick = () => {
        play.classList.remove("hidden");
        pause.classList.add("hidden");
        audio.pause();
    }

    setInterval(countdown, 1000);
})
