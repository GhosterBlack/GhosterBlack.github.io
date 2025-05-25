document.addEventListener("DOMContentLoaded", () => {
    const submit = document.getElementById("submit");
    const password = document.getElementById("password");
    const email = document.getElementById("username");
    const confirmPassword = document.getElementById("confirmPassword");


    submit.addEventListener("click", async (e) => {
        e.preventDefault();
        const emailValue = email.value;
        const passwordValue = password.value;
        const confirmPasswordValue = confirmPassword.value;

        if (passwordValue !== confirmPasswordValue) {
            alert("Las contraseñas no coinciden");
            return;
        }

        try {
            const response = await fetch("/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: emailValue, password: passwordValue }),
            });

            if (response.ok) {
                alert("Usuario registrado exitosamente");
                window.location.href = "/login";
            } else {
                alert("Error al registrar usuario");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    });
})