// =======================
// Buttons & Containers
// =======================
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const questionContainer = document.getElementById('questionContainer');
const flowerContainer = document.getElementById('flowerContainer');

// =======================
// Image arrays - COMPLETE NOW!
// =======================
const yesImages = [
    'https://media.tenor.com/llHp4YtegvwAAAAj/bubu-dudu-sseeyall.gif',
    'https://i.pinimg.com/originals/88/14/9b/88149b0400750578f4d07d9bc3fb0fee.gif',
    'https://i.pinimg.com/originals/6a/27/1a/6a271a8c188d2262442489efde172d16.gif',
    'https://images.steamusercontent.com/ugc/2055373930157017253/8363DAB489ECF4B57F27F7272969DEC8E0C4C920/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false',
];

const catImages = [
    'https://media1.tenor.com/m/t7_iTN0iYekAAAAd/sad-sad-cat.gif',
    'https://i.pinimg.com/originals/45/63/65/4563654f24b1b1bb5588a67042c3ac59.gif',
    'https://media4.giphy.com/media/v1.Y2lkPTZjMDliOTUyY3N5aTJiZTloOWVzZWphcncxd2J0dWR4NnVmcngzbGlxbGt5eTB3YSZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/Wf9dyOrB0nGJn5FIYf/200w.gif',
    'https://media.tenor.com/ociZpU8b_Q8AAAAj/cat-meme.gif',
    'https://media.tenor.com/ONoBLoD8XIUAAAAM/cry-cat.gif',
    'https://gifdb.com/images/high/cute-little-cat-crying-meme-lkh7r9x2jamlcohv.gif',
];

// Track used images to prevent doubles
let usedImages = [];

// =======================
// Function to get unique random image
// =======================
function getUniqueImage() {
    // Reset if all images used
    if (usedImages.length >= yesImages.length) {
        usedImages = [];
    }

    // Get available images
    const availableImages = yesImages.filter(img => !usedImages.includes(img) && img.trim() !== '');

    // Pick random from available
    const randomIndex = Math.floor(Math.random() * availableImages.length);
    const selectedImage = availableImages[randomIndex];

    // Mark as used
    if (selectedImage) {
        usedImages.push(selectedImage);
    }

    return selectedImage;
}

// =======================
// Function to create flying GIF - FIXED VERSION
// =======================
function createFlyingGIF(delay = 0) {
    setTimeout(() => {
        const img = document.createElement('img');
        img.src = getUniqueImage(); // Use unique image function

        if (!img.src) return; // Skip if no image

        img.style.position = 'fixed'; // Changed to fixed
        img.style.width = `${100 + Math.random() * 50}px`;
        img.style.borderRadius = '15px';
        img.style.zIndex = '999';
        img.style.pointerEvents = 'none';

        // Better positioning - ensure visible on screen
        const maxX = window.innerWidth - 200;
        const maxY = window.innerHeight - 200;
        img.style.left = Math.max(50, Math.random() * maxX) + 'px';
        img.style.top = Math.max(50, Math.random() * maxY) + 'px';

        // Fade in animation
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';

        document.body.appendChild(img);

        // Trigger fade in
        requestAnimationFrame(() => {
            img.style.opacity = '1';
        });

        // Random flying movement with smoother speed
        let dx = (Math.random() - 0.5) * 4; // Slower speed
        let dy = (Math.random() - 0.5) * 4;

        let animationId;

        function move() {
            let x = parseFloat(img.style.left);
            let y = parseFloat(img.style.top);

            x += dx;
            y += dy;

            const imgWidth = parseFloat(img.style.width);

            // Bounce off edges
            if (x <= 0 || x >= window.innerWidth - imgWidth) {
                dx *= -1;
                x = Math.max(0, Math.min(window.innerWidth - imgWidth, x));
            }
            if (y <= 0 || y >= window.innerHeight - imgWidth) {
                dy *= -1;
                y = Math.max(0, Math.min(window.innerHeight - imgWidth, y));
            }

            img.style.left = x + 'px';
            img.style.top = y + 'px';

            animationId = requestAnimationFrame(move);
        }

        move();

        // Remove after 15 seconds with fade out
        setTimeout(() => {
            img.style.transition = 'opacity 1s ease';
            img.style.opacity = '0';
            setTimeout(() => {
                cancelAnimationFrame(animationId);
                img.remove();
            }, 1000);
        }, 15000);
    }, delay);
}

