import React from 'react';
import { BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
// import Login from './logandregis/Login';
import Album from './pageorder/Album';
import Register from './logandregis/Register';
import Drinkpage from './pageorder/Drinkpage';
import Cakepage from './pageorder/Cakepage';
import Mocha from './Typeorder/coffee/Mocha';
import Pay from './Paymentpage/Pay';
import Typepage from './Typeorder/coffee/Typepage';
import CartPage from './pageorder/Cart';
import Dashboardpage from './Dashbord/Pages/Dashbord';
import Rreceipt from './Paymentpage/Receipt';
import Orderdbpage from './Dashbord/Props/Orderdbpage';
import Userdbpage from './Dashbord/Pages/Userdbpage';
import Accountdbpage from './Dashbord/Pages/Accountdbpage';
import Loginadmin from './Dashbord/Loginadmin';
import RegisterAdmin from './Dashbord/RegisterAdmin';
import SignInSide from './logandregis/Login';
import Manudb from './Dashbord/Pages/Manudbpage';
import ProtectedData from './ProtectedData';



export default function App() {
  return (
    
        <BrowserRouter>
            {/* <Appup /> */}
          <Routes>
                          {/* Login Users */}
          <Route path="/" element={<Navigate to="/login" />} />

          <Route path="/login" element={<SignInSide />} /> 
              <Route path="/register" element={<Register />} />
              <Route path="/Album" element={ProtectedData(<Album />)} />
              <Route path="/drink" element={ProtectedData(<Drinkpage />)} />
              <Route path="/cake" element={ProtectedData(<Cakepage />)} />
              <Route path="/Cart" element={ProtectedData(<CartPage />)} />
              <Route path="/mocha" element={ProtectedData(<Mocha />)} />
              <Route path="/pay" element={ProtectedData(<Pay />)} />
              <Route path="/typepage" element={ProtectedData(<Typepage />)} />
              <Route path="/Rreceipt" element={ProtectedData(<Rreceipt/>)} />

            <Route path="/logout" element={<Route element={<Navigate to="/" />} />} />
            <Route element={<Navigate to="/login" />} />

                            {/* DASHBORADS */}
          <Route path="/1" element={<Navigate to="/loginadmin" />} />

            <Route path="/Loginadmin" element={<Loginadmin />} />

            <Route path="/Dashboards" element={ProtectedData(<Dashboardpage />)} />
           
            <Route path="/RegisterAdmin" element={ProtectedData(<RegisterAdmin />)} />
            <Route path="/Orderdb" element={ProtectedData(<Orderdbpage />)} />
            <Route path="/Userdb" element={ProtectedData(<Userdbpage />)} />
            <Route path="/Manudb" element={ProtectedData(<Manudb />)} />
            <Route path="/Accountdb" element={ProtectedData(<Accountdbpage />)} />

          <Route path="/logout" element={<Route element={<Navigate to="/" />} />} />
          

          </Routes>
        </BrowserRouter>
     
   
  );
}

// {/* {/* <Routes>
//         <Route path="/" element={<Navigate to="/login" />} />
//         <Route path="/login" element={<Login setAuthenticated={setAuthenticated} />} />
//         <Route path="/register" element={<Register />} />
//         <PrivateRoute path="/album" element={<Album />} />
//         <PrivateRoute path="/coffee" element={<Coffeepage />} />
//         <PrivateRoute path="/Cart" element={<CartPage />} />
//         <PrivateRoute path="/mocha" element={<Mocha />} />
//         <PrivateRoute path="/pay" element={<Pay />} />
//         <PrivateRoute path="/typepage" element={<Typepage />} />
//         <PrivateRoute path="/Rreceipt" element={<Rreceipt />} />

//         {/* ############# Dashbords ############## */}
//         {/* <PrivateRoute path="/Dashbords" element={<Dashboardpage />} />
//         <Route path="/Loginadmin" element={<Loginadmin />} />
//         <Route path="/RegisterAdmin" element={<RegisterAdmin />} />
//         <PrivateRoute path="/Orderdb" element={<Orderdbpage />} />
//         <PrivateRoute path="/Userdb" element={<Userdbpage />} />
//         <PrivateRoute path="/Accountdb" element={<Accountdbpage />} />
//         <Route path="/logout" element={<Route element={<Navigate to="/" />} />} />
//         <Route element={<Navigate to="/login" />} />
//       </Routes> */} 
//     {/* </BrowserRouter> */} 