
import './css/App.css';
import Color from './ColorPicker';
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


function App() {
  return (
    <div className="App">
    <Router>
      <div>
        
        <div className="">
          <div className="container">
             </div>
            <Routes>
              <Route path="/" element={<Color/>}/>
              <Route path="/mode" element={<Mode/>}/>
              <Route path="/settings" element={<Settings/>}/>
            
          </Routes>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossOrigin="anonymous"></script>
        </div>
        <Navbar></Navbar>
    </Router>
      
      
      
      </div>

  );
}

export default App;
