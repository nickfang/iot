import RPi.GPIO as GPIO
import argparse
import time

def parse_args(argv=none):
    p = argparse.ArgumentParser(description="Light Control.")i
    p.add_argument("--pin1", type=int, default=14, help="")
    p.add_argument("--pin2", type=int, default=15, help"")

try:
    print("Turn on relay 1 & 2 ")
    args = parse_args()
	GPIO.output(args.pin1, GPIO.HIGH)
	GPIO.output(args.pin2, GPIO.HIGH)
	time.sleep(300)

	print("Turn off relays 1 & 2")
	GPIO.output(args.pin1, GPIO.LOW)
	GPIO.output(args.pin2, GPIO.LOW)

except KeyboardInterrupt:
	GPIO.cleanup()

