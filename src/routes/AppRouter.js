import React from 'react';
import { Route, Routes } from 'react-router';
import AdminOrderPage from '../page/AdminOrderPage';
import AdminProduct from '../page/AdminProduct';
import CartPage from '../page/CartPage';
import Login from '../page/Login';
import MyPageS from '../page/MyPageS';
import OrderCompletePage from '../page/OrderCompletePage';
import PaymentPage from '../page/PaymentPage';
import ProductAll from '../page/ProductAll';
import ProductDetail from '../page/ProductDetail';
import RegisterPage from '../page/RegisterPage';
import PrivateRoute from './PrivateRoute';
import SocialLoginCallback from '../api/SocialLoginCallback';
import MyPage from '../page/Mypage';
import Info from '../component/Mypage/Section/Info';
import Delivery from '../component/Mypage/Section/Delivery';
import DeleteUser from '../component/Mypage/Section/DeleteUser';
import Product from '../page/MenuProduct';
import MenuTable from '../component/Product/MenuTable';

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<ProductAll />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route element={<PrivateRoute permissionLevel='customer' />}>
        <Route path='/cart' element={<CartPage />} />
        <Route path='/payment' element={<PaymentPage />} />
        <Route path='/payment/success' element={<OrderCompletePage />} />
        <Route path='/account/purchase' element={<MyPageS />} />
      </Route>
      <Route element={<PrivateRoute permissionLevel='admin' />}>
        <Route path='/admin/product' element={<AdminProduct />} />
        <Route path='/admin/order' element={<AdminOrderPage />} />
      </Route>
      <Route path='/mypage' element={<MyPage />}>
        <Route path='info' element={<Info />} />
        <Route path='delivery' element={<Delivery />} />
        <Route path='deleteuser' element={<DeleteUser />} />
      </Route>
      <Route path='/product' element={<Product />}>
        <Route path=':menu/:category' element={<MenuTable />} />
      </Route>
      <Route path='/auth/socialLoginCallback' element={<SocialLoginCallback />} />
    </Routes>
  );
};

export default AppRouter;
