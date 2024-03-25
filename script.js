const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const div = document.querySelector('div');
let particlesArray;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const createParticles = () => {
    particlesArray = [];
    const numberOfParticles = 0;
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 0.5;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    }
}

const drawParticles = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(particle => {
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
    });
    updateParticles();
}

const updateParticles = () => {
    particlesArray.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) {
            particle.speedX *= 1;
        }
        if (particle.y < 0 || particle.y > canvas.height) {
            particle.speedY *= -1;
        }
    });
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createParticles();
});

window.addEventListener('load', () => {
    const name = prompt("Please enter your name:");
    if (name !== null && name !== ""){
        createParticles();
        animate();

        const nameElement = document.createElement('h1');
        nameElement.textContent = name;
        nameElement.classList.add('entered-name');
        div.insertAdjacentElement('afterend', nameElement);
    }
});

const animate = () => {
    requestAnimationFrame(animate);
    drawParticles();
}

const moveParticles = (x, y) => {
    for (let i = 0; i < 5; i++) {
        particlesArray.push(new Particle());
        particlesArray[particlesArray.length - 1].x = x;
        particlesArray[particlesArray.length - 1].y = y;
    }
};

canvas.addEventListener('mousemove', (event) => {
    moveParticles(event.clientX, event.clientY);
});

canvas.addEventListener('touchmove', (event) => {
    event.preventDefault();
    const touch = event.touches[0];
    moveParticles(touch.clientX, touch.clientY);
});

div.addEventListener('mousemove', (event) => {
    moveParticles(event.clientX, event.clientY);
});

div.addEventListener('touchmove', (event) => {
    event.preventDefault();
    const touch = event.touches[0];
    moveParticles(touch.clientX, touch.clientY);
});
