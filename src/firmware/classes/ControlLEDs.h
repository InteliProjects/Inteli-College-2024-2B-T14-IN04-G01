#ifndef ControlLEDs_h
#define ControlLEDs_h

#include "Arduino.h"

class ControlLEDs {
  public:
    int ledPin;
    int ledState;
    unsigned long ledOnTime;
    unsigned long screenTimeout;

    ControlLEDs(int pin);
    void begin();
    void ligarLED();
    void desligarLED();
    void atualizarLED(unsigned long tempoLigado);
};

#endif
