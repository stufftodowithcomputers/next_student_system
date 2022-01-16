import Link from "next/link";

function Student({ student }) {
    return (
        <Link href={`students/${student._id}`} passHref>
            <tr style={{cursor: 'pointer'}}>
                <td>{student.name}</td>
                <td>{student.phone}</td>
                <td>{student.email}</td>
                <td>{student.address}</td>
                <td>{student.zip}</td>
                <td>{student.region}</td>
                <td>{student.country}</td>
            </tr>
        </Link>
    )
}

export default Student
