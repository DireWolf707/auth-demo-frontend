import React, { useRef } from "react"
import { Stack, Typography, TextField, Button } from "@mui/material"
import { useResetPasswordMutation } from "../../store"
import { useParams, useNavigate } from "react-router-dom"

const ResetPassword = () => {
  const navigate = useNavigate()
  const [resetPassword, { isLoading }] = useResetPasswordMutation()
  const { resetToken } = useParams()

  const passwordRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    const password = passwordRef.current.value
    resetPassword({ password, resetToken })
      .unwrap()
      .then(() => navigate("/"))
      .catch((err) => console.error(err))
  }

  return (
    <Stack
      onSubmit={handleSubmit}
      component="form"
      flexDirection="column"
      gap={1.2}
      sx={{ borderRadius: "4px", m: "auto", p: "20px", bgcolor: "white" }}
    >
      <Typography variant="h6" fontWeight="bold" color="red" textAlign="center">
        Reset Password
      </Typography>
      <TextField inputProps={{ ref: passwordRef }} label="Password" variant="outlined" size="small" color="error" />
      <Button type="submit" variant="contained" color="error" disabled={isLoading}>
        Submit
      </Button>
    </Stack>
  )
}

export default ResetPassword
