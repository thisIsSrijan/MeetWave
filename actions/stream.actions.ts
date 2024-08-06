"use server"
//server-side token generator
import { currentUser } from "@clerk/nextjs/server"
import { StreamClient } from "@stream-io/node-sdk"

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY
const apiSecret = process.env.STREAM_SECRET_KEY

export const tokenProvider = async () => {
    const user = await currentUser()
    if(!user)
        throw new Error('User not logged in')
    if(!apiKey)
        throw new Error('No API key found')
    if(!apiSecret)
        throw new Error('No API secret found')

    const client = new StreamClient(apiKey, apiSecret)
    //token valid for 1 hour
    const expiryDate = Math.round(new Date().getTime() / 1000) + 60 * 60;
    //token issued date
    const issued = Math.floor(Date.now() / 1000) - 60

    const token = client.createToken(user.id, expiryDate, issued)

    return token
}