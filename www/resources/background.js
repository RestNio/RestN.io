// ============================
//       Backgound Animation
// ============================
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
let pixelData = pixels.data;

// Create randomly seeded clouds
const clouds = new Clouds(Math.random());

// Resolution (higher is less)
const res = 4;

function resize() {
    ctx.canvas.width = window.innerWidth   / res;
    ctx.canvas.height = window.innerHeight / res;
    pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    pixelData = pixels.data;
    // console.log('Resising!');
}

// Current mouse position tracker.
let mouseX = 0.0;
let mouseY = 0.0;

// Target (slow move) tracker.
let targetX = 0.0;
let targetY = 0.0;

// Update current mouse position based from the window center.
function updateMouse(e) {
    mouseX = ((e.clientX * 2) / window.innerWidth) - 1;
    mouseY = ((e.clientY * 2) / window.innerHeight) - 1;
}

// Keppe: animation frame.
function keppe() {
    // Slowly move target to mouse position.
    targetX += (mouseX - targetX) / 20;
    targetY += (mouseY - targetY) / 20;

    // Calculate new cloudframe
    clouds.newFrame(targetX, targetY);

    // Put in all pixels.
    for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
            // Index for pixeldata.
            let index = (y * canvas.width + x) * 4;
            // Get pixeldata at x, y
            let nval = clouds.getCloudPixel(x, y);
            // Put into pixeldata as greyshade:
            pixelData[index + 0] = nval; // Red channel)
            pixelData[index + 1] = nval; // Green channel
            pixelData[index + 2] = nval; // Blue channel
            pixelData[index + 3] = 255; // Alpha channel
        }
    }
    ctx.putImageData(pixels, 0, 0);
    window.requestAnimationFrame(keppe);
}
keppe();

window.addEventListener('mousemove', updateMouse);
window.addEventListener('resize', resize);