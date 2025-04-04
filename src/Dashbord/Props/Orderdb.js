import React,{useEffect} from "react";
import {
    Container,
    Typography,
  } from "@mui/material";
import { Box } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';


export default function Orderdb() {
    const [shopItems,setshopItems] = React.useState([])
    

    const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:3333/bidlist/orderlist");
          const json = await response.json();
          const rows = json.results.map((row, index) => ({ ...row, id: index }));
          setshopItems(rows);
          // console.log(json.results)
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      };
    
      useEffect(() => {
        fetchData();
      }, []);

      function calprice(){
        const datacalprice = shopItems ;
        const sumdata = [] ;
        let sumcal = 0 ;
        // const datacalamount = []
        const doubled = datacalprice.map((number) => (number.price * number.amount));
        for (let i = 0; i < doubled.length; i++) {
          sumdata.push(doubled[i])
          
        }
        for (let i = 0; i < sumdata.length; i++) {
          sumcal += sumdata[i]
        }
        return sumcal;
      }
      function calnum(){
        const datacalprice = shopItems ;
        const sumdata = [] ;
        let sumcal = 0 ;
        // const datacalamount = []
        const doubled = datacalprice.map((number) => (number.amount));
        for (let i = 0; i < doubled.length; i++) {
          sumdata.push(doubled[i])
          
        }
        for (let i = 0; i < sumdata.length; i++) {
          sumcal += sumdata[i]
        }
        return sumcal;
      }
      
    
      const columns = [
        { field: 'bid_id', headerName: 'ID', width: 50 },
        // {
        //   field: 'product_id',
        //   headerName: 'Product ID',
        //   width: 150,
        //   editable: true,
        // },
        {
          field: 'Type',
          headerName: 'Type',
          width: 70,
          editable: true,
        },
        {
          field: 'price',
          headerName: 'Price',
          type: 'number',
          width: 50,
          editable: true,
        },
        {
          field: 'amount',
          headerName: 'Amount',
          type: 'number',
          width: 120,
          editable: true,
        },
        {
          field: 'sweets',
          headerName: 'Sweets',
          width: 180,
        },
        {
          
          field: 'type_date',
          headerName: 'type_date',
          width: 200,
          valueGetter: (params) => {
            const timestamp = params.value;
            const date = new Date(timestamp);
            const formattedDate = date.toLocaleDateString();
            const formattedTime = date.toLocaleTimeString();
            return `${formattedDate} ${formattedTime}`;
          }
        },
      ];

//   const rows = shopItems;
//   console.log(rows)

  return (
    <>
        {/* <AppBardb /> */} 
        <Container >
         
                <Box
                  sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '100%'
                  
                  }}>
                      
                    <Container component="main"  className="card2" >
                      <br/>
                        <Typography  variant="h3" >
                          Order
                        </Typography>
                        <br/>
                        <Box sx={{ height: 400, width: '100%' }}>
                            <div style={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={shopItems}
                                columns={columns}
                                getRowId={(row) => row.bid_id}
                                initialState={{
                                    pagination: {
                                    paginationModel: {
                                        pageSize: 5,
                                    },
                                    },
                                }}
                                pageSizeOptions={[5]}
                                checkboxSelection
                                disableRowSelectionOnClick
                                />
                            </div>
                        </Box>
                        <br/>
                                <div> 
                                    <h3>Total income : {calprice()} THB </h3>
                                    <h3>Total amount : {calnum()}  </h3>
                                </div>
                        </Container>
                        </Box>
                        
              <br />
              <br />
              
            </Container>

   </>
  );
}