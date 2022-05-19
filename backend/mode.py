# SPDX-FileCopyrightText: 2021 ladyada for Adafruit Industries
# SPDX-License-Identifier: MIT

import time
import board
import neopixel
import hextorgb
import json
import random

from adafruit_led_animation.animation.comet import Comet
from adafruit_led_animation.animation.rainbowcomet import RainbowComet
from adafruit_led_animation.animation.rainbowchase import RainbowChase
from adafruit_led_animation.animation.chase import Chase
from adafruit_led_animation.animation.rainbow import Rainbow
from adafruit_led_animation.sequence import AnimationSequence
from adafruit_led_animation.animation.blink import Blink
from adafruit_led_animation.animation.solid import Solid
from adafruit_led_animation.animation.pulse import Pulse
from adafruit_led_animation.animation.colorcycle import ColorCycle
from adafruit_led_animation import helper
from adafruit_led_animation.group import AnimationGroup
from adafruit_led_animation.color import PURPLE, JADE, AMBER

# On CircuitPlayground Express, and boards with built in status NeoPixel -> board.NEOPIXEL
# Otherwise choose an open pin connected to the Data In of the NeoPixel strip, i.e. board.D1
pixel_pin = board.D18

# On a Raspberry pi, use this instead, not all pins are supported
# pixel_pin = board.D18

# The number of NeoPixels
path='./config/config.json'
with open(path, 'r+',encoding='utf8') as f:
    data = json.load(f)
    print(data['number']*30 )
    num_pixels = data['number']*30
