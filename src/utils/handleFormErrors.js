const handleFormErrorsHelper = ({ errors }, setFormErrors) => {
  const _formErrors = {}
  errors.forEach(({ data }) => (_formErrors[data[0].field] = data[0].message))
  setFormErrors(_formErrors)
}

export default (setFormErrors) => {
  return ({ status, data }) => (status === 400 ? handleFormErrorsHelper(data, setFormErrors) : console.log(status))
}
