window.addEventListener("load", ()=> {
    const contactButton = document.getElementById("contactButton");
    const modal = document.getElementById("modal");
    const closeModal = document.getElementById("closeModal");
    const openOptions = document.getElementById("openOptions");
    const options = document.getElementById("options");


    openOptions.onclick = ()=> {
        options.classList.toggle("active");
    }

    contactButton.addEventListener("click", () => {
        modal.classList.add("active");
    });

    closeModal.addEventListener("click", () => {
        modal.classList.remove("active");
    });
})