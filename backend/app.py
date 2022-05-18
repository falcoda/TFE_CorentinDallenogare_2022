from flask import Flask
import powerOff
import changeColors
import json
import hextorgb
import time
import test
import saveData
import board
import neopixel
import mode
from adafruit_led_animation import helper
from flask import Flask, request, jsonify
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager


app = Flask(__name__)
ORDER = neopixel.GRB
pixels = neopixel.NeoPixel(
    mode.pixel_pin, mode.num_pixels, brightness=1, auto_write=False, pixel_order=ORDER
)
function_mappings = {
    'rainbowWheel': mode.rainbowWheel,
    'color': mode.color,
    'colorWipe': mode.colorWipe,
    'coteWipe': mode.coteWipe,
    'colorWipeAllSameTime': mode.colorWipeAllSameTime,
    'colorWipeOneByOne': mode.colorWipeOneByOne,
    'colorWipe2': mode.colorWipe2,
    'chase': mode.chase,
    'comet': mode.comet,
    'rainbow': mode.rainbow,
    'blink': mode.blink,
    'solid': mode.solid,
    'colorCycle': mode.colorCycle,
    'pulse': mode.pulse,

}
path='./config/config.json'
with open(path, 'r+',encoding='utf8') as f:
    data = json.load(f)
    print(data['number']*30 )
    num_pixels = data['number']*30
pixel_pin = board.D18
ORDER = neopixel.GRB

pixels = neopixel.NeoPixel(
    pixel_pin, num_pixels, brightness=1, auto_write=False, pixel_order=ORDER
)

app.config["JWT_SECRET_KEY"] = "helloCodaTriangle"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(app)

@app.route('/api/Login', methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email != "test" or password != "test":
        return {"msg": "Wrong email or password"}, 401

    access_token = create_access_token(identity=email)
    response = {"access_token":access_token}
    return response


@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token 
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response


@app.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response

@app.route('/')
def hello_world():
    powerOff.shutdown()
    return 'Hello, World!'


@app.route('/profile')
@jwt_required() #new line
def my_profile():
    response_body = {
        "name": "Nagato",
        "about" :"Hello! I'm a full stack developer that loves python and javascript"
    }

    return response_body


@app.route('/api/ChangeColor', methods=["POST"])
@jwt_required()
def changeColor():
    
    mode.status = False
    data = request.get_json(force = True)
    print(data)
    mode.color(data)
    
    return (data)

@app.route('/api/Mode', methods=["POST"])
@jwt_required()
def wheels():
    
    mode.status = False
    data = request.get_json(force = True)
    print(data)
    # while status :
    #     mode.rainbowWheel(0.001)
    modes=data['mode']
    print(mode)
    try:
        print("yes")
        print(function_mappings[modes])
        print(mode.num_pixels)
        mode.status = True
        map1 = helper.PixelMap(pixels, [(x,) for x in range(0,mode.num_pixels)], individual_pixels=True)
        mode.allColor=(255,255,255)
        while mode.status :
            function_mappings[modes](float(data["speed"]),int(data["length"]),int(data["spacing"]),int(data["period"]),map1,data["rainbow"] )
    except KeyError:
            print('Invalid function, try again.')   
    # test.mode(data["speed"],data["length"])
    return (data)


def select_function():
    while True:
        try:
            return function_mappings[raw_input('Please input the function you want to use')]
        except KeyError:
            print('Invalid function, try again.')

@app.route('/colorWipe')
def colorWipe():
    
    mode.status = False
    while mode.status :
        mode.colorWipe(0.1)
    
    return ('yes')

@app.route('/allChaseWindow')
def allChaseWindow():
    
    mode.status = False
    while mode.status :
        mode.allChaseWindow(0.1,3,7)#speed size spacing 
    
    return ('yes')

@app.route('/off')
def setoff():
    
    mode.status = False
    if(mode.status):
        mode.status = False
        time.sleep(0.5)
        mode.color("#000000")  
    else:
        mode.status = True
        mode.color("#ffffff")
    
    return ('yes')


@app.route('/api/ChangeNumber', methods=["POST"])
@jwt_required()
def changeNumber():
    """
    Update the number of pixels 
    Call this api passing a json with the number of pixels
    ---
    author: Corentin Dallenogare <corentda@hotmail.fr>  

    """
    global num_pixels

    data = request.get_json(force = True)
    saveData.saveCount(int(data['number']))
    num_pixels=int(data['number'])*30
    return (data)


@app.route('/api/ChangeBrightness', methods=["POST"])
@jwt_required()
def changeBrightness():
    """
    Update the brightness of pixels 
    Call this api passing a json with the brightness
    ---
    author: Corentin Dallenogare <corentda@hotmail.fr>  

    """
    data = request.get_json(force = True)
    print(data['brightness'])
    #mode.setBrightness(data)
    # mode.num_pixels=int(data['number'])*30
    return (data)

@app.route('/test')
@jwt_required()
def test():
 
    return ('yes')
if __name__ == '__main__':
    app.run(debug=True)