window.addEventListener("load", ()=> {
    const game = document.getElementById("game");
    const startGame = document.getElementById("btnGame");
    const scroll = document.getElementById("scroll");
    const items = document.getElementsByClassName("item");
    const enlaces = [];
    let itemSelected = document.querySelector(".active");
    let revisar = true;


    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const to = item.getAttribute("to");
        const enlace = document.getElementById(to);
        
        if (enlace) {
            const y = enlace.getBoundingClientRect().y - 200;
            enlaces.push({y, item})
    
            item.addEventListener("click", ()=> {
                revisar = false;
                itemSelected.classList.remove("active");
                item.classList.add("active");
                itemSelected = item;
                scroll.scrollTop = y;
                revisar = true;
            })
        }
    }

    scroll.onscroll = ()=> {
        if (revisar) {
            for (let i = 0; i < enlaces.length; i++) {
                const element = enlaces[i];
                let y = element.y;
                if (scroll.scrollTop >= y) {
                    itemSelected.classList.remove("active");
                    element.item.classList.add("active");
                    itemSelected = element.item;
                }
            }
        }
    }
    
})