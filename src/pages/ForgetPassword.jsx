import React, { useRef } from "react"
import { Stack, Typography, TextField, Button } from "@mui/material"
import { useForgetPasswordMutation } from "../../store"

const ForgetPassword = () => {
  const [forgetPassword, { isLoading, isSuccess }] = useForgetPasswordMutation()

  const emailRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    const email = emailRef.current.value
    forgetPassword({ email })
      .unwrap()
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
      {isSuccess ? (
        <>
          <Typography variant="h6" fontWeight="bold" color="red" textAlign="center">
            Email Sent Successfully
          </Typography>
          <Typography variant="body2" fontWeight="bold" color="black" textAlign="center">
            Check your e-mail for further instructions!
          </Typography>
        </>
      ) : (
        <>
          <Typography variant="h6" fontWeight="bold" color="red" textAlign="center">
            Forget Password
          </Typography>
          <TextField inputProps={{ ref: emailRef }} label="Email" variant="outlined" size="small" color="error" required type="email" />
          <Button type="submit" variant="contained" color="error" disabled={isLoading}>
            Submit
          </Button>
        </>
      )}
    </Stack>
  )
}

export default ForgetPassword
