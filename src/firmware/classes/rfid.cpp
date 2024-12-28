#include "rfid.h"
#include <EEPROM.h>

// Construtor da classe RFID
RFID::RFID(int ssPin, int rstPin, Rele* rel, LCD* lcdDisplay, ControlLEDs* ledVermelho, ControlLEDs* ledVerde, GoogleSheets* googleSheets, Conexao* conexao, Buzzer* buzzer)
    : SS_PIN(ssPin), RST_PIN(rstPin), mfrc522(ssPin, rstPin), rele(rel), lcd(lcdDisplay), ledVermelho(ledVermelho), ledVerde(ledVerde), googleSheets(googleSheets), 
      conexao(conexao), buzzer(buzzer) {}

// Função para inicializar a EEPROM e definir o tamanho desejado
void RFID::initEEPROM() {
    size = 512;
    EEPROM.begin(size);
}

// Método que busca espaço livre na EEPROM
int RFID::findFreeEEPROMSpace(int length) {
    for (int addr = 0; addr <= EEPROM.length() - length; addr++) {
        if (EEPROM.read(addr) == 255) {  // EEPROM vazio retorna 255
            bool spaceIsFree = true;
            for (int i = 1; i < length; i++) {
                if (EEPROM.read(addr + i) != 255) {
                    spaceIsFree = false;
                    break;
                }
            }
            if (spaceIsFree) {
                return addr;
            }
        }
    }
    return -1;  // EEPROM cheio
}

// Método que salva o UID na EEPROM
void RFID::saveUIDtoEEPROM(const String& uid) {
    // Verifica se o UID já existe antes de salvar
    String uids = lerTodosCartoesCadastrados();
    if (uids.indexOf(uid) != -1) {
        Serial.println("Cartão já cadastrado!");
        lcd->clear();
        lcd->setCursor(0, 0);
        lcd->print("Cartao ja");
        lcd->setCursor(0, 1);
        lcd->print("cadastrado!");
        return;
    }

    // Encontra o próximo espaço livre
    int freeAddr = -1;
    for (int i = 0; i < size - uid.length() - 1; i++) {
        bool isSpaceFree = true;
        for (int j = 0; j < uid.length() + 1; j++) {
            if (EEPROM.read(i + j) != 255) {
                isSpaceFree = false;
                break;
            }
        }
        if (isSpaceFree) {
            freeAddr = i;
            break;
        }
    }

    if (freeAddr == -1) {
        Serial.println("EEPROM cheio!");
        lcd->clear();
        lcd->setCursor(0, 0);
        lcd->print("EEPROM cheio!");
        return;
    }

    // Salva o UID
    for (int i = 0; i < uid.length(); i++) {
        EEPROM.write(freeAddr + i, uid[i]);
    }
    EEPROM.write(freeAddr + uid.length(), '\0');
    EEPROM.commit();

    Serial.println("UID salvo no EEPROM!");
    lcd->clear();
    lcd->setCursor(0, 0);
    lcd->print("UID salvo!");
}

// Função para cadastrar um cartão
bool RFID::cadastrarCartao() {
    String uid = "";
    lcd->clear();
    lcd->setCursor(0, 0);
    lcd->print("Posicione o");
    lcd->setCursor(0, 1);
    lcd->print("cartao no sensor");
    unsigned long tempoInicio = millis();

    // Aguarda até que o cartão seja colocado
    while (uid == "") {
        uid = lerUID();
        if (uid == "") {
            if (millis() - tempoInicio >= 100) {  // Verifica a cada 100ms
                Serial.print(".");
                tempoInicio = millis(); // Reinicia o tempo
            }
        } else {
            Serial.println("Cartão lido!");
            lcd->clear();
            lcd->setCursor(0, 0);
            lcd->print("Cartao lido");

            // Salva o UID no próximo espaço livre do EEPROM
            saveUIDtoEEPROM(uid);
            return true;  // Indica que o cartão foi cadastrado com sucesso
        }
    }
    return false; // Caso não seja lido corretamente
}

// Função para verificar se um cartão é válido
bool RFID::verificarCartao() {
    String uid = lerUID();
    if (uid != "") {
        String uids = lerTodosCartoesCadastrados();

        // Usa ; como separador para verificação precisa
        String uidComSeparador = uid + ";";
        if (uids.indexOf(uidComSeparador) >= 0) {
            Serial.println("Cartão reconhecido com UID: " + uid);
            rele->destrancar();
            return true;
        }

        Serial.println("Cartão não reconhecido.");
        Serial.println("UIDs cadastrados: " + uids);
    }
    return false;
}

// Função para ler o UID salvo na EEPROM
String RFID::lerCartaoCadastrado() {
    String uid = "";
    for (int i = 0; i < size; i++) {
        byte data = EEPROM.read(i);
        if (data == '\0') break; // Fim do UID
        uid += char(data); // Converte o byte em caractere
    }
    return uid;
}

// Inicializa o RFID
void RFID::RFIDBegin() {
    SPI.begin();
    mfrc522.PCD_Init();
    Serial.println("RFID inicializado.");
}

// Lê o UID do cartão presente
String RFID::lerUID() {
    if (!mfrc522.PICC_IsNewCardPresent() || !mfrc522.PICC_ReadCardSerial()) {
        return "";
    }
    String uid = "";
    for (byte i = 0; i < mfrc522.uid.size; i++) {
        uid += String(mfrc522.uid.uidByte[i], HEX);
    }
    mfrc522.PICC_HaltA();
    Serial.println("UID lido: " + uid); // Confirmação de UID lido
    return uid;
}

