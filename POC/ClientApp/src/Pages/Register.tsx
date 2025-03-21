import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    CircularProgress,
    MenuItem,
  } from "@mui/material";
  import React, { useState } from "react";
  import { Formik, Form } from "formik";
  import { RegisterUserApi } from "../Api/agent.ts";
  import { useNavigate } from "react-router-dom";
import { RegisterFormValues, RegisterInitialValues, RegisterSchema } from "../Models/User.ts";
  
  const roles = [
    { value: 1, label: "Admin" },
    { value: 2, label: "Service Provider" },
    { value: 3, label: "Customer" },
  ];
  
  
  function Register() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
  
    const handleOnSubmit = async (values: RegisterFormValues) => {
      setIsLoading(true);
      setErrorMessage("");
  
      try {
        const response = await RegisterUserApi(values);
        if (response.status === 201) {
          navigate("/login");
        } else {
          setErrorMessage(response.data.message || "Registration failed.");
        }
      } catch (error) {
        setErrorMessage("Error: Unable to register");
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <Container maxWidth="sm">
        <Box sx={{ textAlign: "center", mt: 5 }}>
          <Typography variant="h4">Register</Typography>
          <Formik
            initialValues={RegisterInitialValues}
            validationSchema={RegisterSchema}
            onSubmit={handleOnSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <Form>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!(touched.name && errors.name)}
                  helperText={touched.name ? errors.name : ""}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!(touched.email && errors.email)}
                  helperText={touched.email ? errors.email : ""}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Password"
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!(touched.password && errors.password)}
                  helperText={touched.password ? errors.password : ""}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!(touched.confirmPassword && errors.confirmPassword)}
                  helperText={touched.confirmPassword ? errors.confirmPassword : ""}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Phone Number"
                  name="phoneNumber"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!(touched.phoneNumber && errors.phoneNumber)}
                  helperText={touched.phoneNumber ? errors.phoneNumber : ""}
                />
                <TextField
                  fullWidth
                  select
                  margin="normal"
                  label="Role"
                  name="role"
                  value={values.role}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!(touched.role && errors.role)}
                  helperText={touched.role ? errors.role : ""}
                >
                  {roles.map((role) => (
                    <MenuItem key={role.value} value={role.value}>
                      {role.label}
                    </MenuItem>
                  ))}
                </TextField>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isLoading}
                  sx={{ mt: 2 }}
                >
                  {isLoading ? <CircularProgress size="24px" /> : "Register"}
                </Button>
                {errorMessage && (
                  <Typography mt={2} color="error">
                    {errorMessage}
                  </Typography>
                )}
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    );
  }
  
  export default Register;
  