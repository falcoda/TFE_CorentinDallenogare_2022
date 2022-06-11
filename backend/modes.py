import time
import board
import neopixel
import hextorgb
import json
import random
import datetime
from cometChase import CometsChase
import adafruit_fancyled.adafruit_fancyled as fancy
from adafruit_led_animation.animation.comet import Comet
from adafruit_led_animation.animation.rainbowcomet import RainbowComet
from adafruit_led_animation.animation.rainbowchase import RainbowChase
from adafruit_led_animation.animation.rainbowsparkle import RainbowSparkle
from adafruit_led_animation.animation.chase import Chase
from adafruit_led_animation.animation.rainbow import Rainbow
from adafruit_led_animation.sequence import AnimationSequence
from adafruit_led_animation.animation.blink import Blink
from adafruit_led_animation.animation.pulse import Pulse
from adafruit_led_animation.animation.sparkle import Sparkle
from adafruit_led_animation.animation.sparklepulse import SparklePulse
from adafruit_led_animation.animation.colorcycle import ColorCycle
from adafruit_led_animation import helper
from adafruit_led_animation.group import AnimationGroup
import RPi.GPIO as GPIO

pixel_pin = board.D18

# Define the pin for the microphone
# Actually the microphone is not used in this case, but it is useful to know
MicPin = 3
GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)
GPIO.setup(MicPin, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)

# Define the number of NeoPixels
path='./config/config.json'
with open(path, 'r+',encoding='utf8') as f:
    data = json.load(f)
    num_pixels = data['number']*30
numTriangle = int(num_pixels/30)

# Define the order of the pixels
ORDER = neopixel.GRB

# Declare the states of the animation
status = True
effectOnRun = False

# Declare the brightness of the pixels
brightnessPath='./config/brightness.json'
with open(brightnessPath, 'r+',encoding='utf8') as f:
    data = json.load(f)
    brightness =float(data['brightness'])/100

# Declare the color variable
colorPath='./config/color.json'
with open(colorPath, 'r+',encoding='utf8') as f:
    data = json.load(f)
    allColor = hextorgb.hex_to_rgb(data['color'])

# Declare the stopTime variable
timerPath='./config/timer.json'
with open(timerPath, 'r+',encoding='utf8') as f:
    data = json.load(f)
    stopTime =data['time']
    if stopTime != "undefined":
        stopTime =(datetime.datetime.fromtimestamp(int(stopTime )/ 1000.0))


# Create a NeoPixel object
pixels = neopixel.NeoPixel(
    pixel_pin, num_pixels, brightness=brightness, auto_write=False, pixel_order=ORDER
)



"""
Utillity functions
"""

def getColor():
    path='./config/color.json'
    global allColor
    with open(path, 'r+',encoding='utf8') as f:
        data = json.load(f)
        allColor = hextorgb.hex_to_rgb(data['color'])

def timeChecker() :
    """
    Update the status of the animation when the time is over
    """
    currentTime=(datetime.datetime.now())
    global stopTime
    global status       
    
    if  stopTime != "undefined":
        if(currentTime<stopTime):
            status = True
            return True
        else :
            with open(timerPath, 'w',encoding='utf8') as f:
                data ={'time':"undefined"} 
                f.seek(0)
                json.dump(data, f, indent=4,ensure_ascii=False)
            status = False
            return False

def adaptSpeed(speed, maxSpeed): 
    return maxSpeed/1*speed


""" 
Modes functions
"""
def color(color):
    """
    Change the color of the pixels
    param: color: the color of the pixels
    """
    global status
    status = False
    global allColor 
    allColor= hextorgb.hex_to_rgb(color)
    pixels.fill(hextorgb.hex_to_rgb(color))
    pixels.show()
    return allColor

def powerOff(state):
    """
    Power off/on the pixels
    param: state: the color of the pixels
    """
    pixels.fill(hextorgb.hex_to_rgb(state))
    pixels.show()
    return state 

def wheel(pos):
    """ 
    Generate rainbow colors across 0-255 positions.
    The colours are a transition r - g - b - back to r.
    param: pos: the position of the color
    """
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
    return (r, g, b) 




