import React, { useEffect } from 'react'
import Posts from "../components/Posts";
import Nav from "../../shared/components/Nav"
import "../style/feed.scss"
import { usePost } from '../hooks/usePost';

const Feed = () => {
    let { feed, handleGetFeed, loading ,handlefollowers,followers,following,handlefollowing} = usePost();

    useEffect(() => {
        handleGetFeed(),
        handlefollowers(),
        handlefollowing()
    }, [])

    if (loading || !feed) {
        return <main><h1>Feed Is Loading...</h1></main>
    }
    console.log(feed);

    return (
        <main className='feed-page'>
            {/* <Nav/> */}
            <div className='followers-followee'>
                <div className='followerss'>
                    <h1>Followers</h1>
                    {followers && followers.map((followers)=>{
                        
                        return <p>{followers.follower}</p>
                    })}
                    
                </div>
                <div className='followeee'>
                    <h1>Followee</h1>
                    {following && following.map((following)=>{
                        return <p>{following.following}</p>
                    })}
                    
                </div>
                
                
            </div>
            <div className='feed'>
                <div className='posts'>
                    {feed.map((post) => {
                        return <Posts post={post} />
                    })}

                </div>

            </div>

        </main>
    )
}

export default Feed