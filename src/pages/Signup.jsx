import React, { useRef, useState } from "react"
import { Stack, Typography, TextField, Button } from "@mui/material"
import { useSignupMutation } from "../../store"
import { useNavigate } from "react-router-dom"
import handleFormErrors from "../utils/handleFormErrors"

const Signup = () => {
  const navigate = useNavigate()
  const [signup, { isLoading }] = useSignupMutation()

  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const [formErrors, setFormErrors] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    const email = emailRef.current.value
    const password = passwordRef.current.value
    const name = nameRef.current.value
    signup({ email, password, name })
      .unwrap()
      .then(() => navigate("/login"))
      .catch(handleFormErrors(setFormErrors))
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

      <TextField
        inputProps={{ ref: nameRef }}
        label="Name"
        variant="outlined"
        size="small"
        color="error"
        required
        type="text"
        error={Boolean(formErrors?.name)}
        helperText={formErrors?.name}
      />

      <TextField
        inputProps={{ ref: emailRef }}
        label="Email"
        variant="outlined"
        size="small"
        color="error"
        required
        type="email"
        error={Boolean(formErrors?.email)}
        helperText={formErrors?.email}
      />

      <TextField
        inputProps={{ ref: passwordRef }}
        label="Password"
        variant="outlined"
        size="small"
        color="error"
        required
        type="password"
        error={Boolean(formErrors?.password)}
        helperText={formErrors?.password}
      />

      <Button type="submit" variant="contained" color="error" disabled={isLoading}>
        Submit
      </Button>
    </Stack>
  )
}

export default Signup
