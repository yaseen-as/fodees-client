// import React from 'react'

import { Routes ,Route,Navigate} from "react-router-dom";
import Layout from "./layouts/Layout";
import HomePage from "./Pages/HomePage";
import AuthCallbackPage from "./Pages/AuthCallbackPage";

export default function AppRouter() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout><HomePage/></Layout>}/>
        <Route path='/auth-callback' element={<AuthCallbackPage/>}/>
        <Route path="/user-profile" element={<h1>user profile</h1>}/>
        <Route path="*" element={<Navigate to={"/"}/>}/>
      </Routes>
    </div>
  )
}
