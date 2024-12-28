#ifndef RELE_H
#define RELE_H

#include <Arduino.h>
#include "lcd.h"

class Rele {
  private:
    int pinoRele;
    LCD* lcd;  // Altere para usar o tipo LCD*
    unsigned long tempoDestrancado;
    const unsigned long DURACAO_DESTRANCADO = 5000;

  public:
    // Construtor da classe
    Rele(int pino, LCD* lcdDisplay);  // Altere para aceitar LCD*
    void destrancar();
    void trancar();
    void atualizar(unsigned long tempoDestrancado);
};

#endif
