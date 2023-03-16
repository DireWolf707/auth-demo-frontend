import React, { useRef, useState } from "react"
import { Stack, Typography, TextField, Button } from "@mui/material"
import { useSignupMutation } from "../../store"
import { useNavigate } from "react-router-dom"
import { useBackendErrorHandler } from "../hooks/useBackendErrorHandler"

const Signup = () => {
  const navigate = useNavigate()
  const [signup, { isLoading }] = useSignupMutation()

  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const passwordConfirmRef = useRef(null)
  // required only if any any of back or frontend do validation
  const [formErrors, setFormErrors] = useState({})
  // setFormErrors passed only in case backend send valdation errors
  const { errorHandler } = useBackendErrorHandler(setFormErrors)

  const handleSubmit = (e) => {
    e.preventDefault()
    const email = emailRef.current.value
    const name = nameRef.current.value
    const password = passwordRef.current.value
    const passwordConfirm = passwordConfirmRef.current.value
    // setFormErrors used for frontend validation
    if (password !== passwordConfirm) return setFormErrors({ passwordConfirm: "Password don't match." })
    // else setFormErrors({}) in case of only frontend validations happening

    signup({ email, password, name })
      .unwrap()
      .then(() => navigate("/login"))
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
        Signup
      </Typography>

      {[
        { label: "Name", errField: "name", ref: nameRef, type: "text", required: true },
        { label: "Email", errField: "email", ref: emailRef, type: "email", required: true },
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

export default Signup
