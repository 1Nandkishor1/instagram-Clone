import React from 'react'
import  AppRoute  from "./AppRoute";
import "./style.scss"
import { AuthProvider } from './Features/auth/auth.context';
import { PostContextProvider } from './Features/post/post.context';

const App = () => {
  return (
    <AuthProvider>
      <PostContextProvider>
        <AppRoute />
     </PostContextProvider>
    </AuthProvider>
  )
}

export default App