def rainbowWheel(speed,size,spacing,period,map_1,rainbow,onAll):
    """
    Draw rainbow that fades across all triangles at the same time.

    Keyword arguments:
    speed -- how fast to fade the rainbow, in seconds
    onAll --  turn on all triangles on same time or just turn one
    """
    global status
    if (onAll):
        speed = (adaptSpeed(speed, 0.001))
        
        while status:   
            timeChecker()     
            for j in range(255):
                for i in range(numTriangle):
                    for k in range (30):
                        pixel_index = (((k)+i) *255 //30) + j
                        pixels[i*30+k] = wheel(pixel_index & 255)
                
                pixels.show()
                time.sleep(0.001-speed)
    else :
        speed = (0.007*numTriangle) -numTriangle*(adaptSpeed(speed, 0.007))
        while status:
            timeChecker() 
            for j in range(255):
                for i in range(num_pixels):
                    pixel_index = (i * 256 // num_pixels) + j
                    pixels[i] = wheel(pixel_index & 255)
                
                pixels.show()
                time.sleep(speed)
    if(status == False) :
        powerOff("#000000")
        return False

def colorWipe( speed,size,spacing,period,map_1,rainbow,onAll) :
    """
    Draw a line in the specified color across the whole display.
    param : speed: the speed of the animation
    param : spacing: the spacing between leds on
    """
    global allColor
    global status
    speed = adaptSpeed(speed, 0.1)
    spacing = spacing *(numTriangle//2)
    if(num_pixels ==spacing):
        spacing -=1
    while status:
        timeChecker()
        for i in range(int(num_pixels)):
            pixels[i] = allColor
            pixels[i-spacing] = (0,0,0)
            getColor()
            pixels.show()
            time.sleep(0.1- speed)
    if(status == False) :
        powerOff("#000000")
              
  
def triangleWipe( speed,size,spacing,period,map_1,rainbow,onAll) :
    """
    Actually do nothing
    it is for use a microphone
    """
    global allColor
    speed = adaptSpeed(speed, 0.2)
    period = 10//30*period
    if period >10 :
        period = 10
    
    period = 10-period
    while status:
        timeChecker()
        for j in range(0,(255-(numTriangle*period)),8):
            for k in range(numTriangle+1) :
                if rainbow :
                    color = wheel(j)
                else :
                    getColor()
                    color = allColor
                if onAll :
                    pixels[(k*30):(k*30)+30] = [(0,0,0)] * 30
                    pixels[(k*30)-30:(k*30)] = [color] * 30
                else :
                    pixels[(k*30):(k*30)+30] = [color] * 30
                    pixels[(k*30)-30:(k*30)+1] = [(0,0,0)] * 31
                j +=period
                pixels.show()
                time.sleep(0.2-speed)
                 
    if(status == False) :
        powerOff("#000000")


def cometsChase(speed,size,spacing,period,map_1,rainbow,onAll) :   
    """
    Draw a line in the specified color across the whole display.
    param : speed: the speed of the animation
    param : size : the size of the comet
    """
    global allColor
    speed=adaptSpeed(speed, 0.2)
    sparkle= CometsChase(map_1, speed=0.1-speed, color=allColor, size=size, spacing=0, reverse=True,)
    group1 = AnimationSequence(sparkle)
    while status:
        getColor()
        timeChecker()
        group1.color = allColor
        group1.animate()
    if(status == False) :
        powerOff("#000000")

def gradiant(speed,colors) :   
    """
    Draw a gradiant with two colors
    param : speed: the speed of the animation
    param : colors : the colors of the gradiant
    """
    colors1 = hextorgb.hex_to_rgb(colors[0])
    colors2 = hextorgb.hex_to_rgb(colors[1])
    palette = [
           fancy.CRGB(colors1[0],colors1[1],colors1[2]),    
           fancy.CRGB(colors2[0],colors2[1],colors2[2])]     

    offset = 0  # Position offset into palette to make it "spin"
    speed= adaptSpeed(speed, 0.02)
    while status:
        timeChecker()
        for i in range(num_pixels):
            color = fancy.palette_lookup(palette, offset + i / num_pixels-1)
            pixels[i] = color.pack()
        pixels.show()

        offset += speed  # Bigger number = faster spin
    if(status == False) :
        powerOff("#000000")

def randomEffects(speed,size,spacing,period,map_1,rainbow,onAll) :
    """
    Display random effects
    """
    global allColor
    global status
    global numTriangle
    the_animations = []
    if(period ==30):
        period -= 1
    speed = adaptSpeed(speed, 0.2)
    for i in range(0,numTriangle) :
        choice = random.choice(["chase", "comet","rainbowChase","pulse"])
        maps=helper.PixelMap(pixels, [(x,) for x in range(i*30,(i+1)*30)], individual_pixels=True)
        if (choice == "chase"):
            speedChase = adaptSpeed(speed, 0.2)
            chase= Chase(maps,color=allColor, speed=0.32-speedChase, size=size, spacing=spacing)
            the_animations.append(chase)
            
        elif (choice == "comet"):
            sizeCommet = size
            if(size ==1):
                sizeCommet =size+2
            comet = Comet(maps, speed=(0.1), color=(allColor), tail_length=sizeCommet)
            the_animations.append(comet)

        elif (choice =="rainbowChase"):
            speedRainbowChase = adaptSpeed(speed, 0.2)
            rainbowChase= RainbowChase(maps, speed=0.32-speedRainbowChase, size=size, spacing=spacing, step=round(period))
            the_animations.append(rainbowChase)
        elif (choice =="pulse"):
            speedPulse=adaptSpeed(speed, 2)
            pulse= Pulse(maps, speed=0.1, color=allColor,period=2.1-speedPulse)
            the_animations.append(pulse)

    group = AnimationGroup(*the_animations)
    while status:
        timeChecker()
        getColor()
        for i in range(0,numTriangle):
            try:
                the_animations[i].color = allColor
            except :
                pass
        group.animate()
    if(status == False) :
        powerOff("#000000")
    

def coteWipe( speed,size,spacing,period,map_1,rainbow,onAll) :
    """
    Draw a line that turns into a triangle
    param : speed: the speed of the animation
    param : rainbow : if the animation is rainbow
    """
    global allColor
    global numTriangle
    global status
    speed = adaptSpeed(speed, 0.1)
    while status:
        timeChecker()
        for j in range(0,255,8):
            for i in range(0,int(30),10):
                for k in range(numTriangle+1) :
                    if rainbow :
                        color = wheel(j)
                    else :
                        getColor()
                        color = allColor
                    pixels[(i+(k*30)):(i+(k*30))+10] = [color] * 10
                    pixels[(i+(k*30))-10:(i+(k*30))+1] = [(0,0,0)] * 11
                    pixels.show()
                    time.sleep(0.1-speed)
               
    if(status == False) :
        powerOff("#000000")


def chase( speed,size,spacing,period,map_1,rainbow,onAll) :
    """
    Chase pixels in one direction in a single color, like a theater marquee sign.
    :param map1: The initialised LED object.
    :param float speed: Animation speed rate in seconds.
    :param size: Number of pixels to turn on in a row.
    :param spacing: Number of pixels to turn off in a row.
    :param rainbow: if the animation is rainbow.
    """
    global allColor
    global status
    speed = adaptSpeed(speed, 0.2)
    size = size* (numTriangle//2)
    spacing = spacing* (numTriangle//2)
    if (rainbow):
        rainbowChase= RainbowChase(map_1, speed=0.2-speed, size=size, spacing=spacing, step=62-round(period)*2)
        group1 = AnimationSequence(rainbowChase)
        while status:
            timeChecker()
            group1.animate()
    else :
        chase = Chase(map_1, speed=0.2-speed ,size=size, spacing=spacing, color=allColor)
        group1 = AnimationSequence(chase)
        while status:
            getColor()
            timeChecker()
            group1.color = allColor
            group1.animate()
    if(status == False) :
        powerOff("#000000")
    
    

def comet( speed,size,spacing,period,map_1,rainbow,onAll) :
    """
    Draw a line that turns into a triangle
    A comet animation.
    :param map_1: The initialised LED object.
    :param float speed: Animation speed in seconds.*.
    :param size: Number of pixels to turn on in a row.
    :param rainbow: if the animation is rainbow.
    """
    global allColor
    global numTriangle
    
    if(size ==1):
        size +=1
    
    if (onAll== False):
        size = size * numTriangle
        speed = adaptSpeed(speed, 0.1)
        if(rainbow==False):
            
            comet = Comet(map_1, speed=(0.1-speed), color=(allColor), tail_length=round(size), bounce=False,ring=True)
            group1 = AnimationSequence(comet)
            while status:
                getColor()
                timeChecker()
                group1.color = allColor
                group1.animate()
        else : 
            rainbowCommet= RainbowComet(map_1, speed=(0.1-speed), tail_length=size, bounce=False, ring=True)
            group1 = AnimationSequence(rainbowCommet)
            while status:
                timeChecker()
                group1.animate()
    
    else :
        the_animations = []
        speed = (adaptSpeed(speed, 0.098)/numTriangle)
        for i in range(0,numTriangle) :
            maps=helper.PixelMap(pixels, [(x,) for x in range(i*30,(i+1)*30)], individual_pixels=True)  
            if(rainbow==False):
                comet = Comet(maps, speed=(0.15), color=(allColor), tail_length=round(size), bounce=False,ring=True)
                the_animations.append(comet)
                
            else : 
                rainbowCommet= RainbowComet(maps, speed=(0.15), tail_length=size, bounce=True)
                the_animations.append(rainbowCommet)

        group = AnimationGroup(*the_animations)
        while status:
            timeChecker()
            group.animate()
    if(status == False) :
        powerOff("#000000")


def rainbow(speed,size,spacing,period,map_1,rainbow,onAll) :
    """
    The classic rainbow color wheel.
    :param map1: The initialised LED object.
    :param float speed: Animation refresh rate in seconds.
    :param float period: Period to cycle the rainbow over in seconds.
    """
    global allColor
    global numTriangle
    period =int(period+1/2)
    if (onAll== True):
        speed = adaptSpeed(speed, 0.3)
        rainbow= Rainbow(map_1, speed=0.3-speed, period=period)
        group1 = AnimationSequence(rainbow)
        
        while status:
            timeChecker()
            group1.animate()
        if(status == False) :
            powerOff("#000000")
    else :
        speed = (adaptSpeed(speed, 0.3)/numTriangle)*4.5
        
        the_animations = []
        for i in range(0,numTriangle) :
            maps=helper.PixelMap(pixels, [(x,) for x in range(i*30,(i+1)*30)], individual_pixels=True)  
            rainbow= Rainbow(maps, speed=0.3-speed, period=period)
            the_animations.append(rainbow)

        group = AnimationGroup(*the_animations)
        while status:
            timeChecker()
            group.animate()
        if(status == False) :
            powerOff("#000000")


def blink( speed,size,spacing,period,map_1,rainbow,onAll) :
    """
    Blink the pixels in and out.
    :param speed: Animation speed in seconds.

    """
    global allColor
    if(speed ==1):
        speed -=0.02
    blink= Blink(map_1, speed=(1-speed), color=allColor)
    group1 = AnimationSequence(blink)
    while status:
        # Check if the color has changed
        getColor()
        # Check if the animation should be stopped
        timeChecker()
        group1.color = allColor
        group1.animate()
    if(status == False) :
        powerOff("#000000")

def solid( speed,size,spacing,period,map_1,rainbow,onAll) :
    """
    Solid color.
    """
    global allColor
    while status:
        timeChecker()
        getColor()
        pixels.fill(allColor)
        pixels.show()
    if(status == False) :
        powerOff("#000000")
def colorCycle( speed,size,spacing,period,map_1,rainbow,onAll) :
    """
    Display a color cycle.
    :param map_1: The initialised LED object.
    :param float speed: Animation speed in seconds.
    :param onAll: use a defined color cycle or not.
    """
    global allColor
    global status
    
    if(onAll) :
        speed = adaptSpeed(speed, 1)
        colorcycle= ColorCycle(map_1, speed=1-speed)
        group1 = AnimationSequence(colorcycle)
        while status:
            timeChecker()
            group1.animate()
        
        if(status == False) :
            powerOff("#000000")
    
    else :
        global numTriangle
        the_animations = []
        colorList = [
        (0,0,255),(0,255,255),(255,0,255),(255,0,0),(255,255,255)
        ]
        speed = adaptSpeed(speed, 2)
        
        for i in range(0,numTriangle) :
            maps=helper.PixelMap(pixels, [(x,) for x in range(i*30,(i+1)*30)], individual_pixels=True)         
        
            colorcycle= ColorCycle(maps, speed=2.3-speed,colors=colorList)
            the_animations.append(colorcycle)

        group = AnimationGroup(*the_animations)
        while status:
            timeChecker()
            group.animate()
        if(status == False) :
            powerOff("#000000")

def pulse( speed,size,spacing,period,map_1,rainbow,onAll) :
    """
    Create a pulse effect.
    :param map_1: The initialised LED object.
    :param float speed: Animation speed in seconds.
    """
    global allColor
    speed=adaptSpeed(speed, 1)
    pulse= Pulse(map_1, speed=0.001, color=allColor,period=1.01-speed)
    group1 = AnimationSequence(pulse)
    while status:
        getColor()
        timeChecker()
        group1.color = allColor
        group1.animate()
    if(status == False) :
        powerOff("#000000")

def sparklePulse( speed,size,spacing,period,map_1,rainbow,onAll) :
    """
    Create a effecct with sparkles and pulses.  
    :param map_1: The initialised LED object.
    :param float speed: Animation speed in seconds.
    :param period: Period to cycle the rainbow over in seconds. 
    """
    global allColor
    speed=adaptSpeed(speed, 0.2)
    sparkle= SparklePulse(map_1, speed=0.21-speed, color=allColor, period=period)
    group1 = AnimationSequence(sparkle)
    while status:
        getColor()
        timeChecker()
        group1.color = allColor
        group1.animate()
    if(status == False) :
        powerOff("#000000")
    

def sparkle( speed,size,spacing,period,map_1,rainbow,onAll) :
    """
    Create a effecct with sparkles.
    :param map_1: The initialised LED object.
    :param float speed: Animation speed in seconds.
    :param period: Period to cycle the rainbow over in seconds.
    :param onAll: if on all triangles or not.
    :rainbow: if rainbow or not.
    """
    global allColor
    global numTriangle
    
    if (onAll == False):
        speed=adaptSpeed(speed, 0.2)
        if (rainbow == False):
            sparkle= Sparkle(map_1, speed=0.1-speed, color=allColor,num_sparkles=5)
            group1 = AnimationSequence(sparkle)
            while status:
                getColor()
                timeChecker()
                group1.color = allColor
                group1.animate()
            if(status == False) :
                powerOff("#000000")
        else :
            sparkle= RainbowSparkle(map_1, speed=0.1-speed, period = period, step =1)
            group1 = AnimationSequence(sparkle)
            while status:
                timeChecker()
                group1.color = allColor
                group1.animate()
            if(status == False) :
                powerOff("#000000")
    else :
        speed= (adaptSpeed(speed, 0.5))
        if speed <0.3 :
            speed = 0.3
        the_animations = []
        for i in range(0,numTriangle) :
            maps=helper.PixelMap(pixels, [(x,) for x in range(i*30,(i+1)*30)], individual_pixels=True)         
            
            sparkle= RainbowSparkle(maps, speed=speed, period = period, step =1)
            the_animations.append(sparkle)

        group = AnimationGroup(*the_animations)
        while status:
            timeChecker()
            for i in range(0,numTriangle):
                try:
                    the_animations[i].color = allColor
                except :
                    pass
            group.animate()

        if(status == False) :
            powerOff("#000000")

def music( speed,size,spacing,period,map_1,rainbow,onAll) :
    """
    Actually do nothing
    it is for use a microphone
    """
    global allColor
    
    while status:
        # hight
        if(GPIO.input(MicPin) ==1):
            pixels.fill((255,0,255))
            pixels.show()
        # low
        else : 
            pixels.fill((0,0,0))
            pixels.show()