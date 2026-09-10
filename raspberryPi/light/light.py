# from gpiozero import OutputDevice, LED
import RPi.GPIO as GPIO
import argparse
import time
import sys

RELAY_1 = 1
RELAY_2 = 2
GPIO_PINS = {
    RELAY_1: 5,
    RELAY_2: 6,
}

DELAY_SECONDS = 300
ON, OFF = GPIO.LOW, GPIO.HIGH

def _get_relay_pin(relay):
    try:
        return GPIO_PINS[relay]
    except KeyError:
        return ValueError(f"invalid relay {relay!r}; expected one of {list(GPIO_PINS)}")

def _get_relay_pins(relays):
    return [_get_relay_pin(relay) for relay in relays]

def setup():
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(GPIO_PINS[RELAY_1], GPIO.OUT, initial=OFF)
    GPIO.setup(GPIO_PINS[RELAY_2], GPIO.OUT, initial=OFF)

def invalid_pin(pin):
    if pin != GPIO_PINS[RELAY_1] and pin != GPIO_PINS[RELAY_2]:
        print("Invalid pin: ", pin)
        return True
    return False

def on(relay=RELAY_1):
    pin = _get_relay_pin(relay)
    GPIO.output(pin, ON)

def off(relay=RELAY_1):
    pin = _get_relay_pin(relay)
    GPIO.output(pin, OFF)

def on_for(relay=RELAY_1, delay=DELAY_SECONDS):
    pin = _get_relay_pin(relay)
    GPIO.output(pin, ON)
    time.sleep(delay)
    GPIO.output(pin, OFF)

def toggle(relay=RELAY_1, start=ON, delay=DELAY_SECONDS):
    pin = _get_relay_pin(relay)
    GPIO.output(pin, start)
    time.sleep(delay)
    GPIO.output(pin, OFF if start == ON else ON)
        
def all_on():
    GPIO.output(GPIO_PINS[RELAY_1], ON)
    GPIO.output(GPIO_PINS[RELAY_2], ON)

def all_off():
    GPIO.output(GPIO_PINS[RELAY_1], OFF)
    GPIO.output(GPIO_PINS[RELAY_2], OFF)

def all_on_for(delay=DELAY_SECONDS):
    GPIO.output(GPIO_PINS[RELAY_1], ON)
    GPIO.output(GPIO_PINS[RELAY_2], ON)
    time.sleep(delay)
    GPIO.output(GPIO_PINS[RELAY_1], OFF)
    GPIO.output(GPIO_PINS[RELAY_2], OFF)

def all_toggle(start=ON, delay=DELAY_SECONDS):
    GPIO.output(GPIO_PINS[RELAY_1], start)
    GPIO.output(GPIO_PINS[RELAY_2], start)
    time.sleep(delay)
    GPIO.output(GPIO_PINS[RELAY_1], OFF if start == ON else ON)
    GPIO.output(GPIO_PINS[RELAY_2], OFF if start == ON else ON)

def cleanup():
    GPIO.output(GPIO_PINS[RELAY_1], OFF)
    GPIO.output(GPIO_PINS[RELAY_2], OFF)
    GPIO.cleanup((GPIO_PINS[RELAY_1], GPIO_PINS[RELAY_2]))

def reset():
    GPIO.setwarnings(False)
    setup()
    cleanup()
    GPIO.setwarnings(True)

if __name__ == "__main__":
    class Parser(argparse.ArgumentParser):
        def error(self, message):
            self.print_help(sys.stderr)
            self.exit(2, f"\nerror: {message}\n")

    p = Parser(description="Light control.")
    p.add_argument("command", choices=["on", "off", "on-off"])
    p.add_argument("--relay", type=int, default=1)
    p.add_argument("--delay", type=int, default=10)
    p.add_argument("--all", action="store_true")
    args = p.parse_args()

    GPIO.setwarnings(False)
    GPIO.setmode(GPIO.BCM)
    relays = (1, 2) if args.all else (args.relay, )
    for relay in relays:
        pin = _get_relay_pin(relay)
        GPIO.setup(pin, GPIO.OUT)
    match args.command:
        case "on":
            if args.all:
                all_on()
            else:
                on(args.relay)
        case "off":
            if args.all:
                all_off()
            else:
                off(args.relay)
        case "on-off":
            if args.all:
                all_on_for(args.delay)
            else:
                on_for(args.relay, args.delay)
        case _:
            print("Invalid light command.")

