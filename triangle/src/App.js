
import './css/App.css';
import Color from './Color';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import bootstrapBundleMin from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from './component/Navbar';
import {BrowserRouter as Router, Route, Routes, Redirect} from 'react-router-dom'; 
import Mode from './Mode';
import Settings from './Settings';
import useToken from './component/useToken'
import Login from './component/Login';
import Header from './component/Header';
import Profile from './component/Profile';

function App() {
  const { token, removeToken, setToken } = useToken();
  return (
    <Router>
    <div className="App">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossOrigin="anonymous"></script>
    
        {!token && token!=="" &&token!== undefined?  
        <Login setToken={setToken} />
        :(
          <>
            
            <Routes>
              <Route path="/" element={<Color token={token} setToken={setToken}/>}/>
              <Route path="/mode" element={<Mode  token={token}/>}/>
                <Route path="/settings" element={<Settings token={token} setToken={setToken}/>}/>
              <Route exact path="/profile" element={<Profile token={token} setToken={setToken}/>}></Route>
            </Routes>
          </>
        )}

      </div>
      <Navbar></Navbar>
      </Router>

  );
}

export default App;
