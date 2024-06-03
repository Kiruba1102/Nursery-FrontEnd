import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';
import Login from './Component/Login';
import AdminLogin from './Component/AdminLogin';
import HomePage from './Component/HomePage';
import ProductTable from './Component/ProductTable';
import LandingPage from './Component/LandingPage';
import Registers from './Component/Registers';
import AdminDashboard from './Component/AdminDashboard';
import PurchasePage from './Component/PurchasePage';
import Customer from './Component/Customer';
import OrdersList from './Component/OrdersList';
import BuyNowPage from './Component/BuyNowPage';

function App() {
  return (
    <div className="App">
    
   
    
     <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />}>
            </Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/adlogin" element={<AdminLogin />}></Route>
            <Route path="/adashboard" element={<AdminDashboard />}></Route>
            <Route path="/regs" element={<Registers />}></Route>
            <Route path="/home" element={<HomePage />}></Route>
            <Route path="/product" element={<ProductTable />}></Route> 
            <Route path='/purchase' element={<PurchasePage/>}></Route>
            <Route path='/customer' element={<Customer/>}></Route>
            <Route path='/order' element={<OrdersList/>}></Route>
            <Route path="/buy/:productId" element={<BuyNowPage/>}></Route>

          </Routes>
        </BrowserRouter>  
    </div>
  );
}

export default App;
