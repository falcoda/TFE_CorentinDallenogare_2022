
import "./css/colorPicker.css";
import React from "react";
import IroColorPicker from "./component/IroColorPicker";
import ColorChoice from "./component/ColorChoice";
import Brightness from "./component/BrightnessSlider";

class Color extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "#fffefa"
    };
  }
  onColorChange = color => {
    this.setState({
      color: color.hexString
    });
    console.log(color.hexString)
    // console.log(color.hexString);
  };
  render() {
    return (
      //style={{ background: `${this.state.color}` }}
      <div>  
        <IroColorPicker
          color={this.state.color}
          onColorChange={this.onColorChange}
        />
        
        <ColorChoice></ColorChoice>
        <Brightness></Brightness>
      </div>
    );
  }
}

export default Color

