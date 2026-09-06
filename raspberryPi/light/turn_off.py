import RPi.GPIO as GPIO
import argparse
import light

def parse_args(argv=None):
    p = argparse.ArgumentParser(description="Light Off Control.")
    p.add_argument("--pin1", type=int, default=14, help="")
    p.add_argument("--pin2", type=int, default=15, help="")

try:
    print("Turn off relays 1 & 2")
    args = parse_args()
    light.off(args.pin1)
    light.off(args.pin2)

except KeyboardInterrupt:
    GPIO.cleanup()

