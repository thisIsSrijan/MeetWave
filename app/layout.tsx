import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MeetWave",
  description: "Video confrencing made easy, 3 clicks away from your friends!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </head>
      <ClerkProvider 
        appearance={
          {
            layout: {
              logoImageUrl: '/icons/logo.svg',
              socialButtonsVariant: 'iconButton'
            },
            variables: {
              colorText: '#fff',
              colorPrimary: '#0E78F9',
              colorBackground: '#1c1f2e',
              colorInputBackground: '#252a41',
              colorInputText: '#fff'
            }
          }
        }>
        <body className={`${inter.className} bg-dark-2`}>{children}</body>
      </ClerkProvider>      
    </html>
  );
}
