import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route } from 'react-router-dom'
import Register from './pages/Register';
import Login from './pages/Login';
import NavbarComponent from './components/Navbar';
import List from './pages/List';


function App() {
  return (
    <>

      <NavbarComponent />
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/book/list" element={<List />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>

  );
}

export default App;
