from flask import Flask
from jinja2 import Undefined
import json
import hextorgb
import time
import os
import saveData
import neopixel
import mode
from adafruit_led_animation import helper
from flask import Flask, request, jsonify
from datetime import  timedelta, timezone
import datetime
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from dotenv import load_dotenv

# Load dotenv variables
load_dotenv()

# Create the application instance
app = Flask(__name__,static_folder='build', static_url_path='')

# Create a limiter for login attempts
limiter = Limiter(
    app,
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"]
)
# Define all the functions for the effects
function_mappings = {
    'rainbowWheel': mode.rainbowWheel,
    'color': mode.color,
    'colorWipe': mode.colorWipe,
    'cometAllSameTime': mode.cometAllSameTime,
    'randomEffects': mode.randomEffects,# 
    'coteWipe': mode.coteWipe,
    'chase': mode.chase,
    'comet': mode.comet,
    'rainbow': mode.rainbow,
    'blink': mode.blink,
    'solid': mode.solid,
    'colorCycle': mode.colorCycle,
    'pulse': mode.pulse,
    'sparklePulse': mode.sparklePulse,
    'sparkle': mode.sparkle,

}

# Defaults route for the frontend
@app.route('/')
def index():
    return app.send_static_file('./index.html')


# Create a JWT manager for this application
app.config["JWT_SECRET_KEY"] = "helloCodaTriangle"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=100)
jwt = JWTManager(app)


@app.route('/api/Login', methods=["POST"])
@limiter.limit("1/second", override_defaults=False)
def create_token():
    """
    Create a route for the login
    This route will be used to create a token
    The token will be sent to the frontend
    The frontend will use the token to make requests
    The limit for this route is set to 1 request per second
    Call this api passing a json with the username and password
    ---
    author Corentin Dallenogare <corentda@hotmail.fr>  
    """
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email != os.environ.get("USER") or password != os.environ.get("PASSWORD"):
        return {"msg": "Wrong email or password"}, 401

    access_token = create_access_token(identity=email)
    response = {"access_token":access_token}
    return response


@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.datetime.now(timezone.utc)
        target_timestamp = datetime.datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token 
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        return response



@app.route("/api/Logout", methods=["POST"])
def logout():
    """
    Create a route for the logout
    This route will be used to delete the token
    The token will be deleted from the frontend
    ---
    author Corentin Dallenogare <corentda@hotmail.fr>  
    """
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response


@app.route('/api/ChangeColor', methods=["POST"])
@jwt_required()
def changeColor():
    """
    Create a route for changing the color
    This route will be used to change the color of the neopixel
    The color will be received from the frontend
    The function update the allColor variable
    Call this api passing a json with the color
    ---
    author Corentin Dallenogare <corentda@hotmail.fr>  
    """
    data = request.get_json(force = True)
    print(data)
    mode.allColor=(hextorgb.hex_to_rgb(data))
    if(mode.effectOnRun ==False ):
        mode.color(data)
        mode.status = True
    
    return (data)



@app.route('/api/Mode', methods=["POST"])
@jwt_required()
def changeMode():
    """
    Create a route for changing the effect
    This route will be used to change the effect of the neopixel
    The effect will be received from the frontend
    The function update the effectOnRun and status variable
    Call this api passing a json with the effect name and parameters
    ---
    author Corentin Dallenogare <corentda@hotmail.fr>  
    """
    mode.status = False
    data = request.get_json(force = True)
    print(data)
    time.sleep(0.1)
    modes=data['mode']
    mode.stopTime = Undefined
    mode.pixels.fill(hextorgb.hex_to_rgb("#000000"))
    mode.pixels.show()
    try:        
        mode.effectOnRun = True
        map1 = helper.PixelMap(mode.pixels, [(x,) for x in range(0,mode.num_pixels)], individual_pixels=True)
        mode.status = True
        function_mappings[modes](float(data["speed"]),int(data["length"]),int(data["spacing"]),int(data["period"]),map1,data["rainbow"],data["onAll"] )
    except KeyError:
        print('Invalid function, try again.')
    return (data)


@app.route('/api/Off')
@jwt_required()
def setoff():
    """
    Create a route for changing the state of the neopixel
    This route will be used to change the state of the neopixel
    The state will be received from the frontend
    The function update the status variable
    Call this api passing a json with the state
    ---
    author: Corentin Dallenogare <corentda@hotmail.fr>  
    """
    if(mode.effectOnRun): 
        mode.powerOff("#000000") 
        mode.status = False
        mode.effectOnRun = False
    elif(mode.status):
        mode.status = False
        mode.powerOff("#000000") 
        
    else:
        mode.status = True
        mode.powerOff("#ffffff")  
    
    return ('off')


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
    mode.pixels.fill(hextorgb.hex_to_rgb("#000000"))
    mode.pixels.show()
    data = request.get_json(force = True)
    saveData.saveCount(int(data['number']))
    num_pixels=int(data['number'])*30
    print("num", num_pixels)
    mode.status = False
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
    mode.setBrightness(data['brightness'])
    # mode.num_pixels=int(data['number'])*30
    return (data)

@app.route('/api/Timer', methods=["POST"])
@jwt_required()
def timer():
    """
    Update the timer
    Call this api passing a json with the time
    ---
    author: Corentin Dallenogare <corentda@hotmail.fr>  

    """
    data = request.get_json(force = True)
    print(data)
    if data['date'] =="undefined":
        mode.stopTime = Undefined
    
    else:
        mode.stopTime =(datetime.datetime.fromtimestamp(data['date'] / 1000.0))
    return (data)


@app.route('/api/GetTimer', methods=["POST"])
@jwt_required()
def getTimer():
    """
    get the timer value 
    ---
    author: Corentin Dallenogare <corentda@hotmail.fr>  

    """
    if mode.stopTime == Undefined:
        return ("undefined")
    else: 
        return (str(mode.stopTime))


if __name__ == '__main__':
    app.run(debug=True)