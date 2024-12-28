#include "biometria.h"
#include <Arduino.h>

// Construtor da classe biometria
Biometria::Biometria(HardwareSerial &serial, int pinoRele, LCD* lcdDisplay, ControlLEDs* ledVermelho, ControlLEDs* ledVerde, Buzzer* buzzer, Conexao* conexao, GoogleSheets* googleSheets) 
    : rele(pinoRele, lcdDisplay), lcd(lcdDisplay), ledVermelho(ledVermelho), ledVerde(ledVerde), buzzer(buzzer), conexao(conexao), googleSheets(googleSheets) {  // Inicializa o LCD
    sensorDigital = new Adafruit_Fingerprint(&serial);
    sensorDigital->begin(57600);
}

// Método para inicializar o leitor biométrico
bool Biometria::inicializar() {
    unsigned long startAttempt = millis();
    while (!sensorDigital->verifyPassword()) {
        if (millis() - startAttempt > 5000) {  // 5 second timeout
            Serial.println("Failed to connect to fingerprint sensor after multiple attempts");
            return false;
        }
        delay(100);  // Small delay between attempts
    }
    Serial.println("Sensor de impressão digital encontrado!");
    return true;
}

// Método que procura qual a próxima ID disponível para cadastro no sensor
int Biometria::proximaIdDisponivel() {
  for (int id = 1; id <= 240; id++) { // IDs válidas no sensor
      if (sensorDigital->loadModel(id) != FINGERPRINT_OK) {
          return id; // Retorna a primeira ID disponível
      }
  }
  return -1; // Retorna -1 se todas as IDs estiverem ocupadas
}

// Método para cadastro de digital
bool Biometria::cadastrarDigital() {
  lcd->clear();
  lcd->setCursor(0, 0);
  lcd->print("Cadastro de");
  lcd->setCursor(0, 1);
  lcd->print("digital");

  int id = proximaIdDisponivel();
  if (id == -1) {
      Serial.println("Não há IDs disponíveis para cadastro.");
      return false;
  }
  
  Serial.print("Cadastrando ID #");
  Serial.println(id);

  int p = -1;
  Serial.println("Posicione o dedo no sensor...");
  lcd->clear();
  lcd->setCursor(0, 0);
  lcd->print("Posicione o dedo");
  lcd->setCursor(0, 1);
  lcd->print("no sensor");
  unsigned long tempoInicio = millis();

  // Aguarda até que o dedo seja colocado, sem bloquear o programa
  while (p != FINGERPRINT_OK) {
    p = sensorDigital->getImage();
    if (p == FINGERPRINT_NOFINGER) {
      if (millis() - tempoInicio >= 100) {  // Verifica a cada 100ms
        Serial.print(".");
        tempoInicio = millis(); // Reinicia o tempo
      }
    } else if (p == FINGERPRINT_OK) {
      Serial.println("Imagem capturada!");
      lcd->clear();
      lcd->setCursor(0, 0);
      lcd->print("Imagem capturada!");
    } else {
      return false;
    }
  }

  p = sensorDigital->image2Tz(1);
  if (p != FINGERPRINT_OK) {
    Serial.println("Erro ao converter imagem.");
    return false;
  }

  Serial.println("Remova o dedo e coloque novamente para confirmação");
  lcd->clear();
  lcd->setCursor(0, 0);
  lcd->print("Remova o dedo e");
  lcd->setCursor(0, 1);
  lcd->print("coloque novamente");
  tempoInicio = millis();

  // Aguarda até que o dedo seja removido
  while (p != FINGERPRINT_NOFINGER) {
    p = sensorDigital->getImage();
    if (millis() - tempoInicio >= 2000) {  // Aguarda até 2 segundos para o usuário remover o dedo
      Serial.println("Erro: dedo não removido a tempo.");
      return false;
    }
  }

  Serial.println("Reposicione o dedo...");
  lcd->clear();
  lcd->setCursor(0, 0);
  lcd->print("Reposicione o");
  lcd->setCursor(0, 1);
  lcd->print("dedo");
  p = -1;
  tempoInicio = millis();

  // Aguarda até que o dedo seja colocado novamente, sem bloquear o programa
  while (p != FINGERPRINT_OK) {
    p = sensorDigital->getImage();
    if (p == FINGERPRINT_NOFINGER) {
      if (millis() - tempoInicio >= 100) {  // Verifica a cada 100ms
        Serial.print(".");
        tempoInicio = millis(); // Reinicia o tempo
      }
    } else if (p == FINGERPRINT_OK) {
      Serial.println("Imagem capturada!");
    } else {
      Serial.println("Erro ao capturar imagem.");
      return false;
    }
  }

  p = sensorDigital->image2Tz(2);
  if (p != FINGERPRINT_OK) {
    Serial.println("Erro ao converter imagem.");
    return false;
  }

  p = sensorDigital->createModel();
  if (p != FINGERPRINT_OK) {
    Serial.println("Erro ao criar modelo.");
    return false;
  }

  p = sensorDigital->storeModel(id);
  if (p == FINGERPRINT_OK) {
    Serial.println("Digital cadastrada com sucesso!");
    lcd->clear();
    lcd->setCursor(0, 0);
    lcd->print("Digital cadastrada");
    lcd->setCursor(0, 1);
    lcd->print("com sucesso!");
    ultimaInteracaoLCD = millis();
    return true;
  } else {
    Serial.println("Erro ao armazenar digital.");
    lcd->clear();
    lcd->setCursor(0, 0);
    lcd->print("Erro ao");
    lcd->setCursor(0, 1);
    lcd->print("cadastrar");
    ultimaInteracaoLCD = millis();
    return false;
  }
}

