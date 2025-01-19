document.addEventListener('DOMContentLoaded', function() { 
    let indexVideo = 0;
    let time = 0;
    let timing = 0;
    let pause = false;
    const final = 26;
    const con = document.getElementsByClassName("con");
    const nexts = document.getElementsByClassName("next");
    const finalDiv = document.getElementById("final");
    const audio = document.querySelector("audio")

    /**
     * @typedef Especial
     * @prop {string} text
     * @prop {string} x
     * @prop {string} y
     * @prop {string[]} clases
     * @prop {number} time
     * @prop {number} size
     * @prop {string} width
     * @prop {string} type
     * 
     */
    /**
     * @type {[Especial[]]}
     */
    const especiales = {
        0: [
            {
                text: "Es tan animador salir al servicio y ver tantas caras de precursores que se esfuerzan a diario",
                x: "3vw",
                y: "20vh",
                clases: ["relleno"],
                time: 7,
                size: 30,
                width: "300px"
            }
        ],

        3: [
            {
                text: "Aun cuando a veces es dificil salir al servicio",
                x: "0",
                y: "90vh",
                clases: ["relleno"],
                time: 8,
                size: 35,
                width: "100vw"
            }
        ],

        5: [
            {
                text: "Pero ir con ustedes siempre nos anima a seguir",
                x: "0",
                y: "0vh",
                clases: ["relleno"],
                time: 8,
                size: 30,
                width: "100vw"
            }
        ],

        6: [
            {
                text: "Los mayores son un ejemplo de perseverancia y fe, que anima a todos a dar lo mejor de si",
                x: "0vw",
                y: "10vh",
                clases: ["aparecer"],
                time: 10,
                size: 30,
                width: "300px"
            }
        ],
        7: [
            {
                
                type: "control",
                time: 2,
            }
        ],

        8: [
            {
                
                type: "control",
                time: 2,
            }
        ],

        9: [
            {
                
                type: "control",
                time: 2,
            }
        ],

        10: [
            {
                text: "Los mas jovenes dan todas sus fuerzas y animan a los otros a seguir la vida del precursor",
                x: "0vw",
                y: "10vh",
                clases: ["relleno"],
                time: 10,
                size: 30,
                width: "300px"
            }
        ]
    }

    for (let i = 0; i < final; i++) {
        const element = document.createElement("div");
        const img = document.createElement("img");
        img.src = "imgs/"+(i+1)+".jpg";
        element.classList.add("con", "foto", "subir", "entrada-subir");
        element.setAttribute("timing", "5");
        element.appendChild(img);
        if (especiales[i]) {
            const especial = especiales[i];
            let tim = 0;
            let control = false;
            for (let i = 0; i < especial.length; i++) {
                const texto = especial[i];
                if (texto.type != "control") {
                    const div = document.createElement("div");
                    div.classList.add("text", ...texto.clases);
                    div.innerHTML = texto.text;
                    div.style.left = texto.x;
                    div.style.top = texto.y;
                    div.style.fontSize = (texto.size || 20) + "px" ;
                    div.style.width = texto.width ? texto.width : "auto";
                    element.appendChild(div);
                }

                
                if (texto.time > tim && (texto.type == "control" || !control)) {
                    tim = texto.time
                    if (texto.type == "control") {
                        control = true;
                    }
                }
            }

            if (tim == 0) {
                tim = 5
            }
            element.setAttribute("timing", tim);
        }
        document.body.insertBefore(element, finalDiv);
                
    }

    actualizarContainer();

    for (let i = 0; i < nexts.length; i++) {
        const element = nexts[i];
        element.addEventListener("click", function() {
            cambiarEscena();
            if (element.classList.contains("play")) {
                audio.play()
            }
        });
    }

    function actualizarContainer() {
        for (let i = 0; i < con.length; i++) {
            const element = con[i];
            element.classList.add("inactive");
            element.classList.remove("active");
            if (i == indexVideo-1) {
                element.classList.add("animate")
            } else if(element.classList.contains("animate")) {
                element.classList.remove("animate")
            }
            if (i == indexVideo) {
                element.classList.remove("inactive");
                element.classList.add("active");
                timing = parseFloat(element.getAttribute("timing"));
                if (timing > 0) {
                    time = 0;
                }
            }
        }
    }
    


    setInterval(() => {
        if (!pause) {
            time++;
            if (time >= timing && timing > 0) {
               cambiarEscena()
            }
        }
    }, 1000);

    function cambiarEscena() {
        indexVideo++;
        actualizarContainer();
    }
});