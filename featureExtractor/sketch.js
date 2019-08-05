let mobilenet;
let classifier;
let video;
let label = 'test';
let happyButton;
let sadButton;
let trainButton;

function modelReady() {
    console.log('Model is ready');
}

function videoReady() {
    console.log('Video is ready');
}

function gotResults(err, result) {
    if(err) {
        console.error(err);
    } else {
        label = result;
        classifier.classify(gotResults);
    }
}

function setup() {
    createCanvas(320,270);
    video = createCapture(VIDEO);
    video.hide();
    background(0);
    mobilenet = ml5.featureExtractor('MobileNet', modelReady);
    classifier = mobilenet.classification(video, videoReady);

    happyButton = createButton('happy');
    happyButton.mousePressed(function() {
        classifier.addImage('happy');
    })

    sadButton = createButton('sad');
    sadButton.mousePressed(function() {
        classifier.addImage('sad');
    })

    trainButton = createButton('train');
    trainButton.mousePressed(function() {
        classifier.train(whileTraining);
    })
}

function whileTraining(loss) {
    if(loss === null) {
        console.log('training complete');
        classifier.classify(gotResults);
    } else {
        console.log(loss);
    }
}

function draw() {
    background(0);
    image(video, 0, 0, 320, 240);
    fill(255);
    textSize(16);
    text(label, 10, height - 10);
}

