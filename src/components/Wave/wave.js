import React, { useEffect, useRef } from 'react';
import './wave.css'
const WaveComponent = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        let mediaStream = null;
        let audioContext = null;
        let analyser = null;
        let animationFrameId = null;

        const startVisualization = async () => {
            try {
                //-------Analyser Setup----

                mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
                analyser = audioContext.createAnalyser();
                const source = audioContext.createMediaStreamSource(mediaStream);
                source.connect(analyser);

                //-------------------------

                const canvas = canvasRef.current;
                const canvasContext = canvas.getContext('2d');

                const draw = () => {
                    const { width, height } = canvas;
                    const bufferLength = analyser.frequencyBinCount;
                    const dataArray = new Uint8Array(bufferLength);

                    analyser.getByteFrequencyData(dataArray);

                    canvasContext.clearRect(0, 0, width, height);
                    canvasContext.fillStyle = '#602060';
                    canvasContext.fillRect(0, 0, width, height);

                    const barWidth = (width / bufferLength) * 10;
                    let x = 0;

                    //------------- to draw bars ------------------- 

                    for (let i = 0; i < bufferLength; i++) {
                        const barHeight = (dataArray[i] / 255) * height;

                        canvasContext.fillStyle = '#ecc6ec';
                        canvasContext.fillRect(x, height - barHeight / 2, barWidth, barHeight / 2);

                        x += barWidth + 1;
                    }
                    animationFrameId = requestAnimationFrame(draw);

                    //-----------------------------------------------
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

    return (
        <div className='waveContainer'>
            <canvas ref={canvasRef} className='canvas'></canvas>;
        </div>
    )
};

export default WaveComponent;
