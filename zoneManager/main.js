class Zona {
    numero = 0;
    lapzo = 0;
    progreso = 0;

    constructor(numero, lapzo) {
        this.numero = parseFloat(numero) || numero;
        this.lapzo = parseFloat(lapzo) || lapzo;
    }
}

class Dia {
    nombre = "";
    promedio = 0;
    /**
     * @type {Zona[]}
     */
    zonasManana = [];

    /**
     * @type {Zona[]}
     */
    zonasTarde = [];

    tarde = false;
    orden = 0;
    ordenTarde = 0;
    abarcar = 100;
    zonas = 0;

    constructor(nombre, promedio) {
        this.nombre = nombre;
        this.promedio = parseFloat(promedio) || promedio;
    }
}

/**
 * @type {[[Zona[]]]}
 */
const resultados = []

// mes / dia / salida
// resultado[0][0][0]

/**
 * @type {Zona[]}
 */
const zonas = JSON.parse(localStorage.getItem("zonas") || "[]")

/**
 * @type {Dia[]}
 */
const semana = (()=> {
    const json = localStorage.getItem("semana");
    if (json) {
        /**
         * @type {Dia[]}
         */
        const obj = JSON.parse(json);
        const result = []
        console.log(obj)
        for (let i = 0; i < obj.length; i++) {
            const objeto = obj[i]
            const dia = new Dia(objeto.nombre, objeto.promedio);

            for (let j = 0; j < objeto.zonasManana.length; j++) {
                const element = objeto.zonasManana[j];
                dia.zonasManana.push(zonas[element]);
            }
            for (let j = 0; j < objeto.zonasTarde.length; j++) {
                const element = objeto.zonasTarde[j];
                dia.zonasTarde.push(zonas[element]);
            }
            result.push(dia)
        }
        return result
    }
    return [];
})();


const Dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

const Meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];


