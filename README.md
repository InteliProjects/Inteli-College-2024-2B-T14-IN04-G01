# Inteli - Instituto de Tecnologia e Liderança 

<p align="center">
<a href= "https://www.inteli.edu.br/"><img src="assets/inteli.png" alt="Inteli - Instituto de Tecnologia e Liderança" border="0" width=40% height=40%></a>
</p>

<br>

# Apontech

## Apontech

## 👨‍🎓 Integrantes: 
- <a href="https://www.linkedin.com/in/danielaraujogon%C3%A7alves/">Daniel Augusto de Araújo Gonçalves</a>
- <a href="https://www.linkedin.com/in/giovanna-britto/">Giovanna Fátima de Britto Vieira</a>
- <a href="https://www.linkedin.com/in/gucolombini/">Gustavo Colombini</a> 
- <a href="https://www.linkedin.com/in/isadoragatto/">Isadora Tribst Gatto</a> 
- <a href="https://www.linkedin.com/in/karine-victoria/">Karine Victoria Rosa da Paixão</a>
- <a href="https://www.linkedin.com/in/lucas-ramenzoni-jorge-083770302/">Lucas Ramenzoni Jorge</a> 
- <a href="https://www.linkedin.com/in/sophia-emanuele-de-senne-silva/">Sophia Emanuele de Senne Silva</a>

## 👩‍🏫 Professores:
### Orientador(a) 
- <a href="https://www.linkedin.com/in/fabiana-martins-de-oliveira-8993b0b2/">Fabiana Martins de Oliveira</a>
### Instrutores
- <a href="http://lattes.cnpq.br/3320717367822283">Bruna Mayer Costa</a>
- <a href="https://www.linkedin.com/in/fernando-pizzo-208b526a/">Fernando Pizzo Ribeiro</a>
- <a href="https://www.linkedin.com/in/filipe-gon%C3%A7alves-08a55015b/">Filipe Gonçalves de Souza Nogueira da Silva</a>
- <a href="https://www.linkedin.com/in/fillipe-resina-b2211a22/">Fillipe Manoel Xavier Resina</a>  
- <a href="https://www.linkedin.com/in/renato-penha/">Renato Penha</a> 
- <a href="https://www.linkedin.com/in/vthayashi/">Victor Takashi Hayashi</a>

## 📜 Descrição

