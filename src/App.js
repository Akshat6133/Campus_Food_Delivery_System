
import './App.css';
import Home from './screens/User/Home';
import UserProfile from './screens/User/UserProfile.js';
import Login from './screens/Common_In_All/Login';
import SignUp from './screens/Common_In_All/signup.js';
import Contact from './screens/Common_In_All/contact.js';

// Import bootstrap files.
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';


import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";                                              // Routing front-end and back-end, components for routing in React
import { CartProvider } from './components/User/ContextReducer.js';

// Importing shop details
import DynamicUserShops from './screens/User/DynamicUserShops.js'
import DynamicOwner from './screens/Owner_data/DynamicOwner.js';

import Add_Shops from './screens/Super_Admin/Add_shop.js';

// Importing owner_add Item details
import Add_item from './screens/Owner_data/Add_item.js';

// Importing SuperAdmin details
import Home_SuperAdmin from  "./screens/Super_Admin/Home_SuperAdmin.js";

// Main Component of App
function App() {
  return (
    <CartProvider>                                                      {/* To wrap the entire application */}

      <Router>
        <div>
          <Routes>

            {/* These are the routes for Homepage, Login, signup and myorders page */}
            <Route exact path="/" element = {<Home/>} />            
            <Route exact path="/login"  element = {<Login/>} />                 {/* Completed */}
            <Route exact path="/signup"  element = {<SignUp/>} />               {/* Completed */}
            <Route exact path="/myOrders"  element = {<myOrders/>} />
            <Route exact path="/userProfile"  element = {<UserProfile/>} />
            <Route exact path="/contact"  element = {<Contact/>} />

            {/* Routes for different types of users */}
            <Route exact path="/user"  element = {<Home/>} />
            <Route exact path="/superadmin"  element = {<Home_SuperAdmin/>} />

            {/* <Route exact path='/owner/:owner_id' element={<Owner_Milkshake />} /> */}
            <Route exact path='/shop/:shop_id' element={<DynamicUserShops/>} />
            <Route exact path='/owner/:owner_id' element={<DynamicOwner />} />

            <Route exact path="/superadmin/add_shops" element = {<Add_Shops/>} />

            <Route exact path="/owner/:owner_id/add_item" element = {<Add_item/>} />
          </Routes>
        </div>
      </Router>

    </CartProvider>
  );
}

export default App;

{/* The down parts will be removed after sometime */}
  {/* Routes of each shops */}
  {/* <Route exact path="/shop/65b5f3329e3f22efa0aacbd2" element = {<ATMart/>} />
  <Route exact path="/shop/65b5f4319e3f22efa0aacbd3" element = {<Bakery/>} />
  <Route exact path="/shop/65b660d325d1fac6691e3ad0" element = {<CafeCoffee/>} />
  <Route exact path="/shop/65b65f8b25d1fac6691e3ace" element = {<Dairy/>} />
  <Route exact path="/shop/65b661e225d1fac6691e3ad2" element = {<Galav/>} />
  <Route exact path="/shop/65b6600f25d1fac6691e3acf" element = {<Govatsa/>} />
  <Route exact path="/shop/65b65de925d1fac6691e3acd" element = {<MilkShakes/>} />
  <Route exact path="/shop/65b6616b25d1fac6691e3ad1" element = {<NJX/>} />
  <Route exact path="/shop/65b5f2e19e3f22efa0aacbd1" element = {<TechCafe/>} /> */}

  {/* <Route exact path="/shop/:_id" element={<DynamicShopComponent />} /> */}
  {/* Owner related pages */}