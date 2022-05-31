
import './css/App.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navbar from './component/Navbar';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'; 
import Mode from './Mode';
import Settings from './Settings';
import useToken from './component/useToken'
import JoyrideTour from './helper/JoyrideTour';
import Login from './component/Login';
import Color from './Color';
import { Toaster } from 'react-hot-toast';

import {useState}from 'react';

function App() {

  const { token, removeToken, setToken } = useToken();
  const [stepIndex, setStepIndex] = useState(0);
 
  return (
    <Router>
     
    <div className="App">
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossOrigin="anonymous"></script>
    
        {!token && token!=="" &&token!== undefined?  
        <Login setToken={setToken} />
        :(
          
          <div className='home'>
            <JoyrideTour stepIndex={stepIndex} setStepIndex={setStepIndex} />
            <Routes>
              <Route path="/" element={<Color token={token} setToken={setToken} stepIndex={stepIndex} setStepIndex={setStepIndex} />}/>
              <Route path="/mode" element={<Mode  token={token} stepIndex={stepIndex} setStepIndex={setStepIndex}  />}/>
              <Route path="/settings" element={<Settings token={token} setToken={setToken}/>}/>
            </Routes>
            <Navbar token={token}></Navbar>
          </div>
          
        )}
        
      </div>
      <Toaster position="top-center" reverseOrder={false}/>
      </Router>

  );
}

export default App;
