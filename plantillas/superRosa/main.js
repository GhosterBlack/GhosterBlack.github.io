
  

document.addEventListener("DOMContentLoaded", ()=> {
    const hoy = new Date();
    const fecha = new Date();
    fecha.setDate(hoy.getDate() + 7);
    let nombre = ""
    
    


    // * Variables de Dom
    const dias = document.getElementById("dias")
    const horas = document.getElementById("horas");
    const minutos = document.getElementById("minutos");
    const segundos = document.getElementById("segundos");
    const previus = document.getElementById("previus");
    const next = document.getElementById("next");
    const play = document.getElementById("play");
    const confirmar = document.getElementById("confirmar");
    const a = document.querySelector("a");
    /**
     * @type {HTMLAudioElement}
     */
    const audio = document.getElementById("audio");
    let pause = true;

    play.onclick = ()=> {
        if (pause) {
            audio.play();
        } else {
            audio.pause();
        }
    }
    
    audio.onpause = ()=> {
        play.classList.add("play");
        play.classList.remove("pause");
        pause = true;
    }

    audio.onplay = ()=> {
        play.classList.remove("play");
        play.classList.add("pause")
        pause = false;
    }

    previus.onclick = ()=> {
        if (audio.currentTime > 10) {
            audio.currentTime -= 10
        } else {
            audio.currentTime = 0;
        }
    }

    next.onclick = ()=> {
        if (audio.currentTime + 10 < audio.duration) {
            audio.currentTime += 10;
        } else {
            audio.currentTime = audio.duration;
        }
    }

    confirmar.onclick = ()=> {

        let mensaje = "Hola, Natalia. "+nombre+"";
        if (nombre.includes("y")) {
            mensaje += ", confirman asistencia. Gracias por la invitacion 💗"
        } else {
            mensaje += ", confirmo asistencia. Gracias por la invitacion 💗"
        }
        let enlace = "https://wa.me/573209927694/?text="+mensaje;
        a.href = enlace;
        a.click();

    }

    // * tick que se ejecuta cada segundo
    let s = setInterval(() => {
        const microFecha = fecha.getTime();
        const microHoy = hoy.getTime();
        const microsegundos = microFecha - microHoy;
        let segundosFaltan = microsegundos / 1000;
        let minutosFaltan = segundosFaltan / 60;
        let horasFaltan = minutosFaltan / 60;
        let diasFaltan = horasFaltan / 24;
        
        segundosFaltan = Math.floor(segundosFaltan % 60);
        minutosFaltan = Math.floor(minutosFaltan % 60);
        horasFaltan = Math.floor(horasFaltan % 24);
        diasFaltan = Math.floor(diasFaltan);

        dias.innerHTML = diasFaltan;
        horas.innerHTML = horasFaltan;
        minutos.innerHTML = minutosFaltan;
        segundos.innerHTML = segundosFaltan;
        hoy.setTime(microHoy+1000);
    }, 1000);

})

document.addEventListener("DOMContentLoaded", function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    });

    document.querySelectorAll('.animate').forEach(element => {
        observer.observe(element);
    });
});
