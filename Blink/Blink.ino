/*
  Blink

  Turns an LED on for one second, then off for one second, repeatedly.

  Most Arduinos have an on-board LED you can control. On the UNO, MEGA and ZERO
  it is attached to digital pin 13, on MKR1000 on pin 6. LED_BUILTIN is set to
  the correct LED pin independent of which board is used.
  If you want to know what pin the on-board LED is connected to on your Arduino
  model, check the Technical Specs of your board at:
  https://www.arduino.cc/en/Main/Products

  modified 8 May 2014
  by Scott Fitzgerald
  modified 2 Sep 2016
  by Arturo Guadalupi
  modified 8 Sep 2016
  by Colby Newman

  This example code is in the public domain.

  https://www.arduino.cc/en/Tutorial/BuiltInExamples/Blink
*/
#include <FastLED.h>
#define DATA_PIN 4
#define CLK_PIN 3
#define LED_TYPE SK9822
#define COLOR_ORDER BGR
#define NUM_LEDS 9
#define BRIGHTNESS 5
CRGB leds[NUM_LEDS];

// the setup function runs once when you press reset or power the board
void setup() {
  Serial.begin(9600);
  // initialize digital pin LED_BUILTIN as an output.
  pinMode(5, OUTPUT);
  pinMode(6, OUTPUT);
  pinMode(7, OUTPUT);
  pinMode(8, OUTPUT);

  FastLED.addLeds<LED_TYPE, DATA_PIN, CLK_PIN, COLOR_ORDER>(leds, NUM_LEDS);
  FastLED.setBrightness(BRIGHTNESS);
  FastLED.clear();
  FastLED.show();
}

// the loop function runs over and over again forever
void loop() {

  if (Serial.available() > 0) {
    char received = Serial.read(); // Read the incoming data
    Serial.println(received);

    if (received == 'O') {
      digitalWrite(5, HIGH);  // turn the LED on (HIGH is the voltage level)
      digitalWrite(6, HIGH);
      digitalWrite(7, HIGH);
      digitalWrite(8, HIGH);
      delay(1000);
    }

    if (received == 'F') {                    // wait for a second
      digitalWrite(5, LOW);   // turn the LED off by making the voltage LOW
      digitalWrite(6, LOW);
      digitalWrite(7, LOW);
      digitalWrite(8, LOW);
      delay(1000);  
    }

    if (received == 'L') {                    // wait for a second
      digitalWrite(5, HIGH);  // turn the LED on (HIGH is the voltage level)
      digitalWrite(6, HIGH);
      digitalWrite(7, HIGH);
      digitalWrite(8, HIGH);
      delay(100);
      digitalWrite(5, LOW);   // turn the LED off by making the voltage LOW
      digitalWrite(6, LOW);
      digitalWrite(7, LOW);
      digitalWrite(8, LOW);
      delay(100);  
    }

    if (received == 'A') {
      digitalWrite(5, HIGH); 
      delay(1000);
    }

    if (received == 'B') {
      digitalWrite(6, HIGH); 
      delay(1000);
    }

    if (received == 'C') {
      digitalWrite(7, HIGH); 
      delay(1000);
    }

    if (received == 'D') {
      digitalWrite(8, HIGH); 
      delay(1000);
    }

    if (received == 'a') {
      digitalWrite(5, LOW); 
      delay(1000);
    }

    if (received == 'b') {
      digitalWrite(6, LOW); 
      delay(1000);
    }

    if (received == 'c') {
      digitalWrite(7, LOW); 
      delay(1000);
    }

    if (received == 'd') {
      digitalWrite(8, LOW); 
      delay(1000);
    }

    if (received == '1') {
      leds[5] = CRGB(255, 100, 0);
    }

    if (received == '2') {
      leds[4] = CRGB(255, 100, 0);
    }

    if (received == '3') {
      leds[3] = CRGB(255, 100, 0);
    }

    if (received == '4') {
      leds[2] = CRGB(255, 100, 0);
    }

    if (received == '5') {
      leds[1] = CRGB(255, 100, 0);
    }

    if (received == 'X') {
      FastLED.clear();
    }
    FastLED.show();
  }                   
}






