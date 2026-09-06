import atexit, signal, sys
from flask import Flask
import light


app = Flask(__name__)
light.setup()

@app.route("/health")
def health():
    return "<h1>Healthy!</h1>\n"

@app.route("/toggle")
def toggle():
    light.toggle_with_delay()
    return "<h1>Toggle Light Done.</h1>\n"

@app.route("/on")
def on():
    light.on()
    return "<h1>Light On.</h1>\n"

@app.route("/off")
def off():
    light.off()
    return "<h1>Light Off.</h1>\n"

@app.route("/reset")
def reset():
    light.reset()
    light.setup()
    return "<h1>Light Reset.</h1>\n"

def _shutdown():
    light.cleanup()

atexit.register(_shutdown)
signal.signal(signal.SIGTERM, lambda *_: sys.exit()) # makes atexit fire under systemd
