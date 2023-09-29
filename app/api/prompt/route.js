import { connectToDb } from "@utils/database"
import Prompt from "@models/prompt"

export const GET = async (request) => {
    try{
       await connectToDb()

       const prompts = await Prompt.find({}).populate('creator')

       // Set Cache-Control header for revalidation
       const cacheControl = `public, max-age=60, stale-while-revalidate=86400`;
       const headers = {
           'Cache-Control': cacheControl,
           'Content-Type': 'application/json',
       };
       
       return new Response(JSON.stringify(prompts), {status:200, headers})

    } catch (error){
        return new Response("Failed to fetch all prompts", {status:500})
    }
}