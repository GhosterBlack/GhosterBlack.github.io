let buscar = () => { }
document.addEventListener('DOMContentLoaded', () => {
    const invitados = [
        "Anita", "Olguita", "Alba y Robert", "David, Yurany y Valeria", "Josue y Eloina",
        "Augusto", "Yimmy, Maribel y Juan Esteban", "Familia Garboza", "Teresita", "Adriana",
        "Maria Helena", "Naryis", "Miguel y Pilar", "Victor y Fidelia", "Ronald",
        "Lucho", "Fercho", "Flor", "Mauro y Mariluz", "Cristian y Angie", "Hector y Judith",
        "Zully", "Fanny", "Claudia", "Henry, Claudia y Esteban",
        "Marco", "Miguel y Gladiz", "Jhon y Yazmin", "Maye y Nahomi", "Jose y Yulieth",
        "Diannys", "Familia Piñeros", "Guillermo y Magda", "Emiro y Esperanza", "Daniel y Patricia", "Lien y Euledis",
        "Sofia", "Gustavo", "Amparo y Eugenio", "Sara", "Jesus",
        "Hanny", "Jorge", "Ivan y Mariela", "Familia Casadessus", "Luna", "Samuel",
        "Yeissimar", "Nicolas", "Familia Amador", "Papo y Karen", "Juan Pablo", "Manuel", "Cesar", "Aurora", "Lupe",
        "Simon, Juliet y Jael", "Eduardo y Maria", "Franklin", "Tere y Alvaro", "Juan Cobos", "Never y Leti",
        "Jaime, Monica e Isabella", "Pedro y Clara", "Lucho y Pilar", "Esteban y Valentina",
        "Ynes y Marielys", "Deyanira", "Rosalba", "Marisol", "Marina", "Hilda", "Ivan Torres", "James y Elizabeth",
        "Santiago", "Mateo", "Justina", "Erianna", "Miriam, Armando y David",
        "Ricardo y Mariana",
        "Stellita",
        "Andres, Daniela y Zoe",
        "Santiago Daza", "Familia Ochoa",
        "Familia Castro", "Luisana", "Andrea", "Familia Miranda", "Erisbel Miranda",
        "Jorge y Genesis", "Jorge y Nubia", "Tati", "Diego y Vicky", "Luz Dary y Guillermo",
        "Familia Caguana", "Familia Diaz Moncada", "Familia Diaz", "Claudia Villamil",
        "Zehira Duque", "Nancy Amariles", "Rafael", "Yanetsi", "Tio Carlos", "Milu", "Familia Muños",
        "Lucho y Angela", "Anita 💖", "Catalina", "Ruby", "Eliecer y Luzmarina", "Familia Rojas", "Alex y Lorena",
        "Eduardo y Yesenia"
    ];

    const masDeUnoInvitados = {
        2: ["Alba y Robert", "Josue y Eloina", "Miguel y Pilar", "Victor y Fidelia", "Mauro y Mariluz",
            "Cristian y Angie", "Hector y Judith", "Miguel y Gladiz", "Jhon y Yasmin", "Maye y Nahomi",
            "Guillermo y Magda", "Emiro y Esperanza", "Daniel y Patricia",
            "Amparo y Eugenio", "Ivan y Mariela", "Tere y Alvaro", "Never y Leti", "Eduardo y Maria",
            "Ricardo y Mariana", "Eliecer y Luzmarina", "Familia Rojas", "Alex y Lorena", "Eduardo y Yesenia"
        ],
        3: ["David, Yurany y Valeria", "Yimmy, Maribel y Juan Esteban", "Simon, Juliet y Jael",
            "Jaime, Monica e Isabella", "Henry, Claudia y Esteban", "Miriam, Armando y David", "Andres, Daniela y Zoe",
            "Familia Ochoa"
        ],
        4: ["Familia Garboza", "Familia Piñeros"],
        zoom: [
            "Pedro y Clara", "Lucho y Pilar", "Esteban y Valentina",
            "Ynes y Marielys", "Deyanira", "Rosalba", "Marisol", "Marina", "Hilda", "Familia Amador", "Jorge y Nubia",
            "Franklin", "Maye", "Nahomi", "Jose y Yulieth", "Diannys", "Lien y Euledis", "James y Elizabeth",
            "Santiago", "Mateo", "Familia Casadessus",
            "Familia Castro", "Luisana", "Andrea", "Familia Miranda", "Erisbel Miranda",
            "Jorge y Genesis", "Manuel", "Papo y Karen", "Nubia y Jorge", "Tati", "Diego y Vicky",
            , "Luz Dary y Guillermo",
            "Familia Caguana", "Familia Diaz Moncada", "Familia Diaz", "Claudia Villamil",
            "Zehira Duque", "Nancy Amariles", "Rafael", "Yanetsi", "Tio Carlos", "Milu", "Familia Muños",
            "Lucho y Angela", "Anita 💖", "Catalina", "Ruby", "Eliecer y Luzmarina"
        ]
    }
    const sourcesAudio = [
        "audio/music1.mp3",
        "audio/music1.mp3",
        "audio/music2.mp3",
        "audio/music3.mp3",
        "audio/music4.mp3",
        "audio/music4.mp3",
        "audio/music4.mp3",
    ]
    // calle 42 sur #27 51
    const confirmar = document.getElementById("confirmar");
    const noZoom = document.getElementsByClassName("noZoom");
    const onlyZoom = document.getElementsByClassName("onlyZoom");
    const overflow = document.getElementById("overflow");
    let confirmado = false;

    /**
     * Devuelve un entero aleatorio entre min y max (ambos incluidos).
     * Si solo se pasa un argumento se toma como max y min = 0.
     */
    function elegirNumeroAleatorio(min = 0, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    buscar = (nombre) => {
        const lowerNombre = nombre.toLowerCase();
        return invitados.findIndex(invitado => invitado.toLowerCase().includes(lowerNombre));
    }
    const play = document.getElementById("play");
    const pause = document.getElementById("pause");
    const href = location.search.substring(1);
    let isZoom = false;
    let nombre = "invitado";

    if (href.includes("invitado")) {
        const invitado = parseFloat(decodeURIComponent(href.split('=')[1].replace(/\+/g, ' ')));
        let invitadoNombre = invitados[invitado];
        nombre = invitadoNombre;
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

    audio.src = sourcesAudio[elegirNumeroAleatorio(0, sourcesAudio.length - 1)];

    audio.volume = 0.1;

    audio.onended = () => {
        audio.src = sourcesAudio[elegirNumeroAleatorio(0, sourcesAudio.length - 1)];
        audio.play();
    }

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

    confirmar.onclick = () => {
        if (confirmado) {
            return;
        }
        overflow.classList.add("active");
        confirmado = true;
        fetch("https://torresdev-backend.onrender.com/invs/confirm", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre: nombre })
        })
            .catch((e) => {
                console.log(e);
            })
            .finally(() => {
                overflow.classList.remove("active")
                const wame = document.getElementById("wame");
                wame.click();
            })
    }


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

    const playBtn = document.getElementById("play");
    const pauseBtn = document.getElementById("pause");
    const progressBar = document.getElementById("progressBar");

    // Cargar audio

    // Play/Pause
    playBtn.onclick = () => {
        audio.play();
        playBtn.classList.add("hidden");
        pauseBtn.classList.remove("hidden");
    };

    pauseBtn.onclick = () => {
        audio.pause();
        pauseBtn.classList.add("hidden");
        playBtn.classList.remove("hidden");
    };

    // Actualizar barra de progreso
    audio.addEventListener("timeupdate", () => {
        progressBar.max = Math.floor(audio.duration);
        progressBar.value = Math.floor(audio.currentTime);
    });

    // Permitir al usuario mover la barra
    progressBar.addEventListener("input", () => {
        audio.currentTime = progressBar.value;
    });

    if (isZoom) {
        for (let i = 0; i < noZoom.length; i++) {
            const element = noZoom[i];
            element.style.display = "none";

        }

        for (let i = 0; i < onlyZoom.length; i++) {
            const element = onlyZoom[i];
            element.style.display = "block";
        }
        fetch("https://torresdev-backend.onrender.com/invs/getzoom", {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        })
            .then(response => response.json())
            .then(data => {
                document.getElementById("urlZoom").href = data.urlZoom;
                document.getElementById("zoomUrlSpace").classList.remove("disabled")
            });
    }

    setInterval(countdown, 1000);
})
