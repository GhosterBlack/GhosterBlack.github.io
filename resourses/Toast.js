class Toast {
    /**
     * 
     * @param {string} mensaje 
     * @param {string} tipo 
     * @param {number} tiempo 
     */
    constructor (mensaje, tipo, tiempo) {
        this.mensaje = mensaje;
        this.tipo = tipo;
        this.tiempo = tiempo;
        this.vista = false;
        this.tiempoRecorrido = 0;
        
        const component = document.createElement("div");
        component.classList.add("toast");

        component.innerHTML = mensaje;

        this.component = component;

        toasts.push(this);

    }


    startTime () {
        this.tiempoRecorrido = 0;
        this.mostrar();
        let s = setInterval(() => {
            this.tiempoRecorrido += 100;
            if (this.tiempoRecorrido >= this.tiempo) {
                this.ocultar();
                clearInterval(s);
            }
        }, 100);
    }

    mostrar() {
        if (!this.vista) {
            this.vista = true;
            document.body.append(this.component);
            let s = setTimeout(() => {
                this.component.classList.add("active");
                clearTimeout(s);
            }, 100);
        }
    }

    ocultar () {
        if (this.vista) {
            this.vista = false;
            this.component.classList.remove("active");
            let s = setTimeout(() => {
                this.component.remove();
                clearTimeout(s);
            }, 200);
        }
    }

    start () {
        if (this.tipo == "tempus") {
            this.startTime();
        }
        if (this.tipo == "perma") {
            this.mostrar();
            this.component.onclick = ()=> {
                this.ocultar();
                this.component.onclick = ()=> {};
            }
        }
    }

}


/**
 * @type {Toast[]}
 */
const toasts = [];

/**
 * @type {Toast}
 */
let lastToast;

let toastUseStrict = false;

function sendToast(mensaje, tipo="tempus", tiempo=2000) {

    if (lastToast && !toastUseStrict) {
        if (!lastToast.vista) {
            lastToast.mensaje = mensaje;
            lastToast.tipo = tipo;
            lastToast.tiempo = tiempo;

            lastToast.start();
            return lastToast;
        }
    }

    const toast = new Toast(mensaje, tipo, tiempo);

    toast.start();

    return toast;

}