window.onload = () => {

    // variables de DOM
    const solicitud = document.getElementById("solicitud");
    const tarea = document.getElementById("tarea");
    const reset = document.getElementById("reset");


    // Solicitud zone
    const solicitudNombreDia = document.getElementById('solicitud_nombre_dia');
    const solicitudAjustes = document.getElementById('solicitud_ajustes');
    /**
    * @type {HTMLInputElement}
    */
    const numPromedio = document.getElementById('numPromedio');
    /**
    * @type {HTMLInputElement}
    */
    const numZonas = document.getElementById('numZonas');
    const solicitudDia = document.getElementById('solicitud_dia');
    /**
    * @type {HTMLInputElement}
    */
    const numZona = document.getElementById('numZona');
    /**
    * @type {HTMLInputElement}
    */
    const numLapzo = document.getElementById('numLapzo');
    const aceptarSolicitudDia = document.getElementById('aceptar_solicitud_dia');

    const aceptarSolicitudAjustes = document.getElementById('aceptar_solicitud_ajustes');
    const solicitudNumZona = document.getElementById("solicitud_num_zona");
    /**
    * @type {HTMLInputElement}
    */
    const checkManana = document.getElementById('check_manana');
    /**
    * @type {HTMLInputElement}
    */
    const checkTarde = document.getElementById('check_tarde');



    // Tarea zone
    const tareaMesInicia = document.getElementById('tarea_mes_inicia');
    /**
    * @type {HTMLInputElement}
    */
    const tareaMes = document.getElementById('tarea_mes');
    const resultado = document.getElementById('resultado');
    const tareaAceptar = document.getElementById("tarea_aceptar")

    reset.onclick = () => {
        localStorage.removeItem("semana");
    }

    if (semana.length == 0) {
        solicitud.classList.remove("hidden");
        tarea.classList.add("hidden");
        /**
         * @type {Dia}
         */
        let dia;
        let diaEnProceso = 0;
        let cantidadSolicitudes = 0;

        actualizarDia();

        aceptarSolicitudAjustes.onclick = () => {
            cantidadSolicitudes = parseFloat(numZonas.value);
            dia = new Dia(Dias[diaEnProceso], parseFloat(numPromedio.value));
            solicitudNumZona.innerText = dia.zonas + 1;
            solicitudAjustes.classList.add("hidden");
            solicitudDia.classList.remove("hidden");
            numZonas.value = "";
            numPromedio.value = "";
            if (dia.promedio == 0) {
                diaEnProceso++;
                semana.push(dia);
                if (diaEnProceso < 7) {
                    actualizarDia();
                    solicitudAjustes.classList.remove("hidden");
                    solicitudDia.classList.add("hidden");
                } else {
                    guardar();
                    ejecutarTarea();
                }
            }
        }

        aceptarSolicitudDia.onclick = () => {

            if (dia.zonas < cantidadSolicitudes) {
                if (numZona.value.includes("...")) {
                    const num1 = parseFloat(numZona.value.substring(0, numZona.value.indexOf("...")));
                    const num2 = parseFloat(numZona.value.substring(numZona.value.indexOf("...")+3));
                    let lapso = numLapzo.value
                    let manana = checkManana.checked;
                    let tarde = checkTarde.checked;
                    const result = num2 - num1;
                    for (let i = 0; i < result+1; i++) {
                        const num = num1+i;
                        cargarZona(num);
                        numLapzo.value = lapso;
                        checkManana.checked = manana;
                        checkTarde.checked = tarde
                    }
                    numLapzo.value = "";
                    checkManana.checked = false;
                    checkTarde.checked = false;
                } else {
                    cargarZona(parseFloat(numZona.value));
                }


                function cargarZona(num) {
                    let zonaYaRegistrada = false;
                    const zona = zonas.find(e => {
                        if (e.numero == num) {
                            zonaYaRegistrada = true;
                            return e;
                        }
                    })
                        // si no se encuentra en el array se crea uno nuevo
                        || new Zona(num, numLapzo.value);
    
                    if (!zonaYaRegistrada)
                        zonas.push(zona);
                    console.log(zona)
                    if (checkManana.checked) {
                        dia.zonasManana.push(zona);
                    }
                    if (checkTarde.checked) {
                        dia.zonasTarde.push(zona);
                    }
                    dia.zonas++;
                    solicitudNumZona.innerText = dia.zonas + 1;
                    numZona.value = "";
                    numLapzo.value = "";
                    checkManana.checked = false;
                    checkTarde.checked = false;
                }
            }
            if (dia.zonas >= cantidadSolicitudes) {
                diaEnProceso++;
                if (diaEnProceso <= 7) {
                    actualizarDia();
                    semana.push(dia);
                    solicitudAjustes.classList.remove("hidden");
                    solicitudDia.classList.add("hidden");
                    if (diaEnProceso == 7) {
                        guardar();
                        ejecutarTarea();
                    }
                } else {
                    guardar();
                    ejecutarTarea();
                }
            }
        }


        function actualizarDia() {
            solicitudNombreDia.innerText = Dias[diaEnProceso];
        }

    } else {
        ejecutarTarea();
    }


    function ejecutarTarea() {
        solicitud.classList.add("hidden");
        tarea.classList.remove("hidden");

        tareaAceptar.onclick = () => {
            let mes = parseFloat(tareaMes.value);
            let mesBackup = mes;
            const mesArray = [];
            const diaArray = [];
            const fecha = new Date();
            const anterior = new Date();
            fecha.setDate(1);
            while (mes <= 12) {
                fecha.setMonth(mes - 1);

                while (fecha.getMonth() == mes - 1) {
                    const dia = semana[fecha.getDay()];
                    let zonasObj = dia.zonasManana;
                    let orden = dia.orden;
                    if (dia.tarde) {
                        orden = dia.ordenTarde;
                        zonasObj = dia.zonasTarde
                    }
                    anterior.setTime(fecha.getTime());
                    anterior.setDate(fecha.getDate()-7);
                    if (dia.promedio == 0) {
                        mesArray.push([]);
                        fecha.setDate(fecha.getDate() + 1);
                    } else {
                        /* if (dia.nombre == "Domingo" && anterior.getMonth() < fecha.getMonth()) {
                            zonasObj = semana[4].zonasTarde;
                            orden = semana[4].orden
                        } */
                        const zona = zonasObj[orden];

                        if (!zona) {
                            console.log(zonasObj, orden, dia.orden, dia.ordenTarde)
                        }
                        if (zona.progreso < 100) {
                            let promedio = ((dia.promedio / zona.lapzo) * 100) / 20;
                            let promedioRevert = 100 - promedio;
                            zona.progreso += promedio;
                            dia.abarcar -= promedioRevert;
                            if (!diaArray.includes(zona))
                                diaArray.push(zona);
                            if (zona.progreso >= 100) {
                                sumarOrden(dia)
                            }
                        } else {
                            sumarOrden(dia)
                        }
                        
                        if (dia.abarcar <= 0) {
                            if (dia.zonasTarde.length == 0 || dia.tarde) {
                                fecha.setDate(fecha.getDate() + 1);
                                mesArray.push(Object.assign([], diaArray));
                                diaArray.splice(0);
                                dia.tarde = false;
                            } else {
                                dia.tarde = true;
                            }
                            dia.abarcar = 100;
                        }

                    }

                }
                resultados.push(Object.assign([], mesArray));
                mesArray.splice(0);
                mes++;
            }

            for (let mesIndex = 0; mesIndex < resultados.length; mesIndex++) {
                const mesResult = resultados[mesIndex];
                const nodoNombre = document.createElement("h2");
                const tabla = document.createElement("div");
                nodoNombre.innerHTML = Meses[mesIndex + (mesBackup - 1)];
                tabla.classList.add("tabla");
                fecha.setMonth(mesIndex + (mesBackup - 1));
                fecha.setDate(1);

                resultado.append(nodoNombre, tabla)

                for (let i = 0; i < Dias.length; i++) {
                    const dia = Dias[i];
                    const diaNodo = document.createElement("div");
                    diaNodo.innerHTML = dia;
                    tabla.appendChild(diaNodo)
                }

                for (let i = 0; i < fecha.getDay() - 1; i++) {
                    const element = document.createElement("nav");
                    tabla.appendChild(element);
                }

                for (let diaIndex = 0; diaIndex < mesResult.length; diaIndex++) {
                    const zonas = mesResult[diaIndex];
                    const zonasNodo = document.createElement("div");
                    tabla.appendChild(zonasNodo)
                    for (let i = 0; i < zonas.length; i++) {
                        const zona = zonas[i];
                        const zonaNodo = document.createElement("b");
                        zonaNodo.innerHTML = zona.numero;
                        zonasNodo.appendChild(zonaNodo);
                    }
                }
            }
        }
    }

    /**
     * 
     * @param {Dia} dia 
     */
    function resetearDia(dia) {
        const zonasObj = dia.tarde ? dia.zonasTarde : dia.zonasManana;
        for (let i = 0; i < zonasObj.length; i++) {
            const zona = zonasObj[i];
            zona.progreso = 0;
        }
    }

    /**
     * 
     * @param {Dia} dia 
     */
    function sumarOrden(dia) {
        if (dia.tarde) {
            dia.ordenTarde += 1;
            if (dia.ordenTarde >= dia.zonasTarde.length - 1) {
                dia.ordenTarde = 0;
                resetearDia(dia);
            }
        } else {
            dia.orden += 1;
            if (dia.orden >= dia.zonasManana.length - 1) {
                dia.orden = 0;
                resetearDia(dia);
            }
        }
    }

    function guardar() {
        /**
         * @type {Dia[]}
         */
        const copiaSemana = Object.assign([], semana);
        for (let i = 0; i < copiaSemana.length; i++) {
            const element = copiaSemana[i];
            for (let i = 0; i < element.zonasManana.length; i++) {
                const zona = element.zonasManana[i];
                element.zonasManana[i] = zonas.indexOf(zona);
            }
            for (let i = 0; i < element.zonasTarde.length; i++) {
                const zona = element.zonasTarde[i];
                element.zonasTarde[i] = zonas.indexOf(zona);
            }
        }
        const jsonZonas = JSON.stringify(zonas);
        const jsonSemana = JSON.stringify(copiaSemana);
        localStorage.setItem("zonas", jsonZonas);
        localStorage.setItem("semana", jsonSemana);
    }
}