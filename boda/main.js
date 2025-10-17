document.addEventListener('DOMContentLoaded', () => {
    const containers = document.querySelectorAll('.container');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.3 // ajusta según cuándo quieres que se active
    });

    containers.forEach(container => {
        observer.observe(container);
    });

    const countdown = () => {
        const targetDate = new Date("2025-12-07T00:00:00"); // ajusta la fecha
        const now = new Date();
        const diff = targetDate - now;

        if (diff <= 0) {
            document.getElementById("countdown").innerHTML = "¡Ya llegó el gran día!";
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        document.getElementById("days").textContent = days;
        document.getElementById("hours").textContent = hours;
        document.getElementById("minutes").textContent = minutes;
        document.getElementById("seconds").textContent = seconds;
    };

    setInterval(countdown, 1000);
})
