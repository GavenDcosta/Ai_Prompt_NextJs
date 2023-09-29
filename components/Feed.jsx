'use client'

import { useState, useEffect } from 'react'

import PromptCard from './PromptCard'

const PromptCardList = ({ data, setTag }) => {
    return(
      <div className='mt-16 prompt_layout'>
         {data.map((post) => (
          <PromptCard 
            key={post._id}
            post={post}
            setTag = {setTag}
          />
         ))}
      </div>
    )
  }
  
  
  const Feed = () => {
    
    const [searchText, setSearchText] = useState('')
    const [posts, setPosts] = useState([])
    const [tag, setTag] = useState('all')
    
    
    useEffect(() => {
      const fetchPosts = async () => {
        const response = await fetch('/api/prompt')
        const data = await response.json()

        const filteredPosts = data.filter((post) => {
          return (
            post.tag === tag
          )
        })

       if(tag == 'all'){
        setPosts(data)
       }else{
        setPosts(filteredPosts)
       }

     }
  
     fetchPosts()
    }, [tag])


    const handleSearchChange = (e) => {
       setSearchText(e.target.value)
  }


  const handleClick = (e) => { 
    
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt')
      const data = await response.json()

    
      if(searchText.toLowerCase() === "all"){
        setPosts(data)
      }
      else{
        const filteredPosts = data.filter((post) => {

          const promptWords = post.prompt.trim().toLowerCase().split(" ");
          const searchTextWords = searchText.trim().toLowerCase().split(" ");

          const hasCommonWord = promptWords.some(word => searchTextWords.includes(word))

          return (
            post.tag === searchText || post.creator.username === searchText || hasCommonWord
          )
       })
 
  
        if(filteredPosts){
          setPosts(filteredPosts)
        }else if(!filteredPosts){
          setPosts(data)
        }
      }
 
    }

   fetchPosts()
  }
  
  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input 
           type='text'
           placeholder='Search for a tag, username or any words to search in prompts'
           value={searchText}
           onChange={handleSearchChange}
           required
           className='search_input peer'
        />
        <div 
          style={{background:'orange', height:'40px',width:'40px',display:'flex', alignItems:'cneter',justifyContent:'center', borderRadius:'30%'}}
          onClick={handleClick}
        >
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" style={{marginTop:'5px'}} height="2em" width="2em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.442 10.442a1 1 0 011.415 0l3.85 3.85a1 1 0 01-1.414 1.415l-3.85-3.85a1 1 0 010-1.415z" clip-rule="evenodd"></path><path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 100-11 5.5 5.5 0 000 11zM13 6.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" clip-rule="evenodd"></path></svg>
        </div>
      </form>

      <PromptCardList
        data={posts}
        setTag={setTag}
      />
    </section>
  )
}

export default Feed