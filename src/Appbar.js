import React, { useState, useEffect } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { deepPurple, brown } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { Button, IconButton, Snackbar } from "@mui/material";
import MuiAlert from '@mui/material/Alert';

export default function ButtonAppBar() {
  const [countitems, setcountitems] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false); // State to control Snackbar
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState(""); // Message to display in Snackbar

  // ฟังก์ชันดึงข้อมูลตะกร้า
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3333/bidlist/cart");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const json = await response.json();
      const s = json.results;
      setcountitems(s.length); // อัปเดตจำนวนสินค้าจากข้อมูลที่ดึงมา
    } catch (error) {
      console.error("Error fetching data: ", error);
      setcountitems(0); // Set to 0 if fetch fails
    }
  };

  // เรียกใช้ fetchData ทุกๆ 5 วินาทีเพื่อรีเฟรชข้อมูล
  useEffect(() => {
    fetchData();  // เรียกใช้เมื่อคอมโพเนนต์โหลดขึ้นมา

    // Polling: ดึงข้อมูลทุก ๆ 5 วินาที
    const intervalId = setInterval(fetchData, 5000);

    // ทำความสะอาดเมื่อคอมโพเนนต์ถูกทำลาย
    return () => clearInterval(intervalId);
  }, []);

  const removelogin = async () => {
    try {
      const response = await fetch("http://localhost:3333/login/datatel/delete", {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setSeverity("success");
      setMessage("You have logged out successfully");
      setOpenSnackbar(true);

      localStorage.removeItem('token');
      
      setTimeout(() => {
        window.location = '/login'; 
      }, 2000); 
    } catch (error) {
      console.error("Error removing item from login: ", error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 2px',
    },
  }));

  const theme = createTheme({
    palette: {
      primary: {
        main: brown[800],
      },
      secondary: {
        main: deepPurple[200],
      },
    },
  });

  const gotocart = (event) => {
    event.preventDefault();
    window.location = '/Cart';
  }

  // Add onClick for the Typography "CAFE" to redirect to /album
  const handleCafeClick = () => {
    window.location.href = '/album';  // Redirect to Album page
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <ThemeProvider theme={theme}>
          <AppBar position="static" color="primary">
            <Toolbar>
              <Typography 
                variant="h4" 
                component="div" 
                sx={{ flexGrow: 2 }} 
                onClick={handleCafeClick} // Add onClick handler
                style={{ cursor: 'pointer' }} // To show a pointer cursor
              >
                All Select
              </Typography>

              {/* <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2, fontSize: 50 }}
              >
                <AccountCircleIcon sx={{ fontSize: 32 }} />
              </IconButton> */}

              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="cart"
                sx={{ mr: 2, fontSize: 50 }}
                onClick={gotocart}
              >
                <StyledBadge badgeContent={countitems} color="secondary">
                  <ShoppingCartIcon sx={{ fontSize: 30 }} />
                </StyledBadge>
              </IconButton>

              <Button
                color="inherit"
                size="large"
                sx={{ fontSize: 18 }}
                onClick={removelogin}>
                Logout
              </Button>

            </Toolbar>
          </AppBar>
        </ThemeProvider>
      </Box>

      {/* Snackbar for logout success */}
      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar} 
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Centered Snackbar
        sx={{ 
          position: 'fixed',
          top: '50%', // Center vertically
          left: '50%',
          transform: 'translate(-50%, -50%)', // Adjust position to the center
          width: '400px', // Set width for larger size
          fontSize: '18px', // Increase font size
        }}
      >
        <MuiAlert 
          onClose={handleCloseSnackbar} 
          severity={severity} 
          sx={{ width: '100%', fontSize: '1.2rem', textAlign: 'center' }} // Adjust text size and alignment
        >
          {message}
        </MuiAlert>
      </Snackbar>
    </>
  );
}
