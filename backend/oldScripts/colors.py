import json
import argparse
import neopixel
import board
import time
import hextorgb
ORDER = neopixel.GRB
pixel_pin = board.D18

# Define the number of NeoPixels
path='./config/config.json'
with open(path, 'r+',encoding='utf8') as f:
    data = json.load(f)
    print(data['number']*30 )
    num_pixels = data['number']*30
numTriangle = int(num_pixels/30)

brightnessPath='./config/brightness.json'
with open(brightnessPath, 'r+',encoding='utf8') as f:
    data = json.load(f)
    brightness =float(data['brightness'])/100

# Declare the color variable
colorPath='./config/color.json'
with open(colorPath, 'r+',encoding='utf8') as f:
    data = json.load(f)
    allColor = hextorgb.hex_to_rgb(data['color'])

if __name__ == '__main__':
    """
    Update the number of pixels
    Param: count: int
    Update the number of pixels in the config file
    """
     
    pixels = neopixel.NeoPixel(
        pixel_pin, num_pixels, brightness=brightness, auto_write=False, pixel_order=ORDER
    )

    def getColor():
        colorPath='./config/color.json'
        global allColor
        with open(colorPath, 'r+',encoding='utf8') as f:
            data = json.load(f)
            allColor = hextorgb.hex_to_rgb(data['color'])

    while True :
        getColor()
        pixels.fill(allColor)
        pixels.show()