from flask import Flask
import powerOff
import changeColors
from flask import request

app = Flask(__name__)

@app.route('/')
def hello_world():
    powerOff.shutdown()
    return 'Hello, World!'

@app.route('/changeColor', methods=["POST"])
def changeColor():
    data = request.get_json(force = True)
    changeColors.useColorPicker(data)
    return(data)

if __name__ == '__main__':
    app.run()