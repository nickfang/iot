import RPi.GPIO as GPIO
import time

PIN_RELAY_1 = 14
PIN_RELAY_2 = 15
DELAY_SECONDS = 300
ON, OFF = GPIO.LOW, GPIO.HIGH


def setup():
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(PIN_RELAY_1, GPIO.OUT, initial=OFF)
    GPIO.setup(PIN_RELAY_2, GPIO.OUT, initial=OFF)

def invalid_pin(pin):
    if pin != PIN_RELAY_1 and pin != PIN_RELAY_2:
        print("Invalid pin: ", pin)
        return True
    return False

def on(pin=PIN_RELAY_1):
    if invalid_pin(pin):
        return
    GPIO.output(pin, ON)

def off(pin=PIN_RELAY_1):
    if invalid_pin(pin):
        return
    GPIO.output(pin, OFF)

def toggle_with_delay(pin=PIN_RELAY_1, start=ON, delay=DELAY_SECONDS):
    print("Start toggle.", "ON" if start == ON else OFF)
    GPIO.output(pin, start)
    print("Start delay.", delay)
    time.sleep(delay)
    print("End delay.")
    GPIO.output(pin, OFF if start == ON else ON)
    print("End toggle.", "OFF" if start == ON else ON)
        
def all_on():
    GPIO.output(PIN_RELAY_1, ON)
    GPIO.output(PIN_RELAY_2, ON)

def all_off():
    GPIO.output(PIN_RELAY_1, OFF)
    GPIO.output(PIN_RELAY_2, OFF)

def all_toggle_with_delay(start=ON, delay=DELAY_SECONDS):
    GPIO.output(PIN_RELAY_1, start)
    GPIO.output(PIN_RELAY_2, start)
    time.sleep(delay)
    GPIO.output(PIN_RELAY_1, OFF if start == ON else ON)
    GPIO.output(PIN_RELAY_2, OFF if start == ON else ON)

def cleanup():
    GPIO.output(PIN_RELAY_1, OFF)
    GPIO.output(PIN_RELAY_2, OFF)
    GPIO.cleanup(PIN_RELAY_1)
    GPIO.cleanup(PIN_RELAY_2)

if __name__ == "__main__":
    setup()
    all_toggle_with_delay(ON, 10)
    cleanup()

