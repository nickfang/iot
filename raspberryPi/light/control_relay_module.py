import RPi.GPIO as GPIO
import time

PIN_RELAY_1 = 2
PIN_RELAY_2 = 3

GPIO.setmode(GPIO.BCM)

GPIO.setup(PIN_RELAY_1, GPIO.OUT)
GPIO.setup(PIN_RELAY_2, GPIO.OUT)

try:
	while True:
		print("Turn on all 2 relays")
		GPIO.output(PIN_RELAY_1, GPIO.HIGH)
		GPIO.output(PIN_RELAY_2, GPIO.HIGH)
		time.sleep(1)

		print("Turn off all 2 relays")
		GPIO.output(PIN_RELAY_1, GPIO.LOW)
		GPIO.output(PIN_RELAY_2, GPIO.LOW)
		time.sleep(1)

except KeyboardInterrupt:
	GPIO.cleanup()

