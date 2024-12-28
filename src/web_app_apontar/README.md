# Aplicação Web Apontech

### **Estrutura do Diretório**
```plaintext
src/
│
├── assets/                # Recursos estáticos (imagens, ícones, etc.)
│   ├── images/            # Imagens da aplicação
│   └── styles/            # Estilos globais (CSS/SASS)
│       ├── App.css
│       └── index.css
│
├── components/            # Componentes reutilizáveis da aplicação
│   ├── Button.jsx         # Exemplo de botão reutilizável
│   ├── Header.jsx         # Cabeçalho da aplicação
│   ├── Footer.jsx         # Rodapé da aplicação
│   └── Form/              # Componentes relacionados a formulários
│       ├── AddVisitorForm.jsx
│       └── InputField.jsx
│
├── contexts/              # Context API para gerenciamento de estados globais
│   ├── AuthContext.jsx    # Gerenciamento de autenticação
│   └── VisitorContext.jsx # Gerenciamento de visitantes
│
├── hooks/                 # Custom hooks
│   └── useVisitors.js     # Hook para lidar com a API de visitantes
│
├── pages/                 # Páginas principais da aplicação
│   ├── HomePage.jsx
│   ├── DashboardPage.jsx
│   └── VisitorPage.jsx
│
├── services/              # Funções para comunicação com o backend
│   ├── api.js             # Configuração da API (axios, fetch, etc.)
│   ├── mqtt.js            # Configuração do MQTT para o frontend
│   └── emailService.js    # Funções para envio de e-mails (se aplicável)
│
├── utils/                 # Funções utilitárias
│   ├── generatePassword.js # Função para gerar senhas aleatórias
│   ├── validateEmail.js    # Função para validar e-mails
│   └── constants.js        # Constantes usadas na aplicação
│
├── App.jsx                # Componente raiz da aplicação
├── main.jsx               # Ponto de entrada para renderizar o App
└── index.jsx              # Configurações globais e renderização no DOM
```

---

### **Detalhes da Estrutura**
#### **1. assets/**
- **Finalidade**: Centralizar recursos estáticos.
- **Subpastas sugeridas**:
  - `images/`: Para imagens e ícones.
  - `styles/`: Para arquivos CSS globais.

#### **2. components/**
- **Finalidade**: Contém componentes reutilizáveis.
- **Subpastas sugeridas**:
  - `Form/`: Componentes relacionados a formulários, como inputs, labels e validações.
  - Outros componentes genéricos que podem ser usados em diferentes páginas.

#### **3. contexts/**
- **Finalidade**: Implementar o Context API para estados globais.
- **Exemplo**:
  - **AuthContext.jsx**: Gerenciar autenticação do usuário.
  - **VisitorContext.jsx**: Gerenciar dados de visitantes.

#### **4. hooks/**
- **Finalidade**: Centralizar custom hooks reutilizáveis.
- **Exemplo**:
  - `useVisitors.js`: Funções para lidar com os visitantes.
  - Outros hooks específicos como `useAuth`, `useMQTT`, etc.

#### **5. pages/**
- **Finalidade**: Estruturar cada página da aplicação.
- **Subpastas sugeridas**:
  - Páginas completas como `HomePage.jsx`, `DashboardPage.jsx` e `VisitorPage.jsx`.

#### **6. services/**
- **Finalidade**: Gerenciar comunicações externas e integrações.
- **Exemplo**:
  - `api.js`: Configurar `axios` ou `fetch` para chamadas de API REST.
  - `mqtt.js`: Configurar comunicação com o broker MQTT no front-end.

#### **7. utils/**
- **Finalidade**: Funções utilitárias reutilizáveis.
- **Exemplo**:
  - `generatePassword.js`: Gerar senhas aleatórias.
  - `constants.js`: Centralizar constantes (como URLs de API, mensagens padrão, etc.).
