import { useEffect, useState } from 'react'
// import Login from './Login';
import AgentiiList from './components/agencies/AgenciesList';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/hello')
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => console.error(err));
  }, []);

  return(
    <div> 
      {message}
      <AgentiiList />
    </div>
  );
}

export default App
