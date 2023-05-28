import React from 'react'
import Model from '../Models/modelOne'
import './sectionOne.css'
const SectionOne = () => {
    return (
        <section className='row vh-100 align-items-center'>
            <h1 className='description-one'>Eu duis duis id officia veniam amet occaecat.</h1>
            <div className='col-12 h-100 '>
                <Model />
            </div>
        </section>
    )
}
export default SectionOne
