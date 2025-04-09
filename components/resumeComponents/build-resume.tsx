import React from 'react'
import ResumeForm from './resume-form'
import ResumePreview from './resume-preview'

const BuildResume = () => {
  return (
    <div className='grid md:grid-cols-2 m-2'>
      <div className='m-2'>
        <ResumeForm />
      </div>
    <div className='hidden md:block'>
        <ResumePreview />
    </div>
    </div>
  )
}

export default BuildResume
