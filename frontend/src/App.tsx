// import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import HomePage from './pages/HomePage';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  // test connection to backend using api/hello
  // const [message, setMessage] = useState('');

  // useEffect(() => {
  //   fetch('http://localhost:5000/api/hello')
  //     .then(res => res.json())
  //     .then(data => setMessage(data.message))
  //     .catch(err => console.error(err));
  // }, []);

  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path='/Login' element={<Login/>}></Route>
      <Route path='/Signup' element={<Signup/>}></Route>
      <Route path="/admin" element={<AdminDashboard />} />

    </Routes>
    </BrowserRouter>
  );
}

export default App
