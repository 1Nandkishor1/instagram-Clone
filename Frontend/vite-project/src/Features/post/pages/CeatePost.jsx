import {React,useState,useRef} from 'react'
import "../style/createpost.scss"
import { usePost } from '../hooks/usePost'
import { useNavigate } from 'react-router'



const CeatePost = () => {
    const [caption, setcaption] = useState(null)
    let Navigate=useNavigate();
    let ImageRef=useRef(null);


    let{loading,handleCreatePost}=usePost();

    async function submitHandler(e){
        e.preventDefault();
           let image = ImageRef.current.files[0]; 
       await  handleCreatePost(image,caption);
        Navigate("/");
    }
    if(loading){
        return <main>Loading...</main>
    }



  return (
    <div className='create-post-page'>
        <div className='formcontainer'>
            <form onSubmit={submitHandler}>
    
                <label  htmlFor="file">Select Image</label>
                <input ref={ImageRef}   hidden type="file" name='image' id='file'  />
                <input onInput={(e)=>{setcaption(e.target.value)}} type="text" name='caption' placeholder='Add Caption' />
                <button className='.button'>Create Post</button>
            </form>
        </div>

    </div>
  )
}

export default CeatePost