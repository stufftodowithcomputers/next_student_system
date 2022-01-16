import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function Attendance({ student }) {
    const data = {
        labels: ['Arrived', 'Authorised', 'Unauthorised'],
        datasets: [
            {
                label: 'Attendance',
                data: [student.attendance.total, student.attendance.authorised, student.attendance.unauthorised],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
            }
        ]
    }

    return (
        <>
            <Doughnut data={data} />
        </>
    )
}

export default Attendance
