// import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AgentiiList from './components/agencies/AgenciesList';
import Login from './pages/Login';
import Signup from './pages/Signup';
import HomePage from './pages/HomePage';


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
      <Route path="/agencies" element={<AgentiiList />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App
