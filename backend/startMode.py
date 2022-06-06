import argparse
import neopixel
import board
import json
from adafruit_led_animation import helper
from ast import literal_eval
import modes

# Order of the pixel colors:
ORDER = neopixel.GRB

# Define the pin connected to the Raspberry Pi
pixel_pin = board.D18

# Declare the states of the animation
status = True

# Declare the color variable
allColor =(255,255,255)

# Define the number of pixels
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

# Create the NeoPixel object
pixels = neopixel.NeoPixel(
    pixel_pin, num_pixels, brightness=brightness, auto_write=False, pixel_order=ORDER
)
# Create a mapping 
map1 = helper.PixelMap(pixels, [(x,) for x in range(0,num_pixels)], individual_pixels=True)

# Define all the functions for the effects
function_mappings = {
    'rainbowWheel':  modes.rainbowWheel,
    'color':  modes.color,
    'colorWipe':  modes.colorWipe,
    'cometAllSameTime':  modes.triangleWipe,
    'randomEffects':  modes.randomEffects,# 
    'coteWipe':  modes.coteWipe,
    'chase':  modes.chase,
    'comet':  modes.comet,
    'rainbow':  modes.rainbow,
    'blink':  modes.blink,
    'solid':  modes.solid,
    'colorCycle':  modes.colorCycle,
    'pulse':  modes.pulse,
    'sparklePulse':  modes.sparklePulse,
    'sparkle':  modes.sparkle,
    'CometsChase': modes.cometsChase,

}

if __name__ == '__main__':
    # get the arguments
    parser = argparse.ArgumentParser(description="Input effects for ws2812b/neopixel")
    parser.add_argument('effect', type=str, help="Input Effect Type")
    args = parser.parse_args()
    args = args.effect
    
    modeDict = (literal_eval(args))
    # create a list with the parameters of the effect
    modesDict=modeDict['mode']
    try:    
        if(modeDict['mode'] == "gradiant"):
            modes.gradiant(float(modeDict["speed"]),modeDict['colors'])
        else :    
            function_mappings[modesDict](float(modeDict["speed"]),int(modeDict["length"]),int(modeDict["spacing"]),int(modeDict["period"]),map1,modeDict["rainbow"],modeDict["onAll"] )
    except KeyError:
        print('Invalid function, try again.')
   


