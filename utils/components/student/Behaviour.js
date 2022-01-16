import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function Behaviour({ student }) {
    if(!student.behaviour) {

    }

    const options = {
        responsive: true,
        plugins: {
            title: {
            display: true,
            text: 'Positives and Negatives',
            },
        },
    }
    
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const data = {
        labels,
        datasets: [
            {
                label: 'Negatives',
                data: labels.map((x, i) => {
                    if(student.behaviour[i].negative === undefined) return 0;
                    return student.behaviour[i].negative;
                }),
                backgroundColor: 'rgba(220, 20, 60, 0.75)',
            },
            {
                label: 'Positives',
                data: labels.map((x, i) => !student.behaviour[i].positive ? 0 :student.behaviour[i].positive),
                backgroundColor: 'rgba(46, 139, 87, 0.75)',
            },
        ],
    };

    return (
        <>
            <Bar options={options} data={data} />
        </>
    )
}

export default Behaviour
