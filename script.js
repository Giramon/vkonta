let outputWidth;
let outputHeight;

let faceTracker;
let videoInput;

let imgMask;
let imgFace;
let imgBor;
let imgVolos

let selected = -1;

function preload(){
    imgMask = loadImage("https://cdn.websites.hibu.com/276dc06e9a89410aae33183412705e35/DESKTOP/png/7972545.png");
    imgFace = loadImage("https://static.vecteezy.com/system/resources/previews/001/202/652/original/beard-png.png");
    imgBor = loadImage("https://cdn-icons-png.flaticon.com/512/9066/9066024.png");
    imgVolos = loadImage("https://cdn-icons-png.flaticon.com/512/42/42055.png");
}

function setup(){
    const maxWidth = Math.min(windowWidth, windowHeight);
    pixelDensity(1);
    outputHeight = maxWidth * 0.75;
    outputWidth = maxWidth;

    createCanvas(outputWidth, outputHeight)

    videoInput = createCapture(VIDEO);
    videoInput.size(outputWidth, outputHeight);
    videoInput.hide();

    const sel = createSelect();
    const selectList = ['Mack', 'Face','Bor','Volos'];
    sel.option('Select filter', -1);

    for(let i = 0; i <selectList.length; i++) {
        sel.option(selectList[i], i);
    }
    sel.changed(applyFilter);

    faceTracker = new clm.tracker();
    faceTracker.init();
    faceTracker.start(videoInput.elt)
}

function applyFilter(){
    selected = this.selected();
}

function draw() {
    image(videoInput, 0, 0, outputWidth, outputHeight);

    switch (selected) {
        case '-1': break;
        case '0': drawMask(); break;
        case '1': drawFace(); break;
        case '2': drawBor(); break;
        case '3':drawVolos();break;
    }
}

function drawMask() {
    const positions = faceTracker.getCurrentPosition();
    if (positions !== false) {
        push();
        const wx = Math.abs(positions[13][0] - positions[1][0]) * 1.2;
        const wy = Math.abs(positions[37][1] - Math.min(positions[16][1], positions[20][1])) * 1.2;
        translate(-wx/2, -wy/2);
        image(imgMask, positions[33][0], positions[33][1], wx, wy);
        pop();
    }
}

function drawFace() {
    const positions = faceTracker.getCurrentPosition();
    if (positions !== false) {
        push();
        const wx = Math.abs(positions[13][0] - positions[1][0]) * 1.2;
        const wy = Math.abs(positions[7][1] - Math.min(positions[16][1], positions[20][1])) * 1.2;
        translate(-wx/2, -wy/2);
        image(imgFace, positions[62][0], positions[62][1], wx, wy);
        pop();
    }
}

function drawVolos() {
    const positions = faceTracker.getCurrentPosition();
    if (positions !== false) {
        push();
        const wx = Math.abs(positions[13][0] - positions[1][0]) * 1.2;
        const wy = Math.abs(positions[7][1] - Math.min(positions[16][1], positions[20][1])) * 1.2;
        translate(-wx/2, -wy/2);
        image(imgVolos, positions[62][0], positions[62][1], wx, wy);
        pop();
    }
}

function drawBor() {
    const positions = faceTracker.getCurrentPosition();
    if (positions !== false) {
        push();
        const wx = Math.abs(positions[44][0] - positions[50][0]) * 1.2;
        const wy = Math.abs(positions[7][1] - Math.min(positions[44][1], positions[50][1])) * 1.5;
        translate(-wx/2, -wy/2);
        image(imgBor, positions[60][0], positions[60][1], wx, wy);
        pop();
    }
}

function windowResized(){
    const maxWidth = Math.min(windowWidth, windowHeight);
    pixelDensity(1);
    outputHeight = maxWidth * 0.75;
    outputWidth = maxWidth;
    resizeCanvas(outputWidth, outputHeight);
}
