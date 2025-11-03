function verifyUser() {
    const token = localStorage.getItem("token");
    const userSection = document.getElementById("loginSection");
    const loginHtml = userSection.innerHTML;
    const menuUsuario = document.getElementById("menuUsuario");
    const closeMenu = document.getElementById("closeMenu");
    const userName = document.getElementById("username");


    closeMenu.addEventListener("click", () => {
        menuUsuario.classList.remove("active")
    })
    if (token) {
        fetch(urlServer + "user/verify", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + token
            }
        })
        .then(async (response) => {
            if (response.ok) {
                userSection.innerHTML = "";
                const { user } = await response.json();
                userSection.innerHTML = "<div class='boton'>" +
                    user.email.substring(0, user.email.indexOf("@")) +
                    "</div>";
                userName.innerHTML = user.email.substring(0, user.email.indexOf("@"))
                userSection.firstChild.addEventListener("click", () => {
                    menuUsuario.classList.add("active")
                })
            }

        })
    }
}