// Function to generate a random number within a range
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Function to create an emote element
function createEmote() {
    const emote = document.createElement('img');
    emote.src = 'pink-nodders.gif';
    emote.classList.add('emote');
    const d = Math.random() * 100;

    emote.style.width = `${d}px`;
    emote.style.height = `${d}px`;

    document.body.appendChild(emote);
    return emote;
}

// Function to update the emote position
function updatePosition(emote) {
    emote.style.left = `${random(0, window.innerWidth - 150)}px`; // 150 is the emote width
    emote.style.top = `${random(0, window.innerHeight - 150)}px`; // 150 is the emote height
}

// Create multiple emotes and make them bounce around
if (Number(localStorage.getItem('alen')) > 10000) localStorage.setItem('alen', '20');
const aLength = (localStorage.getItem('alen')) ? Number(localStorage.getItem('alen')) : 20;
let emotes = Array.from({ length: aLength }, createEmote);

// Update each emote's initial position
emotes.forEach(updatePosition);

// Function to animate emotes
function animateEmotes() {
    emotes.forEach(emote => {
        const xMove = random(-100, 100);
        const yMove = random(-100, 100);
        emote.style.transform = `translate(${xMove}px, ${yMove}px)`;
        // Update the position after the transition
        setTimeout(() => updatePosition(emote), 1000);
    });
}

function changeNodders() {
    const aLengthNew = document.querySelector('#cherryBlossomPopup').querySelector('input[type="number"]').value;
    localStorage.setItem('alen', aLengthNew);
    document.querySelectorAll('.emote:not(.NOCLONE)').forEach(el => el.remove());

    emotes = Array.from({ length: aLengthNew }, createEmote);
    emotes.push(document.querySelector('.NOCLONE'));
    emotes.forEach(updatePosition);
}


function dupNodders() {
    document.querySelectorAll('.emote:not(.NOCLONE)').forEach(el => el.click());
}

function changeBK() {
    let r = 255; // Red value at full to emphasize pink
    const g = Math.floor(Math.random() * 156 + 100); // Green value between 100 and 255
    const b = Math.floor(Math.random() * 156 + 100); // Blue value between 100 and 255
    let alpha = 0.5; // Set transparency to make it softer

    // random chance of hard color
    const isRand = Math.floor(100 * Math.random());
    if (isRand === 1 || isRand >= 99) {
        r = Math.floor(Math.random() * 156 + 100);
        alpha = 1;
    }

    const backgroundColor = `rgba(${r}, ${g}, ${b}, ${alpha})`;
    document.body.style.backgroundColor = backgroundColor;
}

let animIntId;
let animIntTime = 2000;


// Animate emotes every second
document.addEventListener('DOMContentLoaded', () => {
    emotes.push(document.querySelector('.NOCLONE'));
    animIntId = setInterval(animateEmotes, animIntTime);

    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a', 'Enter'];
    let userInput = [];

    let intId = setInterval(() => {userInput = []}, 3000);

    document.addEventListener('keydown', (event) => {
        userInput.push(event.key);

        clearInterval(intId);
        intId = setInterval(() => {userInput = []}, 3000);

        // Remove the first element if it exceeds the length
        if (userInput.length > konamiCode.length) userInput.shift();

        // Check if the userInput array matches the konamiCode
        if (userInput.join('') === konamiCode.join('')) {
            let gradient = document.getElementById('neonRainbowGradient');
            if (!gradient) {
                gradient = document.createElement('div');
                gradient.id = 'neonRainbowGradient';
                gradient.className = 'neon-rainbow';
                document.body.appendChild(gradient);
            }
            else gradient.remove();
        }
        else if (event.ctrlKey && event.key === 's') {
            event.preventDefault();
            console.log("%cINSANITY", "color:red;font-weight:bold;font-size:100px;");
            emotes.forEach(e => e.classList.add('rotneon'));

            const container = document.querySelector("#fullscreenTextContainer");
            container.style.opacity = 1;
            container.style.zIndex = 1000;
            setTimeout(() => {
                container.style.zIndex = 0;
                container.style.opacity = 0;
            }, 3000);
        }
        else if (event.ctrlKey && event.key === 'a') {
            event.preventDefault();
            clearInterval(animIntId);

            animIntTime = (animIntTime <= 500) ? 2000 : animIntTime - 500;
            console.debug(animIntTime);

            animIntId = setInterval(animateEmotes, animIntTime);
        }
        else if (event.ctrlKey && event.key === 'l') {
            event.preventDefault();
            window.open("https://ion606.com", "_blank");
        }
    });
});

// Listen for click events on emotes for possible future interactivity
document.addEventListener('click', e => {
    if (e.target.classList.contains('NOCLONE')) {
        const popupEl = document.getElementById('cherryBlossomPopup');
        popupEl.style.display = "block";
        popupEl.querySelector('input[type="number"]').value = emotes.length;
    }
    else if (e.target.classList.contains('emote')) {
        const pink_clone = e.target.cloneNode(true);
        document.body.appendChild(pink_clone);

        // Move the original element to the left relative to its current position
        e.target.style.transform = `translateX(-${e.target.offsetWidth}px)`;

        // Move the cloned element to the right relative to the original position
        pink_clone.style.transform = `translateX(${e.target.offsetWidth}px)`;

        emotes.push(pink_clone);

    }
});