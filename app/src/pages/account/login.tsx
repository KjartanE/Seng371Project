import { Formik } from "formik"
import * as Yup from "yup"
import { Alert, Box, Button, Paper, Snackbar, TextField } from "@mui/material"
import styles from "../../styles/Home.module.css"
import { useRouter } from "next/router"
import { useAuth } from "../../context/UserContext"
import { useState } from "react"

export const loginSchema = Yup.object().shape({
  email: Yup.string().email().required("Required"),
  password: Yup.string().required("Required").min(3, "Too Short!"),
})

const LoginForm = () => {
  const router = useRouter()
  const userContext = useAuth()

  const [snackbar, setSnackbar] = useState<boolean>(false)

  const sendLogin = async (loginDetails: {
    email: string
    password: string
  }) => {
    try {
      const user = await userContext.login(
        loginDetails.email,
        loginDetails.password
      )

      if (user) {
        router.push("/main/message")
      }
    } catch (error) {
      setSnackbar(true)
    }
  }

  return (
    <>
      <Snackbar
        open={snackbar}
        autoHideDuration={6000}
        onClose={() => setSnackbar(false)}
      >
        <Alert
          onClose={() => setSnackbar(false)}
          severity="error"
          sx={{ width: "100%", alignContent: "center" }}
        >
          Incorrect Username or Password
        </Alert>
      </Snackbar>
      <Formik
        validationSchema={loginSchema}
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          sendLogin(values)
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
          <Box className={styles.login}>
            <Paper>
              <Box m={4} p={4}>
                <form noValidate onSubmit={handleSubmit}>
                  <Box m={2}>
                    <TextField
                      type="email"
                      name="email"
                      label="Email"
                      variant="outlined"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      helperText={errors.email && touched.email && errors.email}
                      placeholder="Enter email id / username"
                      className="form-control inp_text"
                      id="email"
                    />
                  </Box>
                  <Box m={2}>
                    <TextField
                      type="password"
                      name="password"
                      label="Password"
                      variant="outlined"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      helperText={
                        errors.password && touched.password && errors.password
                      }
                      placeholder="Enter password"
                    />
                  </Box>
                  <Box m={2}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      fullWidth
                    >
                      Login
                    </Button>
                  </Box>
                </form>
              </Box>
            </Paper>
          </Box>
        )}
      </Formik>
    </>
  )
}

export default LoginForm
