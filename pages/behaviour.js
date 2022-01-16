import { getSession } from "next-auth/react";
import { Container } from "react-bootstrap";
import { getStudentData } from "../utils/database/students";
import Behaviour from '../utils/components/student/Behaviour'

export async function getServerSideProps(context) {
    const session = await getSession(context);
    const student = await getStudentData(session.id);

    return {
        props: {
            session: await getSession(context),
            student: student,
        }
    }
}

function behaviour({ session, student}) {
    return (
        <Container>
            {session ? 
            <>
                <h1 className="mt-3 mb-5">Behaviour:</h1>

                <Behaviour student={student[0]} />

            </> : 
            <>
                You are not allowed here!
            </>}

        </Container>
    )
}

export default behaviour
