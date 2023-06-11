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
            const curveTightness = 0.2; // Adjust this value to control the circularity

            canvasContext.strokeStyle = '#ecc6ec';
            canvasContext.lineWidth = 2;
            canvasContext.beginPath();
            canvasContext.moveTo(0, amplitude);

            for (let i = 0; i < bufferLength; i++) {
                const x = i * xStep;
                const y = amplitude + (dataArray[i] / 255) * amplitude * Math.sin((i * 2 * Math.PI) / bufferLength);
                const prevX = (i - 1) * xStep;
                const prevY = amplitude + (dataArray[i - 1] / 255) * amplitude * Math.sin(((i - 1) * 2 * Math.PI) / bufferLength);
                const controlX = prevX + (x - prevX) * curveTightness;
                const controlY = prevY + (y - prevY) * curveTightness;
                canvasContext.bezierCurveTo(controlX, controlY, controlX, controlY, x, y);
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
