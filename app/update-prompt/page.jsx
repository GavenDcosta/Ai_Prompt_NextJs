'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import Form from '@components/Form'

const EditPrompt = () => {

  const searchParams = useSearchParams()
  const router = useRouter()  

  const promptId = searchParams.get('id')

  const [submittng, setSubmittng] = useState(false)
  const [post, setPost] = useState({
    prompt: "",
    tag: ""
  })

  useEffect(() => {
     const getPromptDetails = async () => {
        const response = await fetch(`/api/prompt/${promptId}`)
        const data = await response.json()

        setPost({
            prompt: data.prompt,
            tag: data.tag
        })
     }

     if(promptId) getPromptDetails()
  }, [promptId])
  

  const updatePrompt = async (e) => {
    e.preventDefault()
    setSubmittng(true)

    if(!promptId) return alert('PROMPT ID NOT FOUNd!')

    try {
       const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
            prompt: post.prompt,
            tag: post.tag
        })
       })

       if(response.ok){
        router.push('/')
       }
    } catch (error) {
        console.log(error)
    } finally {
        setSubmittng(false)
    }
  }


  return (
    <Form 
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submittng}
      handleSubmit={updatePrompt}
    />
  )
}

export default EditPrompt