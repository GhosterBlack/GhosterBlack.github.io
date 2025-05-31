window.addEventListener("load", () => {
    const contactButton = document.getElementById("contactButton");
    const modal = document.getElementById("modal");
    const closeModal = document.getElementById("closeModal");
    const openOptions = document.getElementById("openOptions");
    const options = document.getElementById("options");
    const userSection = document.getElementById("loginSection");
    const loginHtml = userSection.innerHTML;
    const token = localStorage.getItem("token");
    const menuUsuario = document.getElementById("menuUsuario");
    const closeMenu = document.getElementById("closeMenu");

    if (token) {
        fetch(urlServer + "user/verify", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + token
            }
        }) 
        .then( async (response)=>{
            if (response.ok) {
                userSection.innerHTML = "";
                const user = await response.json();
                userSection.innerHTML = "<div class='boton'>" +
                    user.email.substring(0, user.email.indexOf("@")) +
                    "</div>";
                userSection.firstChild.addEventListener("click", () => {
                    menuUsuario.classList.add("active")
                })
            }

        }) 
    }

    closeMenu.addEventListener("click", () => {
        menuUsuario.classList.remove("active")
    })

    openOptions.onclick = () => {
        options.classList.toggle("active");
    }

    contactButton.addEventListener("click", () => {
        modal.classList.add("active");
    });

    closeModal.addEventListener("click", () => {
        modal.classList.remove("active");
    });
})