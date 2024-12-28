#ifndef BIOMETRIA_H
#define BIOMETRIA_H

#include <Adafruit_Fingerprint.h>
#include <HardwareSerial.h>
#include "rele.h"
#include "lcd.h"
#include "ControlLEDs.h"
#include "buzzer.h"
#include "globals.h"
#include "GoogleSheets.h"
#include "conexao.h"

class Biometria {
  private:
    Adafruit_Fingerprint* sensorDigital;
    Rele rele;
    LCD* lcd;
    ControlLEDs* ledVermelho;
    ControlLEDs* ledVerde;
    Buzzer* buzzer;
    GoogleSheets* googleSheets;
    Conexao* conexao;

  public:
    Biometria(HardwareSerial &serial, int pinoRele, LCD* lcdDisplay, ControlLEDs* ledVermelho, ControlLEDs* ledVerde, Buzzer* buzzer, Conexao* conexao, GoogleSheets* googleSheets);
    bool cadastrarDigital(); 
    void verificarDigital();   
    bool atualizarDigital(int id);
    bool deletarDigital(int id);         
    bool inicializar();
    int getUltimoID();
    int proximaIdDisponivel();
};

#endif
