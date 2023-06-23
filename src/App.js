import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route } from 'react-router-dom'
import Register from './pages/Register';
import Login from './pages/Login';
import NavbarComponent from './components/Navbar';
import List from './pages/List';
import Home from './pages/Home';
import Details from './pages/Details';
import OrdersPage from './pages/OrdersPage';
import ViewOrderDetails from './pages/ViewOrderDetails';
import PrivateRoutes from "./utils/PrivateRoutes";
import ErrorPage from './pages/ErrorPage'



function App() {
  return (
    <>

      <NavbarComponent />
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/book/list" element={<List />} />
          <Route path="/books/orders/:bookId" element={<ViewOrderDetails />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/book/view/:bookId" element={<Details />} />
        </Route>



        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<ErrorPage />} />

      </Routes>
    </>

  );
}

export default App;
