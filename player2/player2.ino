#include <Keyboard.h>

int sliderPin1 = A0;
int sliderVal1 = 0;
int sliderFlg1 = 0;

int sliderPin2 = A1;
int sliderVal2 = 0;
int sliderFlg2 = 0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  sliderVal2 = analogRead(sliderPin2);
  Serial.println(sliderVal2);

  delay(100);
}


