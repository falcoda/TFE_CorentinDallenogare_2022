# SPDX-FileCopyrightText: 2021 ladyada for Adafruit Industries
# SPDX-License-Identifier: MIT

import time
import board
import neopixel
import hextorgb

from adafruit_led_animation.animation.comet import Comet
from adafruit_led_animation.animation.rainbowcomet import RainbowComet
from adafruit_led_animation.animation.rainbowchase import RainbowChase
from adafruit_led_animation.animation.chase import Chase
from adafruit_led_animation.animation.rainbow import Rainbow
from adafruit_led_animation.sequence import AnimationSequence
from adafruit_led_animation import helper
from adafruit_led_animation.color import PURPLE, JADE, AMBER

# On CircuitPlayground Express, and boards with built in status NeoPixel -> board.NEOPIXEL
# Otherwise choose an open pin connected to the Data In of the NeoPixel strip, i.e. board.D1
pixel_pin = board.D18

# On a Raspberry pi, use this instead, not all pins are supported
# pixel_pin = board.D18

# The number of NeoPixels
num_pixels = 60
numTriangle = int(num_pixels/30)
ORDER = neopixel.GRB

pixels = neopixel.NeoPixel(
    pixel_pin, num_pixels, brightness=1, auto_write=False, pixel_order=ORDER
)
allColor =(255,255,255)
# def powerOff():
#     pixels.fill((0, 0, 0))
#     pixels.show()
#     return('a')

# def powerOnn():
#     pixels.fill((0, 0, 0))
#     pixels.show()
#     return('a')

def color(color):
   # print(color)
    print(hextorgb.hex_to_rgb(color))
    global allColor 
    allColor= hextorgb.hex_to_rgb(color)
    print(allColor)
    pixels.fill(hextorgb.hex_to_rgb(color))
    pixels.show()

def wheel(pos):
    # Input a value 0 to 255 to get a color value.
    # The colours are a transition r - g - b - back to r.
    if pos < 0 or pos > 255:
        r = g = b = 0
    elif pos < 85:
        r = int(pos * 3)
        g = int(255 - pos * 3)
        b = 0
    elif pos < 170:
        pos -= 85
        r = int(255 - pos * 3)
        g = 0
        b = int(pos * 3)
    else:
        pos -= 170
        r = 0
        g = int(pos * 3)
        b = int(255 - pos * 3)
    return (r, g, b) if ORDER in (neopixel.RGB, neopixel.GRB) else (r, g, b, 0)


def rainbowWheel(speed,size,spacing,period,map_1):
    for j in range(255):
        for i in range(num_pixels):
            pixel_index = (i * 256 // num_pixels) + j
            pixels[i] = wheel(pixel_index & 255)
        pixels.show()
        time.sleep(speed)

def red():
    pixels.fill((255, 0, 0))
    pixels.show()

def colorWipe( speed,size,spacing,period,map_1) :
    global allColor
    print(allColor)
    for i in range(num_pixels):
        time.sleep(speed)
        pixels[i] = allColor
        pixels[i-15] = (0,0,0)
        pixels.show()
  
def colorWipeAllSameTime( speed,size,spacing,period,map_1) :
    global allColor
    for i in range(num_pixels):
        pixels[i] = allColor
        pixels[i+30] = allColor
        pixels[i-15] = (0,0,0)
        pixels[i-45] = (0,0,0)
        pixels.show()
        

def colorWipeOneByOne(speed,size,spacing,period,map_1) :
    global allColor
    for i in range(int(num_pixels/(num_pixels/30))):
        pixels[i] = allColor
        pixels[i+30] = allColor
        pixels[i-15] = (0,0,0)
        pixels[i-30] = (0,0,0)
        pixels.show()
        time.sleep(speed)

def coloreWipe2( speed,size,spacing,period,map_1) :
    global allColor
    for i in range(int(num_pixels/3)):
       # pixels[i] = allColor
        #pixels[i+30] = allColor
        pixels[i:i+10] = [(255,0,0)] * 10
        pixels[i-1:i-11] = [(255,0,0)] * 10
        pixels.show()
       # time.sleep(wait)


def allChaseWindow( speed,size,spacing,period,map_1) :
    global allColor
    
    chase = Chase(map_1, speed=speed ,size=size, spacing=spacing, color=allColor)
    group1 = AnimationSequence(chase)
    
    group1.animate()

def comet( speed,size,spacing,period,map_1) :
    global allColor
    comet = Comet(map_1, speed=speed, color=allColor, tail_length=round(size), bounce=True)
    group1 = AnimationSequence(comet)
    
    group1.animate()

def rainbowChase( speed,size,spacing,period,map_1) :
    global allColor
    rainbowChase= RainbowChase(map_1, speed=speed, size=size, spacing=spacing, step=period)
    group1 = AnimationSequence(rainbowChase)
    while True:
        group1.animate()

def rainbow(speed,size,spacing,period,map_1) :
    global allColor
    rainbow= Rainbow(map_1, speed=speed, period=period)
    group1 = AnimationSequence(rainbow)
    while True:
        group1.animate()

def twoTriangle( speed,size,spacing,period,map_1) :
    global allColor
    map1 = helper.PixelMap(pixels, [(x,) for x in range(0,30)], individual_pixels=True)
    map2 = helper.PixelMap(pixels, [(x,) for x in range(31,60)], individual_pixels=True)
    rainbow= Rainbow(map2, speed=speed, period=period)
    rainbow2= Rainbow(map1, speed=speed, period=period)
    group1 = AnimationSequence(rainbow)
    group2 = AnimationSequence(rainbow2)
    while True:
        group1.animate()
        group2.animate()

def rainbowCommet( speed,size,spacing,period,map_1) :
    global allColor
    rainbowCommet= RainbowComet(map_1, speed=speed, tail_length=size, bounce=True)
    group1 = AnimationSequence(rainbowCommet)
    while True:
        group1.animate()

def coteWipe( speed,size,spacing,period,map_1) :
    global allColor
    rainbowChase= RainbowChase(map_1, speed=speed, size=size, spacing=spacing, step=8)
    group1 = AnimationSequence(rainbowChase)
    while True:
        group1.animate()
        