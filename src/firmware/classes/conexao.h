#ifndef CONEXAO_H
#define CONEXAO_H

#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include "lcd.h"

class Conexao {
private:
    WiFiClientSecure espClient;
    PubSubClient client;
    LCD* lcd;
    unsigned long retryMillis;
    const unsigned long intervalRetry = 10000;
    const unsigned long intervalOffline = 120000;
    unsigned int retryCount;
    const unsigned int retryMax = 5;
    bool offlineMode;

    const char *ssid;
    const char *password;
    const char *mqtt_broker;
    const int mqtt_port;
    const char *mqtt_username;
    const char *mqtt_password;
    const char *topico;

public:
    Conexao(const char *ssid, const char *password, const char *mqtt_broker, int mqtt_port,
            const char *mqtt_username, const char *mqtt_password, const char *topico, LCD* lcdDisplay);

    void conectarWiFi();
    void conectarMQTT();
    void enviarAcessoMQTT(const String &id, const String &tipoDeAcesso);
    void reconectar();
    void botaoReconectar();
    void rssi();
};

#endif
