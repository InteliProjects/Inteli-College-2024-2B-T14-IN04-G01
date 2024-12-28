#ifndef LCD_H
#define LCD_H

#include <LiquidCrystal_I2C.h>

class LCD : public LiquidCrystal_I2C {
public:
    LCD() : LiquidCrystal_I2C(0x27, 16, 2) {}  // Endereço I2C e tamanho do display
    void inicializar();
    void mensagemInicial(); // Mensagem de estado padrão do LCD
    void atualizarDisplaySenha(const String &senhaDigitada); // Atualiza display para senha digitada
    void atualizarDisplay(unsigned long lastInteractionTime); // Retorna ao estado padrão após screenTimeout
};

#endif
