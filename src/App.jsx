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
      <div className=" min-h-screen">
        <Toaster />
        {/* {console.log(token)} */}
        {!token ? (
          <div className="bg-black">
            <Login onLogin={handleToken} />
          </div>
        ) : (
          <div className="bg-white">
            <HomeScreen onLogin={handleToken} />
          </div>
        )}
      </div>
    </NoteState>
  );
}

export default App;
