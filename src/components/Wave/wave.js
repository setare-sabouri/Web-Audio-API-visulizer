import React, { useEffect, useRef } from 'react';
import './wave.css';

const WaveComponent = ({ analyser }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const { width, height } = canvas;
        const canvasContext = canvas.getContext('2d');

        const pixelRatio = window.devicePixelRatio || 1;

        canvas.width = width * pixelRatio;
        canvas.height = height * pixelRatio;
        canvasContext.scale(pixelRatio, pixelRatio);

        const draw = () => {
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);

            analyser.getByteFrequencyData(dataArray);

            canvasContext.clearRect(0, 0, width, height);
            canvasContext.fillStyle = 'rgba(0, 0, 0, 0.5)';
            canvasContext.fillRect(0, 0, width, height);

            const xStep = (width * pixelRatio) / bufferLength;
            const amplitude = height / 2;

            canvasContext.strokeStyle = '#ecc6ec';
            canvasContext.lineWidth = 2;
            canvasContext.beginPath();

            for (let i = 0; i < bufferLength; i++) {
                const x = i * xStep;
                const y = amplitude + (dataArray[i] / 255) * amplitude * Math.sin((i * 2 * Math.PI) / bufferLength);
                canvasContext.lineTo(x, y);
            }

            canvasContext.stroke();
            canvasContext.closePath();

            requestAnimationFrame(draw);
        };

        draw();
    }, [analyser]);

    return (
        <div className="waveContainer">
            <canvas ref={canvasRef} className="canvas"></canvas>
        </div>
    );
};

export default WaveComponent;
