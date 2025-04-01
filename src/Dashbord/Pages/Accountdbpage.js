import React,{useEffect} from "react";
import {
    Container,
    Grid,
    Stack,
    Typography,
    TextField,
    Button
} from "@mui/material";
import { Box } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import AppBardb from "../Appbardb";

export default function Accountdbpage() {
    const [shopItems, setshopItems] = React.useState([]);
    const [cogs, setcogs] = React.useState(0); // total cost of goods sold for the month
    const [labc, setlabc] = React.useState(0); // total labor costs for the month
    const [fixedc, setfixedc] = React.useState(0); // total fixed costs for the month
    const [netProfit, setnetProfit] = React.useState(0); // total fixed costs for the month

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:3333/bidlist/shops");
            const json = await response.json();
            const rows = json.results.map((row, index) => ({ ...row, id: row.bid_id || Math.random() })); // Set a unique id for each row
            setshopItems(rows);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const columns = [
        { field: 'bid_id', headerName: 'ID', width: 50 },
        { field: 'product_id', headerName: 'Product ID', width: 150, editable: true },
        { field: 'Type', headerName: 'Type', width: 150, editable: true },
        { field: 'price', headerName: 'Price', type: 'number', width: 50, editable: true },
        { field: 'amount', headerName: 'Amount', type: 'number', width: 120, editable: true },
        { field: 'sweets', headerName: 'Sweets', width: 180 },
    ];

    return (
        <>
            <AppBardb />
            <Container>
                <Box sx={{ marginTop: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                    <Container component="main">
                        <br />
                        <Typography variant="h3">Accounting</Typography>
                        <br />
                        <Box sx={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={shopItems}
                                columns={columns}
                                getRowId={(row) => row.id} // Use unique id for each row
                                pageSize={5}
                                checkboxSelection
                                disableRowSelectionOnClick
                            />
                        </Box>
                    </Container>
                </Box>
            </Container>
        </>
    );
}
