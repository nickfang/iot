import RPi.GPIO as GPIO
import argparse
import light

def parse_args(argv=none):
    p = argparse.ArgumentParser(description="Light Control.")
    p.add_argument("--pin1", type=int, default=14, help="")
    p.add_argument("--pin2", type=int, default=15, help="")

try:
    print("Turn on relay 1 & 2 ")
    args = parse_args()
    light.toggle(args.pin1, ON, 10)
    light.toggle(args.pin2, ON, 10)

except KeyboardInterrupt:
    GPIO.cleanup()

