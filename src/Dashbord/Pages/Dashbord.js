import React, { useState, useEffect } from "react";
import AppBardb from "../Appbardb";
import { Stack, Grid } from "@mui/material";
import Orderdb from "../Props/Orderdb";
import Userdb from "../Userdb";
import Manudb from "../Props/Manudb";
import Accountdb from "../Props/Accountdb";
import Orderchart from "../Props/Orderdbchart";
import Usersdbchart from "../Props/Usersdbchart";
import { DataGrid } from '@mui/x-data-grid';

export default function Dashboardpage() {
  const [cartItems, setCartItems] = useState([]);

  // ฟังก์ชันดึงข้อมูลจาก API หรือฐานข้อมูล
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3333/bidlist/cart");
        const data = await response.json();
        
        // ตรวจสอบและเพิ่ม `id` ให้กับข้อมูลที่ไม่มี
        const updatedCartItems = data.results.map((item) => ({
          ...item,
          id: item.bidshop_id || item.product_id || Math.random(),  // ใช้ `bidshop_id`, `product_id`, หรือสร้าง id ใหม่หากไม่มี
        }));

        setCartItems(updatedCartItems);  // อัปเดตข้อมูลที่มี `id`
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();

    // รีเฟรชข้อมูลทุกๆ 5 วินาที (Polling)
    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId); // ทำความสะอาดเมื่อคอมโพเนนต์ถูก unmount
  }, []); // ดึงข้อมูลแค่ครั้งเดียวเมื่อ component โหลดขึ้นมา

  // กำหนดคอลัมน์สำหรับ DataGrid
  const columns = [
    { field: 'product_id', headerName: 'Product ID', width: 180 },
    { field: 'price', headerName: 'Price', width: 130 },
    { field: 'amount', headerName: 'Amount', width: 130 },
    { field: 'total', headerName: 'Total', width: 180 },
  ];

  return (
    <>
      <AppBardb />
      <Grid>
        <Stack spacing={1} direction="row">
          <Orderchart />
          <Usersdbchart />
        </Stack>
        <Stack spacing={1} direction="row">
          <Orderdb />
          <Userdb />
        </Stack>
      </Grid>
      <Grid>
        <Stack spacing={1} direction="row">
          <Manudb />
          {/* <Accountdb /> */}
        </Stack>
      </Grid>

      {/* เพิ่ม DataGrid */}
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={cartItems}  // ใช้ข้อมูลที่มี `id`
          columns={columns}
          pageSize={5}
          checkboxSelection
          getRowId={(row) => row.id}  // ใช้ `id` ที่ไม่ซ้ำกัน
        />
      </div>
    </>
  );
}
