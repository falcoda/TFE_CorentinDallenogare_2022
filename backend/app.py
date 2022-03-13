from flask import Flask
import firstEffect

app = Flask(__name__)

@app.route('/')
def hello_world():
    firstEffect.firstEffect()
    return 'Hello, World!'

if __name__ == '__main__':
    app.run()