import React, { useRef } from "react"
import { Stack, Typography, TextField, Button } from "@mui/material"
import { useResetPasswordMutation } from "../../store"
import { useParams, useNavigate } from "react-router-dom"
import handleBackendErrors from "../utils/handleBackendErrors"

const ResetPassword = () => {
  const navigate = useNavigate()
  const { resetToken } = useParams()
  const [resetPassword, { isLoading }] = useResetPasswordMutation()

  const passwordRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    const password = passwordRef.current.value
    resetPassword({ password, resetToken })
      .unwrap()
      .then(() => navigate("/"))
      .catch(handleBackendErrors())
  }

  return (
    <Stack
      onSubmit={handleSubmit}
      component="form"
      flexDirection="column"
      gap={1.2}
      sx={{ borderRadius: "4px", m: "auto", p: "24px", bgcolor: "white", width: "320px" }}
    >
      <Typography variant="h6" fontWeight="bold" color="red" textAlign="center">
        Reset Password
      </Typography>

      <TextField
        inputProps={{ ref: passwordRef }}
        label="Password"
        variant="outlined"
        size="small"
        color="error"
        required
        type="password"
      />

      <Button type="submit" variant="contained" color="error" disabled={isLoading}>
        Submit
      </Button>
    </Stack>
  )
}

export default ResetPassword
