import React, { useRef, useState } from "react"
import { Stack, Typography, TextField, Button } from "@mui/material"
import { useResetPasswordMutation } from "../../store"
import { useParams, useNavigate } from "react-router-dom"
import { useBackendErrorHandler } from "../hooks/useBackendErrorHandler"

const ResetPassword = () => {
  const navigate = useNavigate()
  const { resetToken } = useParams()
  const [resetPassword, { isLoading }] = useResetPasswordMutation()

  const passwordRef = useRef(null)
  const passwordConfirmRef = useRef(null)
  const [formErrors, setFormErrors] = useState({})
  const { errorHandler } = useBackendErrorHandler()

  const handleSubmit = (e) => {
    e.preventDefault()
    const password = passwordRef.current.value
    const passwordConfirm = passwordConfirmRef.current.value
    if (password !== passwordConfirm) return setFormErrors({ passwordConfirm: "Password don't match." })
    else setFormErrors({})

    resetPassword({ password, resetToken })
      .unwrap()
      .then(() => navigate("/"))
      .catch(errorHandler)
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

      {[
        { label: "Password", errField: "password", ref: passwordRef, type: "password", required: true },
        { label: "Confirm Password", errField: "passwordConfirm", ref: passwordConfirmRef, type: "password", required: true },
      ].map(({ label, errField, ref, type, required }, idx) => (
        <TextField
          key={idx}
          inputProps={{ ref }}
          label={label}
          variant="outlined"
          size="small"
          color="error"
          required={required}
          type={type}
          error={Boolean(formErrors[errField])}
          helperText={formErrors[errField]}
        />
      ))}

      <Button type="submit" variant="contained" color="error" disabled={isLoading}>
        Submit
      </Button>
    </Stack>
  )
}

export default ResetPassword
