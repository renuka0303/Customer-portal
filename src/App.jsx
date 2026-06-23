import { BrowserRouter, Routes, Route } from "react-router-dom";
 
import Login from "./pages/Login";

import Registration from "./pages/Registration";
 
import Layout from "./Layout";

import ProtectedRoute from "./ProtectedRoute";
 
import Dashboard from "./pages/Dashboard";

import Profile from "./pages/Profile";

import Wishlist from "./pages/Wishlist";

import MyOrder from "./pages/MyOrder";

import OrderTracking from "./pages/OrderTracking";
 
function App() {

  return (
<BrowserRouter>
<Routes>
 
        {/* PUBLIC ROUTES */}
<Route path="/" element={<Login />} />
<Route path="/register" element={<Registration />} />
 
        {/* PROTECTED AREA (SIDEBAR APP) */}
<Route

          path="/"

          element={
<ProtectedRoute>
<Layout />
</ProtectedRoute>

          }
>
 
          <Route path="dashboard" element={<Dashboard />} />
          
<Route path="profile" element={<Profile />} />
<Route path="wishlist" element={<Wishlist />} />
<Route path="myorder" element={<MyOrder />} />
<Route path="tracking" element={<OrderTracking />} />
 
        </Route>
 
      </Routes>
</BrowserRouter>

  );

}
 
export default App;
 