import RPi.GPIO as GPIO
immport argparse

def parse_args(argv=none):
    p = argparse.ArgumentParser(description="Light Off Control.")
    p.add_argument("--pin1", type=int, default=14, help="")
    p.add_argument("--pin2", type=int, default=15, help="")

try:
	print("Turn off relays 1 & 2")
    args = parse_args()
	GPIO.output(args.pin1, GPIO.LOW)
	GPIO.output(args.pin2, GPIO.LOW)

except KeyboardInterrupt:
	GPIO.cleanup()

