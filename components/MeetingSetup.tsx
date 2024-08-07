import React, { useEffect, useState } from 'react'
import { DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk'
import { Button } from './ui/button'

const MeetingSetup = ({setIsSetUpComplete}: {
    setIsSetUpComplete: (val:boolean) => void
}) => {
    const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false)
    const call = useCall()
    if(!call){
        throw new Error("useCall must be used within StreamCall component")
    }
    useEffect(() => {
        if(isMicCamToggledOn){
            call?.camera.disable()
            call?.microphone.disable()
        }else{
            call?.camera.enable()
            call?.camera.enable()
        }
    }, [isMicCamToggledOn, call?.camera, call?.microphone])
  return (
    <div  className='flex h-screen w-full flex-col items-center 
    justify-center gap-3 text-white'>
        <h1 className='text-2xl font-bold'>Meeting Setup</h1>
        <VideoPreview />
        <div>
        <label className='flex h-16 items-center justify-center gap-3'>
            <input 
                type="checkbox"
                checked={isMicCamToggledOn}
                onChange={(e) => setIsMicCamToggledOn(e.target.checked)} 
            />
            Join with mic and camera off
        </label>
        <DeviceSettings/>
        </div>
        <Button className='rounded-md bg-green-500 px-4 py-2.5'
            onClick={()=>{
                call.join()

                setIsSetUpComplete(true)
            }}> Join Meeting </Button>
    </div>
  )
}

export default MeetingSetup