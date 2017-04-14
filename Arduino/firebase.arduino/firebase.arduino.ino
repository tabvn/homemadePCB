#include <FirebaseArduino.h>
#include <ESP8266WiFi.h>

// Set these to run example.
#define WIFI_SSID "Home"
#define WIFI_PASSWORD "hoaminh8vn"

#define CHIPID ESP.getChipId()
#define PATH "/microcontroller/"
#define FBHOST "myhome-5d4ae.firebaseio.com"
#define FBKEY "Nldg0R9lv5zHPcQzqjJ2RNdPDtdWgRgjm4rZC06C"

int num = 4;
int pins[] = {D5, D6, D7, D8};
int states[] = {LOW, LOW, LOW};

void setup() {
  Serial.begin(9600);


  // connect to wifi.
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }
  Firebase.begin(FBHOST, FBKEY);

  delay(1000);
  registerMicrocontroller();
}


void loop() {

  firebaseGet();
}

void registerMicrocontroller() {

  for (int i = 0; i < num; i++) {

    pinMode(pins[i], OUTPUT); 
    
    String path = getPath();
    path = path + "/" + pins[i];

    Firebase.setBool(path, states[i]);
  }


}

void firebaseGet() {

  String path = getPath();
  FirebaseObject object = Firebase.get(path);


  if (Firebase.failed()) {
    Serial.println("Firebase error");
    Serial.println(Firebase.error());
  }


  for (int i = 0; i < num; i++) {

    int pin = pins[i];
    String p = "";
    p = p + pin;
    int state = object.getBool(p);

    if (states[i] != state) {

      digitalWrite(pins[i], state);
      states[i] = state;

      Serial.println();
      Serial.printf("Pin: %d State: %d", pin, state);
 
    }




  }

  delay(500);

}


String getPath() {

  String path = "";

  path += PATH;
  path += CHIPID;



  return path;
}


