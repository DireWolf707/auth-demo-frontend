import React from "react"
import { Stack, LinearProgress } from "@mui/material"

const AuthLoader = () => {
  return (
    <Stack justifyContent="center" alignItems="center" gap={1} sx={{ height: "100vh", width: "100vw", bgcolor: "#000" }}>
      <LinearProgress color="error" sx={{ height: "8px", width: { xs: "320px", sm: "360px" } }} />
      <LinearProgress color="error" sx={{ height: "8px", width: { xs: "320px", sm: "360px" } }} />
      <LinearProgress color="error" sx={{ height: "8px", width: { xs: "320px", sm: "360px" } }} />
    </Stack>
  )
}

export default AuthLoader
