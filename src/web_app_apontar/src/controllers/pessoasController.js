import supabase from '../config/supabaseCliente.js';

import mqtt from 'mqtt';

// Configurações do broker MQTT
const brokerUrl = 'wss://test.mosquitto.org:8081/mqtt';
const topic = 'apontech/cadastro';

// Conecta ao broker MQTT
const mqttClient = mqtt.connect(brokerUrl);

// Lida com eventos de conexão
mqttClient.on('connect', () => {
  console.log('Conectado ao broker MQTT via WebSocket!');
});

mqttClient.on('error', (err) => {
  console.error('Erro na conexão MQTT:', err.message);
});

// Função para publicar mensagem no tópico MQTT
const publishMessage = (message) => {
  if (mqttClient.connected && message.trim()) {
    mqttClient.publish(topic, message);
    console.log(`Mensagem "${message}" enviada para o tópico "${topic}"`);
  } else {
    console.warn('Cliente MQTT não conectado ou mensagem vazia');
  }
};

// Controller para acionar o cadastro de biometria via MQTT
export const acionarCadastroBiometria = async (req, res) => {
  try {
    const message = 'Cadastro Biometria'; // Mensagem padrão para o ESP
    publishMessage(message); // Envia a mensagem ao broker MQTT
    res.status(200).json({ success: true, message: 'Ação enviada ao ESP via MQTT' });
  } catch (err) {
    console.error('Erro ao acionar cadastro de biometria:', err.message);
    res.status(500).json({ success: false, message: 'Erro ao acionar cadastro de biometria' });
  }
};

// Listar pessoas filtradas pelo tipo_pessoa (aluno, professor, visitante)
export const getPessoasByTipo = async (req, res) => {
  const { tipo_pessoa } = req.params; // Obtem o tipo_pessoa da URL
  try {
    const { data, error } = await supabase
      .from('pessoa')
      .select('*')
      .eq('tipo_pessoa', tipo_pessoa); // Filtra por tipo_pessoa

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json(data); // Retorna a lista filtrada
  } catch (err) {
    res.status(500).json({ error: 'Erro no servidor', details: err.message });
  }
};

// Criar uma nova pessoa
export const createPessoa = async (req, res) => {
  const {
    nome,
    cpf,
    data_nascimento,
    nome_emergencia,
    contato_emergencia,
    tipo_acesso,
    uuid_acesso,
    tipo_pessoa,
  } = req.body; // Obtem os dados do corpo da requisição

  try {
    const { data, error } = await supabase.from('pessoa').insert([{
      nome,
      cpf,
      data_nascimento,
      nome_emergencia,
      contato_emergencia,
      tipo_acesso,
      uuid_acesso,
      tipo_pessoa,
    }]);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({ message: 'Pessoa criada com sucesso', data });
  } catch (err) {
    res.status(500).json({ error: 'Erro no servidor', details: err.message });
  }
};

// Método para atualizar uma pessoa
export const updatePessoa = async (req, res) => {
    const { id } = req.params; // ID da pessoa para atualizar
    const {
      nome,
      cpf,
      data_nascimento,
      nome_emergencia,
      contato_emergencia,
      tipo_acesso,
      uuid_acesso,
      tipo_pessoa,
    } = req.body;
  
    try {
      const { data, error } = await supabase
        .from('pessoa')
        .update({
          nome,
          cpf,
          data_nascimento,
          nome_emergencia,
          contato_emergencia,
          tipo_acesso,
          uuid_acesso,
          tipo_pessoa,
        })
        .eq('id_pessoa', id); // Atualiza onde o ID corresponde
  
      if (error) {
        return res.status(400).json({ success: false, message: error.message });
      }
  
      res.status(200).json({ success: true, data });
    } catch (err) {
      console.error('Erro ao atualizar pessoa:', err.message);
      res.status(500).json({ success: false, message: 'Erro ao atualizar pessoa' });
    }
  };
  
  // Método para deletar uma pessoa
  export const deletePessoa = async (req, res) => {
    const { id } = req.params; // ID da pessoa para deletar
  
    try {
      const { data, error } = await supabase
        .from('pessoa')
        .delete()
        .eq('id_pessoa', id); // Deleta onde o ID corresponde
  
      if (error) {
        return res.status(400).json({ success: false, message: error.message });
      }
  
      res.status(200).json({ success: true, message: `Pessoa com ID ${id} deletada com sucesso`, data });
    } catch (err) {
      console.error('Erro ao deletar pessoa:', err.message);
      res.status(500).json({ success: false, message: 'Erro ao deletar pessoa' });
    }
  };
