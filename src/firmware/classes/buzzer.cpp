#include "buzzer.h"

// Construtor da classe Buzzer
Buzzer::Buzzer(int pin) {
    buzzerPin = pin;
    screenTimeout = 50;
    pinMode(buzzerPin, OUTPUT);
}

// Método que liga o buzzer por um tempo determinado em uma determinada frequência
void Buzzer::ligarBuzzer(int freq, unsigned long tempoLigado) {
    tone(buzzerPin, freq);
    unsigned long tempoInicial = millis();
    unsigned long tempoAtual = millis();
    while (tempoAtual - tempoInicial < tempoLigado) {
      tempoAtual = millis();
    }
    noTone(buzzerPin);
}
