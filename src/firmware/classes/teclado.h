#ifndef TECLADO_H
#define TECLADO_H

#include <Arduino.h>
#include <I2CKeyPad.h>
#include <Wire.h>
#include "conexao.h"
#include "GoogleSheets.h"
#include "rele.h"
#include "lcd.h"
#include "ControlLEDs.h"
#include "buzzer.h"
#include "globals.h"

class Teclado {
  private:
    I2CKeyPad keyPad;
    String senhaDigitada;
    Rele rele;
    LCD* lcd;
    ControlLEDs* ledVermelho;
    ControlLEDs* ledVerde;
    GoogleSheets* googleSheets;
    Conexao* conexao;
    String senhaAtual;
    Buzzer* buzzer;
    unsigned long tempoTeclado;

  public:
    // Construtor
    Teclado(int pinoRele, LCD* lcdDisplay, ControlLEDs* ledVermelho, ControlLEDs* ledVerde, GoogleSheets* googleSheets, Conexao* conexao, Buzzer* buzzer);

    // Métodos
    char obterTecla();
    bool inicializar();
    void adicionarTecla(char tecla);
    void apagarUltimaTecla();
    void validarAcessoSenhaTeclado();
    void atualizarTeclado();
};

#endif