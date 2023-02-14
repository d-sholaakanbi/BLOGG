const handleErrors = (err) => {
  let errors = { email: "", password: "", name: "" };
  if (err.code === 11000) {
    errors.email = "Email is already in use";
    return errors;
  }

  if (err.message === "Incorrect Email") {
      errors.email = "This email has not been registered"
      return errors
  }

  if (err.message === "Incorrect Paasword") {
      errors.email = "This email or password is not correct"
      errors.password = "This email or password is not correct"
      return errors
  }
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};


module.exports = handleErrors;