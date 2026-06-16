import { useContext } from "react";
import { AuthContext } from "../auth.context";
import{login,register,getme} from '../services/auth.api'

export function useAuth(){
  const context=useContext(AuthContext);

  let {loading,setloading,user,setuser}=context;

  const handleLogin=async(username,password)=>{
          setloading(true);
          try{
              const response=await login(username,password)
              setuser(response.user)
          }
          catch(err){
              console.log(err)
          }
          finally{
              setloading(false);
          }
      }
  
      const handleRegister=async (username,email,password)=>{
          setloading(true)
          try{
              const response=await register(username,email,password)
              setuser(response.user)
          }
          catch(err){
              console.log(err)
          }
          finally{
              setloading(false)
          }
      }

      const handlegetme=async ()=>{
        setloading(true);
        try{
          const response=await getme()
          setuser(response.user)
        }
        catch(err){
          console.log(err)
        }
        finally{
          setloading(false)
        }
      }

  return ({user,setuser,loading,setloading, handleLogin,handleRegister,handlegetme})
}
