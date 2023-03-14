const handleBackendError400 = ({ errors }, setFormErrors) => {
  const _formErrors = {}
  errors.forEach(({ data }) => (_formErrors[data[0].field] = data[0].message))
  setFormErrors(_formErrors)
}

const handleBackendError401 = ({ errors }) => {
  errors.forEach((error) => console.log(error.message))
}

export default (setFormErrors) => {
  return (err) => {
    console.log(err)

    switch (err.status) {
      case 400:
        handleBackendError400(err.data, setFormErrors)
        break

      case 401:
        handleBackendError401(err.data)
        break

      case "FETCH_ERROR":
        console.log("server is unreachable!")
        break

      default:
        console.log(err)
        break
    }
  }
}
