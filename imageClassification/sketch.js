let mobilnet;
let puffin;

const modelReady = () => {
    console.log('model is ready');
    mobilnet.predict(puffin, gotResults);
}

const gotResults = (err, results) => {
    if(err) {
        console.error(err);
    } else {
        console.log(results);
        let label = results[0].className;
        let prob = results[0].probability;
        fill(0);
        textSize(64);
        text(label, 10, height-100);
        createP(label);
        createP(prob);
    }
}

const imageReady = () => {
    image(puffin, 0, 0, width, height);
}

setup = () => {
    createCanvas(640,480);
    puffin = createImg('images/puffin.jpg', imageReady);
    puffin.hide();
    background(0);
    mobilnet = ml5.imageClassifier('MobileNet', modelReady);
}