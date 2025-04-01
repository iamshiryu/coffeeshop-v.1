import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Button, Typography, Stack, FormLabel, TextField, IconButton, RadioGroup, FormControlLabel, Radio, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ButtonAppBar from '../Appbar'; 
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

export default function Drinkpage() {
  const theme = createTheme();
  const [datas, setData] = useState([]);
  const [checked, setChecked] = useState(false);
  const [als, setAls] = useState(0);
  const [amount, setAmount] = useState(1);  // Initial value of 1 item
  const [sweetness, setSweetness] = useState('100');  // Default sweetness to 100%
  const [coffeeType, setCoffeeType] = useState('Hot');  // Default coffee type to Hot

  // Fetch data from API
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3333/manu/pickdrink");
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
      sweets: `${sweetness}%`,  // Using the selected sweetness level
      Type: coffeeType,  // Using the selected coffee type
    };
  
    // ส่งข้อมูลไปที่ bidlist/drink เพื่อเพิ่มเครื่องดื่ม
    try {
      const response = await fetch("http://localhost:3333/bidlist/drink", {
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
          window.location = '/drink'; // Redirect to drink page
        }, 1000);
      } else {
        alert("Passing failed");
        setTimeout(() => {
          window.location.href = '/drink'; // Redirect to drink page
        }, 1000);
      }
    } catch (error) {
      console.error("Error submitting order: ", error);
    }
  
    // ส่งข้อมูลไปที่ bidlist/shop เพื่อเพิ่มสินค้าลงในตะกร้า
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

              {/* Sweetness Selection */}
              <FormLabel id="demo-row-radio-buttons-group-label">Sweetness (%)</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="sweets"
                value={sweetness} // Set default value for sweetness
                onChange={(e) => setSweetness(e.target.value)}  // Update sweetness when selected
              >
                <FormControlLabel value="0" control={<Radio />} label="0" />
                <FormControlLabel value="25" control={<Radio />} label="25" />
                <FormControlLabel value="50" control={<Radio />} label="50" />
                <FormControlLabel value="75" control={<Radio />} label="75" />
                <FormControlLabel value="100" control={<Radio />} label="100" />
              </RadioGroup>

              {/* Coffee Type Selection */}
              <FormLabel id="demo-row-radio-buttons-group-label">Coffee type</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="Type"
                value={coffeeType} // Set default value for coffee type
                onChange={(e) => setCoffeeType(e.target.value)}  // Update coffee type when selected
              >
                <FormControlLabel value="Hot" control={<Radio />} label="Hot" />
                <FormControlLabel value="Ice" control={<Radio />} label="Ice" />
                <FormControlLabel value="Mix" control={<Radio />} label="Mix" />
              </RadioGroup>

              {/* Amount Input */}
              <FormLabel id="demo-row-radio-buttons-group-label">Amount</FormLabel>
              <Box display="flex" alignItems="center">
                <IconButton onClick={handleDecrement} aria-label="decrement"><RemoveIcon /></IconButton>
                <TextField
                  id="amount"
                  name="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => { const newAmount = Number(e.target.value); if (newAmount >= 1) setAmount(newAmount); }}
                  variant="standard"
                  sx={{ width: 80, textAlign: 'center' }}
                />
                <IconButton onClick={handleIncrement} aria-label="increment"><AddIcon /></IconButton>
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
        <div className="right">{Alerts(als)}</div>

        <Box sx={{ marginTop: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Container component="main" maxWidth="xl">
            <Box sx={{ flexGrow: 0.5 }}>
              <Grid container justifyContent="center" sx={{ marginBottom: 3 }}>
                <Typography variant="h4" component="h2" fontWeight="bold" textAlign="center">
                  DRINK MENU
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
