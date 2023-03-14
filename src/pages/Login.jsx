import React, { useRef } from "react"
import { Stack, Typography, TextField, Button } from "@mui/material"
import { useLoginMutation } from "../../store"
import { Link, useNavigate } from "react-router-dom"

const Login = () => {
  const navigate = useNavigate()
  const [login, { isLoading }] = useLoginMutation()

  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    const email = emailRef.current.value
    const password = passwordRef.current.value
    login({ email, password })
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
        Login
      </Typography>
      <TextField inputProps={{ ref: emailRef }} label="Email" variant="outlined" size="small" color="error" />
      <TextField inputProps={{ ref: passwordRef }} label="Password" variant="outlined" size="small" color="error" />
      <Button type="submit" variant="contained" color="error" disabled={isLoading}>
        Submit
      </Button>
      <Link to="/forget-password" style={{ textAlign: "end" }}>
        <Typography variant="caption" color="blue">
          Forget Password?
        </Typography>
      </Link>
    </Stack>
  )
}

export default Login
