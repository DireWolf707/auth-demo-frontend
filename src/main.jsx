import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import { store } from "../store"
import { Provider as StoreProvider } from "react-redux"
import { BrowserRouter as Router } from "react-router-dom"
import { createTheme, ThemeProvider } from "@mui/material"
import { SnackbarProvider } from "notistack"

const theme = createTheme({})

ReactDOM.createRoot(document.getElementById("root")).render(
  <StoreProvider store={store}>
    <ThemeProvider theme={theme}>
      <SnackbarProvider autoHideDuration={3000} dense={false} maxSnack={3} hideIconVariant={false}>
        <Router>
          <App />
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  </StoreProvider>
)
