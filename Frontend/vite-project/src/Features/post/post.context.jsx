import {React,useState} from 'react'
import { createContext } from 'react'

export let PostContext=createContext();

export const PostContextProvider = ({children}) => {
    const [loading, setloading] = useState(false)
    const [feed, setfeed] = useState([])
    const [post, setpost] = useState(null)
    const [followers, setfollowers] = useState([])
    const [following, setfollowing] = useState([])
  return (
    <PostContext.Provider value={{loading,setloading,feed,setfeed,post,setpost,followers,setfollowers,following,setfollowing}}>
        {children}
    </PostContext.Provider>
  )
}

