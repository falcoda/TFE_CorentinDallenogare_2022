import neopixel
import board
import json
from adafruit_led_animation import helper
from ast import literal_eval


ORDER = neopixel.GRB
pixel_pin = board.D18
# Declare the states of the animation
status = True
effectOnRun = False

# Declare the brightness of the pixels
brightness =1

# Declare the color variable
allColor =(255,255,255)
# Define the number of NeoPixels
path='./config/config.json'
with open(path, 'r+',encoding='utf8') as f:
    data = json.load(f)
    print(data['number']*30 )
    num_pixels = data['number']*30
numTriangle = int(num_pixels/30)

pixels = neopixel.NeoPixel(
    pixel_pin, num_pixels, brightness=brightness, auto_write=False, pixel_order=ORDER
)

# Shut down the NeoPixels
if __name__ == '__main__':
    
    """
    Change the color of the pixels
    param: color: the color of the pixels
    """
    pixels.fill((0,0,0))
    pixels.show()


