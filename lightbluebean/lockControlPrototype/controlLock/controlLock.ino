#define RELAY_CONTROL_LINE 1 // digital channel to control the relay with
#define LED_LINE 13

void setup() {
	Serial.begin(57600);
	Serial.setTimeout(25);

	pinMode(RELAY_CONTROL_LINE, OUTPUT);
	pinMode(LED_LINE, OUTPUT);
}

void loop() {
  char buffer[10];
  size_t length = 2;
  
	digitalWrite(LED_LINE, HIGH);
	buffer[0] = 0;
	length = Serial.readBytes(buffer, length);

	if (length > 1) {
		if ((buffer[0] == 13) && (buffer[1] == 0)) {
			digitalWrite(LED_LINE, LOW);
		}
	}
	// Bean.sleep(0xFFFFFFFF);
}
