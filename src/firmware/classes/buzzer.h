#ifndef buzzer_h
#define buzzer_h

#include "Arduino.h"

class Buzzer {
  public:
    int buzzerPin;
    unsigned long screenTimeout;

    Buzzer(int pin);
    void ligarBuzzer(int freq, unsigned long tempoLigado);
};

#endif
