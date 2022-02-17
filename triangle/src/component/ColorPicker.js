import React, { Component } from 'react';

import CircularColor from 'react-circular-color';
import "../css/colorPicker.css";
import  'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css' ;



class Color extends Component {
  handleColorChange(color) {
    console.log(color); // it will be string with a color hash e.g. #1c1c1c
  }

  render() {
    return (
		<><div className='circularColor'>
			<CircularColor size={300} onChange={this.handleColorChange} />
		</div>
	  </>
    );
  }
}
export default Color

