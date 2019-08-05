let mobilnet;
let video;
let label = '';

function modelReady() {
    console.log('model is ready');
    mobilnet.predict(gotResults);
}

function gotResults(err, results) {
    if(err) {
        console.error(err);
    } else {
        console.log(results);
        label = results[0].className;
        mobilnet.predict(gotResults);
    }
}

function setup() {
    createCanvas(640,550);
    video = createCapture(VIDEO);
    video.hide();
    background(0);
    mobilnet = ml5.imageClassifier('MobileNet', video, modelReady);
}

function draw() {
    background(0);
    image(video,0,0);
    fill(255);
    textSize(32);
    text(label, 10, height - 20);
}