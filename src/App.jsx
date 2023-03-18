import React from "react"
import { Routes, Route, Navigate, Outlet } from "react-router-dom"
import { Stack } from "@mui/material"
import { useProfileQuery } from "../store"
import Navbar from "./components/Navbar"
import AuthLoader from "./components/loaders/AuthLoader"
import { Profile, Signup, Login, Home, ForgetPassword, ResetPassword, Error404 } from "./pages"

const LoggedInRoute = ({ user, redirectPath }) => {
  if (!user) return <Navigate to={redirectPath} replace />
  return <Outlet />
}

const NonLoggedInRoute = ({ user, redirectPath }) => {
  if (user) return <Navigate to={redirectPath} replace />
  return <Outlet />
}

const App = () => {
  const { data, isFetching, isError } = useProfileQuery()
  if (isFetching || isError) return <AuthLoader />

  return (
    <Stack sx={{ height: "100vh", width: "100vw", bgcolor: "#000" }}>
      <Navbar user={data?.user} />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        {/* LoggedIn Routes */}
        <Route element={<LoggedInRoute user={data?.user} redirectPath="/login" />}>
          <Route path="/profile/*" element={<Profile />} />
        </Route>
        {/* Non-LoggedIn Routes */}
        <Route element={<NonLoggedInRoute user={data?.user} redirectPath="/profile" />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
        </Route>
        {/* Unknown Routes (404) */}
        <Route path="*" element={<Error404 />} />
        {/* End */}
      </Routes>
    </Stack>
  )
}

export default App
