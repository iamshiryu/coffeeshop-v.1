import React, { useEffect } from "react";
import AppBardb from "../Appbardb";
import {
    Container,
    Typography,
} from "@mui/material";
import { Box } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import Orderchartdb from "./Orderdbchartdb";

export default function Orderdbpage() {
    const [shopItems, setshopItems] = React.useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:3333/bidlist/shops");
            const json = await response.json();
            // ตรวจสอบและเพิ่ม `id` ให้กับข้อมูลที่ไม่มี
            const rows = json.results.map((row) => ({
                ...row,
                id: row.bid_id || Math.random(),  // ใช้ `bid_id` หรือสร้าง id ใหม่หากไม่มี
            }));
            setshopItems(rows);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    function calprice() {
        const sumcal = shopItems.reduce((sum, item) => sum + (item.price * item.amount), 0);
        return sumcal;
    }

    function calnum() {
        const sumcal = shopItems.reduce((sum, item) => sum + item.amount, 0);
        return sumcal;
    }

    const columns = [
        { field: 'bid_id', headerName: 'ID', width: 50 },
        {
            field: 'product_id',
            headerName: 'Product ID',
            width: 150,
            editable: true,
        },
        {
            field: 'Type',
            headerName: 'Type',
            width: 150,
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
            width: 150,
            editable: true,
        },
        {
            field: 'sweets',
            headerName: 'Sweets',
            width: 200,
        },
        {
            field: 'type_date',
            headerName: 'Type Date',
            width: 200,
            valueGetter: (params) => {
                const timestamp = params.value;
                const date = new Date(timestamp);
                const formattedDate = date.toLocaleDateString();
                const formattedTime = date.toLocaleTimeString();
                return `${formattedDate} ${formattedTime}`;
            },
        },
    ];

    return (
        <>
            <AppBardb />
            <Orderchartdb />
            <Container>
                <Box sx={{
                    marginTop: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%'
                }}>
                    <Container component="main">
                        <br />
                        <Typography variant="h3">
                            Order
                        </Typography>
                        <br />
                        <Box sx={{ height: 400, width: '100%' }}>
                            <div style={{ height: 400, width: '100%' }}>
                                <DataGrid
                                    rows={shopItems}
                                    columns={columns}
                                    getRowId={(row) => row.id}  // ใช้ `id` ที่ไม่ซ้ำกัน
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
                        <br />
                        <div>
                            <h3>Total income: {new Intl.NumberFormat('th-TH', { style: "currency", currency: "THB" }).format(calprice())}</h3>
                            <h3>Total amount: {calnum()} items</h3>
                        </div>
                    </Container>
                </Box>
                <br />
                <br />
            </Container>
        </>
    );
}
