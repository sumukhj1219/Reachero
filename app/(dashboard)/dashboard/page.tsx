import CreateResume from '@/components/resumeComponents/create-resume'
import GetResumes from '@/components/resumeComponents/get-resumes'
import React from 'react'

const DashboardPage = () => {
  return (
    <div className='max-w-7xl grid grid-cols-4'>
      <CreateResume  />
      <GetResumes />
    </div>
  )
}

export default DashboardPage