// Método que verifica se a biometria lida pelo sensor está cadastrada
void Biometria::verificarDigital() {
  int p = sensorDigital->getImage();
  if (p == FINGERPRINT_OK) {
    if (sensorDigital->image2Tz() == FINGERPRINT_OK) {
      if (sensorDigital->fingerFastSearch() == FINGERPRINT_OK) {
        int idBiometria = sensorDigital->fingerID;
        Serial.print("Digital reconhecida! ID: ");
        Serial.println(idBiometria);
        Serial.println("Acesso concedido por digital.");
        rele.destrancar();
        ledVerde->ligarLED();
        buzzer->ligarBuzzer(1000, 50);
        tempoDestrancado = millis();
        Serial.println("Acesso concedido.");
        lcd->clear();
        lcd->print("Acesso concedido!");
        ultimaInteracaoLCD = millis();
        googleSheets->enviarDados("Biometria", String(idBiometria));
        conexao->enviarAcessoMQTT(String(idBiometria), "Biometria");
      } else {
        Serial.println("Digital não reconhecida.");
        lcd->clear();
        lcd->setCursor(0, 0);
        lcd->print("Digital nao");
        lcd->setCursor(0, 1);
        lcd->print("reconhecida.");
        ultimaInteracaoLCD = millis();
        ledVermelho->ligarLED();
        ultimaInteracaoLEDVermelho = millis();
        buzzer->ligarBuzzer(500, 70);
      }
    } else {
      Serial.println("Erro ao processar imagem.");
    }
  }
}

// Método para atualizar uma digital já cadastrada
bool Biometria::atualizarDigital(int id) {
  Serial.print("Atualizando digital para ID #");
  Serial.println(id);

  if (deletarDigital(id)) {
    return cadastrarDigital();  // Recadastra o ID
  } else {
    Serial.println("Falha ao atualizar digital.");
    return false;
  }
}

// Método para deletar digital
bool Biometria::deletarDigital(int id) {
  int p = sensorDigital->deleteModel(id);
  if (p == FINGERPRINT_OK) {
    Serial.print("Digital com ID #");
    Serial.print(id);
    Serial.println(" deletada com sucesso.");
    return true;
  } else {
    Serial.print("Erro ao deletar a digital com ID #");
    Serial.println(id);
    return false;
  }
}
