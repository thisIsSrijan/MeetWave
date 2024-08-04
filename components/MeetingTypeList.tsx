"use client"

import HomeCard from './HomeCard'
import MeetingModal from './MeetingModal'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
const MeetingTypeList = () => {
    const router = useRouter()
    const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 
    'isInstantMeeting' | undefined>()
    const createMeeting = () => {

    }
    
  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
        <HomeCard 
            image="/icons/add-meeting.svg"
            title="New Meeting"
            desc="Start an instant meeting"
            handleClick={()=>{setMeetingState('isInstantMeeting')}}
            bgColor="bg-orange-1"
        />
        <HomeCard 
            image="/icons/schedule.svg"
            title="Schedule Meeting"
            desc="Schedule your meet"
            handleClick={()=>{setMeetingState('isScheduleMeeting')}}
            bgColor="bg-purple-1"
        />
        <HomeCard 
            image="/icons/add-meeting.svg"
            title="Join Meeting"
            desc="Join an existing meeting"
            handleClick={()=>{setMeetingState('isJoiningMeeting')}}
            bgColor="bg-yellow-1"
        />
        <HomeCard 
            image="/icons/recordings.svg"
            title="My Recordings"
            desc="View recorded meetings"
            handleClick={()=>router.push('/recordings')}
            bgColor="bg-blue-1"
        />

        <MeetingModal 
            isOpen={meetingState === 'isInstantMeeting'}
            onClose={() => setMeetingState(undefined)}
            title="Start instant meeting"
            className="text-center"
            buttonText="Start Meeting"
            handleClick={createMeeting}/>
    </section>
  )
}

export default MeetingTypeList