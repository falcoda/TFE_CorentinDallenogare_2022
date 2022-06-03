import json
import argparse
import neopixel
import board
import time
path='./config/config.json'
ORDER = neopixel.GRB
pixel_pin = board.D18

# Define the old number of NeoPixels
path='./config/config.json'
with open(path, 'r+',encoding='utf8') as f:
    data = json.load(f)
    oldNumPixels = data['number']*30

if __name__ == '__main__':
    """
    Update the number of pixels
    Param: count: int
    Update the number of pixels in the config file
    """
    parser = argparse.ArgumentParser(description="Input effects for ws2812b/neopixel")
    
    parser.add_argument('effect', type=str, help="Input Effect Type")
    args = parser.parse_args()
    count = int(args.effect)

    
    if(count!='' and count>=0):
        with open(path, 'r+',encoding='utf8') as f:
            data = json.load(f)
            print(count)
            data['number'] =count
            f.seek(0)
            json.dump(data, f, indent=4,ensure_ascii=False)
    
    
    
    numPixels=count*30
    numTriangle =int(numPixels/30)
    pixels = neopixel.NeoPixel(
    pixel_pin, oldNumPixels, brightness=1, auto_write=False, pixel_order=ORDER
    )
    pixels.fill((0,0,0))
    pixels.show()
    pixels = neopixel.NeoPixel(
    pixel_pin, numPixels, brightness=1, auto_write=False, pixel_order=ORDER
    )
    for i in range(numTriangle):
        pixels.fill((255,255,255))
        pixels.show()
        time.sleep(0.2)
        pixels.fill((0,0,0))
        pixels.show()
        time.sleep(0.2)