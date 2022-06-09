from multiprocessing.dummy import Process
from flask import Flask, jsonify, request
from flask_limiter import Limiter
from jinja2 import Undefined
import subprocess, os
from datetime import  timedelta, timezone
import time
import json
import datetime
from flask_limiter.util import get_remote_address
from dotenv import load_dotenv
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager


# Load dotenv variables
load_dotenv()

# Create the flask app
app = Flask(__name__,static_folder='build', static_url_path='')

# Global variable to store the child process
process = None

# Create a limiter for login attempts
limiter = Limiter(
    app,
    key_func=get_remote_address,
    default_limits=["2000000000000000 per day", "5000000000000 per hour"]
)

# The last effect on run 
lastData = {}  

# Declare the stop time variable
stopTime= Undefined

# Create a JWT manager for this application
app.config["JWT_SECRET_KEY"] = os.environ.get("KEY")
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=100)
jwt = JWTManager(app)


def show_effect(data):
    """
    Show the effect on the neopixels
    Parameter : data (dict)
    Create a new process to run the effect
    """
    global process
    process = subprocess.Popen(["sudo","python3", "startMode.py",str(data)], preexec_fn=os.setpgrp, stdin=subprocess.PIPE, stdout=subprocess.PIPE)
    


# Defaults route for the frontend
@app.route('/')
def index():
    return app.send_static_file('./index.html')


#===================== LOGIN ========================
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
    if email != os.environ.get("USERS") or password != os.environ.get("PASSWORD"):
        return {"msg": "Wrong email or password"}, 401

    access_token = create_access_token(identity=email)
    response = {"access_token":access_token}
    return response

# Code found on a web tutorial
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


#===================== LOGOUT ========================
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


#===================== CHANGE THE COLOR ========================
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
    global process
    color = request.get_json(force = True)
    path='./config/color.json'
    with open(path, 'r+',encoding='utf8') as f:
            data = json.load(f)
            data['color'] =color
            f.seek(0)
            json.dump(data, f, indent=4,ensure_ascii=False)

    
    return (data)


#===================== POWER OFF/ON THE LEDS ========================
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
    global process
    global lastData
    if process is not None:
        pid = process.pid
        cmd = "sudo killall python3" 
        print(cmd)
        print(os.system(cmd))
        print(process.wait())
        process = None
        process = subprocess.Popen(["sudo","python3", "off.py"], preexec_fn=os.setpgrp, stdin=subprocess.PIPE, stdout=subprocess.PIPE)
        process = None
    else:
        show_effect({'length': 10, 'speed': 1, 'mode': 'solid', 'spacing': 10, 'period': 1, 'rainbow': False, 'onAll': False})  
        lastData= {'length': 10, 'speed': 1, 'mode': 'solid', 'spacing': 10, 'period': 1, 'rainbow': False, 'onAll': False}
      #  process = subprocess.Popen(["sudo","python3", "colors.py"], preexec_fn=os.setpgrp)
    
    return ('off')


#===================== START A MODE========================
@app.route('/api/Mode', methods=["POST"])
@jwt_required()
def change_effect():
    global process
    global lastData
    if process is not None:
        cmd = "sudo killall python3"  
        print(cmd)
        print(os.system(cmd))
        print(process.wait())
        
        process = None

    
    data = request.get_json(force = True)
    time.sleep(0.1)
    try:    
        lastData= data
        show_effect(data)  
        
    except KeyError:
        print('Invalid function, try again.')
    return (data)


#===================== SET BRIGHTNESS ========================
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
    global process
    global onLoad
    data = request.get_json(force = True)
    
    if process is not None :
        cmd = "sudo killall python3" 
        print(cmd)
        print(os.system(cmd))
        process = None
    process = subprocess.Popen(["sudo","python3", "saveBrightness.py",str(data['brightness'])], preexec_fn=os.setpgrp)
    if(lastData !={} ):
        show_effect(lastData) 
    brightnessPath='./config/brightness.json'
    with open(brightnessPath, 'r+',encoding='utf8') as f:
        data = json.load(f)
        brightness =float(data['brightness'])/100
        
    return (data)


#===================== CHANGE NUMBERS OF TRIANGLES ========================
@app.route('/api/ChangeNumber', methods=["POST"])
@jwt_required()
def changeNumber():
    """
    Update the number of pixels 
    Call this api passing a json with the number of pixels
    ---
    author: Corentin Dallenogare <corentda@hotmail.fr>  

    """
    global process
    data = request.get_json(force = True)
    cmd = "sudo killall python3" 
    print(cmd)
    print(os.system(cmd))
    process = None
    process = subprocess.Popen(["sudo","python3", "saveNumber.py",str((data['number']))], preexec_fn=os.setpgrp)
    cmd = "sudo killall python3" 
    print(cmd)
    process = None
    return (data)


#===================== SET TIMER ========================
@app.route('/api/Timer', methods=["POST"])
@jwt_required()
def timer():
    """
    Update the timer
    Call this api passing a json with the time
    ---
    author: Corentin Dallenogare <corentda@hotmail.fr>  

    """
    global process
    data = request.get_json(force = True)
    timerPath='./config/timer.json'
    global stopTime
    if data =="":
        stopTime = "Undefined"
    
    else:
        stopTime =data['date'] 
    with open(timerPath, 'w',encoding='utf8') as f:
            data ={'time':str(stopTime)} 
            f.seek(0)
            json.dump(data, f, indent=4,ensure_ascii=False)
    if stopTime != "Undefined":
        if process is not None :
            cmd = "sudo killall python3" 
            print(cmd)
            print(os.system(cmd))
            process = None
        if(lastData !={} ):
            show_effect(lastData) 
    return (data)


#===================== GET TIMER ========================
@app.route('/api/GetTimer', methods=["POST"])
@jwt_required()
def getTimer():
    """
    get the timer value 
    ---
    author: Corentin Dallenogare <corentda@hotmail.fr>  

    """
    timerPath='./config/timer.json'
    with open(timerPath, 'r+',encoding='utf8') as f:
        data = json.load(f)
        stopTime =data['time']
    if stopTime == "Undefined":
        return ("undefined")
    else: 
        return (str(datetime.datetime.fromtimestamp(int(data['time'] )/ 1000.0)))


if __name__ == "__main__":        # on running python app.py
    app.run(host='0.0.0.0', debug='true')  # run the flask app