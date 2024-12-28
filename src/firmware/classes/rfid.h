#ifndef RFID_H
#define RFID_H

#include <MFRC522.h>
#include <LiquidCrystal_I2C.h>
#include "rele.h"
#include "biometria.h"
#include <Arduino.h> // Certifique-se de incluir Arduino.h para usar String
#include "GoogleSheets.h"
#include "conexao.h"
#include "ControlLEDs.h"
#include "buzzer.h"
#include "globals.h"

class RFID {
public:
    RFID(int ssPin, int rstPin, Rele* rel, LCD* lcdDisplay, ControlLEDs* ledVermelho, ControlLEDs* ledVerde, GoogleSheets* googleSheets, Conexao* conexao, Buzzer* buzzer);

    void RFIDBegin();
    void initEEPROM();          // Adicionado para inicializar a EEPROM
    bool cadastrarCartao();
    bool verificarCartao();
    bool atualizarCartao(String uid);
    bool deletarCartao();               // Corrigido para não aceitar parâmetros
    bool deletarCartao(String uidParaExcluir);
    String lerUID();
    String lerCartaoCadastrado();       // Adicionado para ler UID da EEPROM
    void listarCadastrados();
    int findFreeEEPROMSpace(int length);
    void saveUIDtoEEPROM(const String& uid);
    String lerTodosCartoesCadastrados();
    void cadastrarRFID();
    void validarAcessoRFID();

private:
    int SS_PIN;
    int RST_PIN;
    int size;
    MFRC522 mfrc522;
    Rele* rele;
    LCD* lcd;
    ControlLEDs* ledVermelho;
    ControlLEDs* ledVerde;
    GoogleSheets* googleSheets;
    Conexao* conexao;
    Buzzer* buzzer;
};

#endif
