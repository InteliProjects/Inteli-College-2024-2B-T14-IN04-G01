#include "lcd.h"

// Método para inicialização do display
void LCD::inicializar() {
    init();
    backlight();
    mensagemInicial();
}

// Mensagem de estado padrão do LCD
void LCD::mensagemInicial() {
    setCursor(0, 0);
    print("Utilize sua     ");
    setCursor(0, 1);
    print("forma de acesso.");
}

// Atualiza display para senha digitada
void LCD::atualizarDisplaySenha(const String &senhaDigitada) {
    setCursor(0, 0);
    print("Digite a senha: ");
    setCursor(0, 1);
    print("                "); // Limpa a linha
    setCursor(0, 1);
    for (size_t i = 0; i < senhaDigitada.length(); i++) {
        print('*');
    }
}

// Retorna ao estado padrão após screenTimeout
void LCD::atualizarDisplay(unsigned long lastInteractionTime) {
    const unsigned long screenTimeout = 5000;  // Tempo limite de 5 segundos para o display

    if (millis() - lastInteractionTime > screenTimeout) {
        mensagemInicial();
    }
}
