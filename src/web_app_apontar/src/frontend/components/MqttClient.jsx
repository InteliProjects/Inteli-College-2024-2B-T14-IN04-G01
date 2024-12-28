import React, { useState, useEffect } from "react";
import { conectarClienteMQTT, publicarMensagem, inscreverNoTopico } from "../../assets/services/PublicarMensagemTopicos";
import { supabase } from "../../supabaseClient";

const MqttClient = () => {
  const [client, setClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [message, setMessage] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);

  useEffect(() => {
    const mqttClient = conectarClienteMQTT(setClient, setIsConnected, setReceivedMessages);

    mqttClient.on("message", async (topic, payload) => {
      if (topic === "apontech/novoAcesso") {
        try {
          const dataArray = JSON.parse(payload.toString());
          console.log("JSON recebido:", dataArray);

          if (!Array.isArray(dataArray)) {
            throw new Error("O JSON recebido não é um array!");
          }

          for (const data of dataArray) {
            if (!data.horario || !data.id || !data.tipo_acesso) {
              console.error("Dados inválidos:", data);
              continue;
            }

            const { horario, id: id_pessoa, tipo_acesso } = data;

            const { data: lastRecords, error: fetchError } = await supabase
              .from("access_logs")
              .select("tipo_horario")
              .eq("id_pessoa", id_pessoa)
              .order("created_at", { ascending: false })
              .limit(1);

            if (fetchError) throw fetchError;

            const lastTipoHorario = lastRecords?.[0]?.tipo_horario;
            const tipo_horario = lastTipoHorario === "entrada" ? "saída" : "entrada";

            const { error: insertError } = await supabase
              .from("access_logs")
              .insert([{ horario, id_pessoa, tipo_acesso, tipo_horario }]);

            if (insertError) throw insertError;

            console.log(`Registro salvo: ${horario} | ${id_pessoa} | ${tipo_horario}`);
          }
        } catch (err) {
          console.error("Erro ao processar a mensagem JSON:", err);
        }
      }
    });

    return () => {
      mqttClient.end();
    };
  }, []);

  useEffect(() => {
    if (isConnected && client) {
      inscreverNoTopico(client, "apontech/novoAcesso");
    }
  }, [isConnected, client]);

  const publishMessage = () => {
    publicarMensagem(client, "apontech/novoAcesso", message);
  };

  return (
    <div>
      <h1>React + MQTT + Supabase</h1>
      <p>Status: {isConnected ? "Conectado" : "Desconectado"}</p>

      <div>
        <input
          type="text"
          placeholder="Escreva sua mensagem"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={publishMessage}>Publicar Mensagem</button>
      </div>

      <div>
        <h3>Mensagens Recebidas:</h3>
        <ul>
          {receivedMessages.map((msg, index) => (
            <li key={index}>
              <strong>Tópico:</strong> {msg.topic} | <strong>Mensagem:</strong> {msg.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MqttClient;
