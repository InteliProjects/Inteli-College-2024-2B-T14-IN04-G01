#include "ControlLEDs.h"

// Construtor da classe ControlLEDs
ControlLEDs::ControlLEDs(int pin) {
    ledPin = pin;
}

// Método para inicialização dos LEDs
void ControlLEDs::begin() {
    ledState = LOW;
    screenTimeout = 2000;
    pinMode(ledPin, OUTPUT);
    digitalWrite(ledPin, ledState);
}

// Método para ligar um LED
void ControlLEDs::ligarLED() {
    ledState = HIGH;
    ledOnTime = millis();
    digitalWrite(ledPin, ledState);
}

// Método para desligar um LED
void ControlLEDs::desligarLED() {
    ledState = LOW;
    digitalWrite(ledPin, ledState);
}

// Método que desliga um LED caso ele esteja ligado por mais tempo que o limite definido
void ControlLEDs::atualizarLED(unsigned long tempoLigado) {
    if (ledState == HIGH && (millis() - tempoLigado >= screenTimeout)) {
        desligarLED();
    }
}
