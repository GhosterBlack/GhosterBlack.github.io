document.addEventListener("DOMContentLoaded", ()=> {
    /**
     * @type {HTMLInputElement}
     */
    const emailComonent = document.getElementById("username");
    /**
     * @type {HTMLInputElement}
     */
    const passwordComponent = document.getElementById("password");
    const submit = document.getElementById("submit");

    submit.onclick = ()=> {
        let email = emailComonent.value;
        const password = passwordComponent.value;

        if (email.length < 2) {
            sendToast("Ingrese un correo valido");
            return;
        }

        if (password.length < 6) {
            sendToast("Ingrese una contraseña valida");
            return;
        }

        email += "@tdev.com";

        try {
            fetch(urlServer + "user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email, password})
            })
            .then((response)=> {
                if (response.ok) {
                    response.json().then((body)=> {
                        localStorage.setItem("token", body.token)
                        location.href = "../index.html"
                    })
                } else {
                    sendToast("Inicio de sesion no valido");
                    passwordComponent.value = "";
                }
            })
            .catch((error)=> {
                console.log(error);
            })
        } catch(error) {
            console.log(error);
        }

    }
})