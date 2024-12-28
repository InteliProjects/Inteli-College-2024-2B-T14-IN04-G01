import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { supabase } from "../../supabaseClient";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const BarChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchBarChartData = async () => {
      try {
        const { data, error } = await supabase
          .from("access_logs")
          .select("created_at, tipo_horario");

        if (error) throw error;

        // Filtrar entradas e contar por dia da semana
        const entriesByDay = {
          Segunda: 0,
          Terça: 0,
          Quarta: 0,
          Quinta: 0,
          Sexta: 0,
          Sábado: 0,
        };

        data.forEach(({ created_at, tipo_horario }) => {
          if (tipo_horario === "entrada") {
            const day = new Date(created_at).getDay(); // 0 (Domingo) a 6 (Sábado)
            const daysOfWeek = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
            if (daysOfWeek[day]) {
              entriesByDay[daysOfWeek[day]]++;
            }
          }
        });

        setChartData({
          labels: Object.keys(entriesByDay).slice(1), // De Segunda a Sábado
          datasets: [
            {
              label: "Qtd. de pessoas que entraram no instituto a cada dia da semana",
              data: Object.values(entriesByDay).slice(1),
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Erro ao buscar dados do Supabase:", error);
      }
    };

    fetchBarChartData();
  }, []);

  const options = {};

  return chartData ? <Bar options={options} data={chartData} /> : <p>Carregando dados...</p>;
};
