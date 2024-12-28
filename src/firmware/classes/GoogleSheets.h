#ifndef GOOGLE_SHEETS_H
#define GOOGLE_SHEETS_H

#include <WiFi.h>
#include <HTTPClient.h>

class GoogleSheets {
public:
    GoogleSheets(const char* url);
    void enviarDados(String tipoAcesso, String id);

private:
    String scriptURL;
};

#endif
