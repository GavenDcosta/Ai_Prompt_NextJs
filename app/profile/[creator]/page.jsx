'use client'

import React from 'react'
import {useState, useEffect} from 'react'



import Profile from '@components/Profile'


const Creator = ({params}) => {

    // const { creator } = useParams.creator()

    console.log(params.creator)
  

    const [posts, setPosts] = useState([])



    useEffect(() => {
        const fetchPosts = async () => {
           const response = await fetch(`/api/prompt`)
           const data = await response.json()

           console.log(data)

           const filteredData = data.filter((post) => {
             return post.creator.username === params.creator
           })
   
           setPosts(filteredData)
        }
   
        fetchPosts()
     }, [])



  return (
        <Profile 
          name= {params.creator + "'s"}
          desc= {`Welcome to the profile page of ${params.creator}`}
          data={posts}
        />
      )
}

export default Creator