// =======================
// Yes Button Click - FIXED VERSION
// =======================
yesBtn.addEventListener('click', () => {
    questionContainer.classList.add('hidden');
    flowerContainer.classList.add('active');

    // Reset used images
    usedImages = [];

    // Create GIFs with staggered delays to prevent overlap
    const numberOfGIFs = 8; // More GIFs now!
    for (let i = 0; i < numberOfGIFs; i++) {
        createFlyingGIF(i * 200); // 200ms delay between each
    }
});

// =======================
// No Button Click
// =======================
noBtn.addEventListener('click', () => {
    const buttonsContainer = noBtn.parentElement;
    const containerRect = buttonsContainer.getBoundingClientRect();
    const maxX = containerRect.width - 120;
    const maxY = containerRect.height - 60;
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    noBtn.style.position = 'absolute';
    noBtn.style.left = x + 'px';
    noBtn.style.top = y + 'px';

    // Show cat images when clicking No
    if (catImages.length > 0) {
        const img = document.createElement('img');
        img.src = catImages[Math.floor(Math.random() * catImages.length)];
        img.style.position = 'fixed';
        img.style.width = '120px';
        img.style.borderRadius = '15px';
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        img.style.boxShadow = '0 0 15px rgba(255,255,255,0.3)';
        img.style.zIndex = '998';

        const bodyRect = document.body.getBoundingClientRect();
        const questionRect = questionContainer.getBoundingClientRect();
        let randX, randY;

        do {
            randX = Math.random() * (bodyRect.width - 150);
            randY = Math.random() * (bodyRect.height - 150);
        } while (
            randX > questionRect.left - 150 &&
            randX < questionRect.right + 150 &&
            randY > questionRect.top - 150 &&
            randY < questionRect.bottom + 150
        );

        img.style.left = `${randX}px`;
        img.style.top = `${randY}px`;
        document.body.appendChild(img);

        requestAnimationFrame(() => img.style.opacity = '1');
        setTimeout(() => {
            img.style.opacity = '0';
            setTimeout(() => img.remove(), 500);
        }, 5000);
    }
});
// Show cat images when clicking No
if (catImages.length > 0) {
    const img = document.createElement('img');
    img.src = catImages[Math.floor(Math.random() * catImages.length)];
    img.style.position = 'fixed';
    img.style.width = '120px';
    img.style.borderRadius = '15px';
    img.style.opacity = '1'; // appear instantly
    img.style.transition = 'none'; // no fade
    img.style.boxShadow = '0 0 15px rgba(255,255,255,0.3)';
    img.style.zIndex = '998';

    const bodyRect = document.body.getBoundingClientRect();
    const questionRect = questionContainer.getBoundingClientRect();
    let randX, randY;

    do {
        randX = Math.random() * (bodyRect.width - 150);
        randY = Math.random() * (bodyRect.height - 150);
    } while (
        randX > questionRect.left - 150 &&
        randX < questionRect.right + 150 &&
        randY > questionRect.top - 150 &&
        randY < questionRect.bottom + 150
    );

    img.style.left = `${randX}px`;
    img.style.top = `${randY}px`;
    document.body.appendChild(img);

    setTimeout(() => {
        img.remove();
    }, 5000);
}


const yesAudio = new Audio('Dionela - Musika (Lyric Video) [5Uuq9dTBXII].mp3');

yesBtn.addEventListener('click', () => {
    questionContainer.classList.add('hidden');
    flowerContainer.classList.add('active');

    // Patugtugin ang kanta
    yesAudio.play();

    // Lumipad ang GIFs
    usedImages = [];
    const numberOfGIFs = 8;
    for (let i = 0; i < numberOfGIFs; i++) {
        createFlyingGIF(i * 200);
    }
});



const lyrics = [
    { time: 0, text: "Dionela - Musika" },
    { time: 3, text: "Ikaw lang mahal" },
    { time: 7, text: "Laman ng tula" },
    { time: 10, text: "Tunig ng gitara" },
    { time: 12, text: "Himig ng kanta" },

    { time: 15.5, text: "Kumupas man ang tinig" },
    { time: 17, text: "Ay di mawawala" },
    { time: 21, text: "Hiwaga mong dala" },
    { time: 26, text: "Ikaw aking musika" },
    { time: 52, text: "Kung dumating ang araw" },
    { time: 54.6, text: "na 'di na maalala Ng" },
    { time: 56.7, text: "iyong mata ang aking mukha" },
   
    // add more lines here with their respective times
];

const lyricsContainer = document.getElementById('lyricsContainer');

yesAudio.addEventListener('timeupdate', () => {
    const currentTime = yesAudio.currentTime;

    // find the latest lyric line to show
    const line = lyrics
        .slice() // copy array
        .reverse() // start from last
        .find(l => currentTime >= l.time);

    if (line) {
        lyricsContainer.textContent = line.text;
    }
});