// Método para atualizar um cartão já cadastrado
bool RFID::atualizarCartao(String uid) {
    if (deletarCartao()) {
        return cadastrarCartao();
    }
    return false;
}

// Remove o UID da EEPROM (define como '\0')
bool RFID::deletarCartao() {
    for (int i = 0; i < size; i++) {
        EEPROM.write(i, 255); // Reseta para valor padrão
    }

    EEPROM.commit(); // Grava as alterações na EEPROM
    Serial.println("Todos os cartões deletados.");
    lcd->clear();
    lcd->print("Todos cartoes");
    lcd->setCursor(0, 1);
    lcd->print("deletados");
    return true;
}

// Método para deletar um cartão já cadastrado
bool RFID::deletarCartao(String uidParaExcluir) {
    // Lê todos os UIDs cadastrados
    String uids = lerTodosCartoesCadastrados();
    
    // Verifica se o UID existe
    if (uids.indexOf(uidParaExcluir) == -1) {
        Serial.println("Cartão não cadastrado.");
        return false;
    }

    // Limpa toda a EEPROM
    for (int i = 0; i < size; i++) {
        EEPROM.write(i, 255); // Reseta para valor padrão
    }

    // Reescreve os UIDs, exceto o que foi deletado
    int currentAddr = 0;
    String uidAtual = "";
    
    for (int i = 0; i < size; i++) {
        byte data = EEPROM.read(i);
        if (data == '\0') { 
            if (uidAtual.length() > 0 && uidAtual != uidParaExcluir) {
                // Escreve UIDs diferentes do que foi excluído
                for (int j = 0; j < uidAtual.length(); j++) {
                    EEPROM.write(currentAddr++, uidAtual[j]);
                }
                EEPROM.write(currentAddr++, '\0');
            }
            uidAtual = ""; // Reseta para o próximo UID
        } else {
            uidAtual += char(data);
        }
    }

    EEPROM.commit(); // Grava as alterações na EEPROM
    Serial.println("Cartão deletado com sucesso.");
    return true;
}

// Método que lê todos os UID armazenados na EEPROM
String RFID::lerTodosCartoesCadastrados() {
    String uids = "";
    String uidAtual = "";
    
    for (int i = 0; i < size; i++) {
        byte data = EEPROM.read(i);
        
        // Fim de um UID
        if (data == '\0') {
            if (uidAtual.length() > 0) {
                uids += uidAtual + ";";  // Usa ; como separador
                uidAtual = ""; // Reseta para o próximo UID
            }
        } 
        // Ignora bytes não utilizados
        else if (data != 255) {
            uidAtual += char(data);
        }
    }
    
    return uids;
}


void RFID::listarCadastrados(){
  Serial.println("Conteúdo da EEPROM:");
  for (int i = 0; i < size; i++) {
    byte valor = EEPROM.read(i); // Lê um byte da posição i
    if (valor != 0xFF) { // Opcional: Ignora valores não utilizados (0xFF é o padrão de EEPROM limpa)
      Serial.print("Endereço ");
      Serial.print(i);
      Serial.print(": ");
      Serial.println(valor, HEX); // Imprime em hexadecimal (pode ser DEC para decimal)
    }
  }
}

// função que permite o cadastro de um novo cartão
void RFID::cadastrarRFID() {
  lcd->clear();
  lcd->print("Cadastro RFID:");
  String uid = lerUID();
  if (uid != "" && cadastrarCartao()) {
    cadastrarCartao();
    Serial.println("Cartão RFID cadastrado com sucesso.");
    lcd->clear();
    lcd->print("RFID cadastrado");
    ultimaInteracaoLCD = millis();
  } else {
    Serial.println("Falha no cadastro do cartão.");
    lcd->clear();
    lcd->print("Erro no cadastro!");
    ultimaInteracaoLCD = millis();
  }
}

// Função que verifica os cartões lidos
void RFID::validarAcessoRFID() {
  String uid = lerUID();
  if (uid != "") {
    String uidsExistentes = lerTodosCartoesCadastrados();

    // Adiciona um ; no final para garantir correspondência precisa
    String uidComSeparador = uid + ";";

    if (uidsExistentes.indexOf(uidComSeparador) != -1) {
      Serial.println("Cartão reconhecido com UID: " + uid);
      googleSheets->enviarDados("RFID", uid);
      conexao->enviarAcessoMQTT(uid, "RFID");
      rele->destrancar();
          ledVerde->ligarLED();
          buzzer->ligarBuzzer(1000, 50);
          tempoDestrancado = millis();
          Serial.println("Acesso concedido.");
          lcd->clear();
          lcd->print("Acesso concedido!");
          ultimaInteracaoLCD = millis();
    } else {
      Serial.println("Cartão não reconhecido.");
      lcd->clear();
      lcd->setCursor(0, 0);
      lcd->print("Cartao nao ");
      lcd->setCursor(0, 1);
      lcd->print("reconhecido.");
      ultimaInteracaoLCD = millis();
        ledVermelho->ligarLED();
        ultimaInteracaoLEDVermelho = millis();
        buzzer->ligarBuzzer(500, 70);
    }
  }
}
