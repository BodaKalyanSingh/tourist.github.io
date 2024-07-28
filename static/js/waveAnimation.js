// waveAnimation.js
let wave = [];
let cols;

function setup() {
    createCanvas(windowWidth, windowHeight);
    for (let x = 0; x < width; x++) {
        wave[x] = height / 2;
    }
    cols = colorGradient();
}

function draw() {
    background(255);
    noFill();
    strokeWeight(2);
    beginShape();
    for (let x = 0; x < wave.length; x++) {
        wave[x] = lerp(wave[x], mouseY, 0.05);
        stroke(cols[x % cols.length]);
        vertex(x, wave[x]);
    }
    endShape();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function colorGradient() {
    let gradient = [];
    for (let i = 0; i < 255; i++) {
        gradient.push(color(0, i, 255 - i));
    }
    return gradient;
}
