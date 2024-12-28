
export const lineGraphData = {
    labels: [
        "Segunda",
        "Terça",
        "Quarta",
        "Quinta",
        "Sexta",
        "Sábado",
    
    ],
    datasets: [
        {
            label: "Frequência de presença dos alunos ao longo dos dias",
            data:[400, 350, 450, 275, 290, 400],
            borderColor: "rgb(75, 192, 192)",

        }
    ],
};

export const barGraphData = {
    labels: [
        "Segunda",
        "Terça",
        "Quarta",
        "Quinta",
        "Sexta",
        "Sábado",
    ],
    datasets: [
        {
        label: "Quantidade de acessos no dia",
        data: [300, 250, 400, 175, 250, 300],
        backgroundColor: ["rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba (54, 162, 235, 1)"],
        borderWidth: 1,
        },

    ],
};


export const pieGraphData = {
    labels: ["Alunos", "Professores", "Visitantea", ],
    datasets: [
        {
            label: "Quantidade de pessoas no instituto atualmente",
            data: [120, 20, 5],
            backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
      
            ],
            hoverOffset: 4, 

        },
    ],
};