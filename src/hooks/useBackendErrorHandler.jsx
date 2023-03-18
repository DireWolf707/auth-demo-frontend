import { useSnackbar } from "notistack"
import { useCallback } from "react"
import { toastOptions as toastDefaultOptions } from "../utils/toastOptions"

const toastOptions = toastDefaultOptions()

const defaultHandler = (errors, toast) => {
  errors.forEach((error) => toast(error.message, toastOptions))
}

const handleError400 = ({ errors }, setFormErrors) => {
  const _formErrors = {}
  errors.forEach(({ data }) => (_formErrors[data[0].field] = data[0].message))
  setFormErrors(_formErrors)
}

const handleError401 = ({ errors }, toast) => defaultHandler(errors, toast)

const handleError500 = ({ errors }, toast) => defaultHandler(errors, toast)

export const useBackendErrorHandler = (setFormErrors) => {
  const { enqueueSnackbar: toast } = useSnackbar()

  const errorHandler = useCallback(
    (err) => {
      console.log(err)
      switch (err.status) {
        case 400:
          handleError400(err.data, setFormErrors)
          break

        case 401:
          handleError401(err.data, toast)
          break

        case 500:
          handleError500(err.data, toast)
          break

        case "FETCH_ERROR":
          toast("server is unreachable at the moment!", toastOptions)
          break

        default:
          console.log(err)
          break
      }
    },
    [setFormErrors]
  )

  return { errorHandler }
}
