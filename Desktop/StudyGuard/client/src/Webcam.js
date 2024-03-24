// import React from 'react';
import React, { useState, useRef, useEffect } from 'react';
// import * as tf from '@tensorflow/tfjs';
import * as tmPose from '@teachablemachine/pose';

const Webcam = () => {
    const URL = "https://teachablemachine.withgoogle.com/models/MMDGiD6CS/";
    let model, webcam, ctx, labelContainer, maxPredictions;

        // functions to play and pause audio file
        // var helloAud = document.getElementById("helloAudio");
        // var goodbyeAud = document.getElementById("goodbyeAudio");

        // function playHelloAud() { 
        //     helloAud.play(); 
        // }
        // function pauseHelloAud() { 
        //     helloAud.pause(); 
        // }
        // function playGoodbyeAud() { 
        //     goodbyeAud.play(); 
        // }
        // function pauseGoodbyeAud() { 
        //     goodbyeAud.pause(); 
        // }
        const helloAudioRef = useRef(null);
        const goodbyeAudioRef = useRef(null);

        const [playHelloAudio, setPlayHelloAudio] = useState(false);
        const [playGoodbyeAudio, setPlayGoodbyeAudio] = useState(false);

        useEffect(() => {
            if (playHelloAudio) {
                helloAudioRef.current.play();
            } else {
                helloAudioRef.current.pause();
            }
        }, [playHelloAudio]);
    
        useEffect(() => {
            if (playGoodbyeAudio) {
                goodbyeAudioRef.current.play();
            } else {
                goodbyeAudioRef.current.pause();
            }
        }, [playGoodbyeAudio]);

    async function init() {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        // load the model and metadata
        // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
        // Note: the pose library adds a tmPose object to your window (window.tmPose)
        model = await tmPose.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        // Convenience function to setup a webcam
        const size = 350;
        const flip = true; // whether to flip the webcam
        webcam = new tmPose.Webcam(size, size, flip); // width, height, flip
        await webcam.setup(); // request access to the webcam
        await webcam.play();
        window.requestAnimationFrame(loop);

        // append/get elements to the DOM
        const canvas = document.getElementById("canvas");
        canvas.width = size; canvas.height = size;
        ctx = canvas.getContext("2d");
        labelContainer = document.getElementById("label-container");
        for (let i = 0; i < maxPredictions; i++) { // and class labels
            labelContainer.appendChild(document.createElement("div"));
        }
    }

    async function loop(timestamp) {
        webcam.update(); // update the webcam frame
        await predict();
        window.requestAnimationFrame(loop);
    }

    async function predict() {
        // Prediction #1: run input through posenet
        // estimatePose can take in an image, video or canvas html element
        const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
        // Prediction 2: run input through teachable machine classification model
        const prediction = await model.predict(posenetOutput);

        for (let i = 0; i < maxPredictions; i++) {
            const classPrediction =
                prediction[i].className + ": " + prediction[i].probability.toFixed(2);
            labelContainer.childNodes[i].innerHTML = classPrediction;
			
			// // don't play audio when head's neutral with probability >= 75%
			// if (prediction[0].probability.toFixed(2) >= 0.75) {
            //     console.log("studying")
			// 	// pauseHelloAud();
            //     // pauseGoodbyeAud();
            // } else if (prediction[1].probability.toFixed(2) >= 0.75) {
            //     console.log("phone")
            //     // pauseGoodbyeAud();
            //     // playHelloAud();
            // } else {
            //     console.log("gone")
            //     // pauseHelloAud();
            //     // playGoodbyeAud();
            // }
            if (prediction[0].probability.toFixed(2) >= 0.75) {
                console.log("studying");
                setPlayHelloAudio(false);
                setPlayGoodbyeAudio(false);
            } else if (prediction[1].probability.toFixed(2) >= 0.75) {
                console.log("phone");
                setPlayHelloAudio(true);
                setPlayGoodbyeAudio(false);
            } else {
                console.log("gone");
                setPlayHelloAudio(false);
                setPlayGoodbyeAudio(true);
            }
        }

        // finally draw the poses
        drawPose(pose);
    }

    function drawPose(pose) {
        if (webcam.canvas) {
            ctx.drawImage(webcam.canvas, 0, 0);
            // draw the keypoints and skeleton
            if (pose) {
                const minPartConfidence = 0.5;
                tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
                tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
            }
        }
    }

    return (
        <div>
        <button type="button" onClick={() => {
            init();
        }}>Start</button>
        <div><canvas id="canvas"></canvas></div>
        <div id="label-container"></div>
        <br/><br/><br/><br/>
        <audio ref={helloAudioRef}>
          <source src="./helloAudio.mp3" type="audio/mpeg" />
          Your browser does not support HTML5 audio.
        </audio>
        <audio ref={goodbyeAudioRef}>
            <source src="./goodbyeAudio.mp3" type="audio/mpeg" />
            Your browser does not support HTML5 audio.
        </audio>
        <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.17.0/dist/tf.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@teachablemachine/pose@0.8.6/dist/teachablemachine-pose.min.js"></script>
        </div>
    )
}

export default Webcam
