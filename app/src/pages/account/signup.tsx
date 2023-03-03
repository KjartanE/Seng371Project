import { Formik } from "formik"
import * as Yup from "yup"
import { Box, Button, Grid, Paper, TextField } from "@mui/material"
import { useAuth } from "../../context/UserContext"

export const signupSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  email: Yup.string().email().required("Required"),
  password1: Yup.string().required("Required").min(3, "Too Short!"),
  password2: Yup.string().required("Required").min(3, "Too Short!"),
})

export interface ISignupForm {
  username: string
  email: string
  password1: string
  password2: string
}

const SignupForm = () => {
  const userContext = useAuth()

  const sendSignup = async (signupDetails: ISignupForm) => {
    if (signupDetails.password1 != signupDetails.password2) {
      alert("passwords do no match")
      return
    }
    userContext.register(signupDetails)
  }

  return (
    <Box>
      <Formik
        validationSchema={signupSchema}
        initialValues={{
          username: "",
          email: "",
          password1: "",
          password2: "",
        }}
        onSubmit={(values: ISignupForm) => {
          sendSignup(values)
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }: any) => (
          <Box>
            <Paper>
              <Box m={4} pt={4}>
                <h1>SIGNUP</h1>
              </Box>
              <Box m={2} px={4} pb={4}>
                <Grid container direction={"column"} spacing={2}>
                  <Grid item>
                    <TextField
                      type="username"
                      name="username"
                      label="Username:"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.username}
                      placeholder="Enter username"
                      className="form-control inp_text"
                      id="username"
                      error={!!errors.username}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      type="email"
                      name="email"
                      label="Email:"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      placeholder="Enter email"
                      className="form-control inp_text"
                      id="email"
                      helperText={errors.email && touched.email && errors.email}
                      error={!!errors.email}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      type="password"
                      name="password1"
                      label="Password:"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password1}
                      placeholder="Enter password"
                      className="form-control"
                      error={!!errors.password1}
                      helperText={
                        errors.password1 &&
                        touched.password1 &&
                        errors.password1
                      }
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      type="password"
                      name="password2"
                      label="Password:"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password2}
                      placeholder="Repeat password"
                      className="form-control"
                      helperText={
                        errors.password2 &&
                        touched.password2 &&
                        errors.password2
                      }
                      error={!!errors.password2}
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      sx={{ width: "50%" }}
                      type="submit"
                      variant="contained"
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Box>
        )}
      </Formik>
    </Box>
  )
}

export default SignupForm