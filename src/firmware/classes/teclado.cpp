#include "teclado.h"

// Construtor da classe Teclado
Teclado::Teclado(int pinoRele, LCD* lcdDisplay, ControlLEDs* ledVermelho, ControlLEDs* ledVerde, GoogleSheets* googleSheets, Conexao* conexao, Buzzer* buzzer) 
: keyPad(0x20), rele(pinoRele, lcdDisplay), lcd(lcdDisplay), ledVermelho(ledVermelho), ledVerde(ledVerde), googleSheets(googleSheets), 
conexao(conexao), buzzer(buzzer)  {  
  senhaDigitada = "";
  senhaAtual = "1234";
}

// Método para obter a tecla pressionada
char Teclado::obterTecla() {
  if (keyPad.isPressed()) {
    return keyPad.getChar();
  } else {
    return '\0'; // Caractere nulo
  }
}

// Método de inicialização do teclado com I2C
bool Teclado::inicializar() {
  // Verifica se já não foi inicializado
  if (!keyPad.begin()) {
    Serial.println("\nERRO: não foi possível comunicar com o teclado.");
    return false;
  }
  
  keyPad.loadKeyMap("123A456B789C*0#DNF"); // Define as teclas do teclado matricial 4x4
  return true;
}

// Método para adicionar a tecla à senha digitada
void Teclado::adicionarTecla(char tecla) {
  senhaDigitada += tecla;
}

// Método para apagar a última tecla da senha digitada
void Teclado::apagarUltimaTecla() {
  if (senhaDigitada.length() > 0) {
    senhaDigitada.remove(senhaDigitada.length() - 1);
  }
}

// Valida acesso por senha usando o teclado matricial
void Teclado::validarAcessoSenhaTeclado() {
  char tecla = obterTecla();
  if (tecla != '\0') {  //checagem se nenhuma tecla está sendo pressionada
      buzzer->ligarBuzzer(1000, 50);
      if (tecla == '#') {
        if (senhaDigitada == senhaAtual) {
          rele.destrancar();
          ledVerde->ligarLED();
          buzzer->ligarBuzzer(1000, 50);
          tempoDestrancado = millis();
          ultimaInteracaoLEDVerde = millis();
          Serial.println("Acesso concedido.");
          lcd->clear();
          lcd->print("Acesso concedido!");
          ultimaInteracaoLCD = millis();
          googleSheets->enviarDados("Senha", senhaDigitada);
          conexao->enviarAcessoMQTT(senhaDigitada, "Senha");
          senhaDigitada = "";
        } else {
          Serial.println("Senha incorreta.");
          lcd->clear();
          lcd->print("Senha incorreta");
          buzzer->ligarBuzzer(250, 100);
          ledVermelho->ligarLED();
          ultimaInteracaoLEDVermelho = millis();
          senhaDigitada = "";
          ultimaInteracaoLCD = millis();
        }
      } else if (tecla == '*') {
        if (senhaDigitada.length() > 0) {
          senhaDigitada.remove(senhaDigitada.length() - 1);
          lcd->clear();
          lcd->setCursor(0, 0);
          lcd->print("Senha: ");
          lcd->setCursor(0, 1);
          for (int i = 0; i < senhaDigitada.length(); i++) {
            lcd->print("*");
          }
        }
      } else if (tecla == 'D') {  // Verificação para o botão 'D'
        Serial.println("Operação cancelada. Retornando ao menu...");
        senhaDigitada = "";
        ultimaInteracaoLCD = millis();
        lcd->clear();            // Limpa a tela ao retornar ao menu
        lcd->mensagemInicial();  // Retorna ao menu inicial
        return;                 // Retorna para o menu sem realizar mais ações
      } else if (tecla == 'A') { // Verificação para o botão 'A'
        conexao->botaoReconectar();
      } else if (tecla == 'B') { // Verificação para o botão 'B'
        conexao->rssi();
      } else {
        senhaDigitada += tecla;
        lcd->clear();
        lcd->setCursor(0, 0);
        lcd->print("Senha: ");
        lcd->setCursor(0, 1);
        for (int i = 0; i < senhaDigitada.length(); i++) {
          lcd->print("*");
        }
      }
      ultimaInteracaoLCD = millis();
      tempoTeclado = millis();
      unsigned long tempoInicial = millis();
      unsigned long tempoAtual = millis();
      while (tempoAtual - tempoInicial < 300) {
        tempoAtual = millis();
      }
    }
}

// Método que reinicia a senha para vazio após 1 min sem interagir com o teclado
void Teclado::atualizarTeclado(){
  if (millis() - tempoTeclado >= 60000) {
    senhaDigitada = "";
  }
}
