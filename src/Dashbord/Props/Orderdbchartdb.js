import React from "react";
import {
    Container,
    Typography,
  } from "@mui/material";
import { Box } from "@mui/material";
// import { DataGrid } from '@mui/x-data-grid';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
//   import faker from 'faker';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );
  
 
  
export default function Orderchartdb() {

    const formatDateString = (dateString) => {
        const dateObj = new Date(dateString);
        const month = dateObj.toLocaleString('default', { month: 'short' });
        const day = dateObj.getDate();
        return `${month} ${day}`;
      };
      
      const groupItemsByDay = (items) => {
        const groups = {};
        items.forEach((item) => {
          const dayStr = formatDateString(item.type_date);
          if (!groups[dayStr]) {
            groups[dayStr] = { day: dayStr, amount: 0 };
          }
          groups[dayStr].amount += item.amount;
        });
        return Object.values(groups);
      };
      
      const [shopItems, setShopItems] = React.useState([]);
      
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:3333/bidlist/shops");
          const json = await response.json();
          setShopItems(json.results);
          console.log(json.results);
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      };
      
      React.useEffect(() => {
        fetchData();
      }, []);
      
      const groupedItems = groupItemsByDay(shopItems);
      
      const labels = groupedItems.map((group) => group.day);
      const data = {
        labels,
        datasets: [
          {
            fill: true,
            label: 'Daily Amount',
            data: groupedItems.map((group) => group.amount),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };
      
      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Line Chart',
          },
        },
      };
      

   
    
  return (
    <>
        <Container >
                <Box
                  sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '100%'
                  
                  }}>
                      
                    <Container component="main"   >
                      <br/>
                        <Typography  variant="h3" >
                          Order balance
                        </Typography>
                        <br/>
                        <Box sx={{ height: 400, width: '100%' }}>
                          <center>
                              <div style={{ height: 400, width: '100%' }}>
                                  <Line options={options} data={data} />
                              </div>
                            </center>
                        </Box>
                        <br/>
                        </Container>
                        </Box>
                        
              <br />
              <br />
              
            </Container>

   </>
  );
}