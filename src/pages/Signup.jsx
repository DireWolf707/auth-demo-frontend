import React, { useRef } from "react"
import { Stack, Typography, TextField, Button } from "@mui/material"
import { useSignupMutation } from "../../store"
import { useNavigate } from "react-router-dom"

const Signup = () => {
  const navigate = useNavigate()
  const [signup, { isLoading }] = useSignupMutation()

  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    const email = emailRef.current.value
    const password = passwordRef.current.value
    const name = nameRef.current.value
    signup({ email, password, name })
      .unwrap()
      .then(() => navigate("/login"))
      .catch((err) => console.error(err))
  }

  return (
    <Stack
      onSubmit={handleSubmit}
      component="form"
      flexDirection="column"
      gap={1.2}
      sx={{ borderRadius: "4px", m: "auto", p: "24px", bgcolor: "white" }}
    >
      <Typography variant="h6" fontWeight="bold" color="red" textAlign="center">
        Signup
      </Typography>
      <TextField inputProps={{ ref: nameRef }} label="Name" variant="outlined" size="small" color="error" required type="text" />
      <TextField inputProps={{ ref: emailRef }} label="Email" variant="outlined" size="small" color="error" required type="email" />
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

export default Signup
