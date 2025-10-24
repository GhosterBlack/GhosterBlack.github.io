/* 
<section class="infoRegister">
                <nav>
                    <img src="res/name-icon.png" alt="Nombre">
                    <p>Pedro</p>
                </nav>
                <nav>
                    <img src="res/work-icon.png" alt="Profesion">
                    <p>Ingeniero de Software</p>
                </nav>
                <nav>
                    <img src="res/years-icon.png" alt="Edad">
                    <p>35 años</p>
                </nav>
                <nav>
                    <img src="res/gender-icon.png" alt="Genero">
                    <p>Masculino</p>
                </nav>
            </section>
*/

document.addEventListener("DOMContentLoaded", ()=> {
    const send = document.getElementById("send"),
    see = document.getElementById("see"),
    nombre = document.getElementById("nombre"),
    profesion = document.getElementById("profesion"),
    edad = document.getElementById("edad"),
    genero = document.getElementById("genero"),
    content = document.getElementById("content");

    send.addEventListener("click", ()=> {
        const user = {
            nombre: nombre.value,
            profesion: profesion.value,
            edad: edad.value,
            genero: genero.value
        };

        fetch(urlServer+"invs/addnewrow", {
            method: "POST",
            body: JSON.stringify(user),
            headers: { "Content-Type": "application/json" },
        });
    })

    fetch (urlServer + "invs/getcelda", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    }) .then (response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                const element = data[i];
                const info = `<section class="infoRegister">
                <nav>
                    <img src="res/name-icon.png" alt="Nombre">
                    <p>${element.nombre}</p>
                </nav>
                <nav>
                    <img src="res/work-icon.png" alt="Profesion">
                    <p>${element.profesion}</p>
                </nav>
                <nav>
                    <img src="res/years-icon.png" alt="Edad">
                    <p>${element.edad} años</p>
                </nav>
                <nav>
                    <img src="res/gender-icon.png" alt="Genero">
                    <p>${element.genero === 'M' ? 'Masculino' : 'Femenino'} </p>
                </nav>
                </section>`
                content.innerHTML += info;
            }
        })


})