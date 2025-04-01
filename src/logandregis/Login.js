import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useState } from 'react';
import image from "../Photo/coffee1.png";

const theme = createTheme();

// Alert component for Snackbar
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SignInSide() {
  const [open, setOpen] = useState(false);  // State for Snackbar
  const [severity, setSeverity] = useState("success");  // Snackbar severity (success/error)
  const [message, setMessage] = useState("");  // Message to display in Snackbar

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      Tel: data.get('Tel'),
      password: data.get('password'),
    };

    // Perform login validation
    fetch("http://localhost:3333/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'ok') {
          localStorage.setItem('token', data.token);
          setSeverity("success");
          setMessage('Login successful');
          setOpen(true);  // Open Snackbar when login is successful

          // Delay navigation to album page after Snackbar
          setTimeout(() => {
            window.location.href = '/album';  // Redirect to album page after success
          }, 2000);  // Wait for 2 seconds before redirecting
        } else {
          setSeverity("error");
          setMessage('Login failed');
          setOpen(true);  // Show error Snackbar
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setSeverity("error");
        setMessage('Something went wrong');
        setOpen(true);  // Show error Snackbar in case of an exception
      });
  };

  const handleCloseSnackbar = () => {
    setOpen(false);  // Close Snackbar after it's displayed
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          style={{ backgroundImage: `url(${image})` }}
          sx={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              marginTop: 25,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h4">
              Log in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Tel"
                id="Tel"
                name="Tel"
                autoComplete="Tel"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  {/* <Link href="#" variant="body2"> */}
                  {/* Forgot password? */}
                  {/* </Link> */}
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                  <br />
                  <Link href="/loginadmin" variant="body2">
                    {"Login for admin and employee"}
                  </Link>
                </Grid>
              </Grid>
            </Box>

            {/* Snackbar for success or error message */}
            <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
              <Alert onClose={handleCloseSnackbar} severity={severity} sx={{ width: '100%' }}>
                {message}
              </Alert>
            </Snackbar>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