numTriangle = int(num_pixels/30)
ORDER = neopixel.GRB
status = True
effectOnRun = False
brightness =1
pixels = neopixel.NeoPixel(
    pixel_pin, num_pixels, brightness=brightness, auto_write=False, pixel_order=ORDER
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


"""
Utillity functions
"""
def setBrightness(data): 
    global brightness
    brightness = int(data)/100
    print("a")
    global pixels
    pixels = neopixel.NeoPixel(
    pixel_pin, num_pixels, brightness=brightness, auto_write=False, pixel_order=ORDER
    )
    print('a')


def updatePixels(count):
    global brightness
    global pixels
    print(" count",count)
    global num_pixels
    num_pixels=count
    pixels = neopixel.NeoPixel(
    pixel_pin, count, brightness=brightness, auto_write=False, pixel_order=ORDER
    )



def color(color):
   # print(color)
    global status
    status = False
    print(hextorgb.hex_to_rgb(color))
    global allColor 
    allColor= hextorgb.hex_to_rgb(color)
    pixels.fill(hextorgb.hex_to_rgb(color))
    pixels.show()

def powerOff(state):
    pixels.fill(hextorgb.hex_to_rgb(state))
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


def rainbowWheel(speed,size,spacing,period,map_1,rainbow):
    """Draw rainbow that fades across all pixels at the same time.

    Keyword arguments:
    speed -- how fast to fade the rainbow, in seconds
    """
    speed = adaptSpeed(speed, 0.01)
    global status
    print(num_pixels)
    while status:
        for j in range(255):
            if(status):
                for i in range(num_pixels):
                    pixel_index = (i * 256 // num_pixels) + j
                    pixels[i] = wheel(pixel_index & 255)
                
                pixels.show()
                time.sleep(0.01-speed)
    """if status ==False :
        color("#000000") """


def colorWipe( speed,size,spacing,period,map_1,rainbow) :
    global allColor
    global status
    speed = adaptSpeed(speed, 0.1)
    if(num_pixels ==spacing):
        spacing -=1
    while status:
        for i in range(int(num_pixels)):
            if status ==False :
                break
            else:
                pixels[i] = allColor
                pixels[i-spacing] = (0,0,0)
                pixels.show()
                time.sleep(0.1- speed)
              
  
def cometAllSameTime( speed,size,spacing,period,map_1,rainbow) :
    global allColor
    speed = adaptSpeed(speed, 0.1)
    print(num_pixels)
    the_animations = []
    print(size)
    if size ==1 :
        size +=1
    for i in range(0,numTriangle) :
        print("cest" ,i)
        map1=helper.PixelMap(pixels, [(x,) for x in range(i*30,(i+1)*30)], individual_pixels=True)
        comet = Comet(map1, speed=(0.1-speed), color=(allColor), tail_length=round(size), bounce=False,ring=True)
        the_animations.append(comet)

    group = AnimationGroup(*the_animations)
    while status:
        group.color = allColor
        group.animate()
   
        

def colorWipeOneByOne(speed,size,spacing,period,map_1,rainbow) :
    global allColor
    global status
    the_animations = []
    
    for i in range(0,numTriangle) :
        choice = random.choice(["chase", "comet","rainbowChase"])
        print(choice)
        map1=helper.PixelMap(pixels, [(x,) for x in range(i*30,(i+1)*30)], individual_pixels=True)
        if (choice == "chase"):
            print("chase")
            speedChase = adaptSpeed(speed, 0.2)
            chase= Chase(map1,color=allColor, speed=0.2-speedChase, size=size, spacing=spacing)
            the_animations.append(chase)
            
        elif (choice == "comet"):
            print("comet")
            speedComet = adaptSpeed(speed, 0.1)
            comet = Comet(map1, speed=(0.1-speedComet), color=(allColor), tail_length=round(size), bounce=False,ring=True)
            the_animations.append(comet)

        elif (choice =="rainbowChase"):
            speedRainbowChase = adaptSpeed(speed, 0.2)
            rainbowChase= RainbowChase(map_1, speed=0.2-speedRainbowChase, size=size, spacing=spacing, step=round(period))
            the_animations.append(rainbowChase)
    print(the_animations)
    group = AnimationGroup(*the_animations)
    while status:
       # the_animations[0].color = (30,150,10)
        group.animate()
    

def colorWipe2( speed,size,spacing,period,map_1,rainbow) :
    global allColor
    speed = adaptSpeed(speed, 0.1)
    while status:
        for i in range(int(num_pixels)):
            if status ==False :
                break
            else :
                pixels[i:i+10] = [allColor] * 10
                pixels[i-10:i+1] = [(0,0,0)] * 11
                pixels.show()
                time.sleep(0.1-speed)


def chase( speed,size,spacing,period,map_1,rainbow) :
    global allColor
    global status
    status =False
    speed = adaptSpeed(speed, 0.2)
    print(speed)
    if (rainbow == True):
        status = True
        rainbowChase= RainbowChase(map_1, speed=0.2-speed, size=size, spacing=spacing, step=round(period)+10)
        group1 = AnimationSequence(rainbowChase)
        while status:
            group1.animate()
    else :
        status = True
        chase = Chase(map_1, speed=0.2-speed ,size=size, spacing=spacing, color=allColor)
        group1 = AnimationSequence(chase)
        while status:
            group1.color = allColor
            group1.animate()
    

def comet( speed,size,spacing,period,map_1,rainbow) :
    global allColor
    print(size)
    speed = adaptSpeed(speed, 0.1)
    if(size ==1):
        size +=1
    if(rainbow==False):
        
        comet = Comet(map_1, speed=(0.1-speed), color=(allColor), tail_length=round(size), bounce=False,ring=True)
        group1 = AnimationSequence(comet)
        while status:
            group1.color = allColor
            group1.animate()
    else : 
        rainbowCommet= RainbowComet(map_1, speed=(0.1-speed), tail_length=size, bounce=True)
        group1 = AnimationSequence(rainbowCommet)
        while status:
            group1.animate()



def rainbow(speed,size,spacing,period,map_1,rainbow) :
    """
    The classic rainbow color wheel.
    :param pixel_object: The initialised LED object.
    :param float speed: Animation refresh rate in seconds, e.g. ``0.1``.
    :param float period: Period to cycle the rainbow over in seconds.  Default 5.
    :param float step: Color wheel step.  Default 1.
    :param str name: Name of animation (optional, useful for sequences and debugging).
    :param bool precompute_rainbow: Whether to precompute the rainbow.  Uses more memory.
                                    (default True).
    """
    global allColor
    print(speed)
    speed = adaptSpeed(speed, 0.3)
    period =int(period+1/2)
    rainbow= Rainbow(map_1, speed=0.3-speed, period=period)
    group1 = AnimationSequence(rainbow)
    
    while status:
        group1.animate()

def twoTriangle( speed,size,spacing,period,map_1,rainbow) :
    global allColor
    map1 = helper.PixelMap(pixels, [(x,) for x in range(0,30)], individual_pixels=True)
    map2 = helper.PixelMap(pixels, [(x,) for x in range(31,60)], individual_pixels=True)
    rainbow= Rainbow(map2, speed=speed, period=period)
    rainbow2= Rainbow(map1, speed=speed, period=period)
    group1 = AnimationSequence(rainbow)
    group2 = AnimationSequence(rainbow2)
    
    while status:
        group1.animate()
   
        group2.animate()



def rainbowChase( speed,size,spacing,period,map_1,rainbow) :
    global allColor
    rainbowChase= RainbowChase(map_1, speed=speed, size=size, spacing=spacing, step=8)
    group1 = AnimationSequence(rainbowChase)
    while status:
        
        group1.animate()

def blink( speed,size,spacing,period,map_1,rainbow) :
    global allColor
    if(speed ==1):
        speed -=0.02
    blink= Blink(map_1, speed=(1-speed), color=allColor)
    group1 = AnimationSequence(blink)
    while status:
        group1.color = allColor
        group1.animate()

def solid( speed,size,spacing,period,map_1,rainbow) :
    global allColor
    solid= Solid(map_1, color=allColor)
    group1 = AnimationSequence(solid)
    while status:
        group1.color = allColor
        group1.animate()

def colorCycle( speed,size,spacing,period,map_1,rainbow) :
    global allColor
    speed = adaptSpeed(speed, 1)
    colorcycle= ColorCycle(map_1, speed=1-speed)
    group1 = AnimationSequence(colorcycle)
    while status:
        group1.animate()

def pulse( speed,size,spacing,period,map_1,rainbow) :
    global allColor
    speed=adaptSpeed(speed, 1)
    print(speed)
    pulse= Pulse(map_1, speed=0.001, color=allColor,period=1-speed)
    group1 = AnimationSequence(pulse)
    while status:
        group1.color = allColor
        group1.animate()
# def sparkle( speed,size,spacing,period,map_1,rainbow) :
#     global allColor
#     sparkle= Sparkle(map_1, speed=speed, color=allColor)
#     group1 = AnimationSequence(sparkle)
#     group1.animate()

def adaptSpeed(speed, maxSpeed): 
    return maxSpeed/1*speed