"use client"

import { useUser } from '@clerk/nextjs'
import HomeCard from './HomeCard'
import MeetingModal from './MeetingModal'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
const MeetingTypeList = () => {
    const router = useRouter()
    const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 
    'isInstantMeeting' | undefined>()
    const {user} = useUser()
    const client = useStreamVideoClient()
    const [values, setValues] = useState({
        dateTime: new Date(),
        description: "",
        link: ""
    })
    const [callDetails, setCallDetails] = useState<Call>()
    const createMeeting = async () => {
        try{
            const id = crypto.randomUUID()
            const call = client?.call('default', id);
            if(!call)
                throw new Error('Failed to create call')
            const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString()
            const description = values.description || "Instant Meeting"

            await call.getOrCreate({
                data: {
                    starts_at: startsAt,
                    custom: {
                        description: description
                    }
                }
            })

            setCallDetails(call)
            if(!values.description){
                router.push(`/meeting/${call.id}`)
            }
        }catch(err){

        }
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