#include <ArduinoJson.h>
#include <ArduinoJson.hpp>
#include <Arduino_JSON.h>
#include <WiFi.h>
#include <WiFiClientSecure.h>
#include "GoogleSheets.h"
#include "rfid.h"
#include "biometria.h"
#include <Adafruit_Fingerprint.h>
#include "ControlLEDs.h"
#include "rele.h"
#include <SPI.h>
#include <PubSubClient.h>
#include <string>
#include "buzzer.h"
#include "lcd.h"
#include "teclado.h"
#include "conexao.h"
#include "globals.h"
#include <WiFiClientSecure.h>
#include <Wire.h>

// Configurações de Wi-Fi e URL do Google Sheets
const char *ssid = "Sophia's Galaxy";
const char *password = "sophia05";
GoogleSheets googleSheets("https://script.google.com/macros/s/AKfycbwaUauLawZlvHnaYk1yeUHD2BqgWP513CjSMEu1EWqlsCwnAdDqepMA5qxlwTFJRlhQTA/exec");

// Configurações WiFi e MQTT
const char* mqtt_broker = "36d9e00a808c47b8b761d63a78047315.s1.eu.hivemq.cloud";
const char* mqtt_username = "GustavoBrabo";
const char* mqtt_password = "Astalavista123";
const char* topico = "apontech/cadastro";
const int mqtt_port = 8883;
WiFiClientSecure espClient;
PubSubClient client(espClient);

// Definições de pinos
const int PINO_RELE = 13;
const int SS_PIN = 5;   // Pino SS do RFID
const int RST_PIN = 4;  // Pino RST do RFID
const int PINO_RX_BIOMETRIA = 16;
const int PINO_TX_BIOMETRIA = 17;
const int LED_VERDE = 25;
const int LED_VERMELHO = 26;
const int LDR_PIN = 33;
const int BUZZER_PIN = 27;

// Instâncias de componentes usando as bibliotecas
LCD lcd;
Rele rele(PINO_RELE, &lcd);
Buzzer buzzer(BUZZER_PIN);
ControlLEDs ledVerde(LED_VERDE);
ControlLEDs ledVermelho(LED_VERMELHO);
Conexao conexao(ssid, password, mqtt_broker, mqtt_port, mqtt_username, mqtt_password, topico, &lcd);
Biometria biometria(Serial2, PINO_RELE, &lcd, &ledVermelho, &ledVerde, &buzzer, &conexao, &googleSheets);
RFID rfid(SS_PIN, RST_PIN, &rele, &lcd, &ledVermelho, &ledVerde, &googleSheets, &conexao, &buzzer);
Teclado teclado(PINO_RELE, &lcd, &ledVermelho, &ledVerde, &googleSheets, &conexao, &buzzer);

// Declaração de variáveis para controle de componentes
static unsigned long tempoAtual;
String modoAcesso;
String senhaAtual = "";
bool offlineMode = 0;
static unsigned long lastKeyPressTime = 0;
const unsigned long debounceDelay = 200;  // Delay para debounce em milissegundos
static char lastPressedKey = '\0';

// Função de leitura do monitor serial
String lerSerial() {
  String comando = "";
  while (Serial.available()) {
    char c = Serial.read();
    if (c != '\n') {
      comando += c;
    }
  }
  return comando;
}

// Função que lê as mensagens enviadas no broker MQTT
void callback() {
  if (messageTemp == "Cadastrar Digital") {
    biometria.cadastrarDigital();
    messageTemp = "";
  } else if (messageTemp == "Cadastrar RFID") {
    rfid.cadastrarCartao();
    messageTemp = "";
  }
}

void setup() {
  // Inicialização do monitor Serial
  Serial.begin(115200);

  // Inicialização da comunicação serial com o sensor biométrico
  Serial2.begin(57600, SERIAL_8N1, PINO_RX_BIOMETRIA, PINO_TX_BIOMETRIA);

  // Inicialização dos componentes
  Wire.begin();
  Wire.setClock(400000);

  SPI.begin();
  rfid.RFIDBegin();
  rfid.initEEPROM();
  ledVerde.begin();
  ledVermelho.begin();
  biometria.inicializar();
  teclado.inicializar();

  // inicialização do LCD
  lcd.inicializar();
  lcd.clear();

  // Conexão com WiFi e MQTT
  conexao.conectarWiFi();
  conexao.conectarMQTT();

}

void loop() {
  // Leitura e reconexão com o tópico MQTT 
  client.loop();
  conexao.reconectar();
  callback();

  // Atuzalização dos componentes de acordo com o tempo em determinado estado
  rele.atualizar(tempoDestrancado);
  ledVerde.atualizarLED(ultimaInteracaoLEDVerde);
  ledVermelho.atualizarLED(ultimaInteracaoLEDVermelho);
  lcd.atualizarDisplay(ultimaInteracaoLCD);

  // Verificação das formas de acesso
  biometria.verificarDigital();
  rfid.validarAcessoRFID();
  teclado.validarAcessoSenhaTeclado();
  teclado.atualizarTeclado();
}