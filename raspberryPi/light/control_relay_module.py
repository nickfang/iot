import RPi.GPIO as GPIO
import time

PIN_RELAY_1 = 14
PIN_RELAY_2 = 15

GPIO.setmode(GPIO.BCM)

GPIO.setup(PIN_RELAY_1, GPIO.OUT)
GPIO.setup(PIN_RELAY_2, GPIO.OUT)

try:
    print("Turn on relay 1 & 2 ")
	GPIO.output(PIN_RELAY_1, GPIO.HIGH)
	GPIO.output(PIN_RELAY_2, GPIO.HIGH)
	time.sleep(300)

	print("Turn off relays 1 & 2")
	GPIO.output(PIN_RELAY_1, GPIO.LOW)
	GPIO.output(PIN_RELAY_2, GPIO.LOW)

except KeyboardInterrupt:
	GPIO.cleanup()

