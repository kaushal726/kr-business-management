import { useState } from 'react';
import './App.css';
import Login from './components/Login/Login';
import HomeScreen from './components/Router/Router';
import { Toaster } from 'react-hot-toast';
import NoteState from './components/Context/GlobalContext';

function App() {
  const [token, setToken] = useState();
  const handleToken = (tokenId) => {
    setToken(tokenId);
  }
  return (
    <NoteState>
      <div className="App">
        <Toaster />
        {console.log(token)}
        {!token ?
          <Login onLogin={handleToken} />
          : <HomeScreen onLogin={handleToken} />}
      </div>
    </NoteState>
  );
}

export default App;
