
import './css/App.css';
import Color from './component/ColorPicker';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Brightness from './component/BrightnessSlider';
import ColorChoice from './component/ColorChoice';


function App() {
  return (
    <div className="App">
      
      <Color></Color>
      <ColorChoice></ColorChoice>
      <Brightness></Brightness>
    </div>
  );
}

export default App;
