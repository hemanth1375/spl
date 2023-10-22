import React from 'react';
import './App.css';
import NavbarHeader from './components/Header/Navbar';
import Home from './components/Pages/Home/Home';
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import Documentation from './components/Pages/Documentation/Documentation';
import Contact from './components/Pages/Contactus/Contact';
import LogIn from './components/Pages/login/login';
import SignUp from './components/Pages/signup/signup';
import ApiExplorer from './components/Pages/ApiExplorer/ApiExplorer';
import ServicePage from './components/Pages/Apiservicespage/servicePage';
import ApiProducts from './components/Pages/ApiProducts/ApiProducts';
import Profile from './components/Pages/profile/profile';
import NewApplication from './components/Pages/profile/NewApplication';
import Analytics from './components/Pages/profile/Analytics';
import NationalAddress from './components/Pages/NationalAddress/NationalAddress';
import ApiProductDetails from './components/Pages/ApiProducts/ApiProductDetails';
import { AuthProvider } from './AuthContext';
import UpdateAccount from './components/Pages/profile/updateAccount';
import ChangePassword from './components/Pages/profile/changePassword';
import DocumentEndPoint from './components/Pages/Documentation/DocumentEndPoint';


function App() {
  return (
    <AuthProvider>
    <Router>
      
    <div className="App">
    <NavbarHeader/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/docs" element={<Documentation/>}/>
      <Route path="/docs/:id" element={<DocumentEndPoint/>}/>
      <Route path="/services" element={<ApiExplorer/>}/>
      <Route path="/products" element={<ApiProducts/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/nationaladdress" element={<NationalAddress/>}/>
      <Route path="/login" element={<LogIn/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="services/:id" element={<ServicePage/>}/>
      {/* <Route path="products/:id" element={<ServicePage/>}/> */}
      <Route path="products/:id" element={<ApiProductDetails/>}/>
      <Route path="products/:id/operations/:id" element={<ServicePage/>}/>
      {/* <Route path="docs/:id" element={<Document/>}/> */}
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/updateaccount" element={<UpdateAccount/>}/>
      <Route path="/changepassword" element={<ChangePassword/>}/>
      <Route path="profile/application/register" element={<NewApplication/>}/>
      <Route path="/profile/analytics" element={<Analytics/>}/>
      {/* <Home/> */}
      </Routes>
      <Footer/>
    </div>
    
    </Router>
    </AuthProvider>
  );
}

export default App;
