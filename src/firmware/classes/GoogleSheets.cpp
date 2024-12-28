#include "GoogleSheets.h"

// Construtor da Classe GoogleSheets
GoogleSheets::GoogleSheets(const char* url) : scriptURL(url) {}

// Método para envio de dados para o Google Sheets
void GoogleSheets::enviarDados(String tipoAcesso, String id) {
    if (WiFi.status() == WL_CONNECTED) {
        HTTPClient http;
        String url = scriptURL + "?acesso=" + tipoAcesso + "&id=" + id;
        
        http.begin(url.c_str());
        int httpResponseCode = http.GET();
        if (httpResponseCode > 0) {
            Serial.println("Dados enviados ao Google Sheets!");
        } else {
            Serial.println("Erro ao enviar dados.");
        }
        http.end();
    } else {
        Serial.println("WiFi não está conectado.");
    }
}
