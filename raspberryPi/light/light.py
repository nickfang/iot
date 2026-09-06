import RPi.GPIO as GPIO
import time

DEFAULT_PIN_RELAY_1 = 14
DEFAULT_PIN_RELAY_2 = 15
DEFAULT_SECONDS = 300
ON, OFF = GPIO.LOW, GPIO.HIGH


def setup():
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(DEFAULT_PIN_RELAY_1, GPIO.OUT, initial=OFF)
    GPIO.setup(DEFAULT_PIN_RELAY_2, GPIO.OUT, initial=OFF)

def on(pin=DEFAULT_PIN_RELAY_1):
    GPIO.output(pin, ON)

def off(pin=DEFAULT_PIN_RELAY_1):
    GPIO.output(pin, OFF)

def toggle_with_delay(pin=DEFAULT_PIN_RELAY_1, start=ON, delay=DEFAULT_SECONDS):
    print("Start toggle.", "ON" if start == ON else OFF)
    GPIO.output(pin, start)
    print("Start delay.", delay)
    time.sleep(delay)
    print("End delay.")
    GPIO.output(pin, OFF if start == ON else ON)
    print("End toggle.", "OFF" if start == ON else ON)
        
def cleanup(pin=DEFAULT_PIN_RELAY_1):
    GPIO.output(pin, OFF)
    GPIO.cleanup(pin)

if __name__ == "__main__":
    pin = 14
    delay = 10
    toggle_with_delay(pin, ON, delay)
    cleanup(pin)

