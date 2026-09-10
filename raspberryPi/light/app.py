import atexit, signal, sys
from flask import Flask, request
import light

app = Flask(__name__)
light.setup()

@app.route("/health")
def health():
    return "<h1>Healthy!</h1>\n"

@app.route("/on-off/<int:relay>")
def toggle(relay):
    delay = request.args.get('delay', type=int)
    light.on_for(relay, delay)
    return "<h1>Light on and off with a delay done.</h1>\n"

@app.route("/on")
def on():
    light.on()
    return "<h1>Light on.</h1>\n"

@app.route("/on/all")
def on_all():
    light.all_on()
    return "<h1>All lights on.</h1>\n"

@app.route("/on/<int:relay>")
def on_relay(relay):
    light.on(relay)
    return f"<h1>Relay {relay} on.</h1>\n"

@app.route("/off")
def off():
    light.off()
    return "<h1>Light off.</h1>\n"

@app.route("/off/all")
def all_off():
    light.all_off()
    return "<h1>All lights off.</h1>\n"

@app.route("/off/<int:relay>")
def off_relay(relay):
    light.off(relay)
    return f"<h1>Relay {relay} off.<h1>\n"

@app.route("/reset")
def reset():
    light.cleanup()
    light.setup()
    return "<h1>Light Reset.</h1>\n"

def _shutdown():
    light.cleanup()

atexit.register(_shutdown)
signal.signal(signal.SIGTERM, lambda *_: sys.exit()) # makes atexit fire under systemd
