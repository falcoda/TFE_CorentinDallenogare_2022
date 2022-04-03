
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
   
    let data = JSON.stringify(color.hexString);
    fetch(`http://127.0.0.1:5000/changeColor`,{
      method: "POST",
      mode: "no-cors",
      body: data,
      datatype: "json",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    })
  .then(response => response.json())
  .catch(error => console.log(error))
  
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

