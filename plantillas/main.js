window.addEventListener("load", ()=> {
    const galery = document.getElementById("galery");
    const plantillaId = Sistema.getParamUrl("plantillaid");
    const plantillas = [
        {
            name: "Super rosa",
            text: "¡Te invito!",
            url: "superRosa/index.html",
            colors: ["#FFD1DC", "#FFB3BA", "#FF8B94"],
            font: '"Courgette", serif',
            fontColor: "#333333",
            id: "A001"
        },
        {
            name: "Azul y dorado",
            text: "Estas invitado",
            url: "blueAndGold/index.html",
            colors: ["#2b3743", "#c8a85a", "transparent"],
            font: "Arial",
            fontColor: "#f2f2f2",
            id: "A002"
        }
    ]

    const modal = document.getElementById("modal");
    const closeModal = document.getElementById("closeModal");
    const openOptions = document.getElementById("openOptions");
    const options = document.getElementById("options");
    const frame = document.getElementById("frame");

    verifyUser();

    openOptions.onclick = ()=> {
        options.classList.toggle("active");
    }

    closeModal.addEventListener("click", () => {
        modal.classList.remove("active");
    });

    for (let i = 0; i < plantillas.length; i++) {
        const plantilla = plantillas[i];
        const celda = document.createElement("div");
        const nodePlantilla = document.createElement("div");
        const textNode = document.createElement("p");

        celda.classList.add("celda");
        nodePlantilla.classList.add("plantilla");
        for (let j = 0; j < plantilla.colors.length; j++) {
            const color = plantilla.colors[j];
            nodePlantilla.style.setProperty("--color" + (j+1), color);
        }
        nodePlantilla.style.setProperty("--fontColor", plantilla.fontColor);
        nodePlantilla.style.setProperty("--font", plantilla.font);
        nodePlantilla.innerHTML = `
            <div class="text">
                <p>${plantilla.text}</p>
            </div>
        `;
        textNode.innerHTML = plantilla.name;

        nodePlantilla.addEventListener("click", () => {
            frame.src = plantilla.url;
            modal.classList.add("active");
        });

        if (plantillaId && plantillaId === plantilla.id) {
            frame.src = plantilla.url;
            modal.classList.add("active");
        }
        galery.appendChild(celda);
        celda.appendChild(nodePlantilla);
        celda.appendChild(textNode);
    }
})