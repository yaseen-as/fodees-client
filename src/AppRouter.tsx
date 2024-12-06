// import React from 'react'

import { Routes ,Route,Navigate} from "react-router-dom";
import Layout from "./layouts/Layout";
import HomePage from "./Pages/HomePage";
import AuthCallbackPage from "./Pages/AuthCallbackPage";
import UserProfilePage from "./Pages/UserProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";
import ManageRestourantPage from "./Pages/ManageRestourantPage";

export default function AppRouter() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout showHero><HomePage/></Layout>}/>
        <Route path='/auth-callback' element={<AuthCallbackPage/>}/>
        <Route element={<ProtectedRoute/>}>
          <Route path="/user-profile" element={<Layout><UserProfilePage/></Layout>}/>
          <Route path="/manage-restourant" element={<Layout><ManageRestourantPage/></Layout>}/>
        </Route>
        <Route path="*" element={<Navigate to="/" replace/>}/>
      </Routes>
    </div>
  )
}
