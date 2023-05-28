import React, { useState } from 'react';
import Modelone from '../Models/modelOne'
import './sectionOne.css'
import AudioUploader from './buttonFile'
const SectionOne = () => {
    const [audioFile, setAudioFile] = useState('./summer.mp3');
    const handleFileChange = (file) => {
        setAudioFile(file);
    };

    return (
        <>
            <AudioUploader onFileChange={handleFileChange} />
            <section className='row vh-100 align-items-center'>
                <h1 className='description-one'>Eu duis duis id officia veniam amet occaecat.</h1>
                <div className='col-12 h-100 '>
                    <Modelone audioFile={audioFile} />
                </div>
            </section>
        </>
    )
}
export default SectionOne
