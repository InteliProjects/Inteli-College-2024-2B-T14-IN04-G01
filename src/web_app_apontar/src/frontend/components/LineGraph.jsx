import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { supabase } from "../../supabaseClient";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const LineGraph = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchLineChartData = async () => {
      try {
        // Buscar os dados da tabela access_logs
        const { data, error } = await supabase.from("access_logs").select("created_at, tipo_acesso");

        if (error) throw error;

        // Inicializar a estrutura para armazenar os dados processados
        const accessByTypeAndDay = {
          "Cartão RFID": { Segunda: 0, Terça: 0, Quarta: 0, Quinta: 0, Sexta: 0, Sábado: 0 },
          Biometria: { Segunda: 0, Terça: 0, Quarta: 0, Quinta: 0, Sexta: 0, Sábado: 0 },
          Senha: { Segunda: 0, Terça: 0, Quarta: 0, Quinta: 0, Sexta: 0, Sábado: 0 },
        };

        // Processar os dados
        data.forEach(({ created_at, tipo_acesso }) => {
          const date = new Date(created_at);
          const day = date.getDay(); // Obtemos o dia da semana (0 = Domingo, 6 = Sábado)
          const daysOfWeek = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
          const dayOfWeek = daysOfWeek[day];

          // Garantir que o tipo_acesso e o dia sejam válidos antes de incrementar
          if (accessByTypeAndDay[tipo_acesso] && dayOfWeek) {
            accessByTypeAndDay[tipo_acesso][dayOfWeek]++;
          }
        });

        // Configurar os dados para o gráfico
        setChartData({
          labels: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"], // Apenas dias úteis
          datasets: [
            {
              label: "Cartão RFID",
              data: Object.values(accessByTypeAndDay["Cartão RFID"]),
              borderColor: "rgb(75, 192, 192)",
              tension: 0.4, // Suaviza a curva da linha
            },
            {
              label: "Biometria",
              data: Object.values(accessByTypeAndDay.Biometria),
              borderColor: "rgb(255, 99, 132)",
              tension: 0.4,
            },
            {
              label: "Senha",
              data: Object.values(accessByTypeAndDay.Senha),
              borderColor: "rgb(54, 162, 235)",
              tension: 0.4,
            },
          ],
        });
      } catch (error) {
        console.error("Erro ao buscar dados do Supabase:", error);
      }
    };

    fetchLineChartData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
  };

  return chartData ? <Line options={options} data={chartData} /> : <p>Carregando dados...</p>;
};
