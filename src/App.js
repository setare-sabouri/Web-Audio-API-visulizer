import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import WaveComponent from './components/Wave/wave';
import CubeComponent from './components/cubeOne';
function App() {
  const [analyser, setAnalyser] = useState(null);
  const mediaStreamRef = useRef(null);

  useEffect(() => {
    let audioContext = null;
    let animationFrameId = null;

    const initializeAnalyser = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaStreamRef.current = mediaStream;
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        const source = audioContext.createMediaStreamSource(mediaStream);
        source.connect(analyser);
        setAnalyser(analyser);
      } catch (error) {
        console.log(error.message);
      }
    };

    initializeAnalyser();

    return () => {
      if (audioContext) {
        audioContext.close();
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <>
      {analyser && <WaveComponent analyser={analyser} />}
      {analyser && <CubeComponent analyser={analyser} />}
    </>
  );
}

export default App;
