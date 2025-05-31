document.addEventListener("DOMContentLoaded", () => {
    const submit = document.getElementById("submit");
    const password = document.getElementById("password");
    const email = document.getElementById("username");
    const confirmPassword = document.getElementById("confirmPassword");


    submit.addEventListener("click", async (e) => {
        e.preventDefault();
        /**
         * @type {string}
         */
        let emailValue = email.value;
        /**
         * @type {string}
         */
        const passwordValue = password.value;
        /**
         * @type {string}
         */
        const confirmPasswordValue = confirmPassword.value;

        if (passwordValue !== confirmPasswordValue) {
            sendToast("Las contraseñas no coinciden");
            return;
        }
        if (!emailValue || !passwordValue) {
            sendToast("Por favor, completa todos los campos");
            return;
        }
        if (emailValue.includes("@") || emailValue.length < 2) {
            sendToast("Por favor, no uses arrobas para tu nombre de usuario, este debe tener al menos dos caracteres", "perma", 0);
            return;
        }
        if (passwordValue.length < 6) {
            sendToast("La contraseña debe tener al menos 6 caracteres");
            return;
        }
        emailValue += "@tdev.com";

        try {
            const response = await fetch(urlServer+"user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: emailValue, password: passwordValue }),
            });

            if (response.ok) {
                sendToast("Usuario registrado exitosamente");
                window.location.href = "/login";
            } else {
                sendToast("Error al registrar usuario");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    });
})