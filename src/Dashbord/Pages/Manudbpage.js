import React, { useEffect } from "react";
import AppBardb from "../Appbardb";
import { Container, Stack, FormControl, InputLabel, Select, MenuItem, TextField, Box, Grid, Button, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export default function Manudb() {

  const [shopItems, setShopItems] = React.useState([]);
  const [formData, setFormData] = React.useState({
    name_manu: '',
    product_id: '',
    price: '',
    npng: '', // Path URL for image
    category: '' // Category for selecting Cake or Drink
  });

  const [formData2, setFormData2] = React.useState({
    product_id: ''
  });

  const Addmanu = (event) => {
    event.preventDefault();

    // ตรวจสอบว่าไม่ได้เลือก Category
    if (!formData.category) {
        alert("คุณยังไม่ได้เลือก Category");
        return;
    }

    fetch('http://localhost:3333/menu', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // ส่ง formData ไปใน body
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.status === 'ok') {
            alert('Stock added successfully!');
            window.location = '/Manudb'; // Redirect to the Manudb page after successful insertion
        } else {
            alert('Failed to add stock');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred while adding stock. Please try again.');
    });
};


  const Deletemanu = (event) => {
    event.preventDefault();
    fetch('http://localhost:3333/menu/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData2),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'ok') {
          window.location = '/Manudb';
          console.log('Product deleted successfully');
        } else {
          console.error(data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleInputChange2 = (event) => {
    const { name, value } = event.target;
    setFormData2((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3333/manu/pick");
      const json = await response.json();
      const rows = json.results.map((row, index) => ({ ...row, id: index }));
      setShopItems(rows);
      console.log(json.results);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    {
      field: 'product_id',
      headerName: 'Product ID',
      width: 100,
      editable: true,
    },
    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      width: 100,
      editable: true,
    },
    {
      field: 'name_manu',
      headerName: 'Name',
      width: 150,
      editable: true,
    },
    {
      field: 'npng',
      headerName: 'Image Path',
      width: 150,
      editable: true,
    },
    {
      field: 'category',
      headerName: 'Category',
      width: 150,
      editable: true,
    }
  ];

  return (
    <>
      <AppBardb />
      <Container>
        <Box
          sx={{
            marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}>
          <Container component="main">
            <Typography variant="h3" sx={{ mb: 3 }}>
              Menu
            </Typography>

            <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={shopItems}
                columns={columns}
                getRowId={(row) => row.id}
                pageSize={5}
                checkboxSelection
                disableRowSelectionOnClick
              />
            </div>

            <Stack direction="row" spacing={4} sx={{ mt: 4 }}>
              <Grid>
                <Typography variant="h3">Add Menu</Typography>

                <Box component="form" noValidate onSubmit={Addmanu} sx={{ mt: 1 }}>
                  <Stack direction="row" spacing={4}>
                    <Grid>
                      <TextField
                        margin="normal"
                        required
                        label="Product ID"
                        id="product_id"
                        name="product_id"
                        value={formData.product_id}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid>
                      <TextField
                        margin="normal"
                        required
                        name="name_manu"
                        label="Name"
                        id="name_manu"
                        value={formData.name_manu}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid>
                      <TextField
                        margin="normal"
                        required
                        name="price"
                        label="Price"
                        id="price"
                        value={formData.price}
                        onChange={handleInputChange}
                      />
                    </Grid>
                  </Stack>
                  <Stack direction="row" spacing={4}>
                    <Grid>
                      <TextField
                        margin="normal"
                        required
                        name="npng"
                        label="npng"
                        id="npng"
                        value={formData.npng}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid>
                      <FormControl fullWidth margin="normal" required sx={{ width: '300px' }}>
                        <InputLabel id="category">Select Category</InputLabel>
                        <Select
                          labelId="category"
                          id="category"
                          value={formData.category || ''}
                          onChange={handleInputChange}
                          name="category" // Changed from npng to category
                          label="Select Category"
                          sx={{ width: '100%' }}
                        >
                          <MenuItem value="">Select Category</MenuItem>
                          <MenuItem value="Cake">Cake</MenuItem>
                          <MenuItem value="Drink">Drink</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Stack>

                  <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Confirm
                  </Button>
                </Box>
              </Grid>

              <Grid>
                <Typography variant="h3">Delete Menu</Typography>
                <Box component="form" noValidate onSubmit={Deletemanu} sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Product ID"
                    id="product_idd"
                    name="product_id"
                    value={formData2.product_id}
                    onChange={handleInputChange2}
                  />
                  <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Confirm
                  </Button>
                </Box>
              </Grid>
            </Stack>
          </Container>
        </Box>
      </Container>
    </>
  );
}