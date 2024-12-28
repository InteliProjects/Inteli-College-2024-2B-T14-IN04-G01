#include "conexao.h"
#include "globals.h"

// Função que lê as mensagens recebidas no tópico
void callbackMQTT(char* topic, byte* message, unsigned int length) {
    messageTemp = "";
    Serial.print("Mensagem recebida no tópico: ");
    Serial.println(topic);

    for (int i = 0; i < length; i++) {
      messageTemp += (char)message[i];
    }
}

// Construtor da classe conexao
Conexao::Conexao(const char *ssid, const char *password, const char *mqtt_broker, int mqtt_port,
                 const char *mqtt_username, const char *mqtt_password, const char *topico, LCD* lcdDisplay)
    : client(espClient), ssid(ssid), password(password), mqtt_broker(mqtt_broker), mqtt_port(mqtt_port),
      mqtt_username(mqtt_username), mqtt_password(mqtt_password), topico(topico), lcd(lcdDisplay) {
    retryMillis = 0;
    retryCount = 0;
    offlineMode = false;
    espClient.setInsecure();
}

// Método que realiza a conexão do WiFi
void Conexao::conectarWiFi() {
    int currentMillis = millis();
    Serial.print("Conectando ao WiFi...");
    lcd->clear();
    lcd->setCursor(0, 0);
    lcd->print("Conectando Wi-Fi");
    WiFi.begin(ssid, password);

    while (WiFi.status() != WL_CONNECTED && millis() - currentMillis < 10000) {
        delay(1000);
        Serial.print(".");
    }
    if (WiFi.status() == WL_CONNECTED) {
      Serial.println("\nWiFi conectado!");
      Serial.print("Endereço IP: ");
      Serial.println(WiFi.localIP());
      lcd->setCursor(0, 1);
      lcd->print("Conectado!");
      delay(1500);
      lcd->clear();
      lcd->setCursor(0, 0);
    } else {
      Serial.println("\nFalha em conectar ao Wifi!");
      retryCount = retryCount + 1;
    }
}

// Método que realiza a conexão com o broker MQTT
void Conexao::conectarMQTT() {
    int currentMillis = millis();
    client.setServer(mqtt_broker, mqtt_port);
    client.setCallback(callbackMQTT);
    lcd->clear();
    lcd->setCursor(0, 0);
    lcd->print("Conectando MQTT");

    while (!client.connected() && millis() - currentMillis < 10000) {
        Serial.println("Conectando ao MQTT Broker...");

        if (client.connect("ESP32Client", mqtt_username, mqtt_password)) {
            Serial.println("Conectado ao MQTT Broker!");
        } else {
            Serial.print("Falha na conexão. Estado: ");
            Serial.println(client.state());
            delay(2000);
        }
    }
    if (client.connected()) {
      client.subscribe(topico);
      lcd->setCursor(0, 1);
      lcd->print("Conectado!");
      delay(1500);
      lcd->clear();
      lcd->setCursor(0, 0);
    } else {
      retryCount = retryCount + 1;
    }
}

// Método para envio de dados de acesso via MQTT
void Conexao::enviarAcessoMQTT(const String &id, const String &tipoDeAcesso) {
    if (client.connected()) {
        StaticJsonDocument<200> doc;
        JsonObject data = doc.createNestedObject("data");
        data["id"] = id;
        data["tipoDeAcesso"] = tipoDeAcesso;

        String jsonString;
        serializeJson(doc, jsonString);
        client.publish(topico, jsonString.c_str());
        Serial.println("Mensagem enviada: " + jsonString);
    } else {
        Serial.println("MQTT não conectado. Mensagem não enviada.");
    }
}

// Método para reconexão com o WiFi e com o MQTT
void Conexao::reconectar() {
    if ((!offlineMode && millis() - retryMillis >= intervalRetry) || (millis() - retryMillis >= intervalOffline)) {
        retryMillis = millis();

        if (WiFi.status() != WL_CONNECTED) {
            Serial.println("Wi-Fi desconectado. Tentando reconectar...");
            conectarWiFi();
        } else if (!client.connected()) {
            Serial.println("MQTT desconectado. Tentando reconectar...");
            conectarMQTT();
        } else {
            retryCount = 0;
        }
    }

    if (retryCount >= retryMax && !offlineMode) {
        offlineMode = true;
        Serial.println("Modo offline ativado após múltiplas tentativas falhas.");
        lcd->clear();
        lcd->setCursor(0, 0);
        lcd->print("Modo off-line");
        lcd->setCursor(0, 1);
        lcd->print("ativado.");
        delay(3000);
        lcd->clear();
        lcd->setCursor(0, 0);
    }

    if (client.connected()) {
        client.loop();
    }
}

void Conexao::botaoReconectar() {
    if (!offlineMode) {
    lcd->clear();
    lcd->setCursor(0, 0);
    lcd->print("Dispositivo");
    lcd->setCursor(0, 1);
    lcd->print("ja conectado.");
    delay(1500);
    ultimaInteracaoLCD = millis();
    lcd->clear();            // Limpa a tela ao retornar ao menu
    lcd->mensagemInicial();  // Retorna ao menu inicial
  } else {
    retryMillis = millis() - intervalRetry;
    offlineMode = 0;
    retryCount = 4;
  }
}

void Conexao::rssi() {
  if (WiFi.status() == WL_CONNECTED) {
    int32_t rssi = WiFi.RSSI();
    String rssiMessage = String(rssi) + " dBm";
    Serial.println(rssiMessage);
    lcd->clear();
    lcd->setCursor(0, 0);
    lcd->print("Forca do sinal:");
    lcd->setCursor(0, 1);
    lcd->print(rssiMessage);
    delay(2000);
  } else {
    lcd->clear();
    lcd->setCursor(0, 0);
    lcd->print("Dispositivo");
    lcd->setCursor(0, 1);
    lcd->print("nao conectado.");
    delay(2000);
  }
}