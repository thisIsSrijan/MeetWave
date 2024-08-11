"use client"

import { useUser } from '@clerk/nextjs'
import HomeCard from './HomeCard'
import MeetingModal from './MeetingModal'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useToast } from './ui/use-toast'
import { Textarea } from './ui/textarea'
import ReactDatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
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
    const { toast} = useToast()
    const createMeeting = async () => {
        try{
            if(!values.dateTime){
                toast({title: "Please select a date and time",})
                return;
            }
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
            toast({title: "Meeting created"})
        }catch(err){
            console.log(err);
            toast({title: "Failed to create a meeting",})
        }
    }

    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`
    
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
        {!callDetails? (
            <MeetingModal 
            isOpen={meetingState === 'isScheduleMeeting'}
            onClose={() => setMeetingState(undefined)}
            title="Create meeting"
            handleClick={createMeeting}
            >
            <div className="flex flex-col gap-2.5">
                <label className='text-base text-normal leading-[22px] text-sky-2'>
                    Add a description
                </label>
                 <Textarea 
                 onChange={(e)=>{
                    setValues({...values, description: e.target.value})
                 }}/>
            </div>
            <div className="flex w-full flex-col gap-2.5">
            <label className='text-base text-normal leading-[22px] text-sky-2'>
                    Select Date and Time
                </label>
                <ReactDatePicker
                    selected={values.dateTime}
                    onChange={(date) => setValues({...values,
                        dateTime: date!
                    })}
                    showTimeSelect
                    timeFormat='HH:mm'
                    timeCaption='time'
                    timeIntervals={15}
                    dateFormat="MMMM d, yyyy h:mm a"
                    className='w-full rounded bg-dark-3 p-2 focus:outline-none'
                />
            </div>
            </MeetingModal>       
        ):
        (
            <MeetingModal 
            isOpen={meetingState === 'isScheduleMeeting'}
            onClose={() => setMeetingState(undefined)}
            title="Meeting Created"
            className="text-center"
            handleClick={()=>{
                navigator.clipboard.writeText(meetingLink)
                toast({title: "Link copied to clipboard"})
            }}
            image='/icons/checked.svg'
            buttonIcon='/icons/copy.svg'
            buttonText="Copy Meeting Link"
            />
        )}
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