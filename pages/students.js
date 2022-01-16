import { getSession } from "next-auth/react";
import Head from "next/head";
import { Table } from "react-bootstrap";
import Student from "../utils/components/student/Student";
import { getAllStudents } from "../utils/database/students";

export async function getServerSideProps(context) {
    const students = await getAllStudents();

    return {
        props: {
            students,
            session: await getSession(context),
        }
    }
}

export default function Students(props) {
    const { students, session } = props;

    if(session.user.name !== 'admin') {
        return (
            <>
                <p>You are not allowed to see this page!</p>
            </>
        )
    }

    return (
        <>
            <Head>
                <title>Students</title>
            </Head>
            <Table className='mt-5' borderless hover>

                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Zip</th>
                        <th>Region</th>
                        <th>Country</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => {
                        return <Student key={student._id} student={student} />
                    })}
                </tbody>
            </Table>
        </>
    )
}