O Apontech, projeto apresentado neste repositório, consiste em um sistema de controle de acesso e frequência desenvolvido para o Instituto Apontar, organização sem fins lucrativos que visa a apoiar o desenvolvimento de jovens com altas habilidades. Dessa forma, o sistema integra um dispositivo físico e uma aplicação web, conectados via internet, com funções distribuídas entre hardware e software. Nesse sentido, o dispositivo físico conta com meios de feedback para o usuário, uma fechadura elétrica para trancar e destrancar a porta e três formas de autenticação: biometria, leitor RFID e senha via teclado. Os feedbacks incluem um um display LCD para exibição de mensagens, um LED verde que indica acesso autorizado, um LED vermelho que indica acesso negado e um buzzer para feedback sonoro. Outrossim, a existência das diferentes formas de autenticação foram pensadas para garantir flexibilidade no acesso mantendo a segurança. O uso do leitor biométrico foi o modo pedido pelo instituto e será o principal meio de acesso para alunos e colaboradores. Já o uso do RFID assegura a acessibilidade, dado que algumas pessoas podem não possuir biometria; enquanto o acesso via teclado facilita a entrada de visitantes, devido a possibilidade de envio de senha para estes via e-mail. Ademais, a aplicação web permite a visualização dos dados coletados pelo dispositivo, tornando possível a gestão de acesso por colaboradores do instituto; nesse cenário, os colaboradores, após realizarem seu cadastro e seu login na plataforma, terão acesso a uma dashboard com gráficos que ilustram a quantidade de entradas ao longo da semana, os tipos de acessos utilizados e a distribuição de tipos de pessoas registradas (alunos, colaboradores ou visitantes). Ainda, através da aplicação também é possível realizar o cadastro de novos usuários e editar os existentes, além de  possibilitar a validação da presença dos alunos pelos professores. Portanto, esse projeto busca facilitar a entrada no instituto ao realizar a abertura da porta após a autenticação do usuário além de registrar esses acessos disponibilizando-os na aplicação web. O funcionamento da solução pode ser visto neste [vídeo](https://www.youtube.com/watch?v=c_2VM54r8c4&ab_channel=GustavoColombini);

## 📁 Estrutura de pastas

Dentre os arquivos e pastas presentes na raiz do projeto, definem-se:

- <b>assets</b>: aqui estão os arquivos relacionados a parte gráfica do projeto, ou seja, as imagens e vídeos que os representam (O logo do grupo pode ser adicionado nesta pasta).

- <b>document</b>: aqui estão todos os documentos do projeto, incluindo o manual de instruções (se aplicável). Há também uma pasta denominada <b>outros</b> onde estão presentes outros documentos complementares.

- <b>src</b>: Todo o código fonte criado para o desenvolvimento do projeto, incluindo firmware, notebooks, backend e frontend, se aplicáveis.

- <b>README.md</b>: arquivo que serve como guia e explicação geral sobre o projeto (o mesmo que você está lendo agora).

## 🔧 Instalação

A fim de realizar a instalação do projeto, necessita-se de recursos específicos, os quais, descritos abaixo, possibilitam o funcionamento do sistema. Ademais, as versões de cada um desses recursos utilizadas pelo grupo estão também são apresentadas, dado que garantem a compatibilidade com o ambiente de desenvolvimento.

- **Node.js**: Utilizado para a execução do back-end do projeto.
   - Versão: v18.18.0
   - Download [aqui](https://nodejs.org).

- **Arduino IDE**: Software gratuito que facilita a gravação de códigos em microcontroladores.
   - Versão: 2.2.1
   - Download [aqui](https://www.arduino.cc/en/software).

- **Git**: Necessário para clonar e gerenciar o repositório do projeto.
   - Versão: 2.44.0.windows.1
   - Download [aqui](https://git-scm.com).

- **Visual Studio Code (VSCode)**: Editor de códigos utilizado para desenvolvimento e edições.
   - Versão: 1.96.0
   - Download [aqui](https://code.visualstudio.com).

- **Wi-Fi Estável**: Certifique-se de ter uma rede Wi-Fi funcional, com SSID e senha definidos para configuração no ESP32.

Após garantir que todos os pré-requisitos estão sendo cumpridos, pode-se iniciar a instalação do projeto clonando o repositório, instalando o Back-End, instalando o Front-End, configurando a Arduino IDE e carregando o código no ESP32. Esses passos estão descritos no Manual de Instruções, o qual pode ser acessado clicando [aqui](). No tópico 5 desse documento, denominado 'Guia de Instalação', encontram-se todas as orientações de instalação detalhadas.


## 🗃 Histórico de lançamentos

* 0.5.0 - 19/12/2024
    * Versão Final do Protótipo
    * Definição da Arquitetura Refinada da Solução
    * Integração com a Aplicação Web
    * Revisões dos lançamentos anteriores
* 0.4.0 - 06/12/2024
    * Criação da Dashboard
    * Criação do Manual de Instruções
    * Definição da Arquitetura do Protótipo
* 0.3.0 - 22/11/2024
    * Definição da metodologia
    * Definição da Arquitetura da Solução
    * Implementação da conexão com Broker MQTT
* 0.2.0 - 08/11/2024
    * Primeira Versão do Protótipo Físico
    * Integração com o Google Sheets
    * Criação dos Mapas de Jornada do usuário
    * Definição dos Requisitos Não Funcionais
* 0.1.0 - 25/10/2024
    * Documentação de entendimento do negócio
    * Criação das personas
    * Definição dos Requisitos Funcionais
    * Protótipo no Simulador [Wokwi](https://wokwi.com/)

## 📋 Licença/License

<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"><p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://github.com/Intelihub/Template_M4">MODELO GIT INTELI</a> by Inteli is licensed under <a href="http://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">Attribution 4.0 International</a>.</p>