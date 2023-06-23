import './App.css';
import Header from "./components/layout/header/Header.js"
import Footer from "./components/layout/footer/Footer.js"
import Home from "./components/home/Home.js"
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import WebFont from "webfontloader"
import { useEffect, useState } from 'react';
import ProductDetails from './components/products/ProductDetails';
import Products from './components/products/Products.js'
import Search from './components/products/Search.js'
import Profiles from './components/user/Profiles.js';
import UpdateProfile from './components/user/UpdateProfile.js';
import UpdatePassword from './components/user/UpdatePassword.js';
import ForgotPassword from './components/user/ForgotPassword.js';
import ResetPassword from './components/user/ResetPassword.js';
import Cart from './components/Cart/Cart.js';
import Shipping from './components/Cart/Shipping.js';
import ConfirmOrder from './components/Cart/ConfirmOrder.js';
import OrderSuccess from './components/Cart/OrderSuccess.js';
import MyOrders from './components/Order/MyOrders.js';
import OrderDetails from './components/Order/OrderDetails.js';
import LoginSignup from './components/user/LoginSignup';
import Payment from './components/Cart/Payment.js';
import DashBoard from './components/admin/DashBoard.js';
import ProductsList from './components/admin/ProductsList.js';
import store from './store'
import { loadUser } from './actions/userAction';
import UserOptions from './components/layout/header/UserOptions.js'
import { useSelector } from 'react-redux';
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import ProtectedRoute from './components/Route/ProtectedRoute';
import NewProduct from './components/admin/NewProduct';
import ProductUpdate from './components/admin/ProductUpdate.js';
import OrdersList from './components/admin/OrdersList.js';
import ProcessOrder from './components/admin/ProcessOrder.js';
import UsersList from './components/admin/UsersList.js';
import UpdateUser from './components/admin/UpdateUser.js';
import ProductReviews from './components/admin/ProductReviews.js';
import Categories from './components/admin/Categories.js';
import NotFound from './components/layout/NotFound/NotFound';





function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");

  const { isAuthenticated, user } = useSelector(state => state.user);

  async function getStripeApiKey() {

    const { data } = await axios.get("http://localhost:4000/api/v1/stripeapikey", { withCredentials: true })
    setStripeApiKey(data.stripeApiKey);
  }
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    })
    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);
  return (
    <>
      <Router>
        {/* <Header /> */}
        {<UserOptions user={user} isAuthenticated={isAuthenticated} />}
        <Routes>



       

          

          <Route path='/' element={<Home />} />
          <Route path='/product/:id' element={<ProductDetails />} />
          <Route path='/products' element={<Products />} />
          <Route path='/products/:keyword' element={<Products />} />
          <Route path='/search' element={<Search />} />
          <Route path='/login' element={<LoginSignup />} />
          
          <Route path='/account' element={
            <ProtectedRoute >
              <Profiles user={user} />
            </ProtectedRoute>
          } />
          <Route path='/me/update' element={
            <ProtectedRoute >
              <UpdateProfile />
            </ProtectedRoute>
          } />
          <Route path='/password/update' element={
            <ProtectedRoute >
              <UpdatePassword />
            </ProtectedRoute>
          } />
          <Route path='/password/forgot' element={<ForgotPassword />} />
          <Route path='/password/reset/:token' element={<ResetPassword />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/shipping' element={
            <ProtectedRoute >
              <Shipping />
            </ProtectedRoute>
          } />


          <Route path='/order/confirm' element={
            <ProtectedRoute >
              <ConfirmOrder />
            </ProtectedRoute>
          } />
           <Route path='/process/payment' element={
            <ProtectedRoute >
              {stripeApiKey && (
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment />
                </Elements>

              )}
            </ProtectedRoute>
          } />

          <Route path='/success' element={
            <ProtectedRoute >
              <OrderSuccess />
            </ProtectedRoute>
          } />
          <Route path='/orders' element={
            <ProtectedRoute >
              <MyOrders />
            </ProtectedRoute>
          } />
          <Route path='/order/:id' element={
            <ProtectedRoute >
              <OrderDetails />
            </ProtectedRoute>
          } />

     

          <Route path="/admin/dashboard"
            element={
              <ProtectedRoute isAdmin={true}>
                <DashBoard />
              </ProtectedRoute>
            } />

          <Route path="/admin/products"
            element={
              <ProtectedRoute isAdmin={true}>
                <ProductsList />
              </ProtectedRoute>
            } />

          <Route path="/admin/product"
            element={
              <ProtectedRoute isAdmin={true}>
                <NewProduct />
              </ProtectedRoute>
            } />


          <Route path="/admin/product/:id"
            element={
              <ProtectedRoute isAdmin={true}>
                <ProductUpdate />
              </ProtectedRoute>
            } />


          <Route path="/admin/orders"
            element={
              <ProtectedRoute isAdmin={true}>
                <OrdersList />
              </ProtectedRoute>
            } />

          <Route path="/admin/order/:id"
            element={
              <ProtectedRoute isAdmin={true}>
                <ProcessOrder />
              </ProtectedRoute>
            } />

          <Route path="/admin/users"
            element={
              <ProtectedRoute isAdmin={true}>
                <UsersList />
              </ProtectedRoute>
            } />
          <Route path="/admin/user/:id"
            element={
              <ProtectedRoute isAdmin={true}>
                <UpdateUser />
              </ProtectedRoute>
            } />



          <Route path="/admin/reviews"
            element={
              <ProtectedRoute isAdmin={true}>
                <ProductReviews />
              </ProtectedRoute>
            } />

          <Route path="/admin/categories"
            element={
              <ProtectedRoute isAdmin={true}>
                <Categories />
              </ProtectedRoute>
            } />

      <Route path="/404" element={<NotFound />} />
          	<Route path="*" element={<Navigate to="/404" />} />
        </Routes>
        <Footer />
      </Router>






    </>

  );
}

export default App;
