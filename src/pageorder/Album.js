import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/system/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import './Album.css';
import ButtonAppBar from '../Appbar';
import ProtectedData from '../ProtectedData';

export default function Album() {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        {ButtonAppBar()}
      </div>
      <Box
        sx={{
          marginTop: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Container component="main" maxWidth="xl">
          <Box sx={{ flexGrow: 0.5 }}>
            {/* Menu Title */}
            <Grid container justifyContent="center" sx={{ marginBottom: 3 }}>
              <Typography variant="h4" component="h2" fontWeight="bold" textAlign="center">
                MENU
              </Typography>
            </Grid>

            {/* Centering the Grid items */}
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={4}>
                <div className='card s1'>
                  <div className='info'>
                    <h2 className='title'>
                      Coffee & Tea
                    </h2>
                    <p className='description'>
                      A latte or caffè latte is a milk coffee that is a made up of one or two shots of espresso, 
                      lots of steamed milk and a final, thin layer of frothed milk on top.
                    </p>
                    <Container fixed>
                      <Grid container spacing={1}>
                        <Grid item xs={10}>
                          <Stack spacing={1} direction="row">
                            <Button variant="contained" color="success" href="/Drink">
                              Buy
                            </Button>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Container>
                  </div>
                </div>
              </Grid>

              {/* Uncomment the Tea item if needed */}
              {/* <Grid item xs={4}>
                <div className='card s2'>
                  <div className='info'>
                    <h2 className='title'>
                      Tea
                    </h2>
                    <p className='description'>
                      A latte or caffè latte is a milk coffee that is a made up of one or two shots of espresso, 
                      lots of steamed milk and a final, thin layer of frothed milk on top.
                    </p>
                    <Container fixed>
                      <Grid container spacing={1}>
                        <Grid item xs={10}>
                          <Stack spacing={1} direction="row">
                            <Button variant="contained" color="success" href="/Tea">
                              Buy
                            </Button>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Container>
                  </div>
                </div>
              </Grid> */}

              <Grid item xs={4}>
                <div className='card s3'>
                  <div className='info'>
                    <h2 className='title'>
                      Cake
                    </h2>
                    <p className='description'>
                      A latte or caffè latte is a milk coffee that is a made up of one or two shots of espresso, 
                      lots of steamed milk and a final, thin layer of frothed milk on top.
                    </p>
                    <Container fixed>
                      <Grid container spacing={1}>
                        <Grid item xs={10}>
                          <Stack spacing={1} direction="row">
                            <Button variant="contained" color="success" href="/Cake">
                              Buy
                            </Button>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Container>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Box>
          <br />
        </Container>
      </Box>
    </ThemeProvider>
  );
}
