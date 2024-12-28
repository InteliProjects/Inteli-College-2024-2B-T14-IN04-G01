#include "rele.h"

// Construtor da classe
Rele::Rele(int pino, LCD* lcdDisplay) : pinoRele(pino), lcd(lcdDisplay) {
  pinMode(pinoRele, OUTPUT);
  digitalWrite(pinoRele, HIGH);
}

// Método que envia sinal para o relé abrir a fechadura elética
void Rele::destrancar() {
  lcd->clear();
  lcd->print("Acesso concedido");
  digitalWrite(pinoRele, LOW);
}

// Método que envia sinal para o relé trancar a fechadura elética
void Rele::trancar() {
  digitalWrite(pinoRele, HIGH);
}

// Método que tranca a fechadura elética caso ela esteja aberta há um tempo deteterminado
void Rele::atualizar(unsigned long tempoDestrancado) {
  if (millis() - tempoDestrancado >= DURACAO_DESTRANCADO) {
    trancar();
  }
}
