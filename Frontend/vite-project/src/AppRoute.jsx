import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from "./Features/auth/pages/Login"
import Register from "./Features/auth/pages/Register"
import CreatePost from "./Features/post/pages/CeatePost";

import Feed from './Features/post/pages/Feed'
const AppRoute = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/' element={<Feed />} />
      <Route path='/createpost' element={<CreatePost/>} />

    </Routes> 
    </BrowserRouter>
  )
}

export default AppRoute;