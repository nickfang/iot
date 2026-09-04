import subprocess
from flask import Flask
import RPi.GPIO as GPIO
import atexit

PIN_RELAY_1_DEFAULT = 14
PIN_RELAY_2_DEFAULT = 15

GPIO.setmode(GPIO.BCM)
GPIO.setup(PIN_RELAY_1_DEFAULT, GPIO.OUT, initial=GPIO.LOW)
GPIO.setup(PIN_RELAY_2_DEFAULT, GPIO.OUT, initial=GPIO.LOW)

app = Flask(__name__)

@app.route("/health")
def health():
    return "<h1>Healthy!</h1>\n"
@app.route("/")
def onoff():
    subprocess.run(["python", "turn_on_and_off.py", "--pin1", PIN_RELAY_1_DEFAULT, "--pin2", PIN_RELAY_2_DEFAULT])
    return "<h1>Light done.</h1>\n"
@app.route("/on")
def on():
    subprocess.run(["python", "turn_on.py", "--pin1", PIN_RELAY_1_DEFAULT, "--pin2", PIN_RELAY_2_DEFAULT])
    return "<h1>Light On.</h1>\n"
@app.route("/off")
def off():
    subprocess.run(["python", "turn_off.py", "--pin1", PIN_RELAY_1_DEFAULT, "--pin2", PIN_RELAY_2_DEFAULT])
    return "<h1>Light Off.</h1>\n"

atexit.register(GPIO.cleanup)
