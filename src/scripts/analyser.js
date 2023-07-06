//analyser
export let analyser = null;
const mediaStreamRef = { current: null };

const audioFileInput = document.getElementById('audio');
export const initializeAnalyser = async () => {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const audioElement = audioFileInput
        const source = audioContext.createMediaElementSource(audioElement);
        analyser = audioContext.createAnalyser();
        source.connect(analyser);
        analyser.connect(audioContext.destination);
        await audioElement.play();
        mediaStreamRef.current = audioElement;

    } catch (error) {
        console.log(error.message);
    }
};


window.addEventListener('beforeunload', () => {
    if (analyser) {
        analyser.context.close();
    }
    if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
    }
});
