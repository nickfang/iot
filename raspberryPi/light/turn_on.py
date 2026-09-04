import RPi.GPIO as GPIO
import sys
import argparse

def parse_args(argv=none):
    p = argparse.ArgumentParser(description="Light On Control.")
    p.add_argument("--pin1", type=int, default=14, help="")
    p.add_argument("--pin2", type=int, default=15, help="")
    return p.parse_args(argv)

try:
    print("Turn on relay 1 & 2 ")
    args = parse_args()
	GPIO.output(args.pin1, GPIO.HIGH)
	GPIO.output(args.pin2, GPIO.HIGH)

except KeyboardInterrupt:
	GPIO.cleanup()

