import React, { useState } from "react"
import { useMediaQuery, Stack, IconButton } from "@mui/material"
import ProfileSidebar from "../components/sidebars/ProfileSidebar"
import DetailsChange from "../components/profile/DetailsChange"
import PasswordChange from "../components/profile/PasswordChange"
import { Routes, Route } from "react-router-dom"
import MenuIcon from "@mui/icons-material/Menu"

const Profile = () => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.only("xs"))
  const [open, setOpen] = useState(false)

  return (
    <Stack flexGrow={1}>
      <Stack flexDirection="row" justifyContent="end" p="10px 20px">
        {isSmall && (
          <IconButton onClick={() => setOpen(true)}>
            <MenuIcon />
          </IconButton>
        )}
      </Stack>

      <Stack flexGrow={1} flexDirection="row" sx={{ p: { sm: "60px", md: "120px" }, overflow: "auto" }}>
        <ProfileSidebar open={open} setOpen={setOpen} />

        <Routes>
          <Route path="/" element={<DetailsChange />} />

          <Route path="/password" element={<PasswordChange />} />
        </Routes>
      </Stack>
    </Stack>
  )
}

export default Profile
