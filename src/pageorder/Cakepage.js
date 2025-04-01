import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Button, Typography, Stack, FormLabel, TextField, IconButton, RadioGroup, FormControlLabel, Radio, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ButtonAppBar from '../Appbar'; // Assuming this is your AppBar component
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

export default function Cakepage() {
  const theme = createTheme();
  const [datas, setData] = useState([]);
  const [checked, setChecked] = useState(false);
  const [als, setAls] = useState(0);
  const [amount, setAmount] = useState(1);  // Initial value of 1 item

  // Fetch data from API
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3333/manu/pickcake");
      const json = await response.json();
      setData(json.results);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Increment and Decrement handlers for the amount
  const handleIncrement = () => {
    setAmount(prevAmount => prevAmount + 1);
  };

  const handleDecrement = () => {
    if (amount > 1) {
      setAmount(prevAmount => prevAmount - 1);
    }
  };

  // Alert component for success messages
  function Alerts(x) {
    if (x !== 0) {
      return (
        <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
          <Alert onClose={() => setAls(0)}>Order Success</Alert>
        </Slide>
      );
    }
  }

  // Pass order to the database (POST request)
  const passingorder = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const jsonData = {
      product_id: data.get("product_id"),
      price: data.get("price"),
      amount: amount, // Using the amount value from the input
    };

    try {
      const response = await fetch("http://localhost:3333/bidlist/cake", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(jsonData)
      });

      const result = await response.json();

      if (result.status === "ok") {
        setAls(1);
        setChecked(true);
        setTimeout(() => {
          window.location = '/cake'; // Changed URL here to /Cake
        }, 1000);
      } else {
        alert("Passing failed");
        setTimeout(() => {
          window.location.href = '/cake'; // Changed URL here to /Cake
        }, 1000);
      }
    } catch (error) {
      console.error("Error submitting order: ", error);
    }

    try {
      const response = await fetch("http://localhost:3333/bidlist/shop", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(jsonData)
      });

      const result = await response.json();

      if (result.status === "ok") {
        // Successfully added to shop
      } else {
        alert("Passing failed");
      }
    } catch (error) {
      console.error("Error submitting order to shop: ", error);
    }
  };

  // Generate the list of items for display
  const listItem = datas.map((employe) => (
    <Grid item xs={4} key={employe.id}>
      <div className={employe.npng}>
        <div className='info'>
          <h2 className='title'>{employe.name_manu} {employe.price} THB</h2>
          <div className='description'>
            <Box component="form" noValidate onSubmit={passingorder} sx={{ mt: 1 }}>
              <Stack spacing={1} direction="row">
                <Grid item xs={3.5}>
                  <TextField
                    name="product_id"
                    id='product_id'
                    label="product_id"
                    defaultValue={employe.product_id}
                    type="hidden"
                    variant="standard"
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={3.5}>
                  <TextField
                    name="price"
                    id='price'
                    label="price"
                    defaultValue={employe.price}
                    type="hidden"
                    variant="standard"
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
              </Stack>

              {/* Amount Input */}
              <FormLabel id="demo-row-radio-buttons-group-label">Amount</FormLabel>
              <Box display="flex" alignItems="center">
                <IconButton onClick={handleDecrement} aria-label="decrement">
                  <RemoveIcon />
                </IconButton>

                <TextField
                  id="amount"
                  name="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => {
                    const newAmount = Number(e.target.value);
                    // Ensure the value is at least 1
                    if (newAmount >= 1) {
                      setAmount(newAmount);
                    }
                  }}
                  onKeyPress={(e) => e.preventDefault()}  // Prevent enter key to submit the form
                  InputProps={{
                    inputProps: { min: 1 }, // Ensure the input can't go below 1
                  }}
                  variant="standard"
                  sx={{
                    width: 80, // Control the width
                    textAlign: 'center',  // Align text in the center
                    fontSize: '0.875rem', // Adjust the font size to make it 50% smaller (default is 1rem)
                    '& input': {
                      textAlign: 'center', // Ensure text inside the input field is centered
                    },
                  }}
                />


                <IconButton onClick={handleIncrement} aria-label="increment">
                  <AddIcon />
                </IconButton>
              </Box>

              <Button variant="contained" color="success" type="submit">ADD</Button>
            </Box>
          </div>
        </div>
      </div>
    </Grid>
  ));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        {ButtonAppBar()}
        <div className="right">
          {Alerts(als)}
        </div>

        <Box sx={{ marginTop: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Container component="main" maxWidth="xl">
            <Box sx={{ flexGrow: 0.5 }}>
              {/* Centered Menu Title */}
              <Grid container justifyContent="center" sx={{ marginBottom: 3 }}>
                <Typography variant="h4" component="h2" fontWeight="bold" textAlign="center">
                  CAKE MENU
                </Typography>
              </Grid>

              <Grid container spacing={4}>
                {listItem}
              </Grid>
            </Box>
          </Container>
        </Box>
      </div>
    </ThemeProvider>
  );
}