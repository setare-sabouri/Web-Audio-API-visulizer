import React, { useEffect, useRef } from 'react';
import './sectionOne.css'
const CameraComponent = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        let mediaStream = null;
        let audioContext = null;
        let analyser = null;
        let animationFrameId = null;

        const startVisualization = async () => {
            try {
                mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
                analyser = audioContext.createAnalyser();

                const source = audioContext.createMediaStreamSource(mediaStream);
                source.connect(analyser);

                const canvas = canvasRef.current;
                const canvasContext = canvas.getContext('2d');

                const draw = () => {
                    const { width, height } = canvas;
                    const bufferLength = analyser.frequencyBinCount;
                    const dataArray = new Uint8Array(bufferLength);

                    analyser.getByteFrequencyData(dataArray);

                    canvasContext.clearRect(0, 0, width, height);
                    canvasContext.fillStyle = 'rgba(0, 0, 0, 0.5)';
                    canvasContext.fillRect(0, 0, width, height);

                    const barWidth = (width / bufferLength) * 2.5;
                    let x = 0;

                    for (let i = 0; i < bufferLength; i++) {
                        const barHeight = (dataArray[i] / 255) * height;

                        canvasContext.fillStyle = `rgb(${barHeight + 100},50,50)`;
                        canvasContext.fillRect(x, height - barHeight / 2, barWidth, barHeight / 2);

                        x += barWidth + 1;
                    }

                    animationFrameId = requestAnimationFrame(draw);
                };

                draw();
            } catch (error) {
                console.log(error.message);
            }
        };

        startVisualization();

        return () => {
            if (mediaStream) {
                mediaStream.getTracks().forEach((track) => track.stop());
            }
            if (audioContext) {
                audioContext.close();
            }
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, []);

    return <canvas ref={canvasRef} className='canvas'></canvas>;
};

export default CameraComponent;
