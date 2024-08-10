import StreamVideoProvider from '@/providers/StreamClientProvider'
import React, { ReactNode } from 'react'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "MeetWave",
  description: "Video confrencing made easy, 3 clicks away from your friends!",
  icons: {
    icon: '/icons/logo.svg'
  }
};

const layout = ({children} : {children: ReactNode}) => {
  return (
    <div>
        <StreamVideoProvider>
            {children}
        </StreamVideoProvider>
    </div>
  )
}

export default layout