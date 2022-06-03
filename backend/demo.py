import argparse
import neopixel
import board
import json
from adafruit_led_animation import helper
from ast import literal_eval

import modeTest

ORDER = neopixel.GRB
pixel_pin = board.D18
# Declare the states of the animation
status = True
effectOnRun = False


# Declare the color variable
allColor =(255,255,255)
# Define the number of NeoPixels
path='./config/config.json'
with open(path, 'r+',encoding='utf8') as f:
    data = json.load(f)
    print(data['number']*30 )
    num_pixels = data['number']*30
numTriangle = int(num_pixels/30)

# Declare the brightness of the pixels

brightnessPath='./config/brightness.json'
with open(brightnessPath, 'r+',encoding='utf8') as f:
    data = json.load(f)
    brightness =float(data['brightness'])/100
    print(brightness,"aaaa")

pixels = neopixel.NeoPixel(
    pixel_pin, num_pixels, brightness=brightness, auto_write=False, pixel_order=ORDER
)

map1 = helper.PixelMap(pixels, [(x,) for x in range(0,num_pixels)], individual_pixels=True)
# Define all the functions for the effects
function_mappings = {
    'rainbowWheel':  modeTest.rainbowWheel,
    'color':  modeTest.color,
    'colorWipe':  modeTest.colorWipe,
    'cometAllSameTime':  modeTest.triangleWipe,
    'randomEffects':  modeTest.randomEffects,# 
    'coteWipe':  modeTest.coteWipe,
    'chase':  modeTest.chase,
    'comet':  modeTest.comet,
    'rainbow':  modeTest.rainbow,
    'blink':  modeTest.blink,
    'solid':  modeTest.solid,
    'colorCycle':  modeTest.colorCycle,
    'pulse':  modeTest.pulse,
    'sparklePulse':  modeTest.sparklePulse,
    'sparkle':  modeTest.sparkle,

}
if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Input effects for ws2812b/neopixel")
    
    parser.add_argument('effect', type=str, help="Input Effect Type")
    args = parser.parse_args()
    args = args.effect
    print(args,"argument")
    modeDict = (literal_eval(args))
    modes=modeDict['mode']
    try:        
        function_mappings[modes](float(modeDict["speed"]),int(modeDict["length"]),int(modeDict["spacing"]),int(modeDict["period"]),map1,modeDict["rainbow"],modeDict["onAll"] )
    except KeyError:
        print('Invalid function, try again.')
   


