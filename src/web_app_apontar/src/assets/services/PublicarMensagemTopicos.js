import mqtt from "mqtt";

// Configura o cliente MQTT
export const conectarClienteMQTT = (setClient, setIsConnected, setReceivedMessages) => {
  const mqttClient = mqtt.connect("wss://36d9e00a808c47b8b761d63a78047315.s1.eu.hivemq.cloud:8884/mqtt", {
    clientId: "clientId-12345", // Substitua por um ID único
    username: "GustavoBrabo", // Substitua pelo seu username do HiveMQ
    password: "Astalavista123", // Substitua pela sua senha do HiveMQ
    clean: true,
    keepalive: 60,
  });

  mqttClient.on("connect", () => {
    console.log("Conectado ao cluster HiveMQ!");
    setIsConnected(true);
  });

  mqttClient.on("message", (topic, payload) => {
    const msg = payload.toString();
    console.log(`Mensagem recebida do tópico "${topic}": ${msg}`);
    setReceivedMessages((prevMessages) => [
      ...prevMessages,
      { topic, message: msg },
    ]);
  });

  mqttClient.on("error", (err) => {
    console.error("Erro na conexão MQTT:", err);
  });

  setClient(mqttClient);
  return mqttClient;
};

export const publicarMensagem = (client, topic, message) => {
  if (client) {
    client.publish(topic, message);
    console.log(`Mensagem publicada no tópico '${topic}': ${message}`);
  } else {
    console.error("Cliente MQTT não está conectado!");
  }
};

export const inscreverNoTopico = (client, topic) => {
  if (client) {
    client.subscribe(topic, (err) => {
      if (!err) {
        console.log(`Inscrito no tópico: ${topic}`);
      } else {
        console.error(`Erro ao se inscrever no tópico '${topic}':`, err);
      }
    });
  } else {
    console.error("Cliente MQTT não está conectado!");
  }
};
