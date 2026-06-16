import { useContext,useEffect } from "react";
import { getfeed,createpost,likepost,unlikepost,followrequest,unfollowuser ,followerslist, followinglist} from "../services/post.api";
import { PostContext } from "../post.context";



export const usePost=()=>{
let context=useContext(PostContext);
let{loading,setloading,feed,setfeed,post,setpost,followers,setfollowers,following,setfollowing}=context;

    async function handleGetFeed() {
    setloading(true);
    let allfeed=await getfeed();
    // console.log(allfeed.post);
    setfeed(allfeed.posts)
    // console.log(feed);
    setloading(false)
}

// useEffect(() => {
//    handleGetFeed();
// }, [])

async function handleCreatePost(image,caption) {
    setloading(true);
    let data=await createpost(image,caption);
    console.log(feed);
    setfeed([data,...feed]);
    setloading(false);
    
}

async function handlelikepost(postid){
    await likepost(postid);

    setfeed((prev) =>
        prev.map((p) =>
            p._id === postid
                ? { ...p, isLiked: true }
                : p
        )
    );
    console.log(feed) 
}

async function handleunlikepost(postid){
    await unlikepost(postid);

    setfeed((prev) =>
        prev.map((p) =>
            p._id === postid
                ? { ...p, isLiked: false }
                : p
        )
  
    );
}

function updateFeed(postId, isFollowed) {
  setfeed((prev) =>
    prev.map((p) =>
      p._id === postId
        ? { ...p, isFollowed }
        : p
    )
  );
  console.log(feed);
}

async function handleFollow(post) {
  let followee = post.userid.username;
  let data=null;
  console.log(post.followData);

  // 👉 NOT FOLLOWING → SEND REQUEST
  if (!post.isFollowed) {
     data = await followrequest(followee);
     console.log(data.follow)
     setloading(true)
    updateFeed(post._id, data.follow || data);
    setloading(false)
  }

  // 👉 PENDING → CANCEL REQUEST
  else if (post.isFollowed.status === "pending") {
    await unfollowuser(followee);

    updateFeed(post._id, data.isFollowed || data);
  }

  // 👉 FOLLOWING → UNFOLLOW
  else if (post.isFollowed.status === "accepted") {
    data= await unfollowuser(followee);
    setloading(true)
    updateFeed(post._id, null);
    setloading(false)
  }

}

async function handlefollowers(){
  let data=await followerslist();
  setloading(true);
  setfollowers(data.followers)
  // console.log("Hello");
  // console.log(data.followers);

  setloading(false)


}

async function handlefollowing(){
  let data=await followinglist();
  setloading(true);
  setfollowing(data.following);
  console.log(data.following);
  setloading(false)
}






return ({loading,feed,post,handleGetFeed,handleCreatePost,handlelikepost,handleunlikepost,handleFollow,followers,handlefollowers,following,handlefollowing})

}