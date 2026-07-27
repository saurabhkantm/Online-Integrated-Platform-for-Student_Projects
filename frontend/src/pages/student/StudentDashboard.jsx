import React from 'react'
import { useAuth } from '../../hooks/useAuth'

const StudentDashboard = () => {
  const {user} = useAuth()
  return (
    <div className='min-h-screen bg-[#f7f5f0] p-8 md:p-14'>
      <span className='text-xs tracking-[0.2em] uppercase text-[#f0a868] font-semibold'>
        Student Dashboard
      </span>
      <h1 className="font-serif text-3xl text-[#1b2340] mt-2">
        Welcome{user?.name?`, ${user.name}`:""}
      </h1>
      <p className="text-sm text-[#6b7280] mt-2 max-w-md">
        Submit new projects, track review status, and browse work from other
        colleges — all from here.
      </p>
       <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
        <div className="p-6 rounded-xl bg-white border border-[#E2E4EA]">
          <p className="text-3xl font-serif text-[#1B2340]">0</p>
          <p className="text-sm text-[#6B7280] mt-1">Total submissions</p>
        </div>
        <div className="p-6 rounded-xl bg-white border border-[#E2E4EA]">
          <p className="text-3xl font-serif text-[#1B2340]">0</p>
          <p className="text-sm text-[#6B7280] mt-1">Approved</p>
        </div>
        <div className="p-6 rounded-xl bg-white border border-[#E2E4EA]">
          <p className="text-3xl font-serif text-[#1B2340]">0</p>
          <p className="text-sm text-[#6B7280] mt-1">Pending review</p>
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard