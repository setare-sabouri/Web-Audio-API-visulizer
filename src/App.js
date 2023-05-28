import './App.css';
import React, { useState } from 'react';

import SectionOne from './components/sectionOne';
import AudioUploader from './components/buttonFile';
function App() {
  const [audioFile, setAudioFile] = useState(null);
  const handleFileChange = (file) => {
    setAudioFile(file);
  };
  return (
    <>
      <AudioUploader onFileChange={handleFileChange} />
      <SectionOne />
    </>
  );
}

export default App;
