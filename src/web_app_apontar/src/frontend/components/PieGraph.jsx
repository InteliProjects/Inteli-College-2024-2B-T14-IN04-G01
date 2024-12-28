import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { supabase } from "../../supabaseClient";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(Tooltip, Legend, ArcElement);

export const PieGraph = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchPieChartData = async () => {
      try {
        const { data, error } = await supabase.from("pessoa").select("tipo_pessoa");

        if (error) throw error;

        // Contar a quantidade de cada tipo de pessoa
        const counts = data.reduce((acc, { tipo_pessoa }) => {
          acc[tipo_pessoa] = (acc[tipo_pessoa] || 0) + 1;
          return acc;
        }, {});

        setChartData({
          labels: Object.keys(counts),
          datasets: [
            {
              label: "Quantidade de pessoas",
              data: Object.values(counts),
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
              ],
              hoverOffset: 4,
            },
          ],
        });
      } catch (error) {
        console.error("Erro ao buscar dados do Supabase:", error);
      }
    };

    fetchPieChartData();
  }, []);

  const options = {};

  return chartData ? <Pie options={options} data={chartData} /> : <p>Carregando dados...</p>